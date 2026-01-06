import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import voiceImage from "@assets/generated_images/cute_robot_agents_handling_calls.png";

export function VoiceAgentAnimation() {
  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden flex items-end justify-center bg-gradient-to-b from-transparent to-primary/10">
      {/* Background Phone UI Element */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 z-0"
      >
        <img 
            src={voiceImage} 
            alt="Robot Agent" 
            className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </motion.div>

      {/* Floating Call Interface */}
      <motion.div
         initial={{ scale: 0.8, opacity: 0, y: 50 }}
         whileInView={{ scale: 1, opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ delay: 0.5, type: "spring" }}
         className="relative z-10 bg-card/90 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl mb-12 w-64"
      >
          <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
                  <Phone className="w-6 h-6 text-green-500" />
              </div>
              <div>
                  <div className="font-bold text-white">Incoming Call</div>
                  <div className="text-xs text-gray-400">AI Assistant Active</div>
              </div>
          </div>
          <div className="space-y-2">
               <div className="h-2 bg-gray-700 rounded-full w-3/4 animate-pulse" />
               <div className="h-2 bg-gray-700 rounded-full w-1/2 animate-pulse" />
          </div>
      </motion.div>
    </div>
  );
}
