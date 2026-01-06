import { motion } from "framer-motion";
import { NodeBackground } from "@/components/ui/NodeBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GraduationCap, Users, Target } from "lucide-react";
import trainingVideo from "@assets/generated_videos/corporate_training_workshop_employees_learning.mp4";
import { useLanguage } from "@/lib/i18n";

export default function StaffTraining() {
  const { t } = useLanguage();
  const modules = [
    {
      title: t("module.fundamentals.title"),
      description: t("module.fundamentals.desc"),
      icon: <BookOpen className="w-6 h-6 text-blue-500" />
    },
    {
      title: t("module.productivity.title"),
      description: t("module.productivity.desc"),
      icon: <Target className="w-6 h-6 text-purple-500" />
    },
    {
      title: t("module.automation.title"),
      description: t("module.automation.desc"),
      icon: <Users className="w-6 h-6 text-green-500" />
    },
    {
      title: t("module.prompting.title"),
      description: t("module.prompting.desc"),
      icon: <GraduationCap className="w-6 h-6 text-orange-500" />
    }
  ];

  return (
    <div className="min-h-screen w-full pt-24 pb-20">
      <NodeBackground />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            {t("training.hero.title")}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            {t("training.hero.desc")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
             <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative rounded-3xl overflow-hidden shadow-2xl group"
             >
                <video 
                    src={trainingVideo} 
                    autoPlay 
                    loop 
                    muted
                    className="w-full h-full object-cover min-h-[400px] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                    <div className="text-white">
                        <h3 className="text-2xl font-bold mb-2">{t("training.workshop.title")}</h3>
                        <p className="text-white/80">{t("training.workshop.desc")}</p>
                    </div>
                </div>
             </motion.div>

             <div className="space-y-6">
                {modules.map((module, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                <div className="p-2 bg-muted rounded-lg">
                                    {module.icon}
                                </div>
                                <CardTitle className="text-xl">{module.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{module.description}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
             </div>
        </div>

        <div className="bg-primary/5 rounded-3xl p-12 text-center border border-primary/10">
            <h2 className="text-3xl font-bold mb-4">{t("training.cta.title")}</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t("training.cta.desc")}
            </p>
            <Button size="lg" className="rounded-full h-12 px-8 text-lg" onClick={() => window.location.href = '/contact'}>
                {t("training.cta.button")}
            </Button>
        </div>
      </div>
    </div>
  );
}

