import { 
  type User, 
  type InsertUser,
  type Thread,
  type InsertThread,
  type Post,
  type InsertPost,
  type Category,
  type InsertCategory,
  type EmailVerificationToken,
  type InsertEmailVerificationToken,
  type ConsentLog,
  type InsertConsentLog,
  users,
  threads,
  posts,
  categories,
  emailVerificationTokens,
  consentLogs
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql, and, gt } from "drizzle-orm";

// Storage interface with all CRUD operations
export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, data: Partial<InsertUser>): Promise<User | undefined>;
  verifyUserEmail(id: string): Promise<User | undefined>;
  
  // Email verification token operations
  createVerificationToken(token: InsertEmailVerificationToken): Promise<EmailVerificationToken>;
  getVerificationToken(token: string): Promise<EmailVerificationToken | undefined>;
  deleteVerificationToken(token: string): Promise<void>;
  deleteExpiredTokens(): Promise<void>;
  
  // Category operations
  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Thread operations
  getThreads(categoryId?: string): Promise<Array<Thread & { author: User; category: Category | null; postCount: number }>>;
  getThread(id: string): Promise<(Thread & { author: User; category: Category | null }) | undefined>;
  createThread(thread: InsertThread): Promise<Thread>;
  updateThread(id: string, data: Partial<InsertThread>): Promise<Thread | undefined>;
  deleteThread(id: string): Promise<void>;
  incrementThreadViews(id: string): Promise<void>;
  pinThread(id: string, isPinned: boolean): Promise<Thread | undefined>;
  lockThread(id: string, isLocked: boolean): Promise<Thread | undefined>;
  
  // Post operations
  getPostsByThread(threadId: string): Promise<Array<Post & { author: User }>>;
  getPost(id: string): Promise<(Post & { author: User }) | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: string, content: string): Promise<Post | undefined>;
  deletePost(id: string): Promise<void>;
  
  // Consent logging operations (DSGVO compliance)
  logConsent(consent: InsertConsentLog): Promise<ConsentLog>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: string, data: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async verifyUserEmail(id: string): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ emailVerified: true })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  // Email verification token operations
  async createVerificationToken(insertToken: InsertEmailVerificationToken): Promise<EmailVerificationToken> {
    const [token] = await db.insert(emailVerificationTokens).values(insertToken).returning();
    return token;
  }

  async getVerificationToken(token: string): Promise<EmailVerificationToken | undefined> {
    const [result] = await db
      .select()
      .from(emailVerificationTokens)
      .where(and(
        eq(emailVerificationTokens.token, token),
        gt(emailVerificationTokens.expiresAt, new Date())
      ));
    return result || undefined;
  }

  async deleteVerificationToken(token: string): Promise<void> {
    await db.delete(emailVerificationTokens).where(eq(emailVerificationTokens.token, token));
  }

  async deleteExpiredTokens(): Promise<void> {
    await db.delete(emailVerificationTokens).where(
      sql`${emailVerificationTokens.expiresAt} < NOW()`
    );
  }

  // Category operations
  async getCategories(): Promise<Category[]> {
    return db.select().from(categories).orderBy(categories.sortOrder);
  }

  async getCategory(id: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category || undefined;
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category || undefined;
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [category] = await db.insert(categories).values(insertCategory).returning();
    return category;
  }

  // Thread operations
  async getThreads(categoryId?: string): Promise<Array<Thread & { author: User; category: Category | null; postCount: number }>> {
    let query = db
      .select({
        thread: threads,
        author: users,
        category: categories,
        postCount: sql<number>`cast(count(${posts.id}) as int)`,
      })
      .from(threads)
      .leftJoin(users, eq(threads.authorId, users.id))
      .leftJoin(categories, eq(threads.categoryId, categories.id))
      .leftJoin(posts, eq(threads.id, posts.threadId))
      .groupBy(threads.id, users.id, categories.id)
      .orderBy(desc(threads.isPinned), desc(threads.updatedAt));

    const result = categoryId 
      ? await db
          .select({
            thread: threads,
            author: users,
            category: categories,
            postCount: sql<number>`cast(count(${posts.id}) as int)`,
          })
          .from(threads)
          .leftJoin(users, eq(threads.authorId, users.id))
          .leftJoin(categories, eq(threads.categoryId, categories.id))
          .leftJoin(posts, eq(threads.id, posts.threadId))
          .where(eq(threads.categoryId, categoryId))
          .groupBy(threads.id, users.id, categories.id)
          .orderBy(desc(threads.isPinned), desc(threads.updatedAt))
      : await query;

    return result.map(r => ({
      ...r.thread,
      author: r.author!,
      category: r.category,
      postCount: r.postCount,
    }));
  }

  async getThread(id: string): Promise<(Thread & { author: User; category: Category | null }) | undefined> {
    const [result] = await db
      .select({
        thread: threads,
        author: users,
        category: categories,
      })
      .from(threads)
      .leftJoin(users, eq(threads.authorId, users.id))
      .leftJoin(categories, eq(threads.categoryId, categories.id))
      .where(eq(threads.id, id));

    if (!result) return undefined;

    return {
      ...result.thread,
      author: result.author!,
      category: result.category,
    };
  }

  async createThread(insertThread: InsertThread): Promise<Thread> {
    const [thread] = await db.insert(threads).values(insertThread).returning();
    return thread;
  }

  async updateThread(id: string, data: Partial<InsertThread>): Promise<Thread | undefined> {
    const [thread] = await db
      .update(threads)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(threads.id, id))
      .returning();
    return thread || undefined;
  }

  async deleteThread(id: string): Promise<void> {
    await db.delete(threads).where(eq(threads.id, id));
  }

  async incrementThreadViews(id: string): Promise<void> {
    await db
      .update(threads)
      .set({ views: sql`${threads.views} + 1` })
      .where(eq(threads.id, id));
  }

  async pinThread(id: string, isPinned: boolean): Promise<Thread | undefined> {
    const [thread] = await db
      .update(threads)
      .set({ isPinned })
      .where(eq(threads.id, id))
      .returning();
    return thread || undefined;
  }

  async lockThread(id: string, isLocked: boolean): Promise<Thread | undefined> {
    const [thread] = await db
      .update(threads)
      .set({ isLocked })
      .where(eq(threads.id, id))
      .returning();
    return thread || undefined;
  }

  // Post operations
  async getPostsByThread(threadId: string): Promise<Array<Post & { author: User }>> {
    const result = await db
      .select({
        post: posts,
        author: users,
      })
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .where(eq(posts.threadId, threadId))
      .orderBy(posts.createdAt);

    return result.map(r => ({
      ...r.post,
      author: r.author!,
    }));
  }

  async getPost(id: string): Promise<(Post & { author: User }) | undefined> {
    const [result] = await db
      .select({
        post: posts,
        author: users,
      })
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .where(eq(posts.id, id));

    if (!result) return undefined;

    return {
      ...result.post,
      author: result.author!,
    };
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const [post] = await db.insert(posts).values(insertPost).returning();
    
    // Update thread's updatedAt timestamp
    await db
      .update(threads)
      .set({ updatedAt: new Date() })
      .where(eq(threads.id, insertPost.threadId));
    
    return post;
  }

  async updatePost(id: string, content: string): Promise<Post | undefined> {
    const [post] = await db
      .update(posts)
      .set({ content, isEdited: true, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();
    return post || undefined;
  }

  async deletePost(id: string): Promise<void> {
    await db.delete(posts).where(eq(posts.id, id));
  }

  // Consent logging operations (DSGVO compliance - 3 year retention)
  async logConsent(insertConsent: InsertConsentLog): Promise<ConsentLog> {
    const [consent] = await db.insert(consentLogs).values(insertConsent).returning();
    return consent;
  }
}

export const storage = new DatabaseStorage();
