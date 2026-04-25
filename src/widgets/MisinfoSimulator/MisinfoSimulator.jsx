import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, Database, Brain, CheckCircle2, XCircle, 
  AlertTriangle, BarChart3, Globe, Users, Clock,
  Zap, TrendingUp, X
} from 'lucide-react';

const MISINFO_SCENARIOS = [
  {
    id: 1,
    claim: "Candidate Sharma has been arrested for financial fraud and is disqualified from contesting.",
    source: "WhatsApp Forward",
    spreadCount: 4200,
    regions: ["Delhi NCR", "Uttar Pradesh", "Haryana"],
    isFake: true,
    verdict: "FALSE — No FIR exists. Candidate Sharma holds a clean record verified by the Election Commission. The image used is from a 2019 unrelated news event.",
    confidence: 97.3,
    clusterSize: 47,
    detectedAt: "2 hours ago"
  },
  {
    id: 2,
    claim: "Polling date for constituency #42 has been changed from April 28 to May 5.",
    source: "Facebook Post",
    spreadCount: 8100,
    regions: ["Tamil Nadu", "Karnataka"],
    isFake: true,
    verdict: "FALSE — The Election Commission of India has confirmed no date change. Official schedule remains April 28, 2026. This post traces back to a network of 12 coordinated accounts.",
    confidence: 99.1,
    clusterSize: 112,
    detectedAt: "45 minutes ago"
  },
  {
    id: 3,
    claim: "EVM machines in Booth #317 were found pre-loaded with votes for a specific party.",
    source: "Twitter/X Thread",
    spreadCount: 15600,
    regions: ["Maharashtra", "Gujarat", "Rajasthan"],
    isFake: true,
    verdict: "FALSE — ECI conducted a live demonstration showing tamper-proof seals intact. The video circulated was from a mock drill conducted for training purposes.",
    confidence: 94.8,
    clusterSize: 203,
    detectedAt: "6 hours ago"
  }
];

const PIPELINE_STEPS = [
  "Ingesting report into BigQuery dataset...",
  "Running ML.GENERATE_TEXT with Gemini...",
  "Clustering with similar reports...",
  "Cross-referencing ECI verified data...",
  "Generating confidence score..."
];

