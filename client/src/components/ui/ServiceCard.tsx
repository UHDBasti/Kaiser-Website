import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
  video?: string;
  component?: React.ReactNode;
  delay?: number;
  className?: string;
}

export function ServiceCard({ title, description, icon, image, video, component, delay = 0, className }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className={cn("h-full", className)}
    >
      <Card className="h-full bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/50 transition-all duration-300 overflow-hidden group">
        <div className="relative h-48 w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent z-10" />
            
            {component ? (
                <div className="w-full h-full">{component}</div>
            ) : video ? (
                <video 
                    src={video} 
                    autoPlay 
                    loop 
                    muted 
                    className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-110"
                />
            ) : (
                <img 
                  src={image || "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"} 
                  alt={title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
            )}

            <div className="absolute top-4 left-4 z-20 p-3 bg-background/80 backdrop-blur-md rounded-xl border border-primary/20 text-primary group-hover:text-white group-hover:bg-primary group-hover:border-primary transition-colors">
                {icon}
            </div>
        </div>
        <CardHeader>
          <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-muted-foreground text-base leading-relaxed">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
}
