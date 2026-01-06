import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useParams, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NodeBackground } from "@/components/ui/NodeBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ArrowLeft, MessageSquare, Eye, Clock, Loader2, Lock, Pin, Edit, Trash2,
  ChevronRight, Send, SmilePlus, AlertTriangle
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useLanguage } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: string;
  threadId: string;
  authorId: string;
  content: string;
  isEdited: boolean;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    username: string;
    displayName: string | null;
    avatarUrl: string | null;
  };
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
  category: {
    id: string;
    name: string;
    nameEn: string;
    slug: string;
    color: string;
  } | null;
}

const EMOJI_LIST = ["👍", "👎", "❤️", "🎉", "😄", "🤔", "👀", "🚀", "💡", "✅", "❌", "🔥", "⭐", "💯", "🙏", "👏"];

function EmojiPicker({ onSelect, onClose }: { onSelect: (emoji: string) => void; onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute bottom-full left-0 mb-2 p-2 bg-card border border-border rounded-lg shadow-xl grid grid-cols-8 gap-1 z-50"
    >
      {EMOJI_LIST.map((emoji) => (
        <button
          key={emoji}
          onClick={() => { onSelect(emoji); onClose(); }}
          className="w-8 h-8 flex items-center justify-center hover:bg-primary/20 rounded transition-colors text-lg"
          data-testid={`emoji-${emoji}`}
        >
          {emoji}
        </button>
      ))}
    </motion.div>
  );
}

