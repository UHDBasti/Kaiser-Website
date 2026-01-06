import { motion } from "framer-motion";
import { Zap, ArrowRight, CheckCircle } from "lucide-react";

export function ProcessOptimizationAnimation() {
  return (
    <div className="relative w-full h-full bg-[#111] flex items-center justify-center overflow-hidden">
       {/* Flow Stream Background */}
       <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 20 }).map((_, i) => (
             <motion.div
                key={i}
                className="absolute h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
                style={{
                    top: `${Math.random() * 100}%`,
                    left: '-10%',
                    width: '20%',
                }}
                animate={{
                    left: '110%',
                }}
                transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: Math.random() * 2
                }}
             />
          ))}
       </div>

       {/* Central Process Line */}
       <div className="relative z-10 flex items-center gap-8">
           {/* Step 1 */}
           <motion.div 
              initial={{ opacity: 0.5, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              className="w-20 h-20 rounded-2xl border-2 border-white/10 bg-[#222] flex items-center justify-center"
           >
               <span className="text-2xl font-bold text-gray-500">A</span>
           </motion.div>

           <ArrowRight className="w-8 h-8 text-gray-600" />

           {/* Bottleneck / Optimization Point */}
           <motion.div 
              className="w-24 h-24 rounded-full border-2 border-yellow-500/50 bg-yellow-500/10 flex items-center justify-center relative"
           >
               <motion.div 
                 className="absolute inset-0 rounded-full border border-yellow-400"
                 animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                 transition={{ duration: 1.5, repeat: Infinity }}
               />
               <Zap className="w-10 h-10 text-yellow-400" />
           </motion.div>

           <ArrowRight className="w-8 h-8 text-gray-600" />

           {/* Step 3 - Success */}
           <motion.div 
              initial={{ opacity: 0.5, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 1 }}
              className="w-20 h-20 rounded-2xl border-2 border-green-500/30 bg-green-500/10 flex items-center justify-center"
           >
               <CheckCircle className="w-10 h-10 text-green-500" />
           </motion.div>
       </div>
    </div>
  );
}
