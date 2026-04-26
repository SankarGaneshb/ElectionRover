import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, Database, Brain, CheckCircle2, XCircle, 
  AlertTriangle, BarChart3, Globe, Users, Clock,
  Zap, TrendingUp, X
} from 'lucide-react';

const SIM_I18N = {
  en: {
    investigate_btn: "Investigate →",
    claim_under_investigation: "Claim Under Investigation",
    shares: "shares",
    assessment_prompt: "What is your assessment of this claim?",
    assessment_false: "This is False",
    assessment_real: "This is True",
    live_query: "Live Query",
    ai_prompt_text: "Evaluate this election claim for factual accuracy",
    correct_assessment: "Correct! Your assessment matches the AI verification.",
    incorrect_assessment: "Incorrect. See the AI analysis below to understand why.",
    gemini_result_title: "Gemini Verification Result",
    confidence_label: "Confidence",
    reports_clustered_label: "Reports Clustered",
    regions_affected_label: "Regions Affected",
    investigate_another_scenario: "← Investigate Another Scenario",
    scenarios: [
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
    ],
    steps: [
      "Ingesting report into BigQuery dataset...",
      "Running ML.GENERATE_TEXT with Gemini...",
      "Clustering with similar reports...",
      "Cross-referencing ECI verified data...",
      "Generating confidence score..."
    ]
  },
  ta: {
    investigate_btn: "விசாரிக்கவும் →",
    claim_under_investigation: "விசாரணையில் உள்ள உரிமைகோரல்",
    shares: "பகிர்வுகள்",
    assessment_prompt: "இந்த உரிமைகோரல் பற்றிய உங்கள் மதிப்பீடு என்ன?",
    assessment_false: "இது பொய்யானது",
    assessment_real: "இது உண்மை",
    live_query: "நேரடி வினவல்",
    ai_prompt_text: "உண்மைத் துல்லியத்திற்காக இந்தத் தேர்தல் உரிமைகோரலை மதிப்பிடுங்கள்",
    correct_assessment: "சரி! உங்கள் மதிப்பீடு AI சரிபார்ப்புடன் பொருந்துகிறது.",
    incorrect_assessment: "தவறு. ஏன் என்பதைப் புரிந்துகொள்ள கீழே உள்ள AI பகுப்பாய்வைப் பார்க்கவும்.",
    gemini_result_title: "ஜெமினி சரிபார்ப்பு முடிவு",
    confidence_label: "நம்பிக்கை நிலை",
    reports_clustered_label: "அறிக்கைகள் தொகுக்கப்பட்டுள்ளன",
    regions_affected_label: "பாதிக்கப்பட்ட பகுதிகள்",
    investigate_another_scenario: "← மற்றொரு சூழ்நிலையை விசாரிக்கவும்",
    scenarios: [
      {
        id: 1,
        claim: "வேட்பாளர் சர்மா நிதி மோசடிக்காக கைது செய்யப்பட்டுள்ளார் மற்றும் போட்டியிட தகுதி நீக்கம் செய்யப்பட்டுள்ளார்.",
        source: "வாட்ஸ்அப் பகிர்தல்",
        spreadCount: 4200,
        regions: ["டெல்லி", "உத்தரபிரதேசம்", "ஹரியானா"],
        isFake: true,
        verdict: "பொய் — எஃப்.ஐ.ஆர் எதுவும் இல்லை. வேட்பாளர் சர்மா தேர்தல் ஆணையத்தால் சரிபார்க்கப்பட்ட சுத்தமான பதிவை வைத்துள்ளார். பயன்படுத்தப்பட்ட படம் 2019 ஆம் ஆண்டு தொடர்பில்லாத செய்தியிலிருந்து எடுக்கப்பட்டது.",
        confidence: 97.3,
        clusterSize: 47,
        detectedAt: "2 மணி நேரம் முன்பு"
      },
      {
        id: 2,
        claim: "தொகுதி #42 க்கான வாக்குப்பதிவு தேதி ஏப்ரல் 28 லிருந்து மே 5 ஆக மாற்றப்பட்டுள்ளது.",
        source: "பேஸ்புக் பதிவு",
        spreadCount: 8100,
        regions: ["தமிழ்நாடு", "கர்நாடகா"],
        isFake: true,
        verdict: "பொய் — இந்திய தேர்தல் ஆணையம் தேதி மாற்றம் எதுவும் செய்யவில்லை என்பதை உறுதிப்படுத்தியுள்ளது. அதிகாரப்பூர்வ அட்டவணை ஏப்ரல் 28, 2026 ஆகும். இந்தப் பதிவு 12 ஒருங்கிணைந்த கணக்குகளின் பிணையத்திலிருந்து கண்டுபிடிக்கப்பட்டது.",
        confidence: 99.1,
        clusterSize: 112,
        detectedAt: "45 நிமிடங்கள் முன்பு"
      },
      {
        id: 3,
        claim: "பூத் #317 இல் உள்ள வாக்குப்பதிவு இயந்திரங்களில் ஒரு குறிப்பிட்ட கட்சிக்கு ஏற்கனவே வாக்குகள் ஏற்றப்பட்டிருப்பது கண்டறியப்பட்டது.",
        source: "ட்விட்டர்/எக்ஸ் தளம்",
        spreadCount: 15600,
        regions: ["மகாராஷ்டிரா", "குஜராத்", "ராஜஸ்தான்"],
        isFake: true,
        verdict: "பொய் — தேர்தல் ஆணையம் முத்திரைகள் சேதமடையாமல் இருப்பதை நேரடி செயல்விளக்கம் மூலம் காட்டியது. பரப்பப்பட்ட வீடியோ பயிற்சி நோக்கங்களுக்காக நடத்தப்பட்ட ஒரு போலி பயிற்சியிலிருந்து எடுக்கப்பட்டது.",
        confidence: 94.8,
        clusterSize: 203,
        detectedAt: "6 மணி நேரம் முன்பு"
      }
    ],
    steps: [
      "BigQuery தரவுத்தொகுப்பில் அறிக்கையை உட்செலுத்துகிறது...",
      "ஜெமினியுடன் ML.GENERATE_TEXT ஐ இயக்குகிறது...",
      "இதே போன்ற அறிக்கைகளுடன் தொகுக்கப்படுகிறது...",
      "தேர்தல் ஆணையத்தின் சரிபார்க்கப்பட்ட தரவை குறுக்கு-குறிப்பு செய்கிறது...",
      "நம்பிக்கை மதிப்பெண் உருவாக்கப்படுகிறது..."
    ]
  },
  hi: {
    investigate_btn: "जांच करें →",
    claim_under_investigation: "जांच के तहत दावा",
    shares: "शेयर",
    assessment_prompt: "इस दावे पर आपका क्या आकलन है?",
    assessment_false: "यह गलत है",
    assessment_real: "यह सच है",
    live_query: "लाइव क्वेरी",
    ai_prompt_text: "तथ्यात्मक सटीकता के लिए इस चुनावी दावे का मूल्यांकन करें",
    correct_assessment: "सही! आपका आकलन AI सत्यापन से मेल खाता है।",
    incorrect_assessment: "गलत। यह समझने के लिए नीचे दिया गया AI विश्लेषण देखें कि क्यों।",
    gemini_result_title: "जेमिनी सत्यापन परिणाम",
    confidence_label: "विश्वास स्तर",
    reports_clustered_label: "रिपोर्ट क्लस्टर की गई",
    regions_affected_label: "प्रभावित क्षेत्र",
    investigate_another_scenario: "← किसी अन्य परिदृश्य की जांच करें",
    scenarios: [
      {
        id: 1,
        claim: "उम्मीदवार शर्मा को वित्तीय धोखाधड़ी के आरोप में गिरफ्तार किया गया है और उन्हें चुनाव लड़ने से अयोग्य घोषित कर दिया गया है।",
        source: "व्हाट्सएप फॉरवर्ड",
        spreadCount: 4200,
        regions: ["दिल्ली NCR", "उत्तर प्रदेश", "हरियाणा"],
        isFake: true,
        verdict: "झूठ — कोई प्राथमिकी (FIR) मौजूद नहीं है। उम्मीदवार शर्मा के पास चुनाव आयोग द्वारा सत्यापित एक साफ रिकॉर्ड है। उपयोग की गई छवि 2019 की एक असंबंधित समाचार घटना से है।",
        confidence: 97.3,
        clusterSize: 47,
        detectedAt: "2 घंटे पहले"
      },
      {
        id: 2,
        claim: "निर्वाचन क्षेत्र #42 के लिए मतदान की तारीख 28 अप्रैल से बदलकर 5 मई कर दी गई है।",
        source: "फेसबुक पोस्ट",
        spreadCount: 8100,
        regions: ["तमिलनाडु", "कर्नाटक"],
        isFake: true,
        verdict: "झूठ — भारत निर्वाचन आयोग ने पुष्टि की है कि कोई तारीख नहीं बदली गई है। आधिकारिक कार्यक्रम 28 अप्रैल, 2026 ही है। यह पोस्ट 12 समन्वित खातों के नेटवर्क से जुड़ी है।",
        confidence: 99.1,
        clusterSize: 112,
        detectedAt: "45 मिनट पहले"
      },
      {
        id: 3,
        claim: "बूथ #317 में ईवीएम मशीनों में एक विशिष्ट पार्टी के लिए पहले से ही वोट लोड पाए गए।",
        source: "ट्विटर/X थ्रेड",
        spreadCount: 15600,
        regions: ["महाराष्ट्र", "गुजरात", "राजस्थान"],
        isFake: true,
        verdict: "झूठ — भारत निर्वाचन आयोग ने लाइव प्रदर्शन करके दिखाया कि छेड़छाड़-रोधी सील बरकरार हैं। प्रसारित किया गया वीडियो प्रशिक्षण उद्देश्यों के लिए आयोजित एक मॉक ड्रिल का था।",
        confidence: 94.8,
        clusterSize: 203,
        detectedAt: "6 घंटे पहले"
      }
    ],
    steps: [
      "BigQuery डेटासेट में रिपोर्ट दर्ज की जा रही है...",
      "जेमिनी के साथ ML.GENERATE_TEXT चलाया जा रहा है...",
      "समान रिपोर्टों के साथ क्लस्टरिंग की जा रही है...",
      "चुनाव आयोग के सत्यापित डेटा के साथ क्रॉस-रेफरेंसिंग...",
      "विश्वास स्कोर तैयार किया जा रहा है..."
    ]
  }
};

