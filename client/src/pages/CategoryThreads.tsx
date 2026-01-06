import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NodeBackground } from "@/components/ui/NodeBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, MessageSquare, Plus, Eye, Clock, Loader2, Lock, Pin, Search,
  ChevronRight, Workflow, Bot, HelpCircle, Sparkles
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useLanguage } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";

interface Category {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
  description: string | null;
  descriptionEn: string | null;
  icon: string;
  color: string;
}

interface Thread {
  id: string;
  title: string;
  authorId: string;
  categoryId: string | null;
  isPinned: boolean;
  isLocked: boolean;
  createdAt: string;
  updatedAt: string;
  views: number;
  author: {
    id: string;
    username: string;
    displayName: string | null;
  };
  category: Category | null;
  postCount: number;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  MessageSquare,
  Workflow,
  Bot,
  HelpCircle,
  Sparkles,
};

function ThreadCard({ thread }: { thread: Thread }) {
  const { language } = useLanguage();
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(language === "de" ? "de-DE" : "en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Link href={`/forum/thread/${thread.id}`}>
        <Card 
          className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-colors cursor-pointer" 
          data-testid={`thread-card-${thread.id}`}
        >
          <CardContent className="py-4">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {thread.isPinned && (
                    <Badge variant="secondary" className="bg-primary/20 text-primary">
                      <Pin className="w-3 h-3 mr-1" />
                      {language === "de" ? "Angepinnt" : "Pinned"}
                    </Badge>
                  )}
                  {thread.isLocked && (
                    <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500">
                      <Lock className="w-3 h-3 mr-1" />
                      {language === "de" ? "Geschlossen" : "Locked"}
                    </Badge>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors mt-1 truncate">
                  {thread.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {language === "de" ? "von" : "by"}{" "}
                  <span className="text-primary">{thread.author?.displayName || thread.author?.username}</span>
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground shrink-0">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" /> {thread.postCount}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" /> {thread.views}
                </span>
                <span className="flex items-center gap-1 hidden sm:flex">
                  <Clock className="w-4 h-4" /> {formatDate(thread.updatedAt)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

export default function CategoryThreads() {
  const params = useParams<{ slug: string }>();
  const { user } = useAuth();
  const { language } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadContent, setNewThreadContent] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch category
  const { data: categoryData, isLoading: categoryLoading } = useQuery({
    queryKey: ["forum", "category", params.slug],
    queryFn: async () => {
      const res = await fetch(`/api/forum/categories/${params.slug}`);
      if (!res.ok) throw new Error("Category not found");
      return res.json();
    },
    enabled: !!params.slug,
  });

  // Fetch threads for this category
  const { data: threadsData, isLoading: threadsLoading } = useQuery({
    queryKey: ["forum", "threads", categoryData?.category?.id],
    queryFn: async () => {
      const res = await fetch(`/api/forum/threads?categoryId=${categoryData.category.id}`);
      if (!res.ok) throw new Error("Failed to fetch threads");
      return res.json();
    },
    enabled: !!categoryData?.category?.id,
  });

  const createThreadMutation = useMutation({
    mutationFn: async ({ title, content }: { title: string; content: string }) => {
      const threadRes = await fetch("/api/forum/threads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, categoryId: categoryData?.category?.id }),
      });
      if (!threadRes.ok) {
        const data = await threadRes.json();
        throw new Error(data.message || "Failed to create thread");
      }
      const { thread } = await threadRes.json();
      
      const postRes = await fetch("/api/forum/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadId: thread.id, content }),
      });
      if (!postRes.ok) throw new Error("Failed to create initial post");
      
      return thread;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum", "threads"] });
      toast({ 
        title: language === "de" ? "Thread erstellt!" : "Thread created!", 
        description: language === "de" ? "Dein Thema wurde erfolgreich gepostet." : "Your topic was successfully posted."
      });
      setNewThreadTitle("");
      setNewThreadContent("");
      setDialogOpen(false);
    },
    onError: (err: Error) => {
      toast({ title: language === "de" ? "Fehler" : "Error", description: err.message, variant: "destructive" });
    },
  });

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThreadTitle.trim() || !newThreadContent.trim()) return;
    createThreadMutation.mutate({ title: newThreadTitle, content: newThreadContent });
  };

  const category: Category | undefined = categoryData?.category;
  const threads: Thread[] = threadsData?.threads || [];
  const IconComponent = category ? (iconMap[category.icon] || MessageSquare) : MessageSquare;

  // Filter threads by search query
  const filteredThreads = searchQuery 
    ? threads.filter(t => 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.author.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : threads;

  if (categoryLoading) {
    return (
      <div className="min-h-screen w-full pt-24 pb-20 flex items-center justify-center relative overflow-hidden">
        <NodeBackground />
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen w-full pt-24 pb-20 flex items-center justify-center relative overflow-hidden">
        <NodeBackground />
        <Card className="bg-card/50 backdrop-blur border-primary/20 max-w-md">
          <CardContent className="py-12 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {language === "de" ? "Kategorie nicht gefunden" : "Category not found"}
            </h3>
            <Link href="/forum">
              <Button className="mt-4">{language === "de" ? "Zurück zum Forum" : "Back to Forum"}</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full pt-24 pb-20 relative overflow-hidden">
      <NodeBackground />
      
      <div className="max-w-5xl w-full mx-auto px-4 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/forum" className="hover:text-primary transition-colors">
            Forum
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span>{language === "de" ? category.name : category.nameEn}</span>
        </nav>

        {/* Category Header */}
        <Card className="bg-card/50 backdrop-blur border-primary/20 mb-8">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div 
                className="p-4 rounded-xl"
                style={{ backgroundColor: `${category.color}20` }}
              >
                <IconComponent className="w-8 h-8" style={{ color: category.color }} />
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl">
                  {language === "de" ? category.name : category.nameEn}
                </CardTitle>
                <CardDescription className="mt-2">
                  {language === "de" ? category.description : category.descriptionEn}
                </CardDescription>
                <p className="text-sm text-muted-foreground mt-2">
                  {threads.length} {language === "de" ? "Themen" : "topics"}
                </p>
              </div>
              {user && (
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2" data-testid="button-new-thread">
                      <Plus className="w-4 h-4" /> {language === "de" ? "Neues Thema" : "New Topic"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <form onSubmit={handleCreateThread}>
                      <DialogHeader>
                        <DialogTitle>
                          {language === "de" ? "Neues Thema in" : "New Topic in"} {language === "de" ? category.name : category.nameEn}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="thread-title">{language === "de" ? "Titel" : "Title"}</Label>
                          <Input 
                            id="thread-title" 
                            data-testid="input-thread-title"
                            placeholder={language === "de" ? "Worum geht es?" : "What's this about?"}
                            value={newThreadTitle}
                            onChange={(e) => setNewThreadTitle(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="thread-content">{language === "de" ? "Inhalt" : "Content"}</Label>
                          <Textarea 
                            id="thread-content" 
                            data-testid="input-thread-content"
                            placeholder={language === "de" ? "Beschreibe dein Thema..." : "Describe your topic..."}
                            className="min-h-[150px]"
                            value={newThreadContent}
                            onChange={(e) => setNewThreadContent(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" data-testid="button-submit-thread" disabled={createThreadMutation.isPending}>
                          {createThreadMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : null}
                          {language === "de" ? "Thema erstellen" : "Create Topic"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* Search */}
        <div className="flex justify-between items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold">
            {language === "de" ? "Themen" : "Topics"}
          </h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={language === "de" ? "Suchen..." : "Search..."}
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-threads"
            />
          </div>
        </div>

        {/* Threads */}
        {threadsLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredThreads.length === 0 ? (
          <Card className="bg-card/50 backdrop-blur border-primary/20">
            <CardContent className="py-12 text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                {searchQuery 
                  ? (language === "de" ? "Keine Ergebnisse" : "No results")
                  : (language === "de" ? "Noch keine Themen" : "No topics yet")
                }
              </h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? (language === "de" ? "Versuche andere Suchbegriffe." : "Try different search terms.")
                  : (language === "de" ? "Starte die Diskussion!" : "Start the discussion!")
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filteredThreads.map((thread) => (
                <ThreadCard key={thread.id} thread={thread} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8">
          <Link href="/forum">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> {language === "de" ? "Zurück zum Forum" : "Back to Forum"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
