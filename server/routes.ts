import type { Express } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import passport from "./auth";
import { storage } from "./storage";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { insertUserSchema, insertThreadSchema, insertPostSchema, insertConsentLogSchema, insertCategorySchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

// Middleware to check if user is authenticated
function isAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Nicht angemeldet" });
}

// Middleware to check if user's email is verified (for forum write operations)
function isEmailVerified(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Nicht angemeldet" });
  }
  if (!req.user.emailVerified) {
    return res.status(403).json({ 
      message: "E-Mail-Verifizierung erforderlich. Bitte bestätige zuerst deine E-Mail-Adresse.",
      code: "EMAIL_NOT_VERIFIED"
    });
  }
  return next();
}

// Generate random verification token
function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Session configuration
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "kaiser-service-secret-key-change-in-production",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      },
    })
  );

  // Initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // ===== AUTH ROUTES =====
  
  // Register with email verification
  app.post("/api/auth/register", async (req, res, next) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if username or email already exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Benutzername bereits vergeben" });
      }

      const existingEmail = await storage.getUserByEmail(validatedData.email);
      if (existingEmail) {
        return res.status(400).json({ message: "E-Mail bereits registriert" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);

      // Create user (not verified yet)
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });

      // Generate verification token
      const token = generateToken();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      
      await storage.createVerificationToken({
        userId: user.id,
        token,
        expiresAt,
      });

      // Try to send verification email via N8N webhook
      const webhookUrl = process.env.N8N_EMAIL_WEBHOOK_URL;
      if (webhookUrl) {
        try {
          const verificationUrl = `${req.protocol}://${req.get("host")}/verify-email?token=${token}`;
          await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "email_verification",
              to: user.email,
              username: user.username,
              displayName: user.displayName || user.username,
              verificationUrl,
              token,
            }),
          });
        } catch (webhookError) {
          console.error("Failed to send verification email via webhook:", webhookError);
        }
      }

      // Log user in automatically after registration
      req.login(user, (err) => {
        if (err) return next(err);
        
        // Don't send password to client
        const { password, ...userWithoutPassword } = user;
        res.status(201).json({ 
          user: userWithoutPassword,
          message: webhookUrl 
            ? "Registrierung erfolgreich! Bitte überprüfe deine E-Mail zur Verifizierung."
            : "Registrierung erfolgreich!"
        });
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      next(error);
    }
  });

  // Verify email
  app.get("/api/auth/verify-email", async (req, res, next) => {
    try {
      const { token } = req.query;
      
      if (!token || typeof token !== "string") {
        return res.status(400).json({ message: "Ungültiger Verifizierungstoken" });
      }

      const verificationToken = await storage.getVerificationToken(token);
      if (!verificationToken) {
        return res.status(400).json({ message: "Token ungültig oder abgelaufen" });
      }

      // Verify the user's email
      await storage.verifyUserEmail(verificationToken.userId);
      
      // Delete the used token
      await storage.deleteVerificationToken(token);

      res.json({ message: "E-Mail erfolgreich verifiziert!" });
    } catch (error) {
      next(error);
    }
  });

  // Resend verification email
  app.post("/api/auth/resend-verification", isAuthenticated, async (req, res, next) => {
    try {
      const user = req.user as any;
      
      if (user.emailVerified) {
        return res.status(400).json({ message: "E-Mail bereits verifiziert" });
      }

      // Generate new verification token
      const token = generateToken();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      
      await storage.createVerificationToken({
        userId: user.id,
        token,
        expiresAt,
      });

      // Send verification email via N8N webhook
      const webhookUrl = process.env.N8N_EMAIL_WEBHOOK_URL;
      if (webhookUrl) {
        const verificationUrl = `${req.protocol}://${req.get("host")}/verify-email?token=${token}`;
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "email_verification",
            to: user.email,
            username: user.username,
            displayName: user.displayName || user.username,
            verificationUrl,
            token,
          }),
        });
      }

      res.json({ message: "Verifizierungs-E-Mail wurde erneut gesendet" });
    } catch (error) {
      next(error);
    }
  });

  // Login
  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ message: info?.message || "Login fehlgeschlagen" });
      }

      req.login(user, (err) => {
        if (err) return next(err);
        
        // Don't send password to client
        const { password, ...userWithoutPassword } = user;
        res.json({ user: userWithoutPassword });
      });
    })(req, res, next);
  });

  // Logout
  app.post("/api/auth/logout", (req, res) => {
    req.logout(() => {
      res.json({ message: "Erfolgreich abgemeldet" });
    });
  });

  // Get current user
  app.get("/api/auth/user", (req, res) => {
    if (req.user) {
      const { password, ...userWithoutPassword } = req.user as any;
      res.json({ user: userWithoutPassword });
    } else {
      res.json({ user: null });
    }
  });

  // Update user profile
  app.patch("/api/auth/profile", isAuthenticated, async (req, res, next) => {
    try {
      const user = req.user as any;
      const { displayName, bio, avatarUrl } = req.body;

      const updatedUser = await storage.updateUser(user.id, {
        displayName: displayName ?? user.displayName,
        bio: bio ?? user.bio,
        avatarUrl: avatarUrl ?? user.avatarUrl,
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "Benutzer nicht gefunden" });
      }

      const { password, ...userWithoutPassword } = updatedUser;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      next(error);
    }
  });

  // ===== FORUM CATEGORY ROUTES =====

  // Get all categories
  app.get("/api/forum/categories", async (req, res, next) => {
    try {
      const categoriesList = await storage.getCategories();
      res.json({ categories: categoriesList });
    } catch (error) {
      next(error);
    }
  });

  // Get category by slug
  app.get("/api/forum/categories/:slug", async (req, res, next) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Kategorie nicht gefunden" });
      }
      res.json({ category });
    } catch (error) {
      next(error);
    }
  });

  // Initialize default categories (admin endpoint)
  app.post("/api/forum/categories/init", async (req, res, next) => {
    try {
      const existingCategories = await storage.getCategories();
      if (existingCategories.length > 0) {
        return res.json({ message: "Kategorien bereits vorhanden", categories: existingCategories });
      }

      const defaultCategories = [
        {
          name: "Allgemein",
          nameEn: "General",
          slug: "general",
          description: "Allgemeine Diskussionen und Ankündigungen",
          descriptionEn: "General discussions and announcements",
          icon: "MessageSquare",
          color: "#6366F1",
          sortOrder: 1,
        },
        {
          name: "N8N & Automatisierung",
          nameEn: "N8N & Automation",
          slug: "n8n-automation",
          description: "Alles rund um N8N Workflows und Prozessautomatisierung",
          descriptionEn: "Everything about N8N workflows and process automation",
          icon: "Workflow",
          color: "#FF6D5A",
          sortOrder: 2,
        },
        {
          name: "KI & Voice Agents",
          nameEn: "AI & Voice Agents",
          slug: "ai-voice-agents",
          description: "Diskussionen über KI-Lösungen und Sprachassistenten",
          descriptionEn: "Discussions about AI solutions and voice assistants",
          icon: "Bot",
          color: "#10B981",
          sortOrder: 3,
        },
        {
          name: "Hilfe & Support",
          nameEn: "Help & Support",
          slug: "help-support",
          description: "Fragen und Hilfestellungen für die Community",
          descriptionEn: "Questions and support for the community",
          icon: "HelpCircle",
          color: "#F59E0B",
          sortOrder: 4,
        },
        {
          name: "Showcase",
          nameEn: "Showcase",
          slug: "showcase",
          description: "Zeige deine Projekte und Erfolge",
          descriptionEn: "Show off your projects and achievements",
          icon: "Sparkles",
          color: "#EC4899",
          sortOrder: 5,
        },
      ];

      const createdCategories = [];
      for (const cat of defaultCategories) {
        const created = await storage.createCategory(cat);
        createdCategories.push(created);
      }

      res.status(201).json({ message: "Kategorien erstellt", categories: createdCategories });
    } catch (error) {
      next(error);
    }
  });

  // ===== FORUM THREAD ROUTES =====

  // Get all threads (optionally filtered by category)
  app.get("/api/forum/threads", async (req, res, next) => {
    try {
      const { categoryId } = req.query;
      const threadsList = await storage.getThreads(categoryId as string | undefined);
      res.json({ threads: threadsList });
    } catch (error) {
      next(error);
    }
  });

  // Get single thread with posts
  app.get("/api/forum/threads/:id", async (req, res, next) => {
    try {
      const thread = await storage.getThread(req.params.id);
      if (!thread) {
        return res.status(404).json({ message: "Thread nicht gefunden" });
      }

      // Increment view count
      await storage.incrementThreadViews(req.params.id);

      const postsList = await storage.getPostsByThread(req.params.id);
      
      res.json({ thread, posts: postsList });
    } catch (error) {
      next(error);
    }
  });

  // Create thread (requires auth)
  app.post("/api/forum/threads", isEmailVerified, async (req, res, next) => {
    try {
      const user = req.user as any;
      
      const validatedData = insertThreadSchema.parse({
        ...req.body,
        authorId: user.id,
      });

      const thread = await storage.createThread(validatedData);
      res.status(201).json({ thread });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      next(error);
    }
  });

  // Update thread (owner only)
  app.patch("/api/forum/threads/:id", isEmailVerified, async (req, res, next) => {
    try {
      const user = req.user as any;
      const thread = await storage.getThread(req.params.id);
      
      if (!thread) {
        return res.status(404).json({ message: "Thread nicht gefunden" });
      }

      if (thread.authorId !== user.id) {
        return res.status(403).json({ message: "Nicht berechtigt" });
      }

      const { title, categoryId } = req.body;
      const updatedThread = await storage.updateThread(req.params.id, { title, categoryId });
      
      res.json({ thread: updatedThread });
    } catch (error) {
      next(error);
    }
  });

  // Delete thread (owner only)
  app.delete("/api/forum/threads/:id", isEmailVerified, async (req, res, next) => {
    try {
      const user = req.user as any;
      const thread = await storage.getThread(req.params.id);
      
      if (!thread) {
        return res.status(404).json({ message: "Thread nicht gefunden" });
      }

      if (thread.authorId !== user.id) {
        return res.status(403).json({ message: "Nicht berechtigt" });
      }

      await storage.deleteThread(req.params.id);
      res.json({ message: "Thread gelöscht" });
    } catch (error) {
      next(error);
    }
  });

  // ===== FORUM POST ROUTES =====

  // Create post (requires auth)
  app.post("/api/forum/posts", isEmailVerified, async (req, res, next) => {
    try {
      const user = req.user as any;
      
      // Check if thread is locked
      const thread = await storage.getThread(req.body.threadId);
      if (!thread) {
        return res.status(404).json({ message: "Thread nicht gefunden" });
      }
      if (thread.isLocked) {
        return res.status(403).json({ message: "Thread ist geschlossen" });
      }

      const validatedData = insertPostSchema.parse({
        ...req.body,
        authorId: user.id,
      });

      const post = await storage.createPost(validatedData);
      res.status(201).json({ post });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      next(error);
    }
  });

  // Update post (owner only)
  app.patch("/api/forum/posts/:id", isEmailVerified, async (req, res, next) => {
    try {
      const user = req.user as any;
      const post = await storage.getPost(req.params.id);
      
      if (!post) {
        return res.status(404).json({ message: "Beitrag nicht gefunden" });
      }

      if (post.authorId !== user.id) {
        return res.status(403).json({ message: "Nicht berechtigt" });
      }

      const { content } = req.body;
      if (!content || content.trim().length === 0) {
        return res.status(400).json({ message: "Inhalt darf nicht leer sein" });
      }

      const updatedPost = await storage.updatePost(req.params.id, content);
      res.json({ post: updatedPost });
    } catch (error) {
      next(error);
    }
  });

  // Delete post (owner only)
  app.delete("/api/forum/posts/:id", isEmailVerified, async (req, res, next) => {
    try {
      const user = req.user as any;
      const post = await storage.getPost(req.params.id);
      
      if (!post) {
        return res.status(404).json({ message: "Beitrag nicht gefunden" });
      }

      if (post.authorId !== user.id) {
        return res.status(403).json({ message: "Nicht berechtigt" });
      }

      await storage.deletePost(req.params.id);
      res.json({ message: "Beitrag gelöscht" });
    } catch (error) {
      next(error);
    }
  });

  // ===== USER PROFILE ROUTES =====

  // Get user profile (public)
  app.get("/api/users/:id", async (req, res, next) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Benutzer nicht gefunden" });
      }

      // Don't expose sensitive data
      const { password, email, ...publicProfile } = user;
      res.json({ user: publicProfile });
    } catch (error) {
      next(error);
    }
  });

  // ===== N8N WEBHOOK PROXY ROUTES =====

  // News feed endpoint (proxy to N8N webhook)
  app.get("/api/n8n/news", async (req, res, next) => {
    try {
      const webhookUrl = process.env.N8N_NEWS_WEBHOOK_URL;
      
      if (!webhookUrl) {
        return res.json({
          news: [
            {
              id: "1",
              title: "AI Voice Agents revolutionieren den Kundenservice",
              excerpt: "Entdecken Sie, wie KI-gestützte Sprachagenten die Kundenkommunikation transformieren.",
              imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
              date: new Date().toISOString(),
              category: "Voice AI",
            },
            {
              id: "2",
              title: "N8N Workflow Automation: Best Practices",
              excerpt: "Lernen Sie die effektivsten Strategien für die Prozessautomatisierung mit N8N.",
              imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
              date: new Date().toISOString(),
              category: "Automation",
            },
          ],
        });
      }

      const response = await fetch(webhookUrl);
      const data = await response.json();
      
      const newsItems = Array.isArray(data) ? data : (data.news || []);
      const normalizedNews = newsItems.map((item: any, index: number) => ({
        id: item.id || String(index + 1),
        title: item.title || "Untitled",
        excerpt: item.excerpt || item.description || "",
        imageUrl: item.imageUrl || item.image || null,
        date: item.date || new Date().toISOString(),
        category: item.category || "News",
      }));
      
      res.json({ news: normalizedNews });
    } catch (error) {
      next(error);
    }
  });

  // Chatbot endpoint (proxy to N8N webhook)
  app.post("/api/n8n/chat", async (req, res) => {
    try {
      const webhookUrl = process.env.N8N_CHAT_WEBHOOK_URL;
      
      if (!webhookUrl) {
        return res.json({
          reply: "Hallo! Ich bin der Kaiser-Service KI-Assistent. Leider ist der Chat-Service momentan nicht konfiguriert. Bitte kontaktieren Sie uns per E-Mail: Service-Kaiser@proton.me",
        });
      }

      console.log("Sending chat request to N8N webhook:", webhookUrl);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(req.body),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.error("N8N webhook returned error:", response.status, response.statusText);
        return res.json({
          reply: "Entschuldigung, der Chat-Service ist momentan nicht erreichbar. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns per E-Mail: Service-Kaiser@proton.me",
        });
      }
      
      const responseText = await response.text();
      console.log("N8N webhook response:", responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        // If response is plain text, use it directly
        return res.json({ reply: responseText || "Entschuldigung, ich konnte keine Antwort generieren." });
      }
      
      const reply = data.output || data.reply || data.message || data.response || data.text || "Entschuldigung, ich konnte keine Antwort generieren.";
      res.json({ reply });
    } catch (error: any) {
      console.error("Chat endpoint error:", error.message);
      res.json({
        reply: "Entschuldigung, es gab ein technisches Problem. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns per E-Mail: Service-Kaiser@proton.me",
      });
    }
  });

  // Voice agent demo endpoint (proxy to N8N webhook)
  app.post("/api/n8n/voice-demo", async (req, res, next) => {
    try {
      const webhookUrl = process.env.N8N_VOICE_WEBHOOK_URL;
      
      if (!webhookUrl) {
        return res.json({
          success: true,
          message: "Voice demo would be triggered here (N8N webhook not configured)",
        });
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      next(error);
    }
  });

  // Eleven Labs Voice Agent - Get signed URL for secure WebSocket connection
  app.get("/api/voice-agent/signed-url", async (req, res, next) => {
    try {
      const apiKey = process.env.ELEVENLABS_API_KEY;
      const agentId = "agent_2301kbv0mxnqfr3vhzzw6n2p0abh";
      
      if (!apiKey) {
        return res.status(500).json({ 
          error: "Eleven Labs API key not configured" 
        });
      }

      const response = await fetch(
        `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${agentId}`,
        {
          headers: {
            "xi-api-key": apiKey,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Eleven Labs API error:", response.status, errorText);
        return res.status(response.status).json({ 
          error: "Failed to get signed URL from Eleven Labs",
          details: errorText
        });
      }

      const data = await response.json();
      res.json({ signedUrl: data.signed_url });
    } catch (error) {
      console.error("Voice agent signed URL error:", error);
      next(error);
    }
  });

  // ===== CONTACT FORM (§ 5 DDG - Rapid Electronic Contact) =====
  
  const contactFormSchema = z.object({
    firstName: z.string().min(1, "Vorname ist erforderlich"),
    lastName: z.string().min(1, "Nachname ist erforderlich"),
    email: z.string().email("Gültige E-Mail erforderlich"),
    message: z.string().min(10, "Nachricht muss mindestens 10 Zeichen haben"),
  });

  app.post("/api/contact", async (req, res, next) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      
      console.log("Contact form submission:", {
        ...validatedData,
        timestamp: new Date().toISOString(),
        ip: req.ip,
      });

      // Forward to N8N webhook if configured
      const webhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL;
      if (webhookUrl) {
        try {
          await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...validatedData,
              timestamp: new Date().toISOString(),
            }),
          });
        } catch (webhookError) {
          console.error("Failed to forward to webhook:", webhookError);
        }
      }

      res.status(200).json({ 
        success: true, 
        message: "Ihre Nachricht wurde erfolgreich gesendet. Wir werden uns innerhalb von 24 Stunden bei Ihnen melden." 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      next(error);
    }
  });

  // ===== ADMIN SEEDING =====
  
  // Initialize admin user on startup (only if credentials are set via environment variables)
  async function seedAdminUser() {
    try {
      const adminUsername = process.env.ADMIN_USERNAME;
      const adminPassword = process.env.ADMIN_PASSWORD;
      const adminEmail = process.env.ADMIN_EMAIL || "admin@kaiser-service.de";
      
      // Only seed if both username and password are explicitly set
      if (!adminUsername || !adminPassword) {
        console.log("Admin credentials not set. Set ADMIN_USERNAME and ADMIN_PASSWORD to create an admin user.");
        return;
      }
      
      // Check password strength (must be at least 8 characters)
      if (adminPassword.length < 8) {
        console.warn("⚠️  WARNING: Admin password is too short (minimum 8 characters). Admin user not created.");
        return;
      }
      
      const existingAdmin = await storage.getUserByUsername(adminUsername);
      if (existingAdmin) {
        // Update existing admin password
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await storage.updateUser(existingAdmin.id, { password: hashedPassword });
        console.log(`Admin user '${adminUsername}' password updated.`);
      } else {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        const admin = await storage.createUser({
          username: adminUsername,
          email: adminEmail,
          password: hashedPassword,
          displayName: "Administrator",
        });
        // Mark admin email as verified
        await storage.verifyUserEmail(admin.id);
        console.log(`Admin user '${adminUsername}' created successfully.`);
      }
    } catch (error) {
      console.error("Failed to seed admin user:", error);
    }
  }
  
  // Call on server startup
  seedAdminUser();

  // ===== CONSENT LOGGING (DSGVO Compliance) =====
  
  app.post("/api/consent-log", async (req, res, next) => {
    try {
      const validatedData = insertConsentLogSchema.parse({
        consentId: req.body.consentId,
        necessary: String(req.body.necessary ?? true),
        functional: String(req.body.functional ?? false),
        analytics: String(req.body.analytics ?? false),
        marketing: String(req.body.marketing ?? false),
        consentVersion: req.body.consentVersion || "1.0",
        userAgent: req.headers["user-agent"] || null,
      });

      const consent = await storage.logConsent(validatedData);
      res.status(201).json({ success: true, id: consent.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      console.error("Consent logging error:", error);
      next(error);
    }
  });

  return httpServer;
}
