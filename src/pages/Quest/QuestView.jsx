import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ShieldCheck, Trophy, Sparkles, 
  Cpu, Target, CheckCircle2, MessageSquare, Send, Bot, User
} from 'lucide-react';
const QUEST_I18N = {
  en: {
    active_protocol: "Active Protocol Initialization",
    phase: "Phase",
    current_objective: "Current Objective",
    consult_agent: "Consult Agent",
    agent_hint: "Need clarification on this phase? Ask the Educator Agent for deep-dive insights.",
    agent_welcome: "Protocol is active. How can I assist with your registration?",
    analyzing: "ANALYZING PROTOCOL...",
    ask_placeholder: "Ask anything about this step...",
    terminate_protocol: "Terminate Protocol & Verify",
    proceed: "Proceed to Next Phase",
    protocol_verified: "PROTOCOL VERIFIED",
    integrity_seal: "Integrity Seal:",
    syncing: "Syncing with Electoral Roll..."
  },
  hi: {
    active_protocol: "सक्रिय प्रोटोकॉल आरंभीकरण",
    phase: "चरण",
    current_objective: "वर्तमान उद्देश्य",
    consult_agent: "एजेंट से परामर्श करें",
    agent_hint: "इस चरण पर स्पष्टीकरण चाहिए? गहराई से जानकारी के लिए शिक्षक एजेंट से पूछें।",
    agent_welcome: "प्रोटोकॉल सक्रिय है। मैं आपके पंजीकरण में कैसे सहायता कर सकता हूँ?",
    analyzing: "प्रोटोकॉल का विश्लेषण किया जा रहा है...",
    ask_placeholder: "इस चरण के बारे में कुछ भी पूछें...",
    terminate_protocol: "प्रोटोकॉल समाप्त करें और सत्यापित करें",
    proceed: "अगले चरण पर बढ़ें",
    protocol_verified: "प्रोटोकॉल सत्यापित",
    integrity_seal: "अखंडता मुहर:",
    syncing: "मतदाता सूची के साथ समन्वय किया जा रहा है..."
  },
  ta: {
    active_protocol: "செயலில் உள்ள நெறிமுறை துவக்கம்",
    phase: "கட்டம்",
    current_objective: "தற்போதைய நோக்கம்",
    consult_agent: "முகவரிடம் ஆலோசிக்கவும்",
    agent_hint: "இந்த கட்டத்தில் விளக்கம் தேவையா? ஆழ்ந்த நுண்ணறிவுகளுக்கு கல்வியாளர் முகவரிடம் கேளுங்கள்.",
    agent_welcome: "நெறிமுறை செயலில் உள்ளது. உங்கள் பதிவுக்கு நான் எவ்வாறு உதவ முடியும்?",
    analyzing: "நெறிமுறை பகுப்பாய்வு செய்யப்படுகிறது...",
    ask_placeholder: "இந்த கட்டத்தைப் பற்றி எதையும் கேளுங்கள்...",
    terminate_protocol: "நெறிமுறையை நிறுத்தி சரிபார்க்கவும்",
    proceed: "அடுத்த கட்டத்திற்குச் செல்லவும்",
    protocol_verified: "நெறிமுறை சரிபார்க்கப்பட்டது",
    integrity_seal: "ஒருமைப்பாட்டு முத்திரை:",
    syncing: "வாக்காளர் பட்டியலுடன் ஒத்திசைக்கப்படுகிறது..."
  },
  te: {
    active_protocol: "చురుకైన ప్రోటోకాల్ ప్రారంభం",
    phase: "దశ",
    current_objective: "ప్రస్తుత లక్ష్యం",
    consult_agent: "ఏజెంట్‌ను సంప్రదించండి",
    agent_hint: "ఈ దశపై స్పష్టత కావాలా? లోతైన అంతర్దృష్టుల కోసం శిక్షణ ఏజెంట్‌ను అడగండి.",
    agent_welcome: "ప్రోటోకాల్ చురుకుగా ఉంది. మీ నమోదులో నేను ఎలా సహాయం చేయగలను?",
    analyzing: "ప్రోటోకాల్ విశ్లేషిస్తోంది...",
    ask_placeholder: "ఈ దశ గురించి ఏదైనా అడగండి...",
    terminate_protocol: "ప్రోటోకాల్ ముగించి ధృవీకరించండి",
    proceed: "తదుపరి దశకు వెళ్ళండి",
    protocol_verified: "ప్రోటోకాల్ ధృవీకరించబడింది",
    integrity_seal: "సమగ్రత ముద్ర:",
    syncing: "ఓటర్ల జాబితాతో సమకాలీకరిస్తోంది..."
  },
  kn: {
    active_protocol: "ಸಕ್ರಿಯ ಪ್ರೋಟೋಕಾಲ್ ಪ್ರಾರಂಭ",
    phase: "ಹಂತ",
    current_objective: "ಪ್ರಸ್ತುತ ಉದ್ದೇಶ",
    consult_agent: "ಏಜೆಂಟ್ ಸಂಪರ್ಕಿಸಿ",
    agent_hint: "ಈ ಹಂತದಲ್ಲಿ ಸ್ಪಷ್ಟೀಕರಣ ಬೇಕೇ? ಆಳವಾದ ಒಳನೋಟಗಳಿಗಾಗಿ ಶಿಕ್ಷಣ ಏಜೆಂಟ್ ಕೇಳಿ.",
    agent_welcome: "ಪ್ರೋಟೋಕಾಲ್ ಸಕ್ರಿಯವಾಗಿದೆ. ನಿಮ್ಮ ನೋಂದಣಿಯಲ್ಲಿ ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
    analyzing: "ಪ್ರೋಟೋಕಾಲ್ ವಿಶ್ಲೇಷಣೆ...",
    ask_placeholder: "ಈ ಹಂತದ ಬಗ್ಗೆ ಏನಾದರೂ ಕೇಳಿ...",
    terminate_protocol: "ಪ್ರೋಟೋಕಾಲ್ ಮುಗಿಸಿ ಪರಿಶೀಲಿಸಿ",
    proceed: "ಮುಂದಿನ ಹಂತಕ್ಕೆ ತೆರಳಿ",
    protocol_verified: "ಪ್ರೋಟೋಕಾಲ್ ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
    integrity_seal: "ಸಮಗ್ರತೆ ಮುದ್ರೆ:",
    syncing: "ಮತದಾರರ ಪಟ್ಟಿಯೊಂದಿಗೆ ಸಿಂಕ್ ಆಗುತ್ತಿದೆ..."
  },
  bn: {
    active_protocol: "সক্রিয় প্রোটোকল শুরু",
    phase: "পর্যায়",
    current_objective: "বর্তমান উদ্দেশ্য",
    consult_agent: "এজেন্টের সাথে পরামর্শ করুন",
    agent_hint: "এই পর্যায়ে স্পষ্টীকরণ দরকার? গভীর অন্তর্দৃষ্টির জন্য শিক্ষা এজেন্টকে জিজ্ঞেস করুন।",
    agent_welcome: "প্রোটোকল সক্রিয়। আপনার নিবন্ধনে আমি কীভাবে সাহায্য করতে পারি?",
    analyzing: "প্রোটোকল বিশ্লেষণ করা হচ্ছে...",
    ask_placeholder: "এই পদক্ষেপ সম্পর্কে যেকোনো কিছু জিজ্ঞেস করুন...",
    terminate_protocol: "প্রোটোকল শেষ করুন এবং যাচাই করুন",
    proceed: "পরবর্তী পর্যায়ে যান",
    protocol_verified: "প্রোটোকল যাচাই হয়েছে",
    integrity_seal: "সততার সীল:",
    syncing: "ভোটার তালিকার সাথে সমন্বয় হচ্ছে..."
  },
  ml: {
    active_protocol: "സജീവ പ്രോട്ടോക്കോൾ ആരംഭം",
    phase: "ഘട്ടം",
    current_objective: "നിലവിലെ ലക്ഷ്യം",
    consult_agent: "ഏജൻ്റിനെ സമീപിക്കുക",
    agent_hint: "ഈ ഘട്ടത്തിൽ വ്യക്തത ആവശ്യമുണ്ടോ? ആഴത്തിലുള്ള ഉൾക്കാഴ്ചകൾക്ക് വിദ്യാഭ്യാസ ഏജൻ്റിനോട് ചോദിക്കുക.",
    agent_welcome: "പ്രോട്ടോക്കോൾ സജീവമാണ്. നിങ്ങളുടെ രജിസ്ട്രേഷനിൽ എനിക്ക് എങ്ങനെ സഹായിക്കാം?",
    analyzing: "പ്രോട്ടോക്കോൾ വിശകലനം ചെയ്യുന്നു...",
    ask_placeholder: "ഈ ഘട്ടത്തെക്കുറിച്ച് എന്തും ചോദിക്കുക...",
    terminate_protocol: "പ്രോട്ടോക്കോൾ അവസാനിപ്പിക്കുക & സ്ഥിരീകരിക്കുക",
    proceed: "അടുത്ത ഘട്ടത്തിലേക്ക് പോകുക",
    protocol_verified: "പ്രോട്ടോക്കോൾ സ്ഥിരീകരിച്ചു",
    integrity_seal: "സമഗ്രതാ മുദ്ര:",
    syncing: "വോട്ടർ പട്ടികയുമായി സമന്വയിക്കുന്നു..."
  },
  mr: {
    active_protocol: "सक्रिय प्रोटोकॉल प्रारंभ",
    phase: "टप्पा",
    current_objective: "सध्याचे उद्दिष्ट",
    consult_agent: "एजंटशी सल्ला घ्या",
    agent_hint: "या टप्प्यावर स्पष्टीकरण हवे आहे? सखोल माहितीसाठी शिक्षण एजंटला विचारा.",
    agent_welcome: "प्रोटोकॉल सक्रिय आहे. मी तुमच्या नोंदणीत कशी मदत करू शकतो?",
    analyzing: "प्रोटोकॉल विश्लेषण सुरू...",
    ask_placeholder: "या टप्प्याबद्दल काहीही विचारा...",
    terminate_protocol: "प्रोटोकॉल संपवा आणि सत्यापित करा",
    proceed: "पुढील टप्प्यावर जा",
    protocol_verified: "प्रोटोकॉल सत्यापित",
    integrity_seal: "अखंडता सील:",
    syncing: "मतदार यादीशी समक्रमित होत आहे..."
  },
  gu: {
    active_protocol: "સક્રિય પ્રોટોકોલ શરૂ",
    phase: "તબક્કો",
    current_objective: "વર્તમાન ઉદ્દેશ",
    consult_agent: "એજન્ટ સાથે પરામર્શ કરો",
    agent_hint: "આ તબક્કે સ્પષ્ટીકરણ જોઈએ? ઊંડા અંતર્દૃષ્ટિ માટે શિક્ષણ એજન્ટને પૂછો.",
    agent_welcome: "પ્રોટોકોલ સક્રિય છે. હું તમારી નોંધણીમાં કેવી રીતે મદદ કરી શકું?",
    analyzing: "પ્રોટોકોલ વિશ્લેષણ...",
    ask_placeholder: "આ પગલા વિશે કંઈ પણ પૂછો...",
    terminate_protocol: "પ્રોટોકોલ સમાપ્ત કરો અને ચકાસો",
    proceed: "આગળના તબક્કા પર જાઓ",
    protocol_verified: "પ્રોટોકોલ ચકાસાઈ",
    integrity_seal: "અખંડિતતા સીલ:",
    syncing: "મતદાર યાદી સાથે સુમેળ સધાઈ રહ્યો છે..."
  },
  or: {
    active_protocol: "ସକ୍ରିୟ ପ୍ରୋଟୋକଲ ଆରମ୍ଭ",
    phase: "ପର୍ଯ୍ୟାୟ",
    current_objective: "ବର୍ତ୍ତମାନ ଲକ୍ଷ୍ୟ",
    consult_agent: "ଏଜେଣ୍ଟ ସହ ପରାମର୍ଶ କରନ୍ତୁ",
    agent_hint: "ଏହି ପର୍ଯ୍ୟାୟରେ ସ୍ପଷ୍ଟୀକରଣ ଦରକାର? ଶ୍ରେଷ୍ଠ ଜ୍ଞାନ ପାଇଁ ଶିକ୍ଷା ଏଜେଣ୍ଟଙ୍କୁ ପ୍ରଶ୍ନ କରନ୍ତୁ।",
    agent_welcome: "ପ୍ରୋଟୋକଲ ସକ୍ରିୟ ଅଛି। ଆପଣଙ୍କ ପଞ୍ଜୀକରଣରେ ମୁଁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?",
    analyzing: "ପ୍ରୋଟୋକଲ ବିଶ୍ଳେଷଣ...",
    ask_placeholder: "ଏହି ପଦକ୍ଷେପ ବିଷୟରେ ଯୁଲ ବୀ ଜିଜ୍ଞେସ କରନ୍ତୁ...",
    terminate_protocol: "ପ୍ରୋଟୋକଲ ସମାପ୍ତ ଓ ଯାଞ୍ଚ କରନ୍ତୁ",
    proceed: "ପରବର୍ତ୍ତୀ ପର୍ଯ୍ୟାୟକୁ ଯାଆନ୍ତୁ",
    protocol_verified: "ପ୍ରୋଟୋକଲ ଯାଞ୍ଚ ହୋଇଛି",
    integrity_seal: "ଅଖଣ୍ଡତା ସିଲ:",
    syncing: "ଭୋଟର ତାଲିକା ସହ ସିଙ୍କ ହେଉଛି..."
  },
  pa: {
    active_protocol: "ਸਰਗਰਮ ਪ੍ਰੋਟੋਕੋਲ ਸ਼ੁਰੂਆਤ",
    phase: "ਪੜਾਅ",
    current_objective: "ਮੌਜੂਦਾ ਮਕਸਦ",
    consult_agent: "ਏਜੰਟ ਨਾਲ ਸਲਾਹ ਕਰੋ",
    agent_hint: "ਇਸ ਪੜਾਅ 'ਤੇ ਸਪੱਸ਼ਟੀਕਰਨ ਚਾਹੀਦਾ? ਡੂੰਘੀ ਜਾਣਕਾਰੀ ਲਈ ਸਿੱਖਿਅਕ ਏਜੰਟ ਤੋਂ ਪੁੱਛੋ।",
    agent_welcome: "ਪ੍ਰੋਟੋਕੋਲ ਸਰਗਰਮ ਹੈ। ਮੈਂ ਤੁਹਾਡੀ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਵਿੱਚ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?",
    analyzing: "ਪ੍ਰੋਟੋਕੋਲ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...",
    ask_placeholder: "ਇਸ ਕਦਮ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ...",
    terminate_protocol: "ਪ੍ਰੋਟੋਕੋਲ ਖਤਮ ਕਰੋ ਅਤੇ ਤਸਦੀਕ ਕਰੋ",
    proceed: "ਅਗਲੇ ਪੜਾਅ 'ਤੇ ਜਾਓ",
    protocol_verified: "ਪ੍ਰੋਟੋਕੋਲ ਤਸਦੀਕ ਹੋਇਆ",
    integrity_seal: "ਅਖੰਡਤਾ ਮੋਹਰ:",
    syncing: "ਵੋਟਰ ਸੂਚੀ ਨਾਲ ਸਿੰਕ ਹੋ ਰਿਹਾ ਹੈ..."
  }
};
export const QuestView = ({ quest, onComplete, role, language }) => {
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
      const response = await fetch('http://localhost:8000/chat', {
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
      setChatHistory(prev => [...prev, { role: 'assistant', content: "Protocol Error: Unable to reach the Intelligence Hub. Please check your connection." }]);
    } finally {
      setIsTyping(false);
    }
  };

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

            <h2 className="text-3xl font-black mb-2 tracking-tighter">{quest.title}</h2>
            <p className="text-sm text-slate-400 mb-6 max-w-xl">{quest.description}</p>

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
                  {quest.steps[currentStep].title}
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm">
                  {quest.steps[currentStep].content}
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
                {local.integrity_seal} <span className="text-white font-bold">{quest.badge}</span>
              </p>
              <div className="flex items-center justify-center gap-4 text-national-saffron font-black text-4xl mb-6">
                <Target size={32} />
                <span>+{quest.points} <span className="text-sm uppercase tracking-[0.4em] text-slate-500">Creds</span></span>
              </div>
              <p className="text-xs text-slate-600 uppercase tracking-[0.5em] animate-pulse">{local.syncing}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
