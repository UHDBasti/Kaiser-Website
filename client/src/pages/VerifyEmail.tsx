import { useEffect, useState } from "react";
import { Link, useSearch } from "wouter";
import { NodeBackground } from "@/components/ui/NodeBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function VerifyEmail() {
  const { language } = useLanguage();
  const searchString = useSearch();
  const token = new URLSearchParams(searchString).get("token");
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage(language === "de" ? "Kein Verifizierungstoken gefunden." : "No verification token found.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await res.json();
        
        if (res.ok) {
          setStatus("success");
          setMessage(data.message || (language === "de" ? "E-Mail erfolgreich verifiziert!" : "Email verified successfully!"));
        } else {
          setStatus("error");
          setMessage(data.message || (language === "de" ? "Verifizierung fehlgeschlagen." : "Verification failed."));
        }
      } catch (error) {
        setStatus("error");
        setMessage(language === "de" ? "Ein Fehler ist aufgetreten." : "An error occurred.");
      }
    };

    verifyEmail();
  }, [token, language]);

  return (
    <div className="min-h-screen w-full pt-24 pb-20 flex items-center justify-center relative overflow-hidden">
      <NodeBackground />
      
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -z-10" />

      <Card className="max-w-md w-full mx-4 bg-card/80 backdrop-blur-xl border-white/20 shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {status === "loading" && (
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            )}
            {status === "success" && (
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            )}
            {status === "error" && (
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                <XCircle className="w-8 h-8 text-destructive" />
              </div>
            )}
          </div>
          <CardTitle className="text-2xl">
            {status === "loading" && (language === "de" ? "E-Mail wird verifiziert..." : "Verifying email...")}
            {status === "success" && (language === "de" ? "E-Mail verifiziert!" : "Email Verified!")}
            {status === "error" && (language === "de" ? "Verifizierung fehlgeschlagen" : "Verification Failed")}
          </CardTitle>
          <CardDescription className="mt-2">
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {status === "success" && (
            <>
              <p className="text-muted-foreground">
                {language === "de" 
                  ? "Deine E-Mail-Adresse wurde erfolgreich bestätigt. Du kannst jetzt alle Funktionen des Forums nutzen."
                  : "Your email address has been confirmed. You can now use all forum features."
                }
              </p>
              <Link href="/forum">
                <Button className="w-full" data-testid="button-goto-forum">
                  {language === "de" ? "Zum Forum" : "Go to Forum"}
                </Button>
              </Link>
            </>
          )}
          {status === "error" && (
            <>
              <p className="text-muted-foreground">
                {language === "de" 
                  ? "Der Verifizierungslink ist möglicherweise abgelaufen oder ungültig. Bitte fordere einen neuen Link an."
                  : "The verification link may have expired or is invalid. Please request a new link."
                }
              </p>
              <div className="flex gap-2">
                <Link href="/forum" className="flex-1">
                  <Button variant="outline" className="w-full" data-testid="button-goto-forum">
                    {language === "de" ? "Zum Forum" : "Go to Forum"}
                  </Button>
                </Link>
                <Link href="/" className="flex-1">
                  <Button className="w-full" data-testid="button-goto-home">
                    {language === "de" ? "Startseite" : "Home"}
                  </Button>
                </Link>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
