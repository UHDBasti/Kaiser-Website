import { motion, Variants } from "framer-motion";
import { Bot, Webhook, Database, Calendar, Sparkles, Plus } from "lucide-react";

export function N8NFlowAnimation() {
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.5, delayChildren: 0.3 }
    }
  };

  const nodeVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 }
    }
  };

  const lineVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 1, ease: "easeInOut" }
    }
  };

  return (
    <div className="relative w-full h-full bg-[#222222] flex items-center justify-center overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)', backgroundSize: '20px 20px' }} />

      <motion.div 
        className="relative w-full max-w-4xl h-full flex items-center justify-center transform scale-110"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
           {/* Main Horizontal Line */}
           <motion.line x1="20" y1="40" x2="50" y2="40" stroke="#666" strokeWidth="0.5" variants={lineVariants} />
           <motion.line x1="50" y1="40" x2="80" y2="40" stroke="#666" strokeWidth="0.5" variants={lineVariants} />

           {/* Branching Lines */}
           <motion.path d="M 50 45 Q 50 65 25 75" stroke="#666" strokeWidth="0.3" strokeDasharray="1,1" fill="none" variants={lineVariants} />
           <motion.path d="M 50 45 Q 50 65 40 75" stroke="#666" strokeWidth="0.3" strokeDasharray="1,1" fill="none" variants={lineVariants} />
           <motion.path d="M 50 45 Q 50 65 60 75" stroke="#666" strokeWidth="0.3" strokeDasharray="1,1" fill="none" variants={lineVariants} />
           <motion.path d="M 50 45 Q 50 65 75 75" stroke="#666" strokeWidth="0.3" strokeDasharray="1,1" fill="none" variants={lineVariants} />
        </svg>

        {/* 1. AI Agent (Center - Appears First) */}
        <motion.div 
          className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 z-20"
          variants={nodeVariants}
        >
          <div className="bg-[#333] border border-white/20 rounded-lg p-4 w-64 shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <Bot className="w-8 h-8 text-white" />
              <span className="font-bold text-white text-lg">AI Agent</span>
            </div>
            <div className="flex justify-around mt-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full" />
                <div className="w-2 h-2 bg-gray-500 rounded-full" />
                <div className="w-2 h-2 bg-gray-500 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* 2. Webhook (Left) */}
        <motion.div 
          className="absolute left-[20%] top-[40%] -translate-x-1/2 -translate-y-1/2 z-10"
          variants={nodeVariants}
        >
          <div className="bg-[#333] border border-white/20 rounded-lg p-4 w-40 shadow-lg">
            <div className="flex flex-col items-center gap-2">
              <Webhook className="w-10 h-10 text-white" />
              <span className="font-medium text-white">Webhook</span>
            </div>
          </div>
        </motion.div>

        {/* 3. Respond to Webhook (Right) */}
        <motion.div 
          className="absolute left-[80%] top-[40%] -translate-x-1/2 -translate-y-1/2 z-10"
          variants={nodeVariants}
        >
           <div className="bg-[#333] border border-white/20 rounded-lg p-4 w-40 shadow-lg">
            <div className="flex flex-col items-center gap-2">
              <Webhook className="w-10 h-10 text-white rotate-180" />
              <span className="font-medium text-white">Respond</span>
            </div>
          </div>
        </motion.div>

        {/* 4. Sub Nodes (Bottom Row) */}
        {/* Anthropic */}
        <motion.div className="absolute left-[25%] top-[75%] -translate-x-1/2 -translate-y-1/2 z-10" variants={nodeVariants}>
            <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-[#333] border border-white/20 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-8 h-8 text-purple-400" />
                </div>
                <span className="text-sm text-gray-400 text-center font-medium">Claude 3.5</span>
            </div>
        </motion.div>

        {/* Memory */}
        <motion.div className="absolute left-[40%] top-[75%] -translate-x-1/2 -translate-y-1/2 z-10" variants={nodeVariants}>
             <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-[#333] border border-white/20 flex items-center justify-center shadow-lg">
                    <Database className="w-8 h-8 text-blue-400" />
                </div>
                <span className="text-sm text-gray-400 text-center font-medium">Memory</span>
            </div>
        </motion.div>
        
        {/* Google Calendar Get */}
        <motion.div className="absolute left-[60%] top-[75%] -translate-x-1/2 -translate-y-1/2 z-10" variants={nodeVariants}>
             <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-[#333] border border-white/20 flex items-center justify-center shadow-lg">
                    <Calendar className="w-8 h-8 text-green-500" />
                </div>
                <span className="text-sm text-gray-400 text-center font-medium">Get Events</span>
            </div>
        </motion.div>

        {/* Google Calendar Create */}
        <motion.div className="absolute left-[75%] top-[75%] -translate-x-1/2 -translate-y-1/2 z-10" variants={nodeVariants}>
             <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-[#333] border border-white/20 flex items-center justify-center shadow-lg">
                    <Plus className="w-8 h-8 text-blue-500" />
                </div>
                <span className="text-sm text-gray-400 text-center font-medium">Create Event</span>
            </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
