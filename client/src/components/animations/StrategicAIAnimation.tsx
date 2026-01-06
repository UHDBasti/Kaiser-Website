import { motion } from "framer-motion";
import { Bot, Database, Server, Search, Network, Cpu } from "lucide-react";

export function StrategicAIAnimation() {
  return (
    <div className="relative w-full h-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
       {/* Grid Background */}
       <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

       <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Connection Lines */}
          <motion.line 
            x1="20%" y1="20%" x2="50%" y2="50%" 
            stroke="#444" strokeWidth="2" 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
          />
          <motion.line 
            x1="80%" y1="20%" x2="50%" y2="50%" 
            stroke="#444" strokeWidth="2" 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
          />
          <motion.line 
            x1="20%" y1="80%" x2="50%" y2="50%" 
            stroke="#444" strokeWidth="2" 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
          />
          <motion.line 
            x1="80%" y1="80%" x2="50%" y2="50%" 
            stroke="#444" strokeWidth="2" 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
          />
       </svg>

       {/* Central AI Hub */}
       <motion.div 
         className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
         animate={{ scale: [1, 1.1, 1], boxShadow: ["0 0 20px rgba(59, 130, 246, 0.2)", "0 0 40px rgba(59, 130, 246, 0.5)", "0 0 20px rgba(59, 130, 246, 0.2)"] }}
         transition={{ duration: 3, repeat: Infinity }}
       >
          <div className="w-24 h-24 bg-blue-600/20 backdrop-blur-xl border border-blue-500 rounded-full flex items-center justify-center">
             <Bot className="w-10 h-10 text-blue-400" />
          </div>
       </motion.div>

       {/* Satellite Nodes */}
       {/* Storage */}
       <motion.div className="absolute left-[20%] top-[20%] -translate-x-1/2 -translate-y-1/2 z-10">
           <div className="flex flex-col items-center gap-2">
               <div className="w-16 h-16 bg-[#222] border border-white/10 rounded-xl flex items-center justify-center">
                   <Database className="w-6 h-6 text-green-400" />
               </div>
               <span className="text-xs text-gray-400">Data Warehouse</span>
           </div>
       </motion.div>

       {/* Management */}
       <motion.div className="absolute left-[80%] top-[20%] -translate-x-1/2 -translate-y-1/2 z-10">
           <div className="flex flex-col items-center gap-2">
               <div className="w-16 h-16 bg-[#222] border border-white/10 rounded-xl flex items-center justify-center">
                   <Server className="w-6 h-6 text-purple-400" />
               </div>
               <span className="text-xs text-gray-400">Management</span>
           </div>
       </motion.div>

       {/* Search/Analysis */}
       <motion.div className="absolute left-[20%] top-[80%] -translate-x-1/2 -translate-y-1/2 z-10">
           <div className="flex flex-col items-center gap-2">
               <div className="w-16 h-16 bg-[#222] border border-white/10 rounded-xl flex items-center justify-center">
                   <Search className="w-6 h-6 text-orange-400" />
               </div>
               <span className="text-xs text-gray-400">Analysis</span>
           </div>
       </motion.div>

       {/* Network */}
       <motion.div className="absolute left-[80%] top-[80%] -translate-x-1/2 -translate-y-1/2 z-10">
           <div className="flex flex-col items-center gap-2">
               <div className="w-16 h-16 bg-[#222] border border-white/10 rounded-xl flex items-center justify-center">
                   <Network className="w-6 h-6 text-cyan-400" />
               </div>
               <span className="text-xs text-gray-400">Distribution</span>
           </div>
       </motion.div>

    </div>
  );
}
