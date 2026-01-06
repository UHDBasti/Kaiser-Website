import { motion } from "framer-motion";
import { NodeBackground } from "@/components/ui/NodeBackground";
import { Target, Lightbulb, Users, Rocket, Award, Heart } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function About() {
  const { t } = useLanguage();

  const values = [
    {
      icon: Target,
      titleKey: "about.value.efficiency.title",
      descKey: "about.value.efficiency.desc",
    },
    {
      icon: Lightbulb,
      titleKey: "about.value.innovation.title",
      descKey: "about.value.innovation.desc",
    },
    {
      icon: Heart,
      titleKey: "about.value.partnership.title",
      descKey: "about.value.partnership.desc",
    },
  ];

  return (
    <div className="min-h-screen w-full pt-24 pb-20">
      <NodeBackground />
      
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
            <Users className="w-4 h-4 mr-2" />
            {t("about.badge")}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="text-about-title">
            {t("about.title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-about-subtitle">
            {t("about.subtitle")}
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
          
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/20 rounded-2xl">
              <Rocket className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">{t("about.mission.title")}</h2>
              <p className="text-muted-foreground">{t("about.mission.label")}</p>
            </div>
          </div>
          
          <p className="text-lg leading-relaxed text-foreground/90 mb-6" data-testid="text-mission">
            {t("about.mission.text")}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-card/50 border border-border rounded-2xl p-6"
                data-testid={`card-value-${index}`}
              >
                <value.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">{t(value.titleKey)}</h3>
                <p className="text-muted-foreground text-sm">{t(value.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("about.team.title")}</h2>
            <p className="text-muted-foreground">{t("about.team.subtitle")}</p>
          </div>

          <div className="flex justify-center">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-card border border-border rounded-3xl p-8 max-w-md w-full text-center shadow-lg"
            >
              {/* Placeholder Avatar */}
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-4 border-primary/20 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                  alt="Team Member"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h3 className="text-2xl font-bold mb-1" data-testid="text-founder-name">{t("about.founder.name")}</h3>
              <p className="text-primary font-medium mb-4" data-testid="text-founder-role">{t("about.founder.role")}</p>
              
              <div className="h-px bg-border my-4" />
              
              <p className="text-muted-foreground leading-relaxed text-sm" data-testid="text-founder-bio">
                {t("about.founder.bio")}
              </p>
              
              <div className="flex justify-center gap-4 mt-6">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">{t("about.founder.expertise")}</p>
                  <p className="text-xs text-muted-foreground">{t("about.founder.experience")}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Why We Do This Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-card/50 backdrop-blur border border-border rounded-3xl p-8 md:p-12"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">{t("about.why.title")}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {t("about.why.text1")}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("about.why.text2")}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
