import { motion } from "framer-motion";
import { Calendar, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NewsCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  delay?: number;
}

export function NewsCard({ title, excerpt, date, category, delay = 0 }: NewsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative border-l-2 border-muted pl-6 py-2 hover:border-primary transition-colors"
    >
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-muted group-hover:border-primary transition-colors" />
      
      <div className="flex items-center gap-3 mb-2">
        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 hover:bg-primary/10">
            {category}
        </Badge>
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="w-3 h-3 mr-1" />
          {date}
        </div>
      </div>
      
      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors cursor-pointer flex items-center gap-2">
        {title}
        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </h3>
      
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {excerpt}
      </p>
    </motion.div>
  );
}
