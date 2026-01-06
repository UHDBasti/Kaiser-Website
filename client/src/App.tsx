import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import Home from "@/pages/Home";
import Services from "@/pages/Services";
import News from "@/pages/News";
import VoiceAgents from "@/pages/VoiceAgents";
import StaffTraining from "@/pages/StaffTraining";
import Forum from "@/pages/Forum";
import ThreadDetail from "@/pages/ThreadDetail";
import CategoryThreads from "@/pages/CategoryThreads";
import VerifyEmail from "@/pages/VerifyEmail";

import { ChatWidget } from "@/components/ui/ChatWidget";
import { VoiceAgentWidget } from "@/components/ui/VoiceAgentWidget";
import { CookieBanner } from "@/components/ui/CookieBanner";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { LanguageProvider } from "@/lib/i18n";
import { AuthProvider } from "@/lib/auth";
import { CookieConsentProvider } from "@/lib/cookieConsent";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Impressum from "@/pages/Impressum";
import Datenschutz from "@/pages/Datenschutz";
import AGB from "@/pages/AGB";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/voice-agents" component={VoiceAgents} />
          <Route path="/staff-training" component={StaffTraining} />
          <Route path="/news" component={News} />
          <Route path="/forum" component={Forum} />
          <Route path="/forum/thread/:id" component={ThreadDetail} />
          <Route path="/forum/category/:slug" component={CategoryThreads} />
          <Route path="/verify-email" component={VerifyEmail} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/impressum" component={Impressum} />
          <Route path="/datenschutz" component={Datenschutz} />
          <Route path="/agb" component={AGB} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
      {/* <VoiceAgentWidget /> */}
    </div>
  );
}

function App() {
  const { toast } = useToast();

  useEffect(() => {
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          activateEasterEgg();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    const activateEasterEgg = () => {
      document.documentElement.classList.toggle("debug-mode");
      toast({
        title: "SYSTEM OVERRIDE INITIATED",
        description: "Welcome to the Matrix, Admin.",
        className: "bg-primary text-black border-primary",
      });
      
      // Add a temporary matrix effect style
      const style = document.createElement('style');
      style.innerHTML = `
        body { font-family: 'Courier New', monospace !important; }
        * { color: #0f0 !important; background-color: #000 !important; border-color: #0f0 !important; }
        img { filter: hue-rotate(90deg) contrast(200%); }
      `;
      style.id = "matrix-style";
      
      if (document.getElementById("matrix-style")) {
        document.getElementById("matrix-style")?.remove();
      } else {
        document.head.appendChild(style);
        setTimeout(() => {
            document.getElementById("matrix-style")?.remove();
            toast({
                title: "SYSTEM RESTORED",
                description: "Simulation normalized.",
            });
        }, 5000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toast]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <CookieConsentProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </CookieConsentProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
