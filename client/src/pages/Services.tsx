import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { N8NFlowAnimation } from "@/components/animations/N8NFlowAnimation";
import { StrategicAIAnimation } from "@/components/animations/StrategicAIAnimation";
import { ProcessOptimizationAnimation } from "@/components/animations/ProcessOptimizationAnimation";
import { Users, Zap, Brain, Code } from "lucide-react";
import voiceAgentVideo from "@assets/Generated_File_December_04,_2025_-_1_53PM_1764852982434.mp4";
import trainingVideo from "@assets/generated_videos/corporate_training_workshop_employees_learning.mp4";
import customAiVideo from "@assets/generated_videos/terminal_screen_running_ai_code.mp4";

interface ServiceSectionProps {
  title: string;
  description: string;
  index: number;
  background: React.ReactNode;
}

function ServiceSection({ title, description, index, background }: ServiceSectionProps) {
  const isEven = index % 2 === 0;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center relative overflow-hidden border-b border-white/5">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {background}
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
          !isEven && "lg:grid-flow-dense" 
        )}>
          
          {/* Text Content */}
          <motion.div 
            style={{ opacity, x: isEven ? -30 : 30 }}
            transition={{ duration: 0.8 }}
            className={cn(
                "space-y-6 p-0 bg-transparent border-none", // Clean text, no border/bg
                !isEven && "lg:col-start-2"
            )}
          >
            <div className="inline-block p-2 px-3 rounded-lg bg-primary/20 border border-primary/30 text-primary font-mono text-xs font-bold uppercase tracking-wider">
                Service 0{index + 1}
            </div>
            <h2 className="text-5xl md:text-7xl font-bold leading-tight text-white/90 mix-blend-overlay">
                {title}
            </h2>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-medium">
                {description}
            </p>
          </motion.div>

          {/* Empty column for spacing since background covers everything now, 
              but we keep the grid to position text left/right */}
          <div className={cn(!isEven && "lg:col-start-1")} />

        </div>
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <div className="min-h-screen w-full bg-background pt-20">
       <div className="max-w-7xl mx-auto px-4 py-20 text-center relative z-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Unsere Leistungen
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Maßgeschneiderte KI & Automatisierungslösungen für Ihr Unternehmen.
          </motion.p>
       </div>

       <div className="relative">
          {/* 1. AI Voice Agents */}
          <ServiceSection 
            index={0}
            title="AI Voice Agents"
            description="Unsere Voice-Agents revolutionieren Ihren Kundenservice. Sie können Termine vereinbaren, Support-Anfragen lösen und qualifizierte Leads vorqualifizieren – rund um die Uhr, ohne Wartezeit und in natürlicher Sprache."
            background={
                <div className="w-full h-full flex items-center justify-center">
                    <video 
                        src={voiceAgentVideo} 
                        autoPlay 
                        loop 
                        muted 
                        className="w-full h-full object-cover opacity-60"
                    />
                </div>
            }
          />

          {/* 2. N8N Workflow Automation */}
          <ServiceSection 
            index={1}
            title="N8N Workflow Automation"
            description="Wir sind Experten für N8N. Wir automatisieren komplexe Geschäftsprozesse, verbinden inkompatible Systeme und schaffen nahtlose Datenflüsse zwischen Ihrem CRM, E-Mail-Marketing und internen Tools. Sparen Sie hunderte Arbeitsstunden."
            background={<N8NFlowAnimation />}
          />

          {/* 3. Mitarbeiter Consulting */}
          <ServiceSection 
            index={2}
            title="Mitarbeiter Consulting"
            description="KI ist nur so gut wie die Menschen, die sie nutzen. Wir schulen Ihre Mitarbeiter im Umgang mit ChatGPT, Copilot und Co., um die Produktivität im gesamten Unternehmen massiv zu steigern."
            background={
                 <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                    <video 
                        src={trainingVideo} 
                        autoPlay 
                        loop 
                        muted 
                        className="w-full h-full object-cover opacity-50"
                    />
                 </div>
            }
          />

          {/* 4. Process Optimization */}
          <ServiceSection 
            index={3}
            title="Prozess Optimierung"
            description="Analyse Ihrer bestehenden Prozesse und Identifikation von Automatisierungspotenzialen. Wir finden die Flaschenhälse und lösen sie auf, bevor wir überhaupt eine Zeile Code schreiben."
            background={<ProcessOptimizationAnimation />}
          />

          {/* 5. Strategic AI Implementation */}
          <ServiceSection 
            index={4}
            title="Strategische KI Implementierung"
            description="Ganzheitliche Strategieberatung für die Einführung von KI in Ihrem Unternehmen. Wir begleiten Sie von der Vision bis zur Implementierung und stellen sicher, dass Ihre Investition ROI liefert."
            background={<StrategicAIAnimation />}
          />

          {/* 6. Custom AI Development */}
          <ServiceSection 
            index={5}
            title="Custom AI Development"
            description="Maßgeschneiderte KI-Lösungen für spezifische Probleme. Von der Dokumentenanalyse bis hin zu prädiktiven Modellen für Ihren Vertrieb. Wenn es keine Standardlösung gibt, bauen wir sie."
            background={
                <div className="w-full h-full bg-[#0f172a] flex items-center justify-center font-mono text-sm p-0 relative overflow-hidden opacity-60">
                  <video 
                      src={customAiVideo} 
                      autoPlay 
                      loop 
                      muted 
                      className="w-full h-full object-cover"
                  />
              </div>
            }
          />

       </div>
    </div>
  );
}

