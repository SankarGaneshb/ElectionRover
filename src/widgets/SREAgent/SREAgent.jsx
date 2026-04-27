import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Activity, Terminal, CheckCircle2, 
  AlertOctagon, RefreshCcw, UserCheck, X
} from 'lucide-react';
const SRE_I18N = {
  en: {
    issue: "Issue:",
    action: "Action:",
    healed: "HEALED",
    pending: "PENDING HIL",
    informed: "HIL Informed",
    db_pool: "Database Pool",
    gemini_gateway: "Gemini AI Gateway",
    cache: "Cache",
    api: "API"
  },
  hi: {
    issue: "समस्या:",
    action: "कार्रवाई:",
    healed: "स्वस्थ",
    pending: "लंबित HIL",
    informed: "HIL को सूचित किया",
    db_pool: "डेटाबेस पूल",
    gemini_gateway: "जेमिनी एआई गेटवे",
    cache: "कैश",
    api: "एपीआई"
  },
  ta: {
    issue: "பிரச்சனை:",
    action: "நடவடிக்கை:",
    healed: "குணமடைந்தது",
    pending: "நிலுவையில் உள்ளது",
    informed: "HIL க்கு தெரிவிக்கப்பட்டது",
    db_pool: "தரவுத்தள குளம்",
    gemini_gateway: "ஜெமினி ஏஐ கேட்வே",
    cache: "கேச்",
    api: "ஏபிஐ"
  },
  te: {
    issue: "సమస్య:",
    action: "చర్య:",
    healed: "స్వస్థమైంది",
    pending: "పెండింగ్ HIL",
    informed: "HIL కి తెలిపారు",
    db_pool: "డేటాబేస్ పూల్",
    gemini_gateway: "జెమిని AI గేట్‌వే",
    cache: "కాష్",
    api: "API"
  },
  kn: {
    issue: "ಸಮಸ್ಯೆ:",
    action: "ಕ್ರಮ:",
    healed: "ಗುಣಮುಖವಾಯಿತು",
    pending: "ಬಾಕಿ HIL",
    informed: "HIL ಗೆ ತಿಳಿಸಲಾಗಿದೆ",
    db_pool: "ಡೇಟಾಬೇಸ್ ಪೂಲ್",
    gemini_gateway: "ಜೆಮಿನಿ AI ಗೇಟ್‌ವೇ",
    cache: "ಕ್ಯಾಶ್",
    api: "API"
  },
  bn: {
    issue: "সমস্যা:",
    action: "পদক্ষেপ:",
    healed: "নিরাময়",
    pending: "অমীমাংসিত HIL",
    informed: "HIL কে জানানো হয়েছে",
    db_pool: "ডেটাবেস পুল",
    gemini_gateway: "জেমিনি এআই গেটওয়ে",
    cache: "ক্যাশে",
    api: "এপিআই"
  },
  ml: {
    issue: "പ്രശ്നം:",
    action: "നടപടി:",
    healed: "ഭേദമായി",
    pending: "HIL കാത്തിരിക്കുന്നു",
    informed: "HIL അറിയിച്ചു",
    db_pool: "ഡാറ്റാബേസ് പൂൾ",
    gemini_gateway: "ജെമിനി AI ഗേറ്റ്‌വേ",
    cache: "കാഷെ",
    api: "API"
  },
  mr: {
    issue: "समस्या:",
    action: "कृती:",
    healed: "बरे झाले",
    pending: "HIL प्रलंबित",
    informed: "HIL ला सूचित केले",
    db_pool: "डेटाबेस पूल",
    gemini_gateway: "जेमिनी एआय गेटवे",
    cache: "कॅश",
    api: "एपीआय"
  },
  gu: {
    issue: "સમસ્યા:",
    action: "ક્રિયા:",
    healed: "સ્વસ્થ",
    pending: "HIL બાકી",
    informed: "HIL ને જાણ કરી",
    db_pool: "ડેટાબેઝ પુલ",
    gemini_gateway: "જેમિની AI ગેટવે",
    cache: "કેશ",
    api: "API"
  },
  or: {
    issue: "ସମସ୍ୟା:",
    action: "କ୍ରିୟା:",
    healed: "ଆରୋଗ୍ୟ",
    pending: "HIL ଅମ୍ଳ",
    informed: "HIL କୁ ଜଣାଯାଇଛି",
    db_pool: "ଡାଟାବେସ୍ ପୁଲ୍",
    gemini_gateway: "ଜେମିନି AI ଗେଟୱେ",
    cache: "କ୍ୟାଚ୍",
    api: "API"
  },
  pa: {
    issue: "ਸਮੱਸਿਆ:",
    action: "ਕਾਰਵਾਈ:",
    healed: "ਠੀਕ ਹੋਇਆ",
    pending: "HIL ਲੰਬਿਤ",
    informed: "HIL ਨੂੰ ਸੂਚਿਤ ਕੀਤਾ",
    db_pool: "ਡਾਟਾਬੇਸ ਪੂਲ",
    gemini_gateway: "ਜੇਮਿਨੀ AI ਗੇਟਵੇ",
    cache: "ਕੈਸ਼",
    api: "API"
  }
};
export function SREAgentWidget() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';
  const local = SRE_I18N[lang] || SRE_I18N['en'];
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [healingService, setHealingService] = useState(null);

  const getServiceTranslation = (serviceName) => {
    if (serviceName === 'Database Pool' || serviceName === 'Database') {
      return local.db_pool || serviceName;
    }
    if (serviceName === 'Gemini AI Gateway') {
      return local.gemini_gateway || serviceName;
    }
    if (serviceName === 'Cache') {
      return local.cache || serviceName;
    }
    if (serviceName === 'API') {
      return local.api || serviceName;
    }
    return serviceName;
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/v1/sre/logs');
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      }
    } catch (err) {
      console.error('Failed to fetch SRE logs:', err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLogs();
      const interval = setInterval(fetchLogs, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const triggerHeal = async (service, issue) => {
    setHealingService(service);
    setIsLoading(true);
    try {
      await fetch('/api/v1/sre/heal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service, issue })
      });
      await fetchLogs();
    } catch (err) {
      console.error('Heal attempt failed:', err);
    } finally {
      setIsLoading(false);
      setHealingService(null);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full h-16 rounded-xl border border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.01] shadow-lg shadow-blue-500/5 group"
      >
        <Activity size={18} className="group-hover:animate-pulse" />
        {t('sre_hub')}
        <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-[8px] tracking-widest font-mono">{t('sre_hil_active')}</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden shadow-2xl relative font-mono">
        
        {/* Header */}
        <div className="p-4 bg-slate-950/60 border-b border-white/5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <ShieldCheck size={18} className="text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-black tracking-tight text-white uppercase">{t('sre_control_tower')}</h3>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">{t('sre_oversight')}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white border border-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Console Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-slate-950/40">
          
          {/* Live Issue Test Generator */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <h4 className="text-xs font-bold text-red-400 mb-2 uppercase tracking-widest flex items-center gap-2">
              <AlertOctagon size={14} className="text-red-400 animate-pulse" /> {t('sre_chaos_sim')}
            </h4>
            <p className="text-[10px] text-slate-400 mb-3">{t('sre_chaos_desc')}</p>
            <button
              onClick={async () => {
                try {
                  await fetch('/api/v1/sre/trigger_error');
                } catch (e) {
                  // The exception is trapped in the handler but naturally logged
                }
                fetchLogs();
              }}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-[10px] font-bold border border-red-500/30 uppercase tracking-widest transition-all"
            >
              {t('sre_inject_error')}
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
            <h4 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest flex items-center gap-2">
              <Terminal size={14} className="text-blue-400" /> {t('sre_manual_override')}
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <button
                disabled={isLoading}
                onClick={() => triggerHeal('Database', 'Manual HIL Check')}
                className="p-3 rounded-lg border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/15 text-blue-400 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <RefreshCcw size={14} className={healingService === 'Database' ? 'animate-spin' : ''} />
                {t('sre_reset_db')}
              </button>
              <button
                disabled={isLoading}
                onClick={() => triggerHeal('Cache', 'Manual HIL Check')}
                className="p-3 rounded-lg border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/15 text-purple-400 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <RefreshCcw size={14} className={healingService === 'Cache' ? 'animate-spin' : ''} />
                {t('sre_purge_cache')}
              </button>
              <button
                disabled={isLoading}
                onClick={() => triggerHeal('API', 'Manual HIL Check')}
                className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/15 text-emerald-400 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <UserCheck size={14} />
                {t('sre_audit_verify')}
              </button>
            </div>
          </div>

          {/* Audit Logs */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-400" /> {t('sre_audit_trail')}
            </h4>
            <div className="space-y-2">
              {logs.map((log, i) => (
                <div key={i} className="bg-slate-900 border border-white/5 rounded-lg p-3 text-xs leading-relaxed flex items-start gap-3">
                  <div className="p-1.5 bg-emerald-500/10 rounded border border-emerald-500/20 mt-0.5">
                    <AlertOctagon size={14} className="text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-blue-400 font-bold uppercase">{getServiceTranslation(log.service)}</span>
                      <span className="text-[9px] text-slate-600">{new Date(log.timestamp * 1000).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-slate-300"><span className="text-slate-500">{local.issue}</span> {log.issue}</p>
                    <p className={log.status === 'Healed' ? 'text-emerald-400' : 'text-amber-400'}>
                      <span className="text-slate-500">{local.action}</span> {log.action_taken}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {log.status === 'Healed' ? (
                        <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded tracking-widest font-black uppercase">
                          {local.healed}
                        </span>
                      ) : (
                        <span className="text-[8px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded tracking-widest font-black uppercase animate-pulse">
                          {local.pending}
                        </span>
                      )}
                      {log.is_hil_notified && (
                        <span className="text-[8px] bg-white/5 text-slate-400 px-1.5 py-0.5 rounded tracking-widest uppercase">
                          {local.informed}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
