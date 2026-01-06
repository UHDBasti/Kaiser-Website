import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Settings, Shield, BarChart3, Megaphone, X, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Button } from "./button";
import { Switch } from "./switch";
import { useLanguage } from "@/lib/i18n";
import { useCookieConsent, defaultConsent, CookieConsent } from "@/lib/cookieConsent";

interface CookieDetail {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
  privacyUrl?: string;
  thirdCountry?: string;
}

export function CookieBanner() {
  const { 
    consent, 
    isLoaded, 
    showBanner, 
    showSettings, 
    saveConsent, 
    setShowSettings,
    closeBanner 
  } = useCookieConsent();
  
  const [tempConsent, setTempConsent] = useState<CookieConsent>(defaultConsent);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    if (showSettings && consent) {
      setTempConsent(consent);
    } else if (showSettings) {
      setTempConsent(defaultConsent);
    }
  }, [showSettings, consent]);

  const t = {
    de: {
      bannerTitle: "Wir respektieren Ihre Privatsphäre",
      bannerDescription: "Diese Website verwendet Cookies und ähnliche Technologien. Einige davon sind technisch notwendig, um die Funktionen unserer Website bereitzustellen. Andere helfen uns, die Website zu verbessern.",
      bannerDataNote: "Personenbezogene Daten (z.B. IP-Adressen) können verarbeitet werden.",
      bannerRevokeNote: "Sie können Ihre Einwilligung jederzeit unter 'Cookie-Einstellungen' im Footer widerrufen.",
      acceptAll: "Alle akzeptieren",
      rejectAll: "Alle ablehnen",
      settings: "Einstellungen",
      save: "Auswahl speichern",
      settingsTitle: "Cookie-Einstellungen",
      necessary: "Technisch notwendig",
      necessaryDesc: "Diese Cookies sind für den Betrieb der Website technisch erforderlich und können nicht deaktiviert werden. Sie ermöglichen grundlegende Funktionen wie Seitennavigation, Zugriff auf sichere Bereiche und die Speicherung Ihrer Cookie-Präferenzen.",
      necessaryLegal: "Rechtsgrundlage: Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO), § 25 Abs. 2 TDDDG (technisch erforderlich)",
      functional: "Funktional",
      functionalDesc: "Diese Cookies verbessern die Funktionalität und das Nutzererlebnis, sind jedoch nicht zwingend erforderlich. Sie ermöglichen erweiterte Funktionen wie die Speicherung von Spracheinstellungen, Chat-Funktionen oder die Einbindung interaktiver Elemente.",
      functionalLegal: "Rechtsgrundlage: Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG)",
      analytics: "Analyse & Statistik",
      analyticsDesc: "Mit diesen Cookies können wir Besucherzahlen und Nutzungsverhalten analysieren, um die Leistung unserer Website zu messen und zu verbessern. Dabei werden pseudonymisierte Daten erfasst.",
      analyticsLegal: "Rechtsgrundlage: Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG)",
      marketing: "Marketing & Werbung",
      marketingDesc: "Diese Cookies werden verwendet, um Ihnen personalisierte Werbung anzuzeigen. Sie können Ihr Verhalten auf verschiedenen Websites tracken und ermöglichen gezielte Werbemaßnahmen.",
      marketingLegal: "Rechtsgrundlage: Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG)",
      marketingThirdCountry: "Hinweis: Daten können an Drittländer (z.B. USA) auf Basis von Standardvertragsklauseln übermittelt werden.",
      moreInfo: "Weitere Informationen:",
      privacyPolicy: "Datenschutzerklärung",
      imprint: "Impressum",
      cookieName: "Cookie-Name",
      provider: "Anbieter",
      purpose: "Zweck",
      duration: "Speicherdauer",
      showDetails: "Details anzeigen",
      hideDetails: "Details ausblenden",
      alwaysActive: "Immer aktiv",
      revokeHint: "Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie auf 'Cookie-Einstellungen' im Footer klicken.",
      dataProcessed: "Verarbeitete Daten",
      dataTypes: "IP-Adresse, Geräte-ID, Browserinformationen, besuchte Seiten, Verweildauer",
    },
    en: {
      bannerTitle: "We respect your privacy",
      bannerDescription: "This website uses cookies and similar technologies. Some are technically necessary to provide our website's functions. Others help us improve the website.",
      bannerDataNote: "Personal data (e.g., IP addresses) may be processed.",
      bannerRevokeNote: "You can revoke your consent at any time via 'Cookie Settings' in the footer.",
      acceptAll: "Accept All",
      rejectAll: "Reject All",
      settings: "Settings",
      save: "Save Selection",
      settingsTitle: "Cookie Settings",
      necessary: "Technically Necessary",
      necessaryDesc: "These cookies are technically required for the operation of the website and cannot be disabled. They enable basic functions such as page navigation, access to secure areas, and storing your cookie preferences.",
      necessaryLegal: "Legal basis: Legitimate interest (Art. 6(1)(f) GDPR), § 25(2) TDDDG (technically required)",
      functional: "Functional",
      functionalDesc: "These cookies improve functionality and user experience but are not strictly required. They enable extended functions such as language settings, chat features, or interactive elements.",
      functionalLegal: "Legal basis: Consent (Art. 6(1)(a) GDPR, § 25(1) TDDDG)",
      analytics: "Analytics & Statistics",
      analyticsDesc: "These cookies allow us to analyze visitor numbers and usage behavior to measure and improve our website's performance. Pseudonymized data is collected.",
      analyticsLegal: "Legal basis: Consent (Art. 6(1)(a) GDPR, § 25(1) TDDDG)",
      marketing: "Marketing & Advertising",
      marketingDesc: "These cookies are used to show you personalized advertising. They can track your behavior across different websites and enable targeted advertising.",
      marketingLegal: "Legal basis: Consent (Art. 6(1)(a) GDPR, § 25(1) TDDDG)",
      marketingThirdCountry: "Note: Data may be transferred to third countries (e.g., USA) based on Standard Contractual Clauses.",
      moreInfo: "More information:",
      privacyPolicy: "Privacy Policy",
      imprint: "Imprint",
      cookieName: "Cookie Name",
      provider: "Provider",
      purpose: "Purpose",
      duration: "Storage Duration",
      showDetails: "Show details",
      hideDetails: "Hide details",
      alwaysActive: "Always active",
      revokeHint: "You can revoke your consent at any time with effect for the future by clicking on 'Cookie Settings' in the footer.",
      dataProcessed: "Data processed",
      dataTypes: "IP address, device ID, browser information, pages visited, time spent",
    },
  };

  const texts = t[language] || t.de;

  const cookieDetails: Record<string, { de: CookieDetail[]; en: CookieDetail[] }> = {
    necessary: {
      de: [
        { name: "session_id", provider: "Kaiser-Service (Eigenbetrieb)", purpose: "Session-Management für eingeloggte Benutzer", duration: "Bis zum Logout / Session-Ende" },
        { name: "kaiser_cookie_consent", provider: "Kaiser-Service (Eigenbetrieb)", purpose: "Speicherung Ihrer Cookie-Einstellungen", duration: "12 Monate" },
        { name: "csrf_token", provider: "Kaiser-Service (Eigenbetrieb)", purpose: "Schutz vor Cross-Site-Request-Forgery-Angriffen", duration: "Session" },
        { name: "language", provider: "Kaiser-Service (Eigenbetrieb)", purpose: "Speicherung Ihrer Sprachpräferenz", duration: "12 Monate" },
      ],
      en: [
        { name: "session_id", provider: "Kaiser-Service (Self-hosted)", purpose: "Session management for logged-in users", duration: "Until logout / session end" },
        { name: "kaiser_cookie_consent", provider: "Kaiser-Service (Self-hosted)", purpose: "Storage of your cookie preferences", duration: "12 months" },
        { name: "csrf_token", provider: "Kaiser-Service (Self-hosted)", purpose: "Protection against Cross-Site Request Forgery attacks", duration: "Session" },
        { name: "language", provider: "Kaiser-Service (Self-hosted)", purpose: "Storage of your language preference", duration: "12 months" },
      ],
    },
    functional: {
      de: [
        { name: "voice_agent_session", provider: "Eleven Labs Inc. (USA)", purpose: "Voice Agent Interaktion und Sprachverarbeitung", duration: "Session", privacyUrl: "https://elevenlabs.io/privacy", thirdCountry: "USA (Standardvertragsklauseln)" },
        { name: "chat_history", provider: "Kaiser-Service (Eigenbetrieb)", purpose: "Speicherung des Chatverlaufs für bessere Unterstützung", duration: "7 Tage" },
      ],
      en: [
        { name: "voice_agent_session", provider: "Eleven Labs Inc. (USA)", purpose: "Voice Agent interaction and speech processing", duration: "Session", privacyUrl: "https://elevenlabs.io/privacy", thirdCountry: "USA (Standard Contractual Clauses)" },
        { name: "chat_history", provider: "Kaiser-Service (Self-hosted)", purpose: "Storage of chat history for better support", duration: "7 days" },
      ],
    },
    analytics: {
      de: [
        { name: "_ga, _ga_*", provider: "Google LLC (USA)", purpose: "Unterscheidung von Nutzern, Reichweitenmessung", duration: "2 Jahre", privacyUrl: "https://policies.google.com/privacy", thirdCountry: "USA (Standardvertragsklauseln)" },
        { name: "_gid", provider: "Google LLC (USA)", purpose: "Unterscheidung von Nutzern (24 Stunden)", duration: "24 Stunden", privacyUrl: "https://policies.google.com/privacy", thirdCountry: "USA (Standardvertragsklauseln)" },
      ],
      en: [
        { name: "_ga, _ga_*", provider: "Google LLC (USA)", purpose: "Distinguishing users, reach measurement", duration: "2 years", privacyUrl: "https://policies.google.com/privacy", thirdCountry: "USA (Standard Contractual Clauses)" },
        { name: "_gid", provider: "Google LLC (USA)", purpose: "Distinguishing users (24 hours)", duration: "24 hours", privacyUrl: "https://policies.google.com/privacy", thirdCountry: "USA (Standard Contractual Clauses)" },
      ],
    },
    marketing: {
      de: [
        { name: "_fbp", provider: "Meta Platforms Inc. (USA)", purpose: "Facebook Pixel - Conversion-Tracking, Zielgruppenerstellung", duration: "3 Monate", privacyUrl: "https://www.facebook.com/privacy/policy/", thirdCountry: "USA (Standardvertragsklauseln)" },
        { name: "_gcl_au", provider: "Google LLC (USA)", purpose: "Google Ads Conversion-Tracking", duration: "90 Tage", privacyUrl: "https://policies.google.com/privacy", thirdCountry: "USA (Standardvertragsklauseln)" },
        { name: "li_fat_id", provider: "LinkedIn Ireland (Irland/USA)", purpose: "LinkedIn Insight Tag - Conversion-Tracking", duration: "30 Tage", privacyUrl: "https://www.linkedin.com/legal/privacy-policy", thirdCountry: "USA (Standardvertragsklauseln)" },
      ],
      en: [
        { name: "_fbp", provider: "Meta Platforms Inc. (USA)", purpose: "Facebook Pixel - Conversion tracking, audience creation", duration: "3 months", privacyUrl: "https://www.facebook.com/privacy/policy/", thirdCountry: "USA (Standard Contractual Clauses)" },
        { name: "_gcl_au", provider: "Google LLC (USA)", purpose: "Google Ads Conversion tracking", duration: "90 days", privacyUrl: "https://policies.google.com/privacy", thirdCountry: "USA (Standard Contractual Clauses)" },
        { name: "li_fat_id", provider: "LinkedIn Ireland (Ireland/USA)", purpose: "LinkedIn Insight Tag - Conversion tracking", duration: "30 days", privacyUrl: "https://www.linkedin.com/legal/privacy-policy", thirdCountry: "USA (Standard Contractual Clauses)" },
      ],
    },
  };

  const handleAcceptAll = () => {
    saveConsent({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    });
  };

  const handleRejectAll = () => {
    saveConsent({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    });
  };

  const handleSaveSettings = () => {
    saveConsent(tempConsent);
  };

  const handleOpenSettings = () => {
    setTempConsent(consent || defaultConsent);
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    if (consent) {
      closeBanner();
    } else {
      setShowSettings(false);
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const renderCookieDetails = (category: string) => {
    const details = cookieDetails[category]?.[language] || cookieDetails[category]?.de || [];
    if (details.length === 0) return null;

    return (
      <div className="mt-3 space-y-2 bg-background/50 rounded-lg p-3 text-xs">
        {details.map((cookie, index) => (
          <div key={index} className="border-b border-border/50 last:border-0 pb-2 last:pb-0">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-muted-foreground">{texts.cookieName}:</span>
                <span className="ml-1 font-mono text-foreground">{cookie.name}</span>
              </div>
              <div>
                <span className="text-muted-foreground">{texts.duration}:</span>
                <span className="ml-1 text-foreground">{cookie.duration}</span>
              </div>
            </div>
            <div className="mt-1">
              <span className="text-muted-foreground">{texts.provider}:</span>
              <span className="ml-1 text-foreground">{cookie.provider}</span>
              {cookie.privacyUrl && (
                <a 
                  href={cookie.privacyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-1 text-primary hover:underline inline-flex items-center"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <div className="mt-1">
              <span className="text-muted-foreground">{texts.purpose}:</span>
              <span className="ml-1 text-foreground">{cookie.purpose}</span>
            </div>
            {cookie.thirdCountry && (
              <div className="mt-1">
                <span className="text-yellow-500/80 text-xs">
                  {language === "de" ? "Drittland-Transfer:" : "Third country transfer:"} {cookie.thirdCountry}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  if (!isLoaded) {
    return null;
  }

  if (!showBanner && !showSettings) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {showSettings ? (
        <motion.div
          key="settings"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          data-testid="cookie-settings-modal"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-2xl bg-card border border-border rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between z-10">
              <h3 className="text-lg font-semibold text-foreground">{texts.settingsTitle}</h3>
              {consent && (
                <button
                  onClick={handleCloseSettings}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  data-testid="button-close-cookie-settings"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="p-4 space-y-4">
              <p className="text-sm text-muted-foreground">{texts.revokeHint}</p>

              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground">{texts.necessary}</span>
                  </div>
                  <span className="text-xs text-primary font-medium px-2 py-1 bg-primary/10 rounded">
                    {texts.alwaysActive}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{texts.necessaryDesc}</p>
                <p className="text-xs text-muted-foreground italic">{texts.necessaryLegal}</p>
                
                <button
                  onClick={() => toggleCategory("necessary")}
                  className="mt-2 text-xs text-primary hover:underline flex items-center gap-1"
                  data-testid="button-toggle-necessary-details"
                >
                  {expandedCategory === "necessary" ? (
                    <><ChevronUp className="w-3 h-3" /> {texts.hideDetails}</>
                  ) : (
                    <><ChevronDown className="w-3 h-3" /> {texts.showDetails}</>
                  )}
                </button>
                {expandedCategory === "necessary" && renderCookieDetails("necessary")}
              </div>

              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-blue-400" />
                    <span className="font-medium text-foreground">{texts.functional}</span>
                  </div>
                  <Switch
                    checked={tempConsent.functional}
                    onCheckedChange={(checked) => setTempConsent({ ...tempConsent, functional: checked })}
                    data-testid="switch-functional-cookies"
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-2">{texts.functionalDesc}</p>
                <p className="text-xs text-muted-foreground italic">{texts.functionalLegal}</p>
                
                <button
                  onClick={() => toggleCategory("functional")}
                  className="mt-2 text-xs text-primary hover:underline flex items-center gap-1"
                  data-testid="button-toggle-functional-details"
                >
                  {expandedCategory === "functional" ? (
                    <><ChevronUp className="w-3 h-3" /> {texts.hideDetails}</>
                  ) : (
                    <><ChevronDown className="w-3 h-3" /> {texts.showDetails}</>
                  )}
                </button>
                {expandedCategory === "functional" && renderCookieDetails("functional")}
              </div>

              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-green-400" />
                    <span className="font-medium text-foreground">{texts.analytics}</span>
                  </div>
                  <Switch
                    checked={tempConsent.analytics}
                    onCheckedChange={(checked) => setTempConsent({ ...tempConsent, analytics: checked })}
                    data-testid="switch-analytics-cookies"
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-2">{texts.analyticsDesc}</p>
                <p className="text-xs text-muted-foreground italic">{texts.analyticsLegal}</p>
                <p className="text-xs text-muted-foreground mt-1">{texts.dataProcessed}: {texts.dataTypes}</p>
                
                <button
                  onClick={() => toggleCategory("analytics")}
                  className="mt-2 text-xs text-primary hover:underline flex items-center gap-1"
                  data-testid="button-toggle-analytics-details"
                >
                  {expandedCategory === "analytics" ? (
                    <><ChevronUp className="w-3 h-3" /> {texts.hideDetails}</>
                  ) : (
                    <><ChevronDown className="w-3 h-3" /> {texts.showDetails}</>
                  )}
                </button>
                {expandedCategory === "analytics" && renderCookieDetails("analytics")}
              </div>

              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Megaphone className="w-5 h-5 text-orange-400" />
                    <span className="font-medium text-foreground">{texts.marketing}</span>
                  </div>
                  <Switch
                    checked={tempConsent.marketing}
                    onCheckedChange={(checked) => setTempConsent({ ...tempConsent, marketing: checked })}
                    data-testid="switch-marketing-cookies"
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-2">{texts.marketingDesc}</p>
                <p className="text-xs text-muted-foreground italic">{texts.marketingLegal}</p>
                <p className="text-xs text-yellow-500/80 mt-1">{texts.marketingThirdCountry}</p>
                
                <button
                  onClick={() => toggleCategory("marketing")}
                  className="mt-2 text-xs text-primary hover:underline flex items-center gap-1"
                  data-testid="button-toggle-marketing-details"
                >
                  {expandedCategory === "marketing" ? (
                    <><ChevronUp className="w-3 h-3" /> {texts.hideDetails}</>
                  ) : (
                    <><ChevronDown className="w-3 h-3" /> {texts.showDetails}</>
                  )}
                </button>
                {expandedCategory === "marketing" && renderCookieDetails("marketing")}
              </div>

              <div className="text-xs text-muted-foreground space-x-3 pt-2">
                <span>{texts.moreInfo}</span>
                <a href="/datenschutz" className="text-primary hover:underline">{texts.privacyPolicy}</a>
                <span>|</span>
                <a href="/impressum" className="text-primary hover:underline">{texts.imprint}</a>
              </div>
            </div>

            <div className="sticky bottom-0 bg-card border-t border-border p-4 flex flex-wrap gap-3">
              <Button
                onClick={handleRejectAll}
                variant="outline"
                className="flex-1 min-w-[100px] border-foreground/30 hover:bg-muted text-foreground font-medium"
                data-testid="button-reject-all-in-settings"
              >
                {texts.rejectAll}
              </Button>
              <Button
                onClick={handleSaveSettings}
                variant="outline"
                className="flex-1 min-w-[100px] border-foreground/30 hover:bg-muted text-foreground font-medium"
                data-testid="button-save-cookie-settings"
              >
                {texts.save}
              </Button>
              <Button
                onClick={handleAcceptAll}
                variant="outline"
                className="flex-1 min-w-[100px] border-foreground/30 hover:bg-muted text-foreground font-medium"
                data-testid="button-accept-all-in-settings"
              >
                {texts.acceptAll}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          data-testid="cookie-banner"
        >
          <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex w-12 h-12 rounded-full bg-primary/10 items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{texts.bannerTitle}</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    {texts.bannerDescription}
                  </p>
                  <p className="text-muted-foreground text-sm mb-2">
                    {texts.bannerDataNote} {texts.bannerRevokeNote}
                  </p>
                  <p className="text-sm mb-4">
                    <a href="/datenschutz" className="text-primary hover:underline">{texts.privacyPolicy}</a>
                    <span className="text-muted-foreground mx-2">|</span>
                    <a href="/impressum" className="text-primary hover:underline">{texts.imprint}</a>
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={handleRejectAll}
                      variant="outline"
                      className="flex-1 min-w-[140px] border-foreground/30 hover:bg-muted text-foreground font-medium py-3"
                      data-testid="button-reject-all-cookies"
                    >
                      {texts.rejectAll}
                    </Button>
                    <Button
                      onClick={handleOpenSettings}
                      variant="outline"
                      className="flex-1 min-w-[140px] border-foreground/30 hover:bg-muted text-foreground font-medium py-3"
                      data-testid="button-cookie-settings"
                    >
                      {texts.settings}
                    </Button>
                    <Button
                      onClick={handleAcceptAll}
                      variant="outline"
                      className="flex-1 min-w-[140px] border-foreground/30 hover:bg-muted text-foreground font-medium py-3"
                      data-testid="button-accept-all-cookies"
                    >
                      {texts.acceptAll}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CookieSettingsButton() {
  const { consent, openSettings } = useCookieConsent();
  const { language } = useLanguage();

  if (!consent) return null;

  return (
    <button
      onClick={openSettings}
      className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
      data-testid="button-open-cookie-settings"
    >
      <Cookie className="w-4 h-4" />
      <span>{language === "de" ? "Cookie-Einstellungen" : "Cookie Settings"}</span>
    </button>
  );
}