function PostCard({ 
  post, 
  isFirstPost,
  canEdit,
  onEdit,
  onDelete
}: { 
  post: Post; 
  isFirstPost: boolean;
  canEdit: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { language } = useLanguage();
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(language === "de" ? "de-DE" : "en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (name: string) => {
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className={`bg-card/50 backdrop-blur border-primary/20 ${isFirstPost ? 'border-l-4 border-l-primary' : ''}`}>
        <CardContent className="pt-4">
          <div className="flex gap-4">
            <Avatar className="w-10 h-10 shrink-0">
              <AvatarFallback className="bg-primary/20 text-primary font-medium">
                {getInitials(post.author.displayName || post.author.username)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-primary">
                    {post.author.displayName || post.author.username}
                  </span>
                  {isFirstPost && (
                    <Badge variant="secondary" className="text-xs">
                      {language === "de" ? "Autor" : "Author"}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(post.createdAt)}
                  </span>
                  {post.isEdited && (
                    <span className="text-xs text-muted-foreground">
                      ({language === "de" ? "bearbeitet" : "edited"})
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-3 prose prose-invert max-w-none text-foreground/90 whitespace-pre-wrap">
                {post.content}
              </div>
              {canEdit && (
                <div className="flex gap-2 mt-4 pt-4 border-t border-border/50">
                  <Button variant="ghost" size="sm" onClick={onEdit} className="gap-1" data-testid={`button-edit-post-${post.id}`}>
                    <Edit className="w-4 h-4" /> {language === "de" ? "Bearbeiten" : "Edit"}
                  </Button>
                  {!isFirstPost && (
                    <Button variant="ghost" size="sm" onClick={onDelete} className="gap-1 text-destructive hover:text-destructive" data-testid={`button-delete-post-${post.id}`}>
                      <Trash2 className="w-4 h-4" /> {language === "de" ? "Löschen" : "Delete"}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ThreadDetail() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { language } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const [replyContent, setReplyContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editContent, setEditContent] = useState("");
  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const [deleteThreadDialog, setDeleteThreadDialog] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["forum", "thread", params.id],
    queryFn: async () => {
      const res = await fetch(`/api/forum/threads/${params.id}`);
      if (!res.ok) throw new Error("Thread not found");
      return res.json();
    },
    enabled: !!params.id,
  });

  const createPostMutation = useMutation({
    mutationFn: async (content: string) => {
      const res = await fetch("/api/forum/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadId: params.id, content }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create post");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum", "thread", params.id] });
      setReplyContent("");
      toast({ 
        title: language === "de" ? "Antwort gepostet!" : "Reply posted!",
        description: language === "de" ? "Deine Antwort wurde hinzugefügt." : "Your reply has been added."
      });
    },
    onError: (err: Error) => {
      toast({ title: language === "de" ? "Fehler" : "Error", description: err.message, variant: "destructive" });
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: async ({ postId, content }: { postId: string; content: string }) => {
      const res = await fetch(`/api/forum/posts/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update post");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum", "thread", params.id] });
      setEditingPost(null);
      setEditContent("");
      toast({ 
        title: language === "de" ? "Beitrag aktualisiert!" : "Post updated!",
        description: language === "de" ? "Dein Beitrag wurde bearbeitet." : "Your post has been edited."
      });
    },
    onError: (err: Error) => {
      toast({ title: language === "de" ? "Fehler" : "Error", description: err.message, variant: "destructive" });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (postId: string) => {
      const res = await fetch(`/api/forum/posts/${postId}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete post");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum", "thread", params.id] });
      setDeletePostId(null);
      toast({ 
        title: language === "de" ? "Beitrag gelöscht!" : "Post deleted!",
        description: language === "de" ? "Dein Beitrag wurde entfernt." : "Your post has been removed."
      });
    },
    onError: (err: Error) => {
      toast({ title: language === "de" ? "Fehler" : "Error", description: err.message, variant: "destructive" });
    },
  });

  const deleteThreadMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/forum/threads/${params.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete thread");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum", "threads"] });
      toast({ 
        title: language === "de" ? "Thread gelöscht!" : "Thread deleted!",
        description: language === "de" ? "Das Thema wurde entfernt." : "The topic has been removed."
      });
      setLocation("/forum");
    },
    onError: (err: Error) => {
      toast({ title: language === "de" ? "Fehler" : "Error", description: err.message, variant: "destructive" });
    },
  });

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    createPostMutation.mutate(replyContent);
  };

  const handleEmojiSelect = (emoji: string) => {
    setReplyContent(prev => prev + emoji);
    textareaRef.current?.focus();
  };

  const thread: Thread | undefined = data?.thread;
  const posts: Post[] = data?.posts || [];

  if (isLoading) {
    return (
      <div className="min-h-screen w-full pt-24 pb-20 flex items-center justify-center relative overflow-hidden">
        <NodeBackground />
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !thread) {
    return (
      <div className="min-h-screen w-full pt-24 pb-20 flex items-center justify-center relative overflow-hidden">
        <NodeBackground />
        <Card className="bg-card/50 backdrop-blur border-primary/20 max-w-md">
          <CardContent className="py-12 text-center">
            <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {language === "de" ? "Thread nicht gefunden" : "Thread not found"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {language === "de" ? "Dieses Thema existiert nicht oder wurde gelöscht." : "This topic doesn't exist or has been deleted."}
            </p>
            <Link href="/forum">
              <Button>{language === "de" ? "Zurück zum Forum" : "Back to Forum"}</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isAuthor = user?.id === thread.authorId;

  return (
    <div className="min-h-screen w-full pt-24 pb-20 relative overflow-hidden">
      <NodeBackground />
      
      <div className="max-w-4xl w-full mx-auto px-4 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/forum" className="hover:text-primary transition-colors">
            Forum
          </Link>
          <ChevronRight className="w-4 h-4" />
          {thread.category && (
            <>
              <Link href={`/forum/category/${thread.category.slug}`} className="hover:text-primary transition-colors">
                {language === "de" ? thread.category.name : thread.category.nameEn}
              </Link>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
          <span className="truncate max-w-[200px]">{thread.title}</span>
        </nav>

        {/* Thread Header */}
        <Card className="bg-card/50 backdrop-blur border-primary/20 mb-6">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-2">
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
                    <Badge variant="outline" style={{ borderColor: thread.category.color, color: thread.category.color }}>
                      {language === "de" ? thread.category.name : thread.category.nameEn}
                    </Badge>
                  )}
                </div>
                <h1 className="text-2xl font-bold">{thread.title}</h1>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" /> {thread.views} {language === "de" ? "Aufrufe" : "views"}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" /> {posts.length} {language === "de" ? "Antworten" : "replies"}
                  </span>
                </div>
              </div>
              {isAuthor && (
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => setDeleteThreadDialog(true)}
                  data-testid="button-delete-thread"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  {language === "de" ? "Löschen" : "Delete"}
                </Button>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* Posts */}
        <div className="space-y-4 mb-8">
          {posts.map((post, index) => (
            <PostCard 
              key={post.id} 
              post={post}
              isFirstPost={index === 0}
              canEdit={user?.id === post.authorId}
              onEdit={() => {
                setEditingPost(post);
                setEditContent(post.content);
              }}
              onDelete={() => setDeletePostId(post.id)}
            />
          ))}
        </div>

        {/* Reply Form */}
        {user && !thread.isLocked ? (
          <Card className="bg-card/50 backdrop-blur border-primary/20">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmitReply}>
                <h3 className="font-semibold mb-4">
                  {language === "de" ? "Antwort schreiben" : "Write a Reply"}
                </h3>
                <div className="relative">
                  <Textarea
                    ref={textareaRef}
                    placeholder={language === "de" ? "Deine Antwort..." : "Your reply..."}
                    className="min-h-[120px] mb-4"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    data-testid="input-reply-content"
                  />
                  <div className="relative inline-block">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="absolute bottom-6 left-2"
                      data-testid="button-emoji-picker"
                    >
                      <SmilePlus className="w-5 h-5" />
                    </Button>
                    {showEmojiPicker && (
                      <EmojiPicker 
                        onSelect={handleEmojiSelect} 
                        onClose={() => setShowEmojiPicker(false)} 
                      />
                    )}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit" disabled={createPostMutation.isPending || !replyContent.trim()} data-testid="button-submit-reply">
                    {createPostMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                    {language === "de" ? "Antwort senden" : "Send Reply"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : thread.isLocked ? (
          <Card className="bg-yellow-500/10 border-yellow-500/20">
            <CardContent className="py-6 text-center">
              <Lock className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-yellow-500">
                {language === "de" ? "Dieses Thema ist geschlossen. Antworten sind nicht möglich." : "This topic is locked. Replies are not allowed."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-card/50 backdrop-blur border-primary/20">
            <CardContent className="py-6 text-center">
              <p className="text-muted-foreground">
                {language === "de" ? "Melde dich an, um zu antworten." : "Sign in to reply."}
              </p>
              <Link href="/forum">
                <Button variant="outline" className="mt-4">
                  {language === "de" ? "Zum Login" : "Go to Login"}
                </Button>
              </Link>
            </CardContent>
          </Card>
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

      {/* Edit Post Dialog */}
      <Dialog open={!!editingPost} onOpenChange={(open) => !open && setEditingPost(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{language === "de" ? "Beitrag bearbeiten" : "Edit Post"}</DialogTitle>
          </DialogHeader>
          <Textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="min-h-[150px]"
            data-testid="input-edit-content"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingPost(null)}>
              {language === "de" ? "Abbrechen" : "Cancel"}
            </Button>
            <Button 
              onClick={() => editingPost && updatePostMutation.mutate({ postId: editingPost.id, content: editContent })}
              disabled={updatePostMutation.isPending}
              data-testid="button-save-edit"
            >
              {updatePostMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : null}
              {language === "de" ? "Speichern" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Post Dialog */}
      <Dialog open={!!deletePostId} onOpenChange={(open) => !open && setDeletePostId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{language === "de" ? "Beitrag löschen" : "Delete Post"}</DialogTitle>
            <DialogDescription>
              {language === "de" 
                ? "Bist du sicher, dass du diesen Beitrag löschen möchtest? Diese Aktion kann nicht rückgängig gemacht werden."
                : "Are you sure you want to delete this post? This action cannot be undone."
              }
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletePostId(null)}>
              {language === "de" ? "Abbrechen" : "Cancel"}
            </Button>
            <Button 
              variant="destructive"
              onClick={() => deletePostId && deletePostMutation.mutate(deletePostId)}
              disabled={deletePostMutation.isPending}
              data-testid="button-confirm-delete-post"
            >
              {deletePostMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : null}
              {language === "de" ? "Löschen" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Thread Dialog */}
      <Dialog open={deleteThreadDialog} onOpenChange={setDeleteThreadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{language === "de" ? "Thread löschen" : "Delete Thread"}</DialogTitle>
            <DialogDescription>
              {language === "de" 
                ? "Bist du sicher, dass du dieses Thema und alle Antworten löschen möchtest? Diese Aktion kann nicht rückgängig gemacht werden."
                : "Are you sure you want to delete this topic and all replies? This action cannot be undone."
              }
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteThreadDialog(false)}>
              {language === "de" ? "Abbrechen" : "Cancel"}
            </Button>
            <Button 
              variant="destructive"
              onClick={() => deleteThreadMutation.mutate()}
              disabled={deleteThreadMutation.isPending}
              data-testid="button-confirm-delete-thread"
            >
              {deleteThreadMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : null}
              {language === "de" ? "Thread löschen" : "Delete Thread"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
