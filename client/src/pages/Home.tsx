import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Mic, Workflow, Users, Sparkles } from "lucide-react";
import { NodeBackground } from "@/components/ui/NodeBackground";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Link } from "wouter";
import { N8NFlowAnimation } from "@/components/animations/N8NFlowAnimation";
import { useLanguage } from "@/lib/i18n";

import heroImage from "@assets/freepik__erstelle-mir-bitte-ein-bild-von-einem-mensch-und-e__6_1765059911647.png";
import voiceAgentVideo from "@assets/Generated_File_December_04,_2025_-_1_53PM_1764852982434.mp4";
import trainingVideo from "@assets/generated_videos/corporate_training_workshop_employees_learning.mp4";


export default function Home() {
  const { t } = useLanguage();

  const services = [
    {
      title: t("service.voice.title"),
      description: t("service.voice.desc"),
      icon: <Mic className="w-6 h-6" />,
      video: voiceAgentVideo
    },
    {
      title: t("service.n8n.title"),
      description: t("service.n8n.desc"),
      icon: <Workflow className="w-6 h-6" />,
      component: (
        <div className="relative w-full h-full overflow-hidden bg-[#222222]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] origin-center scale-[0.35] pointer-events-none">
            <N8NFlowAnimation />
          </div>
        </div>
      )
    },
    {
      title: t("service.consulting.title"),
      description: t("service.consulting.desc"),
      icon: <Users className="w-6 h-6" />,
      video: trainingVideo
    }
  ];

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <NodeBackground />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                {t("home.hero.badge")}
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                {t("home.hero.title")} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary glitch-hover" data-text="Kaiser-Service">
                  Kaiser-Service
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
                {t("home.hero.subtitle")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/services">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-8 h-12 shadow-lg hover:shadow-xl transition-all">
                    {t("home.hero.cta.discover")} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="rounded-full px-8 h-12 border-primary/20 hover:bg-primary/10 text-primary">
                    {t("home.hero.cta.consult")}
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-30 animate-pulse" />
              <img 
                src={heroImage} 
                alt="AI Network Visualization" 
                className="relative z-10 rounded-3xl shadow-2xl border border-white/10 hover:scale-[1.02] transition-transform duration-500"
              />
              
              {/* Floating Elements simulating N8N nodes */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 bg-card/80 backdrop-blur-md p-4 rounded-2xl border border-primary/30 shadow-lg z-20"
              >
                <Bot className="w-8 h-8 text-primary mb-2" />
                <div className="text-xs font-mono text-muted-foreground">AI Agent Active</div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-5 -left-5 bg-card/80 backdrop-blur-md p-4 rounded-2xl border border-secondary/30 shadow-lg z-20"
              >
                <Workflow className="w-8 h-8 text-secondary mb-2" />
                <div className="text-xs font-mono text-muted-foreground">Workflow Optimized</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-primary/5 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("home.services.title")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t("home.services.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 blur-3xl -z-10" />
          <div className="bg-card border border-border/50 shadow-2xl rounded-[2rem] p-8 md:p-12 text-center overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">{t("home.cta.title")}</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto relative z-10">
              {t("home.cta.subtitle")}
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-10 h-14 text-lg shadow-lg hover:shadow-xl transition-all relative z-10">
                {t("home.cta.button")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
