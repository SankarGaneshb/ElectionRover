import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { MapPin, Accessibility, Navigation, ShieldCheck, Maximize2, X } from 'lucide-react'

const MOCK_BOOTHS = [
  { id: 1, name: "Gole Market Primary School", lat: 28.6328, lng: 77.2094, pwd: true, details: "Braille Ballots, Wheelchair Ramps available." },
  { id: 2, name: "Lodhi Road Community Center", lat: 28.5912, lng: 77.2215, pwd: true, details: "Sign Language Interpreter on-site." },
  { id: 3, name: "Sarojini Nagar Senior Sec School", lat: 28.5741, lng: 77.1945, pwd: false, details: "Standard accessibility parameters." },
  { id: 4, name: "Chanakyapuri Cultural Center", lat: 28.5991, lng: 77.1843, pwd: true, details: "Assisted voting support protocols." }
]
const MAP_I18N = {
  en: { title: "Constituency Boundaries: New Delhi", subtitle: "Zero-Scroll Geospatial Mapping", fallback: "Protected Fallback Protocol", live: "Live Satellite Integration", init: "Initializing GIS", offline_btn: "🔴 Using Offline GIS", live_btn: "🟢 Using Live Maps", pwd_only: "PWD Only", show_pwd: "Show PWD Accessible", standalone: "Standalone Verification Mode", select_booth: "Select Polling Station", close: "Close", walkthrough: "♿ 360° Accessibility Walkthrough" },
  hi: { title: "निर्वाचन क्षेत्र सीमाएं: नई दिल्ली", subtitle: "शून्य-स्क्रॉल भू-स्थानिक मानचित्रण", fallback: "सुरक्षित फॉलबैक प्रोटोकॉल", live: "लाइव उपग्रह एकीकरण", init: "GIS प्रारंभ हो रहा है", offline_btn: "🔴 ऑफलाइन GIS उपयोग", live_btn: "🟢 लाइव मानचित्र उपयोग", pwd_only: "केवल दिव्यांग", show_pwd: "दिव्यांग सुलभ दिखाएं", standalone: "स्वतंत्र सत्यापन मोड", select_booth: "मतदान केंद्र चुनें", close: "बंद करें", walkthrough: "♿ 360° पहुंच भ्रमण" },
  ta: { title: "தொகுதி எல்லைகள்: புது டெல்லி", subtitle: "பூஜ்ய-உருட்டல் புவி வரைபடம்", fallback: "பாதுகாக்கப்பட்ட பின்னணி நெறிமுறை", live: "நேரடி செயற்கைக்கோள் ஒருங்கிணைப்பு", init: "GIS தொடங்குகிறது", offline_btn: "🔴 ஆஃப்லைன் GIS பயன்படுத்துகிறது", live_btn: "🟢 நேரடி வரைபடங்கள் பயன்படுத்துகிறது", pwd_only: "மாற்றுத்திறனாளிகள் மட்டும்", show_pwd: "அணுகல் தகுதியானவை காட்டு", standalone: "தனி சரிபார்ப்பு முறை", select_booth: "வாக்குச்சாவடி தேர்ந்தெடுக்கவும்", close: "மூடு", walkthrough: "♿ 360° அணுகல் நடை" },
  te: { title: "నియోజకవర్గ సరిహద్దులు: న్యూ ఢిల్లీ", subtitle: "జీరో-స్క్రోల్ భూస్థాన మ్యాపింగ్", fallback: "రక్షిత ఫాల్‌బ్యాక్ ప్రోటోకాల్", live: "లైవ్ శాటిలైట్ ఏకీకరణ", init: "GIS ప్రారంభమవుతోంది", offline_btn: "🔴 ఆఫ్‌లైన్ GIS ఉపయోగిస్తోంది", live_btn: "🟢 లైవ్ మ్యాప్‌లు ఉపయోగిస్తోంది", pwd_only: "వికలాంగులు మాత్రమే", show_pwd: "వికలాంగ అనుకూల చూపు", standalone: "స్వతంత్ర ధృవీకరణ మోడ్", select_booth: "పోలింగ్ స్టేషన్ ఎంచుకోండి", close: "మూసివేయి", walkthrough: "♿ 360° అందుబాటు నడక" },
  kn: { title: "ಕ್ಷೇತ್ರ ಗಡಿಗಳು: ನವದೆಹಲಿ", subtitle: "ಶೂನ್ಯ-ಸ್ಕ್ರೋಲ್ ಭೌಗೋಳಿಕ ಮ್ಯಾಪಿಂಗ್", fallback: "ಸಂರಕ್ಷಿತ ಫಾಲ್‌ಬ್ಯಾಕ್ ಪ್ರೋಟೋಕಾಲ್", live: "ಲೈವ್ ಉಪಗ್ರಹ ಏಕೀಕರಣ", init: "GIS ಪ್ರಾರಂಭಿಸಲಾಗುತ್ತಿದೆ", offline_btn: "🔴 ಆಫ್‌ಲೈನ್ GIS ಬಳಕೆ", live_btn: "🟢 ಲೈವ್ ನಕ್ಷೆಗಳ ಬಳಕೆ", pwd_only: "ವಿಶೇಷಚೇತನರು ಮಾತ್ರ", show_pwd: "ವಿಶೇಷಚೇತನ ಸ್ನೇಹಿ ತೋರಿಸಿ", standalone: "ಸ್ವತಂತ್ರ ಪರಿಶೀಲನಾ ಮೋಡ್", select_booth: "ಮತಗಟ್ಟೆ ಆಯ್ಕೆ ಮಾಡಿ", close: "ಮುಚ್ಚಿ", walkthrough: "♿ 360° ಪ್ರವೇಶ ವಾಕ್‌ಥ್ರೂ" },
  bn: { title: "নির্বাচনী সীমানা: নতুন দিল্লি", subtitle: "জিরো-স্ক্রোল ভূস্থানিক ম্যাপিং", fallback: "সুরক্ষিত ফলব্যাক প্রোটোকল", live: "লাইভ স্যাটেলাইট ইন্টিগ্রেশন", init: "GIS শুরু হচ্ছে", offline_btn: "🔴 অফলাইন GIS ব্যবহার", live_btn: "🟢 লাইভ ম্যাপ ব্যবহার", pwd_only: "শুধু প্রতিবন্ধী", show_pwd: "প্রতিবন্ধী-বান্ধব দেখান", standalone: "স্বতন্ত্র যাচাই মোড", select_booth: "পোলিং স্টেশন বেছে নিন", close: "বন্ধ", walkthrough: "♿ 360° অ্যাক্সেস ওয়াকথ্রু" },
  ml: { title: "മണ്ഡല അതിർത്തി: ന്യൂ ഡൽഹി", subtitle: "സീറോ-സ്ക്രോൾ ജിയോസ്പേഷ്യൽ മാപ്പിംഗ്", fallback: "സുരക്ഷിത ഫാൾബ്യാക്ക് പ്രോട്ടോക്കോൾ", live: "തത്സമയ ഉപഗ്രഹ സംയോജനം", init: "GIS ആരംഭിക്കുന്നു", offline_btn: "🔴 ഓഫ്‌ലൈൻ GIS ഉപയോഗിക്കുന്നു", live_btn: "🟢 തത്സമയ മാപ്പ് ഉപയോഗിക്കുന്നു", pwd_only: "ഭിന്നശേഷിക്കാർ മാത്രം", show_pwd: "ഭിന്നശേഷി സൗഹൃദം കാണിക്കുക", standalone: "സ്വതന്ത്ര സ്ഥിരീകരണ മോഡ്", select_booth: "പോളിംഗ് സ്‌റ്റേഷൻ തിരഞ്ഞെടുക്കുക", close: "അടയ്ക്കുക", walkthrough: "♿ 360° ആക്‌സസ് വാക്ക്ത്രൂ" },
  mr: { title: "मतदारसंघ सीमा: नवी दिल्ली", subtitle: "शून्य-स्क्रोल भू-स्थानिक मॅपिंग", fallback: "संरक्षित फॉलबॅक प्रोटोकॉल", live: "थेट उपग्रह एकीकरण", init: "GIS सुरू होत आहे", offline_btn: "🔴 ऑफलाइन GIS वापरत आहे", live_btn: "🟢 थेट नकाशे वापरत आहे", pwd_only: "केवळ अपंग", show_pwd: "अपंग-अनुकूल दाखवा", standalone: "स्वतंत्र सत्यापन मोड", select_booth: "मतदान केंद्र निवडा", close: "बंद करा", walkthrough: "♿ 360° सुलभता भ्रमण" },
  gu: { title: "મત વિભાગ સીમા: નવી દિલ્હી", subtitle: "ઝીરો-સ્ક્રોલ ભૂ-અવકાશ મેપિંગ", fallback: "સંરક્ષિત ફોલ્બેક પ્રોટોકોલ", live: "લાઇવ સેટેલાઇટ એકીકરણ", init: "GIS શરૂ થઈ રહ્યું છે", offline_btn: "🔴 ઑફ્‍લાઇન GIS ઉપયોગ", live_btn: "🟢 લાઇવ નકશા ઉપયોગ", pwd_only: "માત્ર દિવ્યાંગ", show_pwd: "દિવ્યાંગ-સ્નેહી બતાવો", standalone: "સ્વતંત્ર ચકાસણી મોડ", select_booth: "મતદાન મથક પસંદ કરો", close: "બંધ", walkthrough: "♿ 360° ઍક્સેસ વૉકથ્રૂ" },
  or: { title: "ନିର୍ବାଚନ ମଣ୍ଡଳ ସୀମା: ନୂଆ ଦିଲ୍ଲୀ", subtitle: "ଶୂନ୍ୟ-ସ୍କ୍ରୋଲ୍ ଭୌଗୋଳିକ ମ୍ୟାପିଂ", fallback: "ସୁରକ୍ଷିତ ଫଲ୍‌ବ୍ୟାକ୍ ପ୍ରୋଟୋକଲ", live: "ଲାଇଭ୍ ସ୍ୟାଟେଲାଇଟ୍ ଏକୀକରଣ", init: "GIS ଆରଭ ହେଉଛି", offline_btn: "🔴 ଅଫ୍‌ଲାଇନ୍ GIS ବ୍ୟବହାର", live_btn: "🟢 ଲାଇଭ୍ ମ୍ୟାପ ବ୍ୟବହାର", pwd_only: "ବିକଳାଙ୍ଗ ଅଟ", show_pwd: "ବିକଳାଙ୍ଗ-ଅନୁକୂଳ ଦେଖାନ୍ତୁ", standalone: "ସ୍ୱତନ୍ତ୍ର ଯାଞ୍ଚ ମୋଡ", select_booth: "ମତ ଦାନ କେନ୍ଦ୍ର ବାଛନ୍ତୁ", close: "ବନ୍ଦ", walkthrough: "♿ 360° ଅ୍ୟାକ୍ସେସ ୱାକ୍‌ଥ୍ରୁ" },
  pa: { title: "ਹਲਕਾ ਸੀਮਾਵਾਂ: ਨਵੀਂ ਦਿੱਲੀ", subtitle: "ਜ਼ੀਰੋ-ਸਕ੍ਰੋਲ ਭੂ-ਸਥਾਨਿਕ ਮੈਪਿੰਗ", fallback: "ਸੁਰੱਖਿਅਤ ਫਾਲਬੈਕ ਪ੍ਰੋਟੋਕੋਲ", live: "ਲਾਈਵ ਸੈਟੇਲਾਈਟ ਏਕੀਕਰਨ", init: "GIS ਸ਼ੁਰੂ ਹੋ ਰਿਹਾ ਹੈ", offline_btn: "🔴 ਆਫਲਾਈਨ GIS ਵਰਤੋਂ", live_btn: "🟢 ਲਾਈਵ ਨਕਸ਼ੇ ਵਰਤੋਂ", pwd_only: "ਸਿਰਫ਼ ਅਪਾਹਜ", show_pwd: "ਅਪਾਹਜ-ਅਨੁਕੂਲ ਦਿਖਾਓ", standalone: "ਸੁਤੰਤਰ ਤਸਦੀਕ ਮੋਡ", select_booth: "ਵੋਟਿੰਗ ਸਟੇਸ਼ਨ ਚੁਣੋ", close: "ਬੰਦ ਕਰੋ", walkthrough: "♿ 360° ਪਹੁੰਚ ਵਾਕਥਰੂ" }
};

