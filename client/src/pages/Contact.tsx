import { useState } from "react";
import { motion } from "framer-motion";
import { NodeBackground } from "@/components/ui/NodeBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function Contact() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.message || (language === "de" ? "Ein Fehler ist aufgetreten." : "An error occurred."));
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(language === "de" ? "Verbindungsfehler. Bitte versuchen Sie es später erneut." : "Connection error. Please try again later.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    if (status === "error") setStatus("idle");
  };

  return (
    <div className="min-h-screen w-full pt-24 pb-20 relative overflow-hidden">
      <NodeBackground />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
            data-testid="text-contact-title"
          >
            {t("contact.title")}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            {t("contact.desc")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid gap-6">
              <Card className="bg-card/50 backdrop-blur border-primary/20">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle>{t("contact.email")}</CardTitle>
                    <a 
                      href="mailto:Service-Kaiser@proton.me" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                      data-testid="link-email-contact"
                    >
                      Service-Kaiser@proton.me
                    </a>
                  </div>
                </CardHeader>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-primary/20">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle>{t("contact.location")}</CardTitle>
                    <p className="text-muted-foreground">Lübeck, 23568<br />Deutschland</p>
                  </div>
                </CardHeader>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-primary/20">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">
                    {language === "de" ? (
                      <>
                        <strong>Schnelle Kontaktaufnahme:</strong> Nutzen Sie unser Kontaktformular oder schreiben Sie uns direkt eine E-Mail. 
                        Wir antworten in der Regel innerhalb von 24 Stunden.
                      </>
                    ) : (
                      <>
                        <strong>Rapid Contact:</strong> Use our contact form or write us directly via email. 
                        We typically respond within 24 hours.
                      </>
                    )}
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardHeader>
                <CardTitle>{t("contact.form.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      {language === "de" ? "Nachricht gesendet!" : "Message Sent!"}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {language === "de" 
                        ? "Vielen Dank für Ihre Nachricht. Wir werden uns innerhalb von 24 Stunden bei Ihnen melden."
                        : "Thank you for your message. We will get back to you within 24 hours."
                      }
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setStatus("idle")}
                      data-testid="button-send-another"
                    >
                      {language === "de" ? "Weitere Nachricht senden" : "Send Another Message"}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-contact">
                    {status === "error" && (
                      <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm">{errorMessage}</span>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium">{t("contact.form.firstName")}</label>
                        <Input 
                          id="firstName" 
                          placeholder="Max" 
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          data-testid="input-firstName"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium">{t("contact.form.lastName")}</label>
                        <Input 
                          id="lastName" 
                          placeholder="Mustermann"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          data-testid="input-lastName"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">{t("contact.email")}</label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="max@beispiel.de"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        data-testid="input-email"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">{t("contact.form.message")}</label>
                      <Textarea 
                        id="message" 
                        placeholder={t("contact.form.placeholder.msg")} 
                        className="min-h-[150px]"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        minLength={10}
                        data-testid="input-message"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg" 
                      disabled={status === "loading"}
                      data-testid="button-submit-contact"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {language === "de" ? "Wird gesendet..." : "Sending..."}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          {t("contact.form.send")}
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
