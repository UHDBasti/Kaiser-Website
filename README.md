# Kaiser-Service Website

> **Professional AI Voice Agents, N8N Automation & Consulting Platform**

Eine moderne Full-Stack-Webanwendung für AI Voice Agents, N8N-Workflow-Automatisierung, KI-Beratung und Mitarbeiterschulung mit integriertem Community-Forum.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue)
![React](https://img.shields.io/badge/React-19.2.0-61dafb)
![Node.js](https://img.shields.io/badge/Node.js-20+-green)

## 📋 Inhaltsverzeichnis

- [Übersicht](#-übersicht)
- [Features](#-features)
- [Technologie-Stack](#-technologie-stack)
- [Systemanforderungen](#-systemanforderungen)
- [Installation](#-installation)
- [Konfiguration](#-konfiguration)
- [Entwicklung](#-entwicklung)
- [Deployment](#-deployment)
- [Projektstruktur](#-projektstruktur)
- [API-Dokumentation](#-api-dokumentation)
- [Sicherheit](#-sicherheit)
- [Rechtliche Compliance](#-rechtliche-compliance)
- [Lizenz](#-lizenz)

## 🎯 Übersicht

Kaiser-Service ist eine produktionsreife Full-Stack-Webanwendung, die spezialisiert ist auf:

- **AI Voice Agents**: Integration mit ElevenLabs für intelligente Sprachassistenten
- **N8N Automation**: Workflow-Automatisierung und Prozessoptimierung
- **Community Forum**: Mehrsprachiges Forum mit 5 Kategorien
- **KI-Beratung**: Strategische KI-Implementierung und Consulting
- **Mitarbeiterschulung**: Schulungsprogramme für KI und Automatisierung

### Highlights

- 🌍 **Zweisprachig**: Vollständige Unterstützung für Deutsch und Englisch
- 🎨 **Modernes Design**: Dark Theme inspiriert von N8N (#222222 base, #FF6D5A accent)
- 🔐 **Sicher**: Vollständige Authentifizierung mit Email-Verifizierung
- ⚖️ **DSGVO-konform**: Rechtssichere Datenschutzerklärung und Cookie-Consent
- 🚀 **Performance**: React 19, Vite 7, TailwindCSS 4
- 📱 **Responsive**: Mobile-first Design mit Radix UI-Komponenten

## ✨ Features

### Authentifizierung & Benutzerverwaltung
- Registrierung mit Email-Verifizierung
- Passwort-Hashing mit bcryptjs (10 Salz-Runden)
- Session-basierte Authentifizierung (Passport.js)
- Benutzerprofil-Verwaltung (Avatar, Bio, Display Name)
- Sicheres Session-Management mit HTTP-only Cookies

### Community-Forum
- 5 vordefinierte Kategorien (Allgemein, N8N, KI & Voice Agents, Support, Showcase)
- Thread-Erstellung mit Kategoriezuordnung
- Post-Antworten mit Edit-Funktionalität
- Pinned & Locked Threads
- View-Counter für Threads
- Benutzerprofile mit Aktivitätshistorie
- Email-Verifizierung erforderlich zum Posten

### N8N-Integrationen
- **AI Chatbot**: Chat-Widget mit N8N-Backend
- **News-Feed**: Dynamische News über N8N-Webhook
- **Email-Verifizierung**: Automatisierte Emails via N8N
- **Kontaktformular**: Anfragen direkt an N8N-Workflow
- **Voice Demo Booking**: Terminbuchung für Voice-Agent-Demos

### Voice Agents
- ElevenLabs Voice Agent Widget
- WebSocket-basierte Kommunikation
- Sichere Signed-URL-Authentifizierung
- Interaktive Sprachdemos

### Rechtliche Features
- DSGVO-konforme Datenschutzerklärung
- § 5 DDG-konformes Impressum
- AGB für AI-Dienstleistungen
- Cookie-Consent-Banner mit 4 Kategorien
- 3-Jahres-Speicherung von Consent-Logs (§ 25 TDDDG)

## 🛠 Technologie-Stack

### Frontend
```
React 19.2.0              - UI Library
TypeScript 5.6.3          - Type Safety
Vite 7.1.9                - Build Tool & Dev Server
TailwindCSS 4.1.14        - Utility-first CSS
Radix UI                  - Accessible UI Components
shadcn/ui                 - Component Library
TanStack Query 5.60.5     - Server State Management
Wouter 3.3.5              - Routing
Framer Motion 12.23.24    - Animations
React Hook Form 7.66.0    - Form Handling
Zod 3.25.76               - Schema Validation
Sonner 2.0.7              - Toast Notifications
Lucide React 0.545.0      - Icons
Recharts 2.15.4           - Charts
ElevenLabs React 0.12.1   - Voice Agent Widget
```

### Backend
```
Express 4.21.2            - Web Framework
TypeScript 5.6.3          - Type Safety
Drizzle ORM 0.39.1        - Database ORM
PostgreSQL                - Database (Neon Serverless)
Passport.js 0.7.0         - Authentication
bcryptjs 3.0.3            - Password Hashing
express-session 1.18.1    - Session Management
Zod 3.25.76               - Server-side Validation
WebSockets 8.18.0         - Real-time Communication
```

### Entwicklungstools
```
TSX 4.20.5                - TypeScript Execution
Drizzle Kit 0.31.4        - Database Migrations
ESBuild 0.25.0            - Fast Bundler
PostCSS 8.5.6             - CSS Processing
```

## 💻 Systemanforderungen

- **Node.js**: >= 20.0.0
- **npm**: >= 10.0.0
- **PostgreSQL**: >= 14.0 (oder Neon Serverless)
- **Betriebssystem**: Linux, macOS, Windows (WSL empfohlen)
- **RAM**: Mindestens 2 GB (4 GB empfohlen)
- **Speicher**: Mindestens 500 MB freier Speicherplatz

## 📦 Installation

### 1. Repository klonen

```bash
git clone https://github.com/UHDBasti/Kaiser-Website.git
cd Kaiser-Website
```

### 2. Dependencies installieren

```bash
npm install
```

### 3. Umgebungsvariablen konfigurieren

Erstellen Sie eine `.env`-Datei im Projekt-Root:

```bash
# Datenbank (erforderlich)
DATABASE_URL="postgresql://user:password@localhost:5432/kaiser_db"

# Session Secret (erforderlich - verwenden Sie einen sicheren zufälligen String!)
SESSION_SECRET="ihr-sicheres-32-zeichen-langes-geheimnis"

# N8N Webhook-URLs (optional)
N8N_CHAT_WEBHOOK_URL="https://your-n8n-instance.com/webhook/chat"
N8N_NEWS_WEBHOOK_URL="https://your-n8n-instance.com/webhook/news"
N8N_EMAIL_WEBHOOK_URL="https://your-n8n-instance.com/webhook/email"
N8N_CONTACT_WEBHOOK_URL="https://your-n8n-instance.com/webhook/contact"
N8N_VOICE_WEBHOOK_URL="https://your-n8n-instance.com/webhook/voice"

# ElevenLabs API (optional - für Voice Agents)
ELEVENLABS_API_KEY="your-elevenlabs-api-key"

# Admin-Benutzer (optional - für Initialisierung)
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="mindestens-8-zeichen"
ADMIN_EMAIL="admin@kaiser-service.de"

# Node Environment
NODE_ENV="development"
PORT="5000"
```

### 4. Datenbank initialisieren

#### Option A: Lokale PostgreSQL-Datenbank

```bash
# PostgreSQL-Datenbank erstellen
createdb kaiser_db

# Drizzle-Migrationen ausführen
npm run db:push
```

#### Option B: Neon Serverless (empfohlen)

1. Erstellen Sie ein kostenloses Konto auf [Neon](https://neon.tech)
2. Erstellen Sie eine neue Datenbank
3. Kopieren Sie die Connection-String in `DATABASE_URL`
4. Führen Sie die Migrationen aus:

```bash
npm run db:push
```

### 5. Forum-Kategorien initialisieren

Starten Sie die Anwendung und rufen Sie den Init-Endpoint auf:

```bash
npm run dev

# In einem anderen Terminal:
curl -X POST http://localhost:5000/api/forum/categories/init
```

### 6. Anwendung starten

#### Development Mode

```bash
# Terminal 1: Backend-Server starten
npm run dev

# Terminal 2 (optional): Frontend separat starten
npm run dev:client
```

Die Anwendung ist nun verfügbar unter: `http://localhost:5000`

#### Production Mode

```bash
# Build erstellen
npm run build

# Production-Server starten
npm run start
```

## ⚙️ Konfiguration

### Session Secret generieren

**WICHTIG**: Verwenden Sie niemals den Standard-Session-Secret in Produktion!

```bash
# Sicheren Random-String generieren (Linux/macOS)
openssl rand -base64 32

# Oder mit Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Tragen Sie den generierten String in `.env` als `SESSION_SECRET` ein.

### N8N-Webhooks konfigurieren

Detaillierte Anleitung zur N8N-Integration finden Sie in:
- `docs/N8N_INTEGRATION.md` - Umfassende N8N-Webhook-Konfiguration

### ElevenLabs Voice Agents

1. Erstellen Sie ein Konto auf [ElevenLabs](https://elevenlabs.io)
2. Erstellen Sie einen Voice Agent
3. Kopieren Sie die Agent-ID in `server/routes.ts:692`
4. Fügen Sie Ihren API-Key in `.env` ein

## 🚀 Entwicklung

### Verfügbare Scripts

```bash
npm run dev          # Backend-Server mit Hot-Reload starten
npm run dev:client   # Frontend Vite-Dev-Server starten
npm run build        # Production-Build erstellen
npm run start        # Production-Server starten
npm run check        # TypeScript Type-Checking
npm run db:push      # Drizzle-Datenbank-Migrationen
```

### TypeScript Type-Checking

```bash
npm run check
```

### Code-Struktur-Konventionen

- **Frontend-Komponenten**: PascalCase (z.B. `Navbar.tsx`)
- **Utility-Funktionen**: camelCase (z.B. `utils.ts`)
- **API-Routes**: kebab-case (z.B. `/api/auth/verify-email`)
- **Datenbankfelder**: snake_case (z.B. `email_verified`)

## 📁 Projektstruktur

```
Kaiser-Website/
├── client/                     # React Frontend
│   ├── public/                 # Statische Assets
│   ├── src/
│   │   ├── components/         # React-Komponenten
│   │   │   ├── layout/         # Navbar, Footer, ScrollToTop
│   │   │   ├── animations/     # Framer Motion Animationen
│   │   │   └── ui/             # 50+ Radix UI Komponenten
│   │   ├── pages/              # 15 Seiten-Komponenten
│   │   ├── lib/                # Utils & Providers
│   │   ├── hooks/              # React Hooks
│   │   └── types/              # TypeScript Definitionen
│   └── index.html              # HTML Entry Point
├── server/                     # Express Backend
│   ├── index.ts                # Server Entry Point
│   ├── routes.ts               # API-Endpunkte (847 Zeilen)
│   ├── auth.ts                 # Passport.js Konfiguration
│   ├── storage.ts              # Database Interface
│   ├── db.ts                   # Drizzle ORM Setup
│   ├── static.ts               # Static File Serving
│   └── vite.ts                 # Vite Dev Server Integration
├── shared/                     # Shared Types & Schema
│   └── schema.ts               # Drizzle ORM Schema
├── docs/                       # Dokumentation
│   ├── N8N_INTEGRATION.md      # N8N-Setup-Anleitung
│   └── SECURITY_AUDIT.md       # Sicherheitsaudit (neu)
├── script/                     # Build Scripts
├── migrations/                 # Drizzle-Migrationen
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript-Konfiguration
├── vite.config.ts              # Vite-Konfiguration
├── drizzle.config.ts           # Drizzle-Konfiguration
└── README.md                   # Diese Datei
```

## 📚 API-Dokumentation

### Authentifizierung

```http
POST   /api/auth/register              # Benutzer registrieren
POST   /api/auth/login                 # Login
POST   /api/auth/logout                # Logout
GET    /api/auth/user                  # Aktuellen Benutzer abrufen
GET    /api/auth/verify-email          # Email verifizieren
POST   /api/auth/resend-verification   # Verifizierungs-Email erneut senden
PATCH  /api/auth/profile               # Profil aktualisieren
```

### Forum

```http
GET    /api/forum/categories           # Alle Kategorien
GET    /api/forum/threads              # Alle Threads (optional: ?categoryId=xxx)
GET    /api/forum/threads/:id          # Thread mit Posts
POST   /api/forum/threads              # Thread erstellen (Auth + Verified)
PATCH  /api/forum/threads/:id          # Thread aktualisieren (Owner)
DELETE /api/forum/threads/:id          # Thread löschen (Owner)
POST   /api/forum/posts                # Post erstellen (Auth + Verified)
PATCH  /api/forum/posts/:id            # Post aktualisieren (Owner)
DELETE /api/forum/posts/:id            # Post löschen (Owner)
```

### N8N-Integrationen

```http
GET    /api/n8n/news                   # News-Feed abrufen
POST   /api/n8n/chat                   # Chat-Nachricht senden
POST   /api/n8n/voice-demo             # Voice-Demo buchen
```

### Sonstige

```http
POST   /api/contact                    # Kontaktformular
POST   /api/consent-log                # Cookie-Consent loggen
GET    /api/users/:id                  # Öffentliches Benutzerprofil
GET    /api/voice-agent/signed-url     # ElevenLabs Signed URL
```

Detaillierte API-Dokumentation mit Request/Response-Schemas finden Sie in `docs/API.md`.

## 🔐 Sicherheit

### Implementierte Sicherheitsmaßnahmen

✅ **Passwort-Sicherheit**
- bcryptjs-Hashing mit 10 Salz-Runden
- Mindestlänge: 8 Zeichen (Admin-Passwort)
- Niemals Klartext-Passwörter in Logs oder Responses

✅ **Session-Sicherheit**
- HTTP-only Cookies
- Secure-Flag in Production
- 7-Tage Session-Dauer
- CSRF-Token (empfohlen, siehe Audit)

✅ **SQL-Injection-Schutz**
- Drizzle ORM mit Prepared Statements
- Kein direktes SQL

✅ **Input-Validierung**
- Zod-Schema-Validierung auf allen Endpoints
- Type-safe Validierung mit TypeScript

✅ **Authentication & Authorization**
- Passport.js Local Strategy
- Email-Verifizierung erforderlich für Forum-Posts
- Owner-basierte Autorisierung für Updates/Deletes

### Bekannte Sicherheitsrisiken & Empfehlungen

Ein vollständiges Sicherheitsaudit finden Sie in:
📄 **`docs/SECURITY_AUDIT.md`**

**Wichtigste Maßnahmen vor Production-Deployment:**

1. ⚠️ **SESSION_SECRET setzen** - Niemals Standard-Wert verwenden!
2. ⚠️ **CSRF-Protection implementieren** - z.B. `csurf` Package
3. ⚠️ **Rate Limiting aktivieren** - z.B. `express-rate-limit`
4. ⚠️ **Content Security Policy** - Helmet.js hinzufügen
5. ⚠️ **Input Sanitization** - XSS-Schutz für Forum-Posts (DOMPurify)
6. ⚠️ **Admin-Endpoint schützen** - `/api/forum/categories/init` absichern

### Reporting Security Issues

Sicherheitslücken bitte **nicht** öffentlich melden. Kontaktieren Sie uns direkt:
- Email: Service-Kaiser@proton.me
- PGP-Key: (optional, auf Anfrage)

## ⚖️ Rechtliche Compliance

### DSGVO (Datenschutz-Grundverordnung)

- ✅ Vollständige Datenschutzerklärung unter `/datenschutz`
- ✅ Cookie-Consent-Banner mit 4 Kategorien (Notwendig, Funktional, Analytisch, Marketing)
- ✅ 3-Jahres-Speicherung von Consent-Logs (§ 25 TDDDG)
- ✅ Recht auf Datenlöschung (manuell via Admin)
- ✅ Transparente Datenverarbeitung

### DDG (Deutsches Datenschutzgesetz)

- ✅ § 5 DDG-konformes Impressum unter `/impressum`
- ✅ Schnelle elektronische Kontaktmöglichkeit (Kontaktformular)
- ✅ Vollständige Anbieterkennzeichnung

### AGB (Allgemeine Geschäftsbedingungen)

- ✅ Spezifische AGB für AI-Dienstleistungen unter `/agb`
- ✅ Haftungsausschlüsse für AI-generierte Inhalte
- ✅ Nutzungsbedingungen für Forum

## 🤝 Beitragen

Contributions sind willkommen! Bitte beachten Sie:

1. Forken Sie das Repository
2. Erstellen Sie einen Feature-Branch (`git checkout -b feature/AmazingFeature`)
3. Committen Sie Ihre Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Pushen Sie den Branch (`git push origin feature/AmazingFeature`)
5. Öffnen Sie einen Pull Request

## 📧 Support & Kontakt

- **Email**: Service-Kaiser@proton.me
- **Website**: [Kaiser-Service.de](https://kaiser-service.de)
- **Forum**: `/forum` (nach Registrierung)

## 📜 Lizenz

Dieses Projekt ist lizenziert unter der MIT-Lizenz.

```
MIT License

Copyright (c) 2026 Kaiser-Service

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

**Entwickelt mit ❤️ von Kaiser-Service | Powered by React, Express & PostgreSQL**