export function MapView() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language || 'en';
  const ml = MAP_I18N[lang] || MAP_I18N['en'];
  const [isOpen, setIsOpen] = useState(false)
  const [forceOffline, setForceOffline] = useState(false)
  const [showPwdOnly, setShowPwdOnly] = useState(false)
  const [selectedBooth, setSelectedBooth] = useState(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapRef = useRef(null)
  const googleMapRef = useRef(null)
  const markersRef = useRef([])

  const filteredBooths = showPwdOnly 
    ? MOCK_BOOTHS.filter(b => b.pwd) 
    : MOCK_BOOTHS

  useEffect(() => {
    if (!isOpen || forceOffline) return;

    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    if (!apiKey) {
      console.warn("VITE_GOOGLE_API_KEY not found in client environment.");
      return;
    }

    const scriptId = "google-maps-script"
    let script = document.getElementById(scriptId)

    const initMap = () => {
      if (!window.google || !mapRef.current) return

      const center = { lat: 28.6139, lng: 77.2090 }
      
      googleMapRef.current = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: 13,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#1e293b" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#1e293b" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
          { featureType: "road", elementType: "geometry", stylers: [{ color: "#334155" }] },
          { featureType: "water", elementType: "geometry", stylers: [{ color: "#0f172a" }] }
        ]
      })

      setMapLoaded(true)
    }

    if (!script) {
      script = document.createElement("script")
      script.id = scriptId
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
      script.async = true
      script.defer = true
      script.onload = initMap
      document.head.appendChild(script)
    } else {
      if (window.google) {
        initMap()
      }
    }

    return () => {
      markersRef.current.forEach(m => m.setMap(null))
      markersRef.current = []
    }
  }, [isOpen, forceOffline])

  useEffect(() => {
    if (!googleMapRef.current || !window.google || forceOffline) return

    markersRef.current.forEach(m => m.setMap(null))
    markersRef.current = []

    filteredBooths.forEach(booth => {
      const isSelected = selectedBooth?.id === booth.id
      const marker = new window.google.maps.Marker({
        position: { lat: booth.lat, lng: booth.lng },
        map: googleMapRef.current,
        title: booth.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: isSelected ? 16 : 10,
          fillColor: booth.pwd ? "#10b981" : "#f59e0b",
          fillOpacity: 1,
          strokeWeight: isSelected ? 4 : 2,
          strokeColor: isSelected ? "#f59e0b" : "#ffffff"
        },
        zIndex: isSelected ? 999 : 1
      })

      marker.addListener("click", () => {
        setSelectedBooth(booth)
      })

      markersRef.current.push(marker)
    })
  }, [filteredBooths, mapLoaded, isOpen, forceOffline, selectedBooth])

  useEffect(() => {
    if (selectedBooth && googleMapRef.current && window.google && !forceOffline) {
      googleMapRef.current.panTo({ lat: selectedBooth.lat, lng: selectedBooth.lng })
      googleMapRef.current.setZoom(15)
    }
  }, [selectedBooth, forceOffline])

  useEffect(() => {
    if (selectedBooth && window.google && !forceOffline) {
      const panoElement = document.getElementById("street-view-pano")
      if (panoElement) {
        new window.google.maps.StreetViewPanorama(panoElement, {
          position: { lat: selectedBooth.lat, lng: selectedBooth.lng },
          pov: { heading: 165, pitch: 0 },
          zoom: 1
        })
      }
    }
  }, [selectedBooth, forceOffline])

  if (!isOpen) {

    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full h-16 rounded-xl border border-national-saffron/20 bg-national-saffron/10 hover:bg-national-saffron/20 text-national-saffron flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.01] shadow-lg shadow-orange-500/5 group"
      >
        <Navigation size={18} className="group-hover:rotate-45 transition-transform" />
        {t('explore_maps')}
      </button>
    )
  }




  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden shadow-2xl relative">
        
        {/* Modal Header */}
        <div className="p-4 bg-slate-950/60 border-b border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-black flex items-center gap-2">
              <Navigation size={16} className="text-national-saffron" />
              {ml.title}
            </h3>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-0.5">
              {ml.subtitle}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`w-1.5 h-1.5 rounded-full ${(!forceOffline && mapLoaded) || forceOffline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className={`text-[8px] font-black tracking-widest uppercase ${(!forceOffline && mapLoaded) || forceOffline ? 'text-emerald-400' : 'text-amber-400'}`}>
                {forceOffline ? ml.fallback : (mapLoaded ? ml.live : ml.init)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setForceOffline(!forceOffline)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                !forceOffline 
                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}
            >
              {forceOffline ? ml.offline_btn : ml.live_btn}
            </button>

            <button 
              onClick={() => setShowPwdOnly(!showPwdOnly)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all border ${
                showPwdOnly 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10'
              }`}
            >
              <Accessibility size={16} />
              {showPwdOnly ? ml.pwd_only : ml.show_pwd}
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white border border-white/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 relative bg-slate-950 flex flex-col md:flex-row overflow-hidden">
          {/* External Google Maps Canvas Overlay */}
          {!forceOffline && (
            <div ref={mapRef} className="absolute inset-0 z-10 w-full h-full bg-slate-950" />
          )}

          {/* Spatial Vector Grid (Simulated Map) */}
          {forceOffline && (
            <div className="flex-1 h-full relative overflow-hidden bg-slate-900 border-r border-white/5 p-4 flex items-center justify-center">
              {/* SVG Interactive Boundaries */}
              <svg viewBox="0 0 800 600" className="w-full max-w-2xl h-auto opacity-70 animate-pulse duration-[4000ms]">
                <defs>
                  <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#1e293b" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {/* Roads & Paths */}
                <path d="M 100,100 L 700,500 M 100,500 L 700,100 M 400,0 L 400,600 M 0,300 L 800,300" stroke="#334155" strokeWidth="2" strokeDasharray="10 5" />
                <circle cx="400" cy="300" r="150" fill="url(#grad1)" stroke="#475569" strokeWidth="1" />
                
                {/* Active Marker Points */}
                {filteredBooths.map(booth => {
                  const isSelected = selectedBooth?.id === booth.id;
                  return (
                    <g 
                      key={booth.id} 
                      className="cursor-pointer group" 
                      onClick={() => setSelectedBooth(booth)}
                      transform={`translate(${booth.lat * 10 - 200}, ${booth.lng * 5 - 100})`}
                    >
                      <circle cx="0" cy="0" r={isSelected ? 20 : 14} fill={booth.pwd ? "#10b981" : "#f59e0b"} fillOpacity="0.2" className="animate-ping" />
                      <circle cx="0" cy="0" r={isSelected ? 10 : 6} fill={booth.pwd ? "#10b981" : "#f59e0b"} stroke={isSelected ? "#f59e0b" : "#ffffff"} strokeWidth={isSelected ? 3 : 1.5} />
                    </g>
                  );
                })}
              </svg>
              <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-white/5 text-[8px] font-mono text-slate-400">
                <ShieldCheck size={12} className="text-emerald-500" />
                {ml.standalone}
              </div>
            </div>
          )}



          {/* Interactive Booth Information List */}
          <div className="w-full md:w-80 bg-slate-950/40 backdrop-blur-md p-4 flex flex-col gap-3 overflow-y-auto border-l border-white/5 relative z-20">

            <h4 className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">
              {ml.select_booth}
            </h4>
            {filteredBooths.map(booth => (
              <div 
                key={booth.id} 
                onClick={() => setSelectedBooth(booth)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedBooth?.id === booth.id 
                    ? 'bg-white/10 border-national-saffron shadow-lg' 
                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex justify-between items-start">
                  <MapPin size={16} className={booth.pwd ? "text-emerald-400" : "text-amber-500"} />
                  {booth.pwd && (
                    <span className="text-[8px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-black tracking-widest">
                      PWD
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold mt-1.5 text-slate-200">{booth.name}</h4>
              </div>
            ))}
          </div>

          {selectedBooth && (
            <div className="absolute bottom-4 left-4 right-4 md:right-[340px] bg-slate-950/95 border border-white/10 rounded-xl p-4 backdrop-blur-2xl shadow-2xl animate-in slide-in-from-bottom-5 z-30">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-black text-white flex items-center gap-2">
                    <MapPin size={14} className={selectedBooth.pwd ? "text-emerald-400" : "text-amber-500"} />
                    {selectedBooth.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">{selectedBooth.details}</p>
                </div>
                <button 
                  onClick={() => setSelectedBooth(null)}
                  className="text-xs text-slate-500 hover:text-white font-bold"
                >
                  {ml.close}
                </button>
              </div>

              {!forceOffline && (
                <div className="mt-3">
                  <span className="text-[9px] font-black tracking-widest text-national-saffron uppercase block mb-1">
                    {ml.walkthrough}
                  </span>
                  <div id="street-view-pano" className="w-full h-44 bg-slate-900 rounded-lg border border-white/10 overflow-hidden" />
                </div>
              )}
            </div>
          )}


        </div>
      </div>
    </div>
  )
}


