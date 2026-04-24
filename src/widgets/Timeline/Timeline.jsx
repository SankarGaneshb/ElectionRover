import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock, Activity } from 'lucide-react';

const MILESTONES = [
  { id: 1, title: "Pre-Poll Prep", date: "Month -6", status: "completed" },
  { id: 2, title: "Notification", date: "Day 0", status: "current" },
  { id: 3, title: "Nominations", date: "Day 0 - 7", status: "upcoming" },
  { id: 4, title: "Campaigning", date: "Day 10 - 25", status: "upcoming" },
  { id: 5, title: "Polling Day", date: "Day 27", status: "upcoming" },
  { id: 6, title: "Counting", date: "Day 30", status: "upcoming" },
];

export const Timeline = () => {
  return (
    <div className="w-full py-4 overflow-x-auto scrollbar-hide">
      <div className="flex min-w-max items-center justify-between gap-6 px-6 relative">
        {/* Animated Connector Line */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -translate-y-1/2 z-0" />
        <motion.div 
          className="absolute top-1/2 left-0 h-[2px] saffron-gradient shadow-[0_0_15px_#FF9933] -translate-y-1/2 z-0"
          initial={{ width: 0 }}
          animate={{ width: '33%' }} // Example progress to 'Notification'
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {MILESTONES.map((m, idx) => (
          <motion.div
            key={m.id}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col items-center gap-3 relative z-10 w-32 group"
          >
            <div className={`
              w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-700 border
              ${m.status === 'completed' ? 'bg-national-green/20 border-national-green text-national-green shadow-[0_0_20px_rgba(19,136,8,0.3)]' : 
                m.status === 'current' ? 'bg-national-saffron/20 border-national-saffron text-national-saffron animate-pulse shadow-[0_0_30px_rgba(255,153,51,0.4)]' : 
                'bg-white/5 border-white/10 text-slate-600'}
            `}>
              {m.status === 'completed' ? <CheckCircle2 size={20} /> : 
               m.status === 'current' ? <Activity size={20} /> : 
               <Circle size={20} />}
            </div>
            <div className="text-center">
              <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 ${m.status === 'upcoming' ? 'text-slate-600' : 'text-slate-400'}`}>
                {m.date}
              </p>
              <h4 className={`text-sm font-black tracking-tight ${m.status === 'current' ? 'text-national-saffron' : 'text-white'}`}>
                {m.title}
              </h4>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