export function MisinfoSimulator() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeScenario, setActiveScenario] = useState(null);
  const [userVerdict, setUserVerdict] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const runBigQuerySimulation = (scenario) => {
    setActiveScenario(scenario);
    setUserVerdict(null);
    setShowAnalysis(false);
    setProcessingStep(0);
    setIsProcessing(false);
  };

  const submitVerdict = (verdict) => {
    setUserVerdict(verdict);
    setIsProcessing(true);
    setProcessingStep(0);

    PIPELINE_STEPS.forEach((_, i) => {
      setTimeout(() => {
        setProcessingStep(i + 1);
        if (i === PIPELINE_STEPS.length - 1) {
          setTimeout(() => {
            setIsProcessing(false);
            setShowAnalysis(true);
          }, 800);
        }
      }, (i + 1) * 900);
    });
  };

  const closeModal = () => {
    setIsOpen(false);
    setActiveScenario(null);
    setUserVerdict(null);
    setShowAnalysis(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full h-16 rounded-xl border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.01] shadow-lg shadow-red-500/5 group"
      >
        <ShieldAlert size={18} className="group-hover:scale-110 transition-transform" />
        AI Misinformation Detection Simulator
        <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[8px] tracking-widest">BigQuery ML</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden shadow-2xl relative">
        
        {/* Modal Header */}
        <div className="p-4 bg-slate-950/60 border-b border-white/5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/10 rounded-xl border border-red-500/20">
              <ShieldAlert size={18} className="text-red-400" />
            </div>
            <div>
              <h3 className="text-sm font-black tracking-tight">Misinformation Detection Simulator</h3>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Powered by BigQuery ML + Gemini</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
              <Database size={12} className="text-emerald-400" />
              <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">BigQuery Active</span>
            </div>
            <button 
              onClick={closeModal}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white border border-white/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">

          {/* Scenario Cards */}
          {!activeScenario && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">Select a scenario to begin the simulation. You will evaluate the claim and watch how BigQuery + Gemini processes it.</p>
              {MISINFO_SCENARIOS.map((scenario) => (
                <motion.div
                  key={scenario.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => runBigQuerySimulation(scenario)}
                  className="bg-white/[0.03] border border-white/10 rounded-xl p-4 cursor-pointer hover:border-red-500/30 transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle size={14} className="text-amber-400" />
                        <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest">{scenario.source}</span>
                        <span className="text-[8px] text-slate-600 font-mono">• {scenario.detectedAt}</span>
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed">"{scenario.claim}"</p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-[8px] text-slate-500 flex items-center gap-1">
                          <Globe size={10} /> {scenario.regions.join(", ")}
                        </span>
                        <span className="text-[8px] text-red-400 flex items-center gap-1 font-bold">
                          <TrendingUp size={10} /> {scenario.spreadCount.toLocaleString()} shares
                        </span>
                      </div>
                    </div>
                    <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Investigate →
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Active Investigation */}
          {activeScenario && (
            <AnimatePresence mode="wait">
              <motion.div
                key="investigation"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* The Claim */}
                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle size={14} className="text-red-400" />
                    <span className="text-[9px] font-black text-red-400 uppercase tracking-widest">Claim Under Investigation</span>
                  </div>
                  <p className="text-sm text-white font-medium leading-relaxed">"{activeScenario.claim}"</p>
                  <div className="flex items-center gap-4 mt-3 text-[8px] text-slate-500">
                    <span className="flex items-center gap-1"><Globe size={10} /> {activeScenario.source}</span>
                    <span className="flex items-center gap-1"><Users size={10} /> {activeScenario.spreadCount.toLocaleString()} shares</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {activeScenario.detectedAt}</span>
                  </div>
                </div>

                {/* User Verdict */}
                {!userVerdict && (
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-slate-300 mb-3 font-bold">What is your assessment of this claim?</p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => submitVerdict('fake')}
                        className="p-3 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/15 text-red-400 font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                      >
                        <XCircle size={16} /> This is False
                      </button>
                      <button
                        onClick={() => submitVerdict('real')}
                        className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/15 text-emerald-400 font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 size={16} /> This is True
                      </button>
                    </div>
                  </div>
                )}

                {/* BigQuery Processing Pipeline */}
                {isProcessing && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-950/80 border border-blue-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Database size={14} className="text-blue-400 animate-pulse" />
                      <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">BigQuery ML Pipeline Active</span>
                    </div>
                    <div className="space-y-2 font-mono text-[11px]">
                      {PIPELINE_STEPS.map((step, i) => (
                        <div key={i} className={`flex items-center gap-3 transition-all duration-300 ${
                          processingStep > i ? 'text-emerald-400' : processingStep === i ? 'text-blue-400 animate-pulse' : 'text-slate-600'
                        }`}>
                          {processingStep > i ? <CheckCircle2 size={14} /> : processingStep === i ? <Zap size={14} className="animate-pulse" /> : <div className="w-3.5 h-3.5 rounded-full border border-slate-700" />}
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 bg-black/40 rounded-lg p-3 border border-white/5">
                      <p className="text-[8px] text-slate-500 uppercase tracking-widest font-bold mb-2">Live Query</p>
                      <pre className="text-[10px] text-blue-300 font-mono leading-relaxed overflow-x-auto">
{`SELECT content, ml_generate_text_result
FROM ML.GENERATE_TEXT(
  MODEL \`election_data.gemini_verifier\`,
  TABLE \`election_data.flagged_claims\`,
  STRUCT('Evaluate this election claim
    for factual accuracy' AS prompt)
) WHERE cluster_id = ${activeScenario.id};`}
                      </pre>
                    </div>
                  </motion.div>
                )}

                {/* Analysis Results */}
                {showAnalysis && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                    <div className={`rounded-xl p-4 border ${
                      (userVerdict === 'fake') === activeScenario.isFake ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        {(userVerdict === 'fake') === activeScenario.isFake ? <CheckCircle2 size={18} className="text-emerald-400" /> : <XCircle size={18} className="text-red-400" />}
                        <span className={`text-sm font-black ${(userVerdict === 'fake') === activeScenario.isFake ? 'text-emerald-400' : 'text-red-400'}`}>
                          {(userVerdict === 'fake') === activeScenario.isFake ? "Correct! Your assessment matches the AI verification." : "Incorrect. See the AI analysis below to understand why."}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Brain size={16} className="text-national-saffron" />
                        <span className="text-[9px] font-black text-national-saffron uppercase tracking-widest">Gemini Verification Result</span>
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed">{activeScenario.verdict}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3 text-center">
                        <BarChart3 size={16} className="text-blue-400 mx-auto mb-1" />
                        <p className="text-lg font-black font-mono text-white">{activeScenario.confidence}%</p>
                        <p className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">Confidence</p>
                      </div>
                      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3 text-center">
                        <Database size={16} className="text-emerald-400 mx-auto mb-1" />
                        <p className="text-lg font-black font-mono text-white">{activeScenario.clusterSize}</p>
                        <p className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">Reports Clustered</p>
                      </div>
                      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3 text-center">
                        <Globe size={16} className="text-amber-400 mx-auto mb-1" />
                        <p className="text-lg font-black font-mono text-white">{activeScenario.regions.length}</p>
                        <p className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">Regions Affected</p>
                      </div>
                    </div>

                    <button
                      onClick={() => { setActiveScenario(null); setUserVerdict(null); setShowAnalysis(false); }}
                      className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all border border-white/10"
                    >
                      ← Investigate Another Scenario
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