export function MisinfoSimulator() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';
  const local = SIM_I18N[lang] || SIM_I18N['en'];
  const MISINFO_SCENARIOS = local.scenarios;
  const PIPELINE_STEPS = local.steps;
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
        {t('misinfo_sim')}
        <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[8px] tracking-widest">{t('bigquery_ml')}</span>
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
              <h3 className="text-sm font-black tracking-tight">{t('misinfo_title')}</h3>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">{t('bigquery_powered')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
              <Database size={12} className="text-emerald-400" />
              <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">{t('bigquery_active')}</span>
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
              <p className="text-xs text-slate-400">{t('bigquery_sim_desc')}</p>
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
                          <TrendingUp size={10} /> {scenario.spreadCount.toLocaleString()} {local.shares}
                        </span>
                      </div>
                    </div>
                    <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {local.investigate_btn}
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
                    <span className="text-[9px] font-black text-red-400 uppercase tracking-widest">{local.claim_under_investigation}</span>
                  </div>
                  <p className="text-sm text-white font-medium leading-relaxed">"{activeScenario.claim}"</p>
                  <div className="flex items-center gap-4 mt-3 text-[8px] text-slate-500">
                    <span className="flex items-center gap-1"><Globe size={10} /> {activeScenario.source}</span>
                    <span className="flex items-center gap-1"><Users size={10} /> {activeScenario.spreadCount.toLocaleString()} {local.shares}</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {activeScenario.detectedAt}</span>
                  </div>
                </div>

                {/* User Verdict */}
                {!userVerdict && (
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-slate-300 mb-3 font-bold">{local.assessment_prompt}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => submitVerdict('fake')}
                        className="p-3 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/15 text-red-400 font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                      >
                        <XCircle size={16} /> {local.assessment_false}
                      </button>
                      <button
                        onClick={() => submitVerdict('real')}
                        className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/15 text-emerald-400 font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 size={16} /> {local.assessment_real}
                      </button>
                    </div>
                  </div>
                )}

                {/* BigQuery Processing Pipeline */}
                {isProcessing && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-950/80 border border-blue-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Database size={14} className="text-blue-400 animate-pulse" />
                      <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">{t('bigquery_pipeline')}</span>
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
                      <p className="text-[8px] text-slate-500 uppercase tracking-widest font-bold mb-2">{local.live_query}</p>
                      <pre className="text-[10px] text-blue-300 font-mono leading-relaxed overflow-x-auto">
{`SELECT content, ml_generate_text_result
FROM ML.GENERATE_TEXT(
  MODEL \`election_data.gemini_verifier\`,
  TABLE \`election_data.flagged_claims\`,
  STRUCT('${local.ai_prompt_text}' AS prompt)
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
                          {(userVerdict === 'fake') === activeScenario.isFake ? local.correct_assessment : local.incorrect_assessment}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Brain size={16} className="text-national-saffron" />
                        <span className="text-[9px] font-black text-national-saffron uppercase tracking-widest">{local.gemini_result_title}</span>
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed">{activeScenario.verdict}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3 text-center">
                        <BarChart3 size={16} className="text-blue-400 mx-auto mb-1" />
                        <p className="text-lg font-black font-mono text-white">{activeScenario.confidence}%</p>
                        <p className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">{local.confidence_label}</p>
                      </div>
                      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3 text-center">
                        <Database size={16} className="text-emerald-400 mx-auto mb-1" />
                        <p className="text-lg font-black font-mono text-white">{activeScenario.clusterSize}</p>
                        <p className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">{local.reports_clustered_label}</p>
                      </div>
                      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3 text-center">
                        <Globe size={16} className="text-amber-400 mx-auto mb-1" />
                        <p className="text-lg font-black font-mono text-white">{activeScenario.regions.length}</p>
                        <p className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">{local.regions_affected_label}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => { setActiveScenario(null); setUserVerdict(null); setShowAnalysis(false); }}
                      className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all border border-white/10"
                    >
                      {local.investigate_another_scenario}
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
