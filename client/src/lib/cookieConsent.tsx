import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export interface CookieConsent {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: string;
  consentId: string;
}

interface CookieConsentContextType {
  consent: CookieConsent | null;
  isLoaded: boolean;
  showBanner: boolean;
  showSettings: boolean;
  saveConsent: (consent: Omit<CookieConsent, "timestamp" | "version" | "consentId">) => void;
  openSettings: () => void;
  closeBanner: () => void;
  setShowSettings: (show: boolean) => void;
}

const CONSENT_VERSION = "1.0";
const CONSENT_KEY = "kaiser_cookie_consent";

function generateConsentId(): string {
  return `consent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

async function logConsentToBackend(consent: CookieConsent): Promise<void> {
  try {
    await fetch("/api/consent-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        consentId: consent.consentId,
        necessary: consent.necessary,
        functional: consent.functional,
        analytics: consent.analytics,
        marketing: consent.marketing,
        consentVersion: consent.version,
      }),
    });
  } catch (error) {
    console.error("Failed to log consent to backend:", error);
  }
}

const defaultConsent: CookieConsent = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
  timestamp: "",
  version: CONSENT_VERSION,
  consentId: "",
};

const CookieConsentContext = createContext<CookieConsentContextType | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CookieConsent;
        if (parsed.version === CONSENT_VERSION) {
          setConsent(parsed);
          setShowBanner(false);
        } else {
          setShowBanner(true);
        }
      } catch (e) {
        console.error("Failed to parse cookie consent:", e);
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
    setIsLoaded(true);
  }, []);

  const saveConsent = useCallback((newConsent: Omit<CookieConsent, "timestamp" | "version" | "consentId">) => {
    const fullConsent: CookieConsent = {
      ...newConsent,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
      consentId: generateConsentId(),
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(fullConsent));
    setConsent(fullConsent);
    setShowBanner(false);
    setShowSettings(false);
    
    logConsentToBackend(fullConsent);
  }, []);

  const openSettings = useCallback(() => {
    setShowSettings(true);
    setShowBanner(true);
  }, []);

  const closeBanner = useCallback(() => {
    if (consent) {
      setShowBanner(false);
      setShowSettings(false);
    }
  }, [consent]);

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        isLoaded,
        showBanner,
        showSettings,
        saveConsent,
        openSettings,
        closeBanner,
        setShowSettings,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return context;
}

export { defaultConsent };
