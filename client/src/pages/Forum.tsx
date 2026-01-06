import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NodeBackground } from "@/components/ui/NodeBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Lock, Mail, User, ArrowRight, MessageSquare, Plus, Eye, Clock, LogOut, Loader2, 
  Workflow, Bot, HelpCircle, Sparkles, Pin, AlertCircle, CheckCircle, Search,
  Home, ChevronRight
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
  sortOrder: number;
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

function AuthForm() {
  const { login, register, error, isLoading } = useAuth();
  const { language } = useLanguage();
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ username: "", email: "", password: "", displayName: "" });
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginForm.username, loginForm.password);
      toast({ 
        title: language === "de" ? "Login erfolgreich!" : "Login successful!", 
        description: language === "de" ? "Willkommen zurück!" : "Welcome back!" 
      });
    } catch (err) {
      toast({ 
        title: language === "de" ? "Fehler" : "Error", 
        description: error || (language === "de" ? "Login fehlgeschlagen" : "Login failed"), 
        variant: "destructive" 
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(registerForm.username, registerForm.email, registerForm.password, registerForm.displayName);
      toast({ 
        title: language === "de" ? "Konto erstellt!" : "Account created!", 
        description: language === "de" ? "Bitte überprüfe deine E-Mail zur Verifizierung." : "Please check your email for verification." 
      });
    } catch (err) {
      toast({ 
        title: language === "de" ? "Fehler" : "Error", 
        description: error || (language === "de" ? "Registrierung fehlgeschlagen" : "Registration failed"), 
        variant: "destructive" 
      });
    }
  };

  return (
    <div className="max-w-md w-full px-4 z-10 mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
          <MessageSquare className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Community Forum</h1>
        <p className="text-muted-foreground">
          {language === "de" 
            ? "Tritt der Diskussion über KI & Automatisierung bei." 
            : "Join the conversation about AI & Automation."
          }
        </p>
      </div>

      <Card className="border-white/20 bg-card/80 backdrop-blur-xl shadow-2xl">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-2">
            <TabsTrigger value="login" data-testid="tab-login">Login</TabsTrigger>
            <TabsTrigger value="register" data-testid="tab-register">
              {language === "de" ? "Registrieren" : "Register"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <CardHeader>
                <CardTitle>{language === "de" ? "Willkommen zurück" : "Welcome back"}</CardTitle>
                <CardDescription>
                  {language === "de" 
                    ? "Melde dich an, um am Forum teilzunehmen." 
                    : "Sign in to participate in the forum."
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">
                    {language === "de" ? "Benutzername" : "Username"}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="username" 
                      data-testid="input-login-username"
                      placeholder={language === "de" ? "dein_username" : "your_username"} 
                      className="pl-9"
                      value={loginForm.username}
                      onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">
                    {language === "de" ? "Passwort" : "Password"}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="password" 
                      data-testid="input-login-password"
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-9"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button className="w-full font-bold" size="lg" type="submit" data-testid="button-login" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                  {language === "de" ? "Anmelden" : "Sign In"} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister}>
              <CardHeader>
                <CardTitle>{language === "de" ? "Konto erstellen" : "Create Account"}</CardTitle>
                <CardDescription>
                  {language === "de" ? "Werde Teil unserer Community." : "Join our community."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-username">
                    {language === "de" ? "Benutzername" : "Username"}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="reg-username" 
                      data-testid="input-register-username"
                      placeholder={language === "de" ? "dein_username" : "your_username"} 
                      className="pl-9"
                      value={registerForm.username}
                      onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-displayName">
                    {language === "de" ? "Anzeigename (optional)" : "Display Name (optional)"}
                  </Label>
                  <Input 
                    id="reg-displayName" 
                    data-testid="input-register-displayname"
                    placeholder="Max Mustermann"
                    value={registerForm.displayName}
                    onChange={(e) => setRegisterForm({ ...registerForm, displayName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">E-Mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="reg-email" 
                      data-testid="input-register-email"
                      type="email"
                      placeholder="hello@example.com" 
                      className="pl-9"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">
                    {language === "de" ? "Passwort" : "Password"}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="reg-password" 
                      data-testid="input-register-password"
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-9"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {language === "de" 
                    ? "Nach der Registrierung erhältst du eine E-Mail zur Verifizierung."
                    : "After registration, you'll receive a verification email."
                  }
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full font-bold" size="lg" type="submit" data-testid="button-register" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                  {language === "de" ? "Konto erstellen" : "Create Account"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

function CategoryCard({ category, threadCount }: { category: Category; threadCount: number }) {
  const { language } = useLanguage();
  const IconComponent = iconMap[category.icon] || MessageSquare;
  
  return (
    <Link href={`/forum/category/${category.slug}`}>
      <Card 
        className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all cursor-pointer group h-full"
        data-testid={`category-card-${category.slug}`}
      >
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div 
              className="p-3 rounded-xl group-hover:scale-110 transition-transform"
              style={{ backgroundColor: `${category.color}20` }}
            >
              <IconComponent className="w-6 h-6" style={{ color: category.color }} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {language === "de" ? category.name : category.nameEn}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {language === "de" ? category.description : category.descriptionEn}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {threadCount} {language === "de" ? "Themen" : "topics"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

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
                  {thread.category && (
                    <Badge 
                      variant="outline" 
                      style={{ borderColor: thread.category.color, color: thread.category.color }}
                    >
                      {language === "de" ? thread.category.name : thread.category.nameEn}
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

function ForumContent() {
  const { user, logout } = useAuth();
  const { language } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadContent, setNewThreadContent] = useState("");
  const [newThreadCategory, setNewThreadCategory] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: ["forum", "categories"],
    queryFn: async () => {
      const res = await fetch("/api/forum/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
  });

  // Initialize categories on first load
  useEffect(() => {
    if (categoriesData?.categories?.length === 0) {
      fetch("/api/forum/categories/init", { method: "POST" })
        .then(() => queryClient.invalidateQueries({ queryKey: ["forum", "categories"] }))
        .catch(console.error);
    }
  }, [categoriesData?.categories?.length, queryClient]);

  // Fetch threads
  const { data: threadsData, isLoading } = useQuery({
    queryKey: ["forum", "threads"],
    queryFn: async () => {
      const res = await fetch("/api/forum/threads");
      if (!res.ok) throw new Error("Failed to fetch threads");
      return res.json();
    },
  });

  const createThreadMutation = useMutation({
    mutationFn: async ({ title, content, categoryId }: { title: string; content: string; categoryId?: string }) => {
      const threadRes = await fetch("/api/forum/threads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, categoryId: categoryId || null }),
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
    onSuccess: (thread) => {
      queryClient.invalidateQueries({ queryKey: ["forum", "threads"] });
      toast({ 
        title: language === "de" ? "Thread erstellt!" : "Thread created!", 
        description: language === "de" ? "Dein Thema wurde erfolgreich gepostet." : "Your topic was successfully posted."
      });
      setNewThreadTitle("");
      setNewThreadContent("");
      setNewThreadCategory("");
      setDialogOpen(false);
      setLocation(`/forum/thread/${thread.id}`);
    },
    onError: (err: Error) => {
      if (err.message.includes("E-Mail-Verifizierung") || err.message.includes("EMAIL_NOT_VERIFIED")) {
        setDialogOpen(false);
        toast({ 
          title: language === "de" ? "E-Mail-Verifizierung erforderlich" : "Email Verification Required",
          description: language === "de" 
            ? "Bitte verifiziere deine E-Mail-Adresse, um im Forum schreiben zu können. Klicke auf 'Verifizierung erneut senden'." 
            : "Please verify your email address to post in the forum. Click 'Resend Verification'.",
          variant: "destructive",
        });
      } else {
        toast({ title: language === "de" ? "Fehler" : "Error", description: err.message, variant: "destructive" });
      }
    },
  });

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThreadTitle.trim() || !newThreadContent.trim()) return;
    createThreadMutation.mutate({ 
      title: newThreadTitle, 
      content: newThreadContent,
      categoryId: newThreadCategory || undefined
    });
  };

  const handleLogout = async () => {
    await logout();
    toast({ 
      title: language === "de" ? "Abgemeldet" : "Logged out", 
      description: language === "de" ? "Bis bald!" : "See you soon!" 
    });
  };

  const resendVerificationMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/resend-verification", { method: "POST" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to resend verification");
      }
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: language === "de" ? "Verifizierungs-E-Mail gesendet!" : "Verification email sent!",
        description: language === "de" 
          ? "Bitte überprüfe deinen Posteingang und klicke auf den Verifizierungslink. Danach kannst du im Forum schreiben." 
          : "Please check your inbox and click the verification link. After that, you can post in the forum.",
      });
    },
    onError: (err: Error) => {
      toast({ 
        title: language === "de" ? "Fehler" : "Error", 
        description: err.message, 
        variant: "destructive" 
      });
    },
  });

  const categories: Category[] = categoriesData?.categories || [];
  const threads: Thread[] = threadsData?.threads || [];

  // Filter threads by search query
  const filteredThreads = searchQuery 
    ? threads.filter(t => 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.author.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : threads;

  // Count threads per category
  const threadCountByCategory = threads.reduce((acc, t) => {
    if (t.categoryId) {
      acc[t.categoryId] = (acc[t.categoryId] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="max-w-6xl w-full px-4 z-10 mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Community Forum</h1>
          <p className="text-muted-foreground">
            {language === "de" ? "Willkommen" : "Welcome"},{" "}
            <span className="text-primary font-medium">{user?.displayName || user?.username}</span>!
            {!user?.emailVerified && (
              <span className="text-yellow-500 text-sm ml-2">
                ({language === "de" ? "E-Mail nicht verifiziert" : "Email not verified"})
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {!user?.emailVerified ? (
            <Button 
              className="gap-2" 
              variant="outline" 
              onClick={() => resendVerificationMutation.mutate()}
              disabled={resendVerificationMutation.isPending}
              data-testid="button-resend-verification"
            >
              {resendVerificationMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <AlertCircle className="w-4 h-4 text-yellow-500" />
              )}
              {language === "de" ? "Verifizierung erneut senden" : "Resend Verification"}
            </Button>
          ) : (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2" data-testid="button-new-thread">
                  <Plus className="w-4 h-4" /> {language === "de" ? "Neues Thema" : "New Topic"}
                </Button>
              </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <form onSubmit={handleCreateThread}>
                <DialogHeader>
                  <DialogTitle>{language === "de" ? "Neues Thema erstellen" : "Create New Topic"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="thread-category">{language === "de" ? "Kategorie" : "Category"}</Label>
                    <Select value={newThreadCategory} onValueChange={setNewThreadCategory}>
                      <SelectTrigger data-testid="select-thread-category">
                        <SelectValue placeholder={language === "de" ? "Kategorie wählen..." : "Select category..."} />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {language === "de" ? cat.name : cat.nameEn}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
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
          <Button variant="outline" onClick={handleLogout} className="gap-2" data-testid="button-logout">
            <LogOut className="w-4 h-4" /> {language === "de" ? "Abmelden" : "Logout"}
          </Button>
        </div>
      </div>

      {/* Categories Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Home className="w-5 h-5" />
          {language === "de" ? "Kategorien" : "Categories"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryCard 
              key={category.id} 
              category={category} 
              threadCount={threadCountByCategory[category.id] || 0}
            />
          ))}
        </div>
      </section>

      {/* Recent Threads Section */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            {language === "de" ? "Neueste Themen" : "Recent Topics"}
          </h2>
          <div className="relative w-full sm:w-64">
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

        {isLoading ? (
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
              <p className="text-muted-foreground mb-4">
                {searchQuery 
                  ? (language === "de" ? "Versuche andere Suchbegriffe." : "Try different search terms.")
                  : (language === "de" ? "Starte die Diskussion mit einem neuen Thema!" : "Start the discussion with a new topic!")
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
      </section>
    </div>
  );
}

export default function Forum() {
  const { user, isLoading } = useAuth();

  return (
    <div className="min-h-screen w-full pt-24 pb-20 relative overflow-hidden">
      <NodeBackground />
      
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -z-10" />

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : user ? (
        <ForumContent />
      ) : (
        <div className="flex items-center justify-center min-h-[60vh]">
          <AuthForm />
        </div>
      )}
    </div>
  );
}
