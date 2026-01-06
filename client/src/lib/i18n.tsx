import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "de" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navbar
  "nav.home": { de: "Home", en: "Home" },
  "nav.services": { de: "Leistungen", en: "Services" },
  "nav.voiceAgents": { de: "Voice Agents", en: "Voice Agents" },
  "nav.staffTraining": { de: "Mitarbeiter Training", en: "Staff Training" },
  "nav.news": { de: "News", en: "News" },
  "nav.forum": { de: "Forum", en: "Forum" },
  "nav.about": { de: "Über uns", en: "About Us" },
  "nav.contact": { de: "Kontakt", en: "Contact" },
  "nav.contactAction": { de: "Kontakt aufnehmen", en: "Get in touch" },
  "nav.login": { de: "Forum Login", en: "Forum Login" },

  // Home
  "home.hero.badge": { de: "Next Gen AI Solutions", en: "Next Gen AI Solutions" },
  "home.hero.title": { de: "Zukunft gestalten mit", en: "Shaping the future with" },
  "home.hero.subtitle": { de: "Wir transformieren Unternehmen durch maßgeschneiderte KI-Lösungen, intelligente Voice-Agents und nahtlose N8N-Automationen.", en: "We transform businesses through tailored AI solutions, intelligent voice agents, and seamless N8N automations." },
  "home.hero.cta.discover": { de: "Lösungen entdecken", en: "Discover Solutions" },
  "home.hero.cta.consult": { de: "Beratung anfragen", en: "Request Consultation" },
  "home.services.title": { de: "Unsere Expertise", en: "Our Expertise" },
  "home.services.subtitle": { de: "Wir verbinden modernste KI-Technologie mit praktischer Anwendung für Ihr Business.", en: "We combine cutting-edge AI technology with practical applications for your business." },
  "home.cta.title": { de: "Bereit für die Transformation?", en: "Ready for transformation?" },
  "home.cta.subtitle": { de: "Lassen Sie uns gemeinsam herausfinden, wie wir Ihr Unternehmen mit KI und Automation auf das nächste Level heben können.", en: "Let's find out together how we can take your business to the next level with AI and automation." },
  "home.cta.button": { de: "Jetzt Gespräch vereinbaren", en: "Schedule a call now" },

  // Services
  "service.voice.title": { de: "AI-Voice-Agents", en: "AI Voice Agents" },
  "service.voice.desc": { de: "Intelligente Sprachassistenten, die Ihre Kundenkommunikation automatisieren. 24/7 verfügbar, natürlich klingend und nahtlos integriert.", en: "Intelligent voice assistants that automate your customer communication. 24/7 available, natural sounding, and seamlessly integrated." },
  "service.n8n.title": { de: "N8N Automationen", en: "N8N Automations" },
  "service.n8n.desc": { de: "Komplexe Workflow-Automatisierung mit N8N. Wir verbinden Ihre Tools, eliminieren repetitive Aufgaben und steigern die Effizienz.", en: "Complex workflow automation with N8N. We connect your tools, eliminate repetitive tasks, and increase efficiency." },
  "service.consulting.title": { de: "Mitarbeiter Consulting", en: "Staff Consulting" },
  "service.consulting.desc": { de: "Befähigen Sie Ihr Team für das KI-Zeitalter. Maßgeschneiderte Workshops und Schulungen zur effektiven Nutzung von KI-Tools.", en: "Empower your team for the AI age. Tailored workshops and training for effective use of AI tools." },

  // Voice Agents Page
  "voice.badge": { de: "AI Receptionist", en: "AI Receptionist" },
  "voice.hero.title": { de: "Ihr neuer Lieblings-", en: "Your New Favorite" },
  "voice.hero.title.highlight": { de: "Mitarbeiter schläft nie", en: "Employee Never Sleeps" },
  "voice.hero.desc": { de: "Unsere KI-Voice-Agents klingen wie Menschen, denken wie Experten und arbeiten rund um die Uhr. Automatisieren Sie Ihren Telefonsupport und Terminbuchungen.", en: "Our AI Voice Agents sound like humans, think like experts, and work around the clock. Automate your phone support and appointment bookings." },
  "voice.hero.demo": { de: "Demo Anhören", en: "Listen to Demo" },
  "voice.stats.success": { de: "98% Erfolgsrate", en: "98% Success Rate" },
  "voice.stats.desc": { de: "Bei automatisierter Anrufbearbeitung.", en: "In automated call handling." },
  "voice.features.title": { de: "Warum unsere Voice Agents?", en: "Why Choose Our Voice Agents?" },
  "voice.features.subtitle": { de: "Mehr als nur ein Anrufbeantworter.", en: "More than just an answering machine." },
  "voice.feat.1": { de: "24/7 Erreichbarkeit - Kein Anruf geht verloren", en: "24/7 Availability - Never miss a call" },
  "voice.feat.2": { de: "Natürliche Sprachverarbeitung", en: "Natural Language Processing" },
  "voice.feat.3": { de: "Mehrsprachiger Support (30+ Sprachen)", en: "Multilingual Support (30+ Languages)" },
  "voice.feat.4": { de: "CRM Integration (Salesforce, HubSpot)", en: "CRM Integration (Salesforce, HubSpot)" },
  "voice.feat.5": { de: "Sofortige Terminbuchung", en: "Instant Appointment Booking" },
  "voice.feat.6": { de: "Lead-Qualifizierung & Scoring", en: "Lead Qualification & Scoring" },

  // Staff Training Page
  "training.hero.title": { de: "Stärken Sie Ihr Team", en: "Empower Your Team" },
  "training.hero.desc": { de: "Technologie ist nur so gut wie die Menschen, die sie nutzen. Wir schließen die Lücke zwischen KI-Potenzial und Mitarbeiterkompetenz.", en: "Technology is only as good as the people using it. We bridge the gap between AI potential and employee capability." },
  "training.workshop.title": { de: "Interaktive Workshops", en: "Interactive Workshops" },
  "training.workshop.desc": { de: "Praxisnahes Lernen mit realen Szenarien.", en: "Hands-on learning with real-world scenarios." },
  "training.cta.title": { de: "Bereit, Ihre Belegschaft weiterzubilden?", en: "Ready to upskill your workforce?" },
  "training.cta.desc": { de: "Vereinbaren Sie ein Beratungsgespräch, um die spezifischen Bedürfnisse Ihres Teams zu besprechen.", en: "Schedule a consultation to discuss your team's specific needs." },
  "training.cta.button": { de: "Angebot einholen", en: "Get a Quote" },
  
  // Modules
  "module.fundamentals.title": { de: "KI Grundlagen", en: "AI Fundamentals" },
  "module.fundamentals.desc": { de: "Verständnis von LLMs, Prompt Engineering Basics und ethische KI-Nutzung.", en: "Understanding LLMs, Prompt Engineering basics, and ethical AI usage." },
  "module.productivity.title": { de: "Produktivitäts-Tools", en: "Productivity Tools" },
  "module.productivity.desc": { de: "Beherrschung von ChatGPT, Copilot und Perplexity für tägliche Büroaufgaben.", en: "Mastering ChatGPT, Copilot, and Perplexity for daily office tasks." },
  "module.automation.title": { de: "Automations-Mindset", en: "Automation Mindset" },
  "module.automation.desc": { de: "Wie man repetitive Aufgaben identifiziert und mit Low-Code-Tools automatisiert.", en: "How to identify repetitive tasks and automate them using low-code tools." },
  "module.prompting.title": { de: "Fortgeschrittenes Prompting", en: "Advanced Prompting" },
  "module.prompting.desc": { de: "Chain-of-Thought, Few-Shot Prompting und Kontext-Management.", en: "Chain-of-thought, few-shot prompting, and context management." },

  // Footer
  "footer.rights": { de: "Alle Rechte vorbehalten.", en: "All rights reserved." },
  "footer.services": { de: "Leistungen", en: "Services" },
  "footer.legal": { de: "Rechtliches", en: "Legal" },
  "footer.connect": { de: "Verbinden", en: "Connect" },
  "footer.desc": { de: "Wir befähigen Unternehmen mit KI-Lösungen der nächsten Generation, intelligenten Voice-Agents und automatisierten Workflows mit N8N.", en: "Empowering businesses with next-generation AI solutions, intelligent voice agents, and automated workflows using N8N." },
  
  // Contact
  "contact.title": { de: "Kontaktieren Sie uns", en: "Contact Us" },
  "contact.desc": { de: "Lassen Sie uns über Ihr Projekt sprechen. Wir helfen Ihnen gerne weiter.", en: "Let's talk about your project. We are happy to help." },
  "contact.email": { de: "E-Mail", en: "Email" },
  "contact.phone": { de: "Telefon", en: "Phone" },
  "contact.location": { de: "Standort", en: "Location" },
  "contact.form.title": { de: "Nachricht senden", en: "Send Message" },
  "contact.form.firstName": { de: "Vorname", en: "First Name" },
  "contact.form.lastName": { de: "Nachname", en: "Last Name" },
  "contact.form.message": { de: "Nachricht", en: "Message" },
  "contact.form.send": { de: "Absenden", en: "Send" },
  "contact.form.placeholder.msg": { de: "Wie können wir Ihnen helfen?", en: "How can we help you?" },

  // Chat
  "chat.welcome": { de: "Hallo! Wie kann ich Ihnen heute helfen?", en: "Hello! How can I help you today?" },
  "chat.placeholder": { de: "Schreiben Sie eine Nachricht...", en: "Type a message..." },
  "chat.response": { de: "Danke für Ihre Nachricht! Ein Mitarbeiter (oder ich, der AI Agent) wird sich gleich darum kümmern.", en: "Thanks for your message! A staff member (or I, the AI Agent) will take care of it shortly." },
  "chat.title": { de: "Kaiser-AI Chat", en: "Kaiser-AI Chat" },

  // About Page
  "about.badge": { de: "Über Kaiser-Service", en: "About Kaiser-Service" },
  "about.title": { de: "Wer wir sind", en: "Who We Are" },
  "about.subtitle": { de: "Wir sind Ihr Partner für KI-Lösungen und Automatisierung. Mit Leidenschaft und Expertise helfen wir dem deutschen Mittelstand, das volle Potenzial moderner Technologien zu entfalten.", en: "We are your partner for AI solutions and automation. With passion and expertise, we help German SMEs unlock the full potential of modern technologies." },
  
  "about.mission.title": { de: "Unsere Mission", en: "Our Mission" },
  "about.mission.label": { de: "Was uns antreibt", en: "What drives us" },
  "about.mission.text": { de: "Unsere Mission ist es, den deutschen Mittelstand wieder handlungsfähig zu machen. Mit Hilfe von KI und Automatisierungslösungen unterstützen wir Unternehmen dabei, ihre Effizienz und Effektivität zu steigern. Wir suchen stets die effizientesten und besten Lösungen für unsere Kunden, um mehr Wertschaffung in Deutschland zu ermöglichen und Unternehmen fit für die Zukunft zu machen.", en: "Our mission is to make the German Mittelstand capable of action again. With the help of AI and automation solutions, we support companies in increasing their efficiency and effectiveness. We are always looking for the most efficient and best solutions for our customers to enable more value creation in Germany and make companies fit for the future." },
  
  "about.value.efficiency.title": { de: "Effizienz", en: "Efficiency" },
  "about.value.efficiency.desc": { de: "Wir optimieren Prozesse und eliminieren Zeitfresser, damit Sie sich auf das Wesentliche konzentrieren können.", en: "We optimize processes and eliminate time wasters so you can focus on what matters." },
  "about.value.innovation.title": { de: "Innovation", en: "Innovation" },
  "about.value.innovation.desc": { de: "Wir nutzen die neuesten KI-Technologien und passen sie an Ihre individuellen Bedürfnisse an.", en: "We use the latest AI technologies and adapt them to your individual needs." },
  "about.value.partnership.title": { de: "Partnerschaft", en: "Partnership" },
  "about.value.partnership.desc": { de: "Wir arbeiten eng mit Ihnen zusammen und begleiten Sie langfristig auf Ihrem Weg zur Digitalisierung.", en: "We work closely with you and accompany you long-term on your digitalization journey." },
  
  "about.team.title": { de: "Das Team", en: "The Team" },
  "about.team.subtitle": { de: "Die Menschen hinter Kaiser-Service", en: "The people behind Kaiser-Service" },
  
  "about.founder.name": { de: "Gründer & CEO", en: "Founder & CEO" },
  "about.founder.role": { de: "KI-Stratege & Automatisierungsexperte", en: "AI Strategist & Automation Expert" },
  "about.founder.bio": { de: "Mit einer tiefen Leidenschaft für Technologie und dem Ziel, Unternehmen zu befähigen, habe ich Kaiser-Service gegründet. Meine Vision: Jedes Unternehmen soll Zugang zu den besten KI-Lösungen haben, unabhängig von seiner Größe.", en: "With a deep passion for technology and the goal of empowering businesses, I founded Kaiser-Service. My vision: Every company should have access to the best AI solutions, regardless of its size." },
  "about.founder.expertise": { de: "KI & Automation", en: "AI & Automation" },
  "about.founder.experience": { de: "Spezialisiert auf Voice AI & N8N", en: "Specialized in Voice AI & N8N" },
  
  "about.why.title": { de: "Warum wir das tun", en: "Why We Do This" },
  "about.why.text1": { de: "Wir glauben, dass der deutsche Mittelstand das Rückgrat unserer Wirtschaft ist. Doch viele Unternehmen kämpfen mit veralteten Prozessen, Fachkräftemangel und dem Druck, mit der digitalen Transformation Schritt zu halten.", en: "We believe that the German Mittelstand is the backbone of our economy. But many companies struggle with outdated processes, skills shortages, and the pressure to keep up with digital transformation." },
  "about.why.text2": { de: "Genau hier setzen wir an. Mit maßgeschneiderten KI-Lösungen und intelligenter Automatisierung helfen wir Ihnen, effizienter zu arbeiten, Kosten zu senken und Ihr Team zu entlasten. Unser Ziel ist es, gemeinsam mit Ihnen nachhaltige Wertschöpfung zu schaffen.", en: "This is exactly where we come in. With tailored AI solutions and intelligent automation, we help you work more efficiently, reduce costs, and relieve your team. Our goal is to create sustainable value together with you." }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("de");

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
