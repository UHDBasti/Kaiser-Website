import { BrainCircuit, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/lib/i18n";
import { CookieSettingsButton } from "@/components/ui/CookieBanner";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-border mt-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <BrainCircuit className="w-6 h-6 text-primary" />
              <span className="font-heading font-bold text-xl tracking-tighter text-foreground">
                KAISER<span className="text-primary">-SERVICE</span>
              </span>
            </div>
            <p className="text-muted-foreground max-w-md">
              {t("footer.desc")}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">{t("footer.services")}</h3>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.services")}</Link></li>
              <li><Link href="/voice-agents" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.voiceAgents")}</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">{t("service.n8n.title")}</Link></li>
              <li><Link href="/staff-training" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.staffTraining")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">{t("footer.legal")}</h3>
            <ul className="space-y-3">
              <li><Link href="/impressum" className="text-muted-foreground hover:text-primary transition-colors">Impressum</Link></li>
              <li><Link href="/datenschutz" className="text-muted-foreground hover:text-primary transition-colors">Datenschutz</Link></li>
              <li><Link href="/agb" className="text-muted-foreground hover:text-primary transition-colors">AGB</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">{t("footer.connect")}</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/sebastian-kaiser-5756bb322/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="https://github.com/UHDBasti" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-github"
              >
                <Github className="h-6 w-6" />
              </a>
              <a 
                href="mailto:Service-Kaiser@proton.me" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Kaiser-Service. {t("footer.rights")}
          </p>
          <CookieSettingsButton />
        </div>
      </div>
    </footer>
  );
}

