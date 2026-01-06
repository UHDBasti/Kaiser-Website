import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NodeBackground } from "@/components/ui/NodeBackground";
import { CheckCircle2, Phone, Zap, Headphones, X, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import voiceAgentVideo from "@assets/Generated_File_December_04,_2025_-_1_53PM_1764852982434.mp4";
import { useLanguage } from "@/lib/i18n";
import { useConversation } from "@elevenlabs/react";

type ConversationStatus = "idle" | "connecting" | "connected" | "disconnected" | "error";

function VoiceVisualizer({ isSpeaking, volume }: { isSpeaking: boolean; volume: number }) {
  const scale = 1 + (volume * 0.5);
  
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow rings */}
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-primary/20"
        animate={{
          scale: isSpeaking ? [1, 1.3, 1] : 1,
          opacity: isSpeaking ? [0.3, 0.1, 0.3] : 0.2,
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-primary/30"
        animate={{
          scale: isSpeaking ? [1, 1.2, 1] : 1,
          opacity: isSpeaking ? [0.4, 0.2, 0.4] : 0.3,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />
      
      {/* Main circle */}
      <motion.div
        className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30"
        animate={{
          scale: isSpeaking ? scale : 1,
        }}
        transition={{
          duration: 0.1,
          ease: "easeOut",
        }}
      >
        <motion.div
          animate={{
            scale: isSpeaking ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Headphones className="w-10 h-10 text-white" />
        </motion.div>
      </motion.div>
    </div>
  );
}

function VoiceAgentModal({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<ConversationStatus>("idle");
  const [agentSpeaking, setAgentSpeaking] = useState(false);
  const [volume, setVolume] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const volumeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearVolumeInterval = useCallback(() => {
    if (volumeIntervalRef.current) {
      clearInterval(volumeIntervalRef.current);
      volumeIntervalRef.current = null;
    }
  }, []);

  const conversation = useConversation({
    onConnect: () => {
      console.log("Voice agent connected");
      setStatus("connected");
      setError(null);
    },
    onDisconnect: () => {
      console.log("Voice agent disconnected");
      clearVolumeInterval();
      setStatus("disconnected");
      setAgentSpeaking(false);
      setVolume(0);
    },
    onError: (err) => {
      console.error("Voice agent error:", err);
      clearVolumeInterval();
      setError(typeof err === "string" ? err : "Verbindungsfehler");
      setStatus("error");
      setAgentSpeaking(false);
      setVolume(0);
    },
    onModeChange: (mode) => {
      console.log("Mode changed:", mode);
      setAgentSpeaking(mode.mode === "speaking");
    },
  });

  const startConversation = useCallback(async () => {
    try {
      // Clear any existing interval first
      clearVolumeInterval();
      
      setStatus("connecting");
      setError(null);
      setVolume(0);
      setAgentSpeaking(false);

      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Get signed URL from our backend
      const response = await fetch("/api/voice-agent/signed-url");
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to get signed URL");
      }
      const { signedUrl } = await response.json();

      // Start the conversation with signed URL
      await conversation.startSession({ signedUrl });

      // Start volume monitoring with guard check
      volumeIntervalRef.current = setInterval(async () => {
        try {
          if (conversation.status === "connected") {
            const vol = await conversation.getOutputVolume();
            setVolume(vol);
          }
        } catch (e) {
          // Session may have ended, clear interval
          clearVolumeInterval();
        }
      }, 100);

    } catch (err: any) {
      console.error("Failed to start conversation:", err);
      clearVolumeInterval();
      if (err.name === "NotAllowedError") {
        setError("Mikrofon-Zugang wurde verweigert. Bitte erlaube den Zugriff.");
      } else {
        setError(err.message || "Konnte Verbindung nicht herstellen");
      }
      setStatus("error");
    }
  }, [conversation, clearVolumeInterval]);

  const endConversation = useCallback(async () => {
    clearVolumeInterval();
    try {
      await conversation.endSession();
    } catch (e) {
      console.log("End session cleanup:", e);
    }
    setStatus("idle");
    setAgentSpeaking(false);
    setVolume(0);
  }, [conversation, clearVolumeInterval]);

  // Cleanup on unmount or close
  useEffect(() => {
    if (!isOpen && (status === "connected" || status === "connecting")) {
      endConversation();
    }
  }, [isOpen, status, endConversation]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      clearVolumeInterval();
    };
  }, [clearVolumeInterval]);

  const handleClose = async () => {
    if (status === "connected") {
      await endConversation();
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-b from-[#1a1a2e] to-[#16162a] border border-primary/30 rounded-3xl p-10 max-w-lg w-full shadow-2xl relative overflow-hidden"
          >
            {/* Background glow effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              data-testid="button-close-voice-demo"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-8 relative z-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-medium mb-4">
                <Headphones className="w-4 h-4 mr-2" />
                Live Demo
              </div>
              <h3 className="text-3xl font-bold mb-3">Voice Agent Demo</h3>
              <p className="text-muted-foreground">
                {status === "connected" 
                  ? "Sprich jetzt mit dem Voice Agent" 
                  : "Klicke auf Start um die Demo zu beginnen"}
              </p>
            </div>
            
            {/* Voice Visualizer */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[250px]">
              {status === "idle" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <Mic className="w-10 h-10 text-primary" />
                  </div>
                  <Button
                    onClick={startConversation}
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full text-lg font-semibold"
                    data-testid="button-start-voice"
                  >
                    <Mic className="w-5 h-5 mr-2" />
                    Demo starten
                  </Button>
                </motion.div>
              )}

              {status === "connecting" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <Headphones className="w-10 h-10 text-primary" />
                  </div>
                  <p className="text-muted-foreground">Verbinde...</p>
                </motion.div>
              )}

              {status === "connected" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <VoiceVisualizer isSpeaking={agentSpeaking} volume={volume} />
                  
                  <p className="mt-8 text-sm text-muted-foreground">
                    {agentSpeaking ? "Agent spricht..." : "Agent hört zu..."}
                  </p>
                  
                  <Button
                    onClick={endConversation}
                    variant="outline"
                    className="mt-6 border-red-500/50 text-red-400 hover:bg-red-500/10"
                    data-testid="button-end-voice"
                  >
                    <MicOff className="w-4 h-4 mr-2" />
                    Beenden
                  </Button>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
                    <X className="w-10 h-10 text-red-400" />
                  </div>
                  <p className="text-red-400 mb-4">{error}</p>
                  <Button
                    onClick={startConversation}
                    variant="outline"
                    className="border-primary/50"
                    data-testid="button-retry-voice"
                  >
                    Erneut versuchen
                  </Button>
                </motion.div>
              )}

              {status === "disconnected" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                    <Headphones className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground mb-4">Verbindung beendet</p>
                  <Button
                    onClick={startConversation}
                    className="bg-primary hover:bg-primary/90"
                    data-testid="button-restart-voice"
                  >
                    Neu starten
                  </Button>
                </motion.div>
              )}
            </div>
            
            <div className="mt-8 text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <div className={`w-2 h-2 rounded-full ${status === "connected" ? "bg-green-500" : "bg-gray-500"} ${status === "connected" ? "animate-pulse" : ""}`} />
                <span className="text-sm text-muted-foreground">Powered by Eleven Labs Conversational AI</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function VoiceAgents() {
  const { t } = useLanguage();
  const [showVoiceDemo, setShowVoiceDemo] = useState(false);
  
  const features = [
    t("voice.feat.1"),
    t("voice.feat.2"),
    t("voice.feat.3"),
    t("voice.feat.4"),
    t("voice.feat.5"),
    t("voice.feat.6")
  ];

  return (
    <div className="min-h-screen w-full pt-24 pb-20">
      <NodeBackground />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
             <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
                <Phone className="w-4 h-4 mr-2" />
                {t("voice.badge")}
              </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t("voice.hero.title")} <br/>
              <span className="text-primary">{t("voice.hero.title.highlight")}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t("voice.hero.desc")}
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button 
                onClick={() => setShowVoiceDemo(true)}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full flex items-center gap-2 text-lg font-semibold"
                data-testid="button-voice-demo"
              >
                <Headphones className="w-5 h-5" />
                {t("voice.hero.demo")}
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl -z-10" />
            <div className="rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <video 
                    src={voiceAgentVideo} 
                    autoPlay 
                    loop 
                    muted 
                    className="w-full h-full object-cover transform hover:scale-[1.02] transition-transform duration-500"
                />
            </div>
            
            {/* Floating Stat Card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-xl border border-border max-w-xs"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="font-bold text-lg">{t("voice.stats.success")}</div>
              </div>
              <p className="text-sm text-muted-foreground">{t("voice.stats.desc")}</p>
            </motion.div>
          </motion.div>
        </div>

        <div className="bg-card/50 backdrop-blur border border-border rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("voice.features.title")}</h2>
            <p className="text-muted-foreground">{t("voice.features.subtitle")}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-xl hover:bg-primary/5 transition-colors"
              >
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <span className="font-medium text-lg">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Voice Demo Modal */}
      <VoiceAgentModal 
        isOpen={showVoiceDemo} 
        onClose={() => setShowVoiceDemo(false)} 
      />
    </div>
  );
}
