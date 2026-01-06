# N8N Chatbot Integration - Detaillierte Anleitung

Diese Anleitung erklärt, wie du deinen eigenen KI-Chatbot über N8N mit der Kaiser-Service Website verbindest.

## Übersicht

Die Website hat einen vorkonfigurierten Chat-Endpunkt:
- **URL**: `POST /api/n8n/chat`
- **Eingabe**: `{ "message": "Benutzer-Nachricht", "sessionId": "eindeutige-session-id" }`
- **Ausgabe**: `{ "reply": "Antwort vom Bot" }`

## Schritt 1: N8N Workflow erstellen

### 1.1 Webhook Node hinzufügen

1. Öffne N8N und erstelle einen neuen Workflow
2. Füge einen **Webhook** Node hinzu
3. Konfiguriere den Webhook:
   - **HTTP Method**: POST
   - **Path**: `/chat` (oder einen anderen Pfad deiner Wahl)
   - **Response Mode**: "Last Node"

4. Kopiere die **Webhook URL** (z.B. `https://dein-n8n.example.com/webhook/abc123`)

### 1.2 OpenAI / LLM Node hinzufügen

1. Füge einen **OpenAI** Node hinzu (oder einen anderen LLM-Anbieter)
2. Konfiguriere die Verbindung:
   - **Resource**: Message
   - **Model**: gpt-4 oder gpt-3.5-turbo

3. Setze den **System Prompt** (Beispiel):
```
Du bist der KI-Assistent von Kaiser-Service, einem Unternehmen für KI Voice Agents, N8N Automation, KI-Beratung und Mitarbeiterschulungen.

Deine Aufgabe:
- Beantworte Fragen zu unseren Dienstleistungen
- Erkläre die Vorteile von KI-Automatisierung
- Leite bei komplexen Anfragen an das Team weiter (Service-Kaiser@proton.me)

Antworte immer freundlich, professionell und auf Deutsch.
```

4. **User Message**: `{{ $json.body.message }}`

### 1.3 Response Node

Der Output des OpenAI-Nodes sollte automatisch an den Webhook zurückgesendet werden.

Falls nötig, füge einen **Set** Node hinzu, um die Antwort zu formatieren:
```json
{
  "reply": "{{ $json.choices[0].message.content }}"
}
```

## Schritt 2: Umgebungsvariable setzen

1. Gehe zu deinen Replit-Secrets (oder Umgebungsvariablen)
2. Füge hinzu:
   - **Key**: `N8N_CHAT_WEBHOOK_URL`
   - **Value**: Deine N8N Webhook URL (z.B. `https://dein-n8n.example.com/webhook/abc123`)

3. Starte die Anwendung neu

## Schritt 3: Testen

1. Öffne die Website
2. Klicke auf das Chat-Symbol unten rechts
3. Sende eine Nachricht
4. Die Nachricht wird an N8N gesendet, dort verarbeitet und die Antwort erscheint im Chat

## Workflow-Diagramm

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Website   │────▶│   Webhook   │────▶│   OpenAI    │
│ Chat-Widget │     │    Node     │     │    Node     │
└─────────────┘     └─────────────┘     └─────────────┘
       ▲                                       │
       │                                       │
       └───────────────────────────────────────┘
                     Response
```

## Erweiterte Optionen

### Session-basierter Kontext

Die Website sendet eine `sessionId` mit jeder Nachricht. Du kannst diese nutzen, um:
1. Gesprächskontext zu speichern (z.B. in einer Datenbank)
2. Personalisierte Antworten zu generieren

**Beispiel N8N-Flow mit Memory:**

```
Webhook → Function (Session laden) → OpenAI (mit Kontext) → Function (Session speichern) → Response
```

### Fallback-Nachrichten

Wenn die N8N-Webhook-URL nicht konfiguriert ist, antwortet das System mit einer Standard-Nachricht:
> "Hallo! Ich bin der Kaiser-Service KI-Assistent. Wie kann ich Ihnen helfen?"

### Error Handling

Der Server versucht, verschiedene Response-Formate zu unterstützen:
- `data.reply`
- `data.message`
- `data.response`
- `data.text`

Falls keines gefunden wird, wird ein Fallback verwendet.

## News-Feed Integration

Ähnlich funktioniert die News-Integration:

- **URL**: `GET /api/n8n/news`
- **Umgebungsvariable**: `N8N_NEWS_WEBHOOK_URL`

**Erwartete Response:**
```json
{
  "news": [
    {
      "id": "1",
      "title": "Artikel Titel",
      "excerpt": "Kurze Beschreibung...",
      "date": "2024-01-15",
      "category": "AI News",
      "imageUrl": "https://example.com/image.jpg"
    }
  ]
}
```

Oder als Array:
```json
[
  { "title": "...", "excerpt": "...", "date": "...", "category": "..." }
]
```

## Voice Demo Integration

Für Voice Agent Demos:

- **URL**: `POST /api/n8n/voice-demo`
- **Umgebungsvariable**: `N8N_VOICE_WEBHOOK_URL`
- **Eingabe**: `{ "phoneNumber": "+49...", "scenario": "support" }`

---

## Benötigte Umgebungsvariablen (Zusammenfassung)

| Variable | Beschreibung | Erforderlich |
|----------|--------------|--------------|
| `DATABASE_URL` | PostgreSQL Verbindung | Ja (auto in Replit) |
| `SESSION_SECRET` | Session-Verschlüsselung | Ja (Produktion) |
| `N8N_CHAT_WEBHOOK_URL` | N8N Chat-Webhook | Optional |
| `N8N_NEWS_WEBHOOK_URL` | N8N News-Webhook | Optional |
| `N8N_VOICE_WEBHOOK_URL` | N8N Voice-Webhook | Optional |

## Support

Bei Fragen zur Integration: **Service-Kaiser@proton.me**
