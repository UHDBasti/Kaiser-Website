# Kaiser-Service - AI Business Website

## Overview
A professional full-stack business website for "Kaiser-Service," specializing in AI Voice Agents, N8N workflow automation, AI consulting, and employee training. The website features a modern, dark N8N-inspired aesthetic with bilingual support (German/English).

## Current State
The application is fully functional with:
- PostgreSQL database with Drizzle ORM
- Secure authentication (Passport.js + bcrypt)
- Full-featured Community Forum with categories, threads, posts, email verification
- N8N webhook integrations for dynamic content and email
- Modern React frontend with TanStack Query

## Project Architecture

### Frontend (client/src/)
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter
- **State Management**: TanStack Query
- **Styling**: TailwindCSS with custom theme
- **Components**: Radix UI + Framer Motion
- **Pages**: Home, Services, Voice Agents, Staff Training, Forum (with categories), News, Contact, Legal pages

### Backend (server/)
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL via Drizzle ORM
- **Authentication**: Passport.js with local strategy (bcrypt hashing)
- **Session**: express-session with HTTP-only cookies
- **Email Verification**: Token-based with N8N webhook integration

### Database Schema (shared/schema.ts)
- **users**: id, username, email, password, displayName, bio, avatarUrl, emailVerified
- **emailVerificationTokens**: id, userId, token, expiresAt
- **categories**: id, name, nameEn, slug, description, descriptionEn, icon, color, sortOrder
- **threads**: id, title, authorId, categoryId, isPinned, isLocked, views, timestamps
- **posts**: id, threadId, authorId, content, isEdited, timestamps
- **consentLogs**: id, consentId, necessary, functional, analytics, marketing, consentVersion

### Forum System
The forum includes:
- **Categories**: N8N & Automatisierung, KI & Voice Agents, Hilfe & Support, Showcase, Allgemein
- **Thread Features**: Create, edit, delete, pin, lock, categorize
- **Post Features**: Create, edit, delete, emoji support
- **User Features**: Registration with email verification, profile with bio/avatar

### N8N Integration
Webhook proxy endpoints:
- `GET /api/n8n/news` - Fetches news feed (N8N_NEWS_WEBHOOK_URL)
- `POST /api/n8n/chat` - Chatbot integration (N8N_CHAT_WEBHOOK_URL)
- `POST /api/n8n/voice-demo` - Voice agent demo (N8N_VOICE_WEBHOOK_URL)
- Email verification webhook (N8N_EMAIL_WEBHOOK_URL) - Sends verification emails
- Contact form webhook (N8N_CONTACT_WEBHOOK_URL) - Forwards contact inquiries

All endpoints return mock/fallback data when webhook URLs are not configured.

## Key Files
- `server/routes.ts` - All API routes (auth, forum, categories, n8n, contact)
- `server/auth.ts` - Passport configuration
- `server/storage.ts` - Database interface with full CRUD operations
- `shared/schema.ts` - Drizzle schema definitions
- `client/src/lib/auth.tsx` - Frontend auth context
- `client/src/lib/i18n.tsx` - Internationalization (DE/EN)
- `client/src/pages/Forum.tsx` - Main forum with categories and threads
- `client/src/pages/ThreadDetail.tsx` - Thread view with posts and replies
- `client/src/pages/CategoryThreads.tsx` - Category-specific thread listing
- `client/src/pages/VerifyEmail.tsx` - Email verification page

## Environment Variables Required for Production
- `DATABASE_URL` - PostgreSQL connection string (auto-configured in Replit)
- `SESSION_SECRET` - Session encryption key (MUST be changed in production)
- `N8N_NEWS_WEBHOOK_URL` - (optional) N8N webhook for news feed
- `N8N_CHAT_WEBHOOK_URL` - (optional) N8N webhook for chatbot
- `N8N_VOICE_WEBHOOK_URL` - (optional) N8N webhook for voice demo
- `N8N_EMAIL_WEBHOOK_URL` - (optional) N8N webhook for email verification
- `N8N_CONTACT_WEBHOOK_URL` - (optional) N8N webhook for contact form

## Design Choices
- **Color Scheme**: Dark theme with #222222 base, matching N8N aesthetic
- **Primary Color**: #FF6D5A (N8N orange-red)
- **Typography**: 80-90% text opacity for readability
- **Contact Info**: Service-Kaiser@proton.me, Lübeck 23568

## Commands
- `npm run dev` - Start development server
- `npm run db:push` - Push database schema changes
- `npm run build` - Build for production

## Legal Compliance
All legal pages are DSGVO/TDDDG/DDG compliant (December 2025):
- **Impressum**: § 5 DDG compliant with Sebastian Kaiser, Lübeck 23568, EU-OS platform link
- **Datenschutzerklärung**: Full DSGVO compliance with cookie tables, third-country transfer warnings, consent logging
- **AGB**: Comprehensive terms for AI consulting services (§§ 305-310 BGB compliant)

## Recent Changes
- 2025-12-07: Complete Forum System rebuild with categories, email verification, CRUD operations
- 2025-12-07: Added 5 forum categories (Allgemein, N8N & Automatisierung, KI & Voice Agents, Hilfe & Support, Showcase)
- 2025-12-07: Implemented email verification with token-based system and N8N webhook support
- 2025-12-07: Enhanced thread system with pinning, locking, category assignment
- 2025-12-07: Added post editing/deletion with edit indicator
- 2025-12-07: Implemented emoji picker for posts
- 2025-12-07: Created CategoryThreads page for category-specific browsing
- 2025-12-07: Added thread/post search functionality
- 2025-12-07: Working contact form with § 5 DDG compliance (rapid electronic contact)
- 2025-12-07: Complete overhaul of legal pages (Impressum, Datenschutz, AGB)
- 2025-12-07: Added DSGVO-compliant Cookie Banner with consent logging
- 2025-12-07: Added About page with mission statement, founder profile
- 2025-12-06: Completed full-stack conversion with PostgreSQL, authentication
- 2025-12-06: Integrated Eleven Labs Voice Agent Widget (agent_2301kbv0mxnqfr3vhzzw6n2p0abh)
