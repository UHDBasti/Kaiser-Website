import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Menu, X, BrainCircuit, MessageSquare, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.services"), path: "/services" },
    { name: t("nav.voiceAgents"), path: "/voice-agents" },
    { name: t("nav.staffTraining"), path: "/staff-training" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.news"), path: "/news" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "de" ? "en" : "de");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 group-hover:border-primary/50 transition-colors shadow-sm">
              <BrainCircuit className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tighter text-foreground group-hover:text-primary transition-colors">
              KAISER<span className="text-primary">-SERVICE</span>
            </span>
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  href={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary relative py-2 ${
                    location === link.path ? "text-primary font-bold" : "text-muted-foreground"
                  }`}
                >
                  {link.name}
                  {location === link.path && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              ))}
              
              <div className="h-6 w-px bg-border mx-2" />

              <Link href="/forum" className="inline-flex">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary gap-2" asChild>
                  <span><MessageSquare className="w-4 h-4" /> {t("nav.forum")}</span>
                </Button>
              </Link>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground hover:text-primary gap-2"
                onClick={toggleLanguage}
              >
                <Globe className="w-4 h-4" /> {language.toUpperCase()}
              </Button>

              <Link href="/contact" className="inline-flex">
                <Button className="rounded-full px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-md hover:shadow-lg transition-all" asChild>
                  <span>{t("nav.contact")}</span>
                </Button>
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border shadow-lg"
        >
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`block px-3 py-3 rounded-lg text-base font-medium ${
                  location === link.path
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-px bg-border my-2" />
            
            <Button 
                variant="ghost" 
                className="w-full justify-start px-3 py-3 text-base font-medium text-muted-foreground hover:text-primary hover:bg-primary/5"
                onClick={() => {
                  toggleLanguage();
                  setIsOpen(false);
                }}
            >
                <Globe className="w-4 h-4 mr-2" /> {language === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln'}
            </Button>

            <Link 
              href="/forum"
              className="block px-3 py-3 rounded-lg text-base font-medium text-muted-foreground hover:text-primary hover:bg-primary/5"
              onClick={() => setIsOpen(false)}
            >
              {t("nav.forum")}
            </Link>
            <Link href="/contact" className="block mt-4" onClick={() => setIsOpen(false)}>
              <Button className="w-full rounded-full font-bold" asChild>
                <span>{t("nav.contactAction")}</span>
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

