import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Vote, UserCheck, Languages, Map, Trophy, 
  Activity, ShieldCheck, Zap, Users, Search, 
  ArrowUpRight, Target, LayoutDashboard, Send,
  Globe, Award, Bookmark
} from 'lucide-react'
import { Timeline } from '../widgets/Timeline/Timeline'
import { QuestView } from '../pages/Quest/QuestView'
import { QUESTS } from '../shared/data/quests'
import { MapView } from '../widgets/MapView/MapView'
import { MisinfoSimulator } from '../widgets/MisinfoSimulator/MisinfoSimulator'
import { SREAgentWidget } from '../widgets/SREAgent/SREAgent'


function App() {
  const { t, i18n } = useTranslation()
  const [view, setView] = useState('home')
  const [role, setRole] = useState(null)
  const [activeQuest, setActiveQuest] = useState(null)
  const [points, setPoints] = useState(0)
  const [badges, setBadges] = useState([])
  const [feedback, setFeedback] = useState("")
  const [selectedTag, setSelectedTag] = useState(null)
  const [tagOrder] = useState(['Ease', 'Clarity', 'Tech'].sort(() => Math.random() - 0.5))

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'bn', label: 'বাংলা' },
    { code: 'ml', label: 'മലയാളം' },
    { code: 'mr', label: 'मराठी' },
    { code: 'gu', label: 'ગુજરાતી' },
    { code: 'or', label: 'ଓଡ଼ିଆ' },
    { code: 'pa', label: 'ਪੰਜਾਬੀ' }
  ]

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole)
    setView('exploratory')
  }

  const startQuest = (quest) => {
    setActiveQuest(quest)
    setView('quest')
  }

  const onQuestComplete = (quest) => {
    setPoints(prev => prev + quest.points)
    if (!badges.includes(quest.badge)) {
      setBadges(prev => [...prev, quest.badge])
    }
  }

  const submitFeedback = () => {
    console.log("Feedback submitted:", feedback)
    setFeedback("")
    alert("Feedback routed to relevant Official!")
  }

  const adoptionLevel = role ? Math.round((badges.length / QUESTS[role].length) * 100) : 0

  return (
    <div className="h-screen flex flex-col bg-premium-slate overflow-hidden selection:bg-national-saffron/30">
      {/* Dynamic Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-national-saffron/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-national-green/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Premium Navbar */}
      <nav className="fixed top-0 w-full z-50 px-6 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center glass-card px-8 py-3 rounded-2xl border-white/5 backdrop-blur-2xl">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('home')}>
            <div className="w-10 h-10 rounded-xl saffron-gradient flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
              <span className="text-white font-black italic">ER</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-black tracking-tighter leading-none">ELECTION <span className="text-national-saffron">ROVER</span></h1>
              <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">Constitutional Intelligence</span>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            {points > 0 && (
              <div className="hidden md:flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                <Trophy size={16} className="text-national-saffron" />
                <span className="font-mono font-bold text-sm">{points.toLocaleString()} <span className="text-slate-500 text-[10px] uppercase">Pts</span></span>
              </div>
            )}
            <div className="flex items-center gap-2 overflow-x-auto max-w-[200px] md:max-w-none no-scrollbar">
              {languages.map((lang) => (
                <button 
                  key={lang.code}
                  onClick={() => i18n.changeLanguage(lang.code)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all whitespace-nowrap ${
                    i18n.language === lang.code 
                      ? 'bg-national-green text-white shadow-lg shadow-green-500/20' 
                      : 'text-slate-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 pt-24 pb-2 px-6 overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.main 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-6xl w-full mx-auto px-6"
            >
              <div className="flex flex-col items-center text-center mb-20">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="bg-national-saffron/10 text-national-saffron px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-6 border border-national-saffron/20"
                >
                  {t('protocol_badge')}
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-black mb-6 leading-[0.9] tracking-tighter">
                  {t('hero_title_1')} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-national-saffron via-white to-national-green">{t('hero_title_2')}</span>
                </h2>
                <p className="text-base text-slate-400 max-w-2xl leading-relaxed">
                  {t('tagline')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <HeroRoleCard 
                  icon={<Vote size={40} />}
                  title={t('voter')}
                  subtitle={t('voter_portal')}
                  description={t('voter_desc')}
                  color="saffron"
                  onClick={() => handleRoleSelect('voter')}
                />
                <HeroRoleCard 
                  icon={<UserCheck size={40} />}
                  title={t('candidate')}
                  subtitle={t('candidate_portal')}
                  description={t('candidate_desc')}
                  color="green"
                  onClick={() => handleRoleSelect('candidate')}
                />
              </div>
            </motion.main>
          )}

          {view === 'exploratory' && (
            <motion.div 
              key="exploratory"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-7xl w-full mx-auto flex-1 flex flex-col overflow-hidden"
            >
              {/* Dashboard Header */}
              <div className="flex flex-col md:flex-row justify-between items-end gap-2 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-national-saffron mb-1">
                    <LayoutDashboard size={14} />
                    <span className="text-[9px] font-black uppercase tracking-[0.4em]">{t('ops_overview')}</span>
                  </div>
                  <h2 className="text-2xl font-black tracking-tight leading-none">{t('life_cycle')}</h2>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 flex items-center gap-3">
                    <span className="text-[8px] font-bold uppercase text-slate-500 whitespace-nowrap">{t('clarity_index')}</span>
                    <div className="flex gap-2">
                      {['🤩', '🙂', '😐', '😕'].map((emoji, i) => (
                        <button key={i} className="text-xs hover:scale-125 transition-transform">{emoji}</button>
                      ))}
                    </div>
                  </div>
                  <StatMini label="Active Quests" value={QUESTS[role].length} icon={<Zap size={12} />} />
                </div>
              </div>
              
              <div className="glass-card p-2 mb-4 border-white/5 relative overflow-hidden bg-gradient-to-br from-white/[0.03] to-transparent shrink-0">
                <Timeline />
              </div>

              <div className="mb-4 h-[350px] shrink-0">
                <MapView />
              </div>

              <div className="mb-4 shrink-0">
                <MisinfoSimulator />
              </div>

              <div className="mb-4 shrink-0">
                <SREAgentWidget />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1 overflow-hidden">

                {/* Motivation Sidepanel */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="glass-card p-4 border-national-saffron/10">
                    <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Integrity Level</h3>
                    <div className="relative w-20 h-20 mx-auto mb-2">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/5" />
                        <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="6" fill="transparent" 
                          strokeDasharray={226.2} strokeDashoffset={226.2 - (226.2 * adoptionLevel) / 100}
                          className="text-national-green transition-all duration-1000" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-black">{adoptionLevel}%</span>
                      </div>
                    </div>
                    <p className="text-center text-[8px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                      Guardian Path
                    </p>
                  </div>

                  <div className="glass-card p-4">
                    <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 flex items-center gap-2">
                      <Award size={12} className="text-national-saffron" /> Top Citizens
                    </h3>
                    <div className="space-y-2">
                      <LeaderEntry name="Arjun V." score={4500} rank={1} />
                      <LeaderEntry name="Sankar G." score={3200} rank={2} />
                      <LeaderEntry name="You" score={points} rank={3} highlight />
                    </div>
                  </div>
                </div>

                {/* Quests Grid */}
                <div className="lg:col-span-3 flex flex-col overflow-hidden">
                  <div className="flex items-center justify-between mb-4 shrink-0">
                    <h3 className="text-lg font-black tracking-tight flex items-center gap-3">
                      <Target className="text-national-green" size={20} />
                      {t('protocols')}
                    </h3>
                    <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                       <input type="text" placeholder="Filter..." className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-1.5 text-[10px] focus:outline-none focus:border-national-saffron/50 w-32" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 flex-1 overflow-hidden">
                    {QUESTS[role].map(q => (
                      <div key={q.id} className="glass-card p-4 group hover:translate-y-[-2px] transition-all border-white/5 hover:border-national-green/30 flex flex-col justify-between h-full">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <div className="p-1.5 bg-white/5 rounded-lg group-hover:bg-national-green/10 transition-colors">
                              <Bookmark size={14} className="text-national-green" />
                            </div>
                            <span className="font-mono text-[8px] font-bold text-national-saffron">+{q.points} PTS</span>
                          </div>
                          <h4 className="text-base font-black mb-1 leading-tight">{t(`${q.id.replace('-', '_')}_title`)}</h4>
                          <p className="text-xs text-slate-500 leading-snug line-clamp-2">{t(`${q.id.replace('-', '_')}_desc`)}</p>
                        </div>
                        <button 
                          onClick={() => startQuest(q)}
                          className="w-full py-2 mt-3 rounded-lg font-black text-[10px] uppercase tracking-[0.1em] bg-white/5 hover:bg-national-green hover:text-white transition-all"
                        >
                          {badges.includes(q.badge) ? t('review_protocol') : t('execute_protocol')}
                        </button>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </motion.div>
          )}

          {view === 'quest' && (
            <QuestView 
              key="quest"
              quest={activeQuest} 
              role={role}
              language={i18n.language}
              onComplete={(q) => {
                onQuestComplete(q)
                setView('exploratory')
              }} 
            />
          )}
        </AnimatePresence>
      </div>

      <footer className="py-2 px-8 flex justify-between items-center border-t border-white/5 bg-black/40 backdrop-blur-3xl shrink-0">
        <div className="flex items-center gap-4">
          <p className="text-[8px] text-slate-600 uppercase tracking-[0.2em] font-bold">Election Rover 2026 Protocol</p>
        </div>
        <div className="flex gap-4 text-[8px] text-slate-600 uppercase tracking-widest font-black">
          <a href="#">Privacy</a>
          <a href="#">Security</a>
        </div>
      </footer>
    </div>
  )
}

function HeroRoleCard({ icon, title, subtitle, description, color, onClick }) {
  const isSaffron = color === 'saffron'
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      onClick={onClick}
      className={`glass-card p-8 text-left cursor-pointer group relative overflow-hidden`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] rounded-full opacity-20 transition-all group-hover:opacity-40 ${isSaffron ? 'bg-national-saffron' : 'bg-national-green'}`} />
      <div className={`mb-8 w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-500 shadow-2xl ${isSaffron ? 'bg-national-saffron/10 text-national-saffron group-hover:bg-national-saffron group-hover:text-white shadow-national-saffron/10' : 'bg-national-green/10 text-national-green group-hover:bg-national-green group-hover:text-white shadow-national-green/10'}`}>
        {icon}
      </div>
      <span className={`text-[10px] font-black uppercase tracking-[0.5em] mb-2 block ${isSaffron ? 'text-national-saffron' : 'text-national-green'}`}>{subtitle}</span>
      <h3 className="text-4xl font-black mb-4 tracking-tighter">{title}</h3>
      <p className="text-slate-500 leading-relaxed font-medium">
        {description}
      </p>
      <div className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all">
        Access System <ArrowUpRight size={14} />
      </div>
    </motion.div>
  )
}

function StatMini({ label, value, icon }) {
  return (
    <div className="glass-card px-6 py-3 border-white/5 flex items-center gap-4">
      <div className="text-national-saffron">{icon}</div>
      <div>
        <p className="text-[8px] font-black uppercase tracking-widest text-slate-500 leading-none mb-1">{label}</p>
        <p className="text-sm font-black font-mono">{value}</p>
      </div>
    </div>
  )
}

function LeaderEntry({ name, score, rank, highlight }) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-2xl transition-all ${highlight ? 'bg-national-green/20 border border-national-green/30 ring-1 ring-national-green/50' : 'bg-white/5 hover:bg-white/10'}`}>
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-black text-slate-500">0{rank}</span>
        <span className={`text-xs font-bold ${highlight ? 'text-white' : 'text-slate-400'}`}>{name}</span>
      </div>
      <span className="font-mono text-xs font-black text-national-saffron">{score.toLocaleString()}</span>
    </div>
  )
}

export default App
