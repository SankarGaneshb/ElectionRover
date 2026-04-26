import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ShieldCheck, Trophy, Sparkles, 
  Cpu, Target, CheckCircle2, MessageSquare, Send, Bot, User
} from 'lucide-react';
import { QUEST_I18N, getBadgeLabel } from '../../shared/lib/questI18n';

export const QuestView = ({ quest, onComplete, role, language }) => {
  const { t } = useTranslation();
  const lang = language || 'en';
  const local = QUEST_I18N[lang] || QUEST_I18N['en'];
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [userMsg, setUserMsg] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const nextStep = () => {
    if (currentStep < quest.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
      setTimeout(() => onComplete(quest), 3000);
    }
  };

  const askAgent = async () => {
    if (!userMsg.trim()) return;
    
    const newMsg = { role: 'user', content: userMsg };
    setChatHistory(prev => [...prev, newMsg]);
    setUserMsg("");
    setIsTyping(true);

    try {
      const response = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: chatHistory,
          role: role,
          language: language
        })
      });
      
      const data = await response.json();
      setChatHistory(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      const fallbackMsg = (local.agent_welcome || "Protocol update:") + " — " + stepTitle + ": " + stepContent;
      setChatHistory(prev => [...prev, { role: 'assistant', content: fallbackMsg }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Extract translated step title and content safely
  const stepTitle = local.steps && local.steps[quest.id] && local.steps[quest.id][currentStep]
    ? local.steps[quest.id][currentStep].title 
    : quest.steps[currentStep].title;

  const stepContent = local.steps && local.steps[quest.id] && local.steps[quest.id][currentStep]
    ? local.steps[quest.id][currentStep].content 
    : quest.steps[currentStep].content;

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-4">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key="quest-card"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-card p-8 relative overflow-hidden bg-gradient-to-br from-white/[0.05] to-transparent"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 saffron-gradient shadow-[0_0_20px_rgba(255,153,51,0.5)]" />
            
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-3 text-national-saffron">
                <Cpu size={24} className="animate-pulse" />
                <span className="uppercase tracking-[0.4em] text-[10px] font-black">{local.active_protocol}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{local.phase}</span>
                <p className="text-2xl font-black font-mono leading-none">{currentStep + 1}<span className="text-slate-600"> / {quest.steps.length}</span></p>
              </div>
            </div>

            <h2 className="text-3xl font-black mb-2 tracking-tighter">{t(`${quest.id.replace('-', '_')}_title`)}</h2>
            <p className="text-sm text-slate-400 mb-6 max-w-xl">{t(`${quest.id.replace('-', '_')}_desc`)}</p>

            {/* Step Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <motion.div 
                key={currentStep}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="md:col-span-2 bg-white/[0.03] p-6 rounded-3xl border border-white/5 relative group h-fit"
              >
                <div className="absolute top-[-12px] left-6 bg-national-green px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-green-500/20">
                  {local.current_objective}
                </div>
                <h3 className="text-xl font-black mb-2 text-national-white tracking-tight">
                  {stepTitle}
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm">
                  {stepContent}
                </p>
              </motion.div>

              {/* Agent Sidebar */}
              <div className="md:col-span-1 space-y-4">
                <button 
                  onClick={() => setChatOpen(!chatOpen)}
                  className="w-full glass-card p-6 flex flex-col items-center justify-center gap-3 hover:border-national-saffron/50 transition-all group"
                >
                  <Bot size={32} className="text-national-saffron group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{local.consult_agent}</span>
                </button>
                <div className="text-[10px] text-slate-600 leading-relaxed text-center px-4">
                  {local.agent_hint}
                </div>
              </div>
            </div>

            {/* Chat Interface */}
            <AnimatePresence>
              {chatOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mb-12"
                >
                  <div className="bg-black/40 border border-white/5 rounded-3xl p-4">
                    <div className="max-h-40 overflow-y-auto mb-3 space-y-3 pr-2 custom-scrollbar">
                      {chatHistory.length === 0 && (
                        <div className="text-center py-4 text-slate-500 text-xs italic">
                          "{local.agent_welcome}"
                        </div>
                      )}
                      {chatHistory.map((msg, idx) => (
                        <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${msg.role === 'user' ? 'bg-national-saffron/20 border-national-saffron/30 text-national-saffron' : 'bg-national-green/20 border-national-green/30 text-national-green'}`}>
                            {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                          </div>
                          <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${
                            msg.role === 'user' 
                              ? 'bg-national-saffron/10 border border-national-saffron/20 text-white rounded-tr-none' 
                              : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none shadow-[0_0_15px_rgba(255,255,255,0.02)]'
                          }`}>
                            <div className="whitespace-pre-wrap break-words">
                              {msg.content.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                                if (part.startsWith('**') && part.endsWith('**')) {
                                  return <strong key={i}>{part.slice(2, -2)}</strong>;
                                }
                                return part;
                              })}
                            </div>
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-national-green/10 border border-national-green/20 text-national-green flex items-center justify-center animate-pulse">
                            <Bot size={16} />
                          </div>
                          <div className="bg-white/5 border border-white/10 text-slate-500 px-5 py-3 rounded-2xl rounded-tl-none text-[10px] animate-pulse font-black tracking-widest flex items-center">
                            {local.analyzing}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={userMsg}
                        onChange={(e) => setUserMsg(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && askAgent()}
                        placeholder={local.ask_placeholder}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-national-saffron/50"
                      />
                      <button 
                        onClick={askAgent}
                        className="p-2 saffron-gradient rounded-xl text-white hover:shadow-lg transition-all"
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col gap-6">
              <div className="w-full h-1 bg-white/5 rounded-full relative overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full green-gradient"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / quest.steps.length) * 100}%` }}
                />
              </div>

              <button 
                onClick={nextStep}
                className="premium-button green-gradient py-5 text-sm uppercase tracking-[0.3em] font-black flex items-center justify-center gap-4 hover:shadow-[0_0_30px_rgba(19,136,8,0.3)] transition-all group"
              >
                <span>{currentStep === quest.steps.length - 1 ? local.terminate_protocol : local.proceed}</span>
                <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success-card"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card p-20 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-national-green/5 animate-pulse" />
            <div className="relative z-10">
              <motion.div 
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                className="w-32 h-32 rounded-full bg-national-green/20 text-national-green flex items-center justify-center mx-auto mb-10 border border-national-green/30 shadow-[0_0_40px_rgba(19,136,8,0.2)]"
              >
                <CheckCircle2 size={64} />
              </motion.div>
              <h2 className="text-6xl font-black mb-6 tracking-tighter">{local.protocol_verified}</h2>
              <p className="text-2xl text-slate-400 mb-12">
                {local.integrity_seal} <span className="text-white font-bold">{getBadgeLabel(quest.badge, lang)}</span>
              </p>
              <div className="flex items-center justify-center gap-4 text-national-saffron font-black text-4xl mb-6">
                <Target size={32} />
                <span>+{quest.points} <span className="text-sm uppercase tracking-[0.4em] text-slate-500">{t('creds')}</span></span>
              </div>
              <p className="text-xs text-slate-600 uppercase tracking-[0.5em] animate-pulse">{local.syncing}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
