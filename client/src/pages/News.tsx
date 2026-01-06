import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { NodeBackground } from "@/components/ui/NodeBackground";
import { NewsCard } from "@/components/ui/NewsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface NewsItem {
  id?: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl?: string;
}

const fallbackNews: NewsItem[] = [
  {
    title: "OpenAI veröffentlicht GPT-5 Preview",
    excerpt: "Ein erster Blick auf die neuen Fähigkeiten des kommenden Modells zeigt massive Verbesserungen im Bereich Reasoning und Coding.",
    date: "02. Dez 2025",
    category: "Models",
  },
  {
    title: "N8N Version 2.0 bringt KI-Native Nodes",
    excerpt: "Das beliebte Automatisierungstool integriert nun native AI-Agenten direkt in den Workflow-Editor. Ein Gamechanger für Automation Engineers.",
    date: "28. Nov 2025",
    category: "Automation",
  },
  {
    title: "Warum Voice-Agents den Kundenservice übernehmen",
    excerpt: "Neue Studien zeigen: 80% der Kunden bevorzugen sofortige Antworten durch KI statt Warteschleifen. Wie Unternehmen jetzt reagieren müssen.",
    date: "25. Nov 2025",
    category: "Voice AI",
  },
  {
    title: "Die Zukunft der Arbeit: KI als Kollege",
    excerpt: "Wie sich Jobprofile verändern und warum KI-Kompetenz zur wichtigsten Währung auf dem Arbeitsmarkt wird.",
    date: "20. Nov 2025",
    category: "Consulting",
  },
  {
    title: "Midjourney 7: Fotorealismus neu definiert",
    excerpt: "Die neueste Version des Bildgenerators lässt kaum noch Wünsche offen und stellt Fotografen vor neue Herausforderungen.",
    date: "15. Nov 2025",
    category: "Generative Art",
  },
];

export default function News() {
  const { t } = useLanguage();
  
  const { data, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const res = await fetch("/api/n8n/news");
      if (!res.ok) throw new Error("Failed to fetch news");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  const newsItems: NewsItem[] = data?.news?.length > 0 
    ? data.news.map((item: any) => ({
        ...item,
        date: item.date ? new Date(item.date).toLocaleDateString("de-DE", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }) : "Heute",
        category: item.category || "News",
      }))
    : fallbackNews;

  return (
    <div className="min-h-screen w-full pt-24 pb-20">
      <NodeBackground />
      
      <div className="max-w-5xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">AI News Feed</h1>
          <p className="text-xl text-muted-foreground">
            Bleiben Sie up-to-date mit den neuesten Entwicklungen aus der Welt der künstlichen Intelligenz.
          </p>
        </motion.div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8 bg-background/50 backdrop-blur border border-white/10">
            <TabsTrigger value="all">Alle News</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="models">Models</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            {newsItems.map((item, index) => (
              <NewsCard key={index} {...item} delay={index * 0.1} />
            ))}
          </TabsContent>
          
          <TabsContent value="automation" className="space-y-6">
             {newsItems.filter(i => i.category === "Automation").map((item, index) => (
              <NewsCard key={index} {...item} delay={index * 0.1} />
            ))}
          </TabsContent>

           <TabsContent value="models" className="space-y-6">
             {newsItems.filter(i => i.category === "Models").map((item, index) => (
              <NewsCard key={index} {...item} delay={index * 0.1} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
