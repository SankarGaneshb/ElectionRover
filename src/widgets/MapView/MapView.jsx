import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { MapPin, Accessibility, Navigation, ShieldCheck, Maximize2, X } from 'lucide-react'

const MAP_CENTERS = {
  en: { lat: 28.6139, lng: 77.2090 },
  hi: { lat: 26.8467, lng: 80.9462 },
  ta: { lat: 13.0827, lng: 80.2707 },
  te: { lat: 17.3850, lng: 78.4867 },
  kn: { lat: 12.9716, lng: 77.5946 },
  bn: { lat: 22.5726, lng: 88.3639 },
  ml: { lat: 8.5241, lng: 76.9366 },
  mr: { lat: 19.0760, lng: 72.8777 },
  gu: { lat: 23.0225, lng: 72.5714 },
  or: { lat: 20.2961, lng: 85.8245 },
  pa: { lat: 31.6340, lng: 74.8723 }
}

const MOCK_BOOTHS_BY_LANG = {
  en: [
    { id: 1, lat: 28.6328, lng: 77.2094, pwd: true },
    { id: 2, lat: 28.5912, lng: 77.2215, pwd: true },
    { id: 3, lat: 28.5741, lng: 77.1945, pwd: false },
    { id: 4, lat: 28.5991, lng: 77.1843, pwd: true }
  ],
  hi: [
    { id: 1, lat: 26.8467, lng: 80.9462, pwd: true },
    { id: 2, lat: 26.8567, lng: 80.9562, pwd: true },
    { id: 3, lat: 26.8367, lng: 80.9362, pwd: false },
    { id: 4, lat: 26.8667, lng: 80.9662, pwd: true }
  ],
  ta: [
    { id: 1, lat: 13.0827, lng: 80.2707, pwd: true },
    { id: 2, lat: 13.0910, lng: 80.2800, pwd: true },
    { id: 3, lat: 13.1000, lng: 80.2600, pwd: false },
    { id: 4, lat: 13.1100, lng: 80.2500, pwd: true }
  ],
  te: [
    { id: 1, lat: 17.3850, lng: 78.4867, pwd: true },
    { id: 2, lat: 17.3950, lng: 78.4967, pwd: true },
    { id: 3, lat: 17.3750, lng: 78.4767, pwd: false },
    { id: 4, lat: 17.4050, lng: 78.5067, pwd: true }
  ],
  kn: [
    { id: 1, lat: 12.9716, lng: 77.5946, pwd: true },
    { id: 2, lat: 12.9816, lng: 77.6046, pwd: true },
    { id: 3, lat: 12.9616, lng: 77.5846, pwd: false },
    { id: 4, lat: 12.9916, lng: 77.6146, pwd: true }
  ],
  ml: [
    { id: 1, lat: 8.5241, lng: 76.9366, pwd: true },
    { id: 2, lat: 8.5341, lng: 76.9466, pwd: true },
    { id: 3, lat: 8.5141, lng: 76.9266, pwd: false },
    { id: 4, lat: 8.5441, lng: 76.9566, pwd: true }
  ],
  bn: [
    { id: 1, lat: 22.5726, lng: 88.3639, pwd: true },
    { id: 2, lat: 22.5826, lng: 88.3739, pwd: true },
    { id: 3, lat: 22.5626, lng: 88.3539, pwd: false },
    { id: 4, lat: 22.5926, lng: 88.3839, pwd: true }
  ],
  mr: [
    { id: 1, lat: 19.0760, lng: 72.8777, pwd: true },
    { id: 2, lat: 19.0860, lng: 72.8877, pwd: true },
    { id: 3, lat: 19.0660, lng: 72.8677, pwd: false },
    { id: 4, lat: 19.0960, lng: 72.8977, pwd: true }
  ],
  gu: [
    { id: 1, lat: 23.0225, lng: 72.5714, pwd: true },
    { id: 2, lat: 23.0325, lng: 72.5814, pwd: true },
    { id: 3, lat: 23.0125, lng: 72.5614, pwd: false },
    { id: 4, lat: 23.0425, lng: 72.5914, pwd: true }
  ],
  or: [
    { id: 1, lat: 20.2961, lng: 85.8245, pwd: true },
    { id: 2, lat: 20.3061, lng: 85.8345, pwd: true },
    { id: 3, lat: 20.2861, lng: 85.8145, pwd: false },
    { id: 4, lat: 20.3161, lng: 85.8445, pwd: true }
  ],
  pa: [
    { id: 1, lat: 31.6340, lng: 74.8723, pwd: true },
    { id: 2, lat: 31.6440, lng: 74.8823, pwd: true },
    { id: 3, lat: 31.6240, lng: 74.8623, pwd: false },
    { id: 4, lat: 31.6540, lng: 74.8923, pwd: true }
  ]
}

const MAP_I18N = {
  en: { 
    title: "Constituency Boundaries: New Delhi", subtitle: "Zero-Scroll Geospatial Mapping", fallback: "Protected Fallback Protocol", live: "Live Satellite Integration", init: "Initializing GIS", offline_btn: "🔴 Using Offline GIS", live_btn: "🟢 Using Live Maps", pwd_only: "PWD Only", show_pwd: "Show PWD Accessible", standalone: "Standalone Verification Mode", select_booth: "Select Polling Station", close: "Close", walkthrough: "♿ 360° Accessibility Walkthrough",
    b1_name: "Gole Market Primary School", b1_details: "Braille Ballots, Wheelchair Ramps available.",
    b2_name: "Lodhi Road Community Center", b2_details: "Sign Language Interpreter on-site.",
    b3_name: "Sarojini Nagar Senior Sec School", b3_details: "Standard accessibility parameters.",
    b4_name: "Chanakyapuri Cultural Center", b4_details: "Assisted voting support protocols."
  },
  hi: { 
    title: "निर्वाचन क्षेत्र सीमाएं: लखनऊ", subtitle: "शून्य-स्क्रॉल भू-स्थानिक मानचित्रण", fallback: "सुरक्षित फॉलबैक प्रोटोकॉल", live: "लाइव उपग्रह एकीकरण", init: "GIS प्रारंभ हो रहा है", offline_btn: "🔴 ऑफलाइन GIS उपयोग", live_btn: "🟢 लाइव मानचित्र उपयोग", pwd_only: "केवल दिव्यांग", show_pwd: "दिव्यांग सुलभ दिखाएं", standalone: "स्वतंत्र सत्यापन मोड", select_booth: "मतदान केंद्र चुनें", close: "बंद करें", walkthrough: "♿ 360° पहुंच भ्रमण",
    b1_name: "हजरतगंज प्राइमरी स्कूल", b1_details: "ब्रेल मतपत्र, व्हीलचेयर रैंप उपलब्ध हैं।",
    b2_name: "गोमती नगर कम्युनिटी सेंटर", b2_details: "साइन लैंग्वेज दुभाषिया उपलब्ध है।",
    b3_name: "अलीगंज सीनियर सेकेंडरी स्कूल", b3_details: "मानक पहुंच पैरामीटर।",
    b4_name: "अमीनाबाद सांस्कृतिक केंद्र", b4_details: "सहायता प्राप्त मतदान सहायता प्रोटोकॉल।"
  },
  ta: { 
    title: "தொகுதி எல்லைகள்: சென்னை", subtitle: "பூஜ்ய-உருட்டல் புவி வரைபடம்", fallback: "பாதுகாக்கப்பட்ட பின்னணி நெறிமுறை", live: "நேரடி செயற்கைக்கோள் ஒருங்கிணைப்பு", init: "GIS தொடங்குகிறது", offline_btn: "🔴 ஆஃப்லைன் GIS பயன்படுத்துகிறது", live_btn: "🟢 நேரடி வரைபடங்கள் பயன்படுத்துகிறது", pwd_only: "மாற்றுத்திறனாளிகள் மட்டும்", show_pwd: "அணுகல் தகுதியானவை காட்டு", standalone: "தனி சரிபார்ப்பு முறை", select_booth: "வாக்குச்சாவடி தேர்ந்தெடுக்கவும்", close: "மூடு", walkthrough: "♿ 360° அணுகல் நடை",
    b1_name: "ராயபுரம் ஆரம்பப் பள்ளி", b1_details: "பிரைலி வாக்குச்சீட்டுகள், சக்கர நாற்காலி சாய்வுதளங்கள் உள்ளன.",
    b2_name: "தண்டையார்பேட்டை சமூக மையம்", b2_details: "சைகை மொழி மொழிபெயர்ப்பாளர் பணியில் உள்ளார்.",
    b3_name: "ஆர்.கே.நகர் மேல்நிலைப் பள்ளி", b3_details: "நிலையான அணுகல் அளவுருக்கள்.",
    b4_name: "கொருக்குப்பேட்டை கலாச்சார மையம்", b4_details: "உதவிக் கூடிய வாக்குப்பதிவு ஆதரவு நெறிமுறைகள்."
  },
  te: { 
    title: "నియోజకవర్గ సరిహద్దులు: హైదరాబాద్", subtitle: "జీరో-స్క్రోల్ భూస్థాన మ్యాపింగ్", fallback: "రక్షిత ఫాల్‌బ్యాక్ ప్రోటోకాల్", live: "లైవ్ శాటిలైట్ ఏకీకరణ", init: "GIS ప్రారంభమవుతోంది", offline_btn: "🔴 ఆఫ్‌లైన్ GIS ఉపయోగిస్తోంది", live_btn: "🟢 లైవ్ మ్యాప్‌లు ఉపయోగిస్తోంది", pwd_only: "వికలాంగులు మాత్రమే", show_pwd: "వికలాంగ అనుకూల చూపు", standalone: "స్వతంత్ర ధృవీకరణ మోడ్", select_booth: "పోలింగ్ స్టేషన్ ఎంచుకోండి", close: "మూసివేయి", walkthrough: "♿ 360° అందుబాటు నడక",
    b1_name: "జూబ్లీ హిల్స్ పబ్లిక్ పాఠశాల", b1_details: "బ్రైలీ బ్యాలెట్లు, వీల్ చైర్ ర్యాంప్‌లు అందుబాటులో ఉన్నాయి.",
    b2_name: "బంజారా హిల్స్ కమ్యూనిటీ సెంటర్", b2_details: "సైన్ లాంగ్వేజ్ వ్యాఖ్యాత అందుబాటులో ఉన్నారు.",
    b3_name: "మాదాపూర్ సీనియర్ సెకండరీ పాఠశాల", b3_details: "ప్రామాణిక ప్రాప్యత పారామితులు.",
    b4_name: "యూసుఫ్‌గూడ సాంస్కృతిక కేంద్రం", b4_details: "సహాయక ఓటింగ్ మద్దతు ప్రోటోకాల్స్."
  },
  kn: { 
    title: "ಕ್ಷೇತ್ರ ಗಡಿಗಳು: ಬೆಂಗಳೂರು", subtitle: "ಶೂನ್ಯ-ಸ್ಕ್ರೋಲ್ ಭೌಗೋಳಿಕ ಮ್ಯಾಪಿಂಗ್", fallback: "ಸಂರಕ್ಷಿತ ಫಾಲ್‌ಬ್ಯಾಕ್ ಪ್ರೋಟೋಕಾಲ್", live: "ಲೈವ್ ಉಪಗ್ರಹ ಏಕೀಕರಣ", init: "GIS ಪ್ರಾರಂಭಿಸಲಾಗುತ್ತಿದೆ", offline_btn: "🔴 ಆಫ್‌ಲೈನ್ GIS ಬಳಕೆ", live_btn: "🟢 ಲೈವ್ ನಕ್ಷೆಗಳ ಬಳಕೆ", pwd_only: "ವಿಶೇಷಚೇತನರು ಮಾತ್ರ", show_pwd: "ವಿಶೇಷಚೇತನ ಸ್ನೇಹಿ ತೋರಿಸಿ", standalone: "ಸ್ವತಂತ್ರ ಪರಿಶೀಲನಾ ಮೋಡ್", select_booth: "ಮತಗಟ್ಟೆ ಆಯ್ಕೆ ಮಾಡಿ", close: "ಮುಚ್ಚಿ", walkthrough: "♿ 360° ಪ್ರವೇಶ ವಾಕ್‌ಥ್ರೂ",
    b1_name: "ಮಲ್ಲೇಶ್ವರಂ ಪ್ರಾಥಮಿಕ ಶಾಲೆ", b1_details: "ಬ್ರೈಲ್ ಮತಪತ್ರಗಳು, ಗಾಲಿಕುರ್ಚಿ ಇಳಿಜಾರುಗಳು ಲಭ್ಯವಿದೆ.",
    b2_name: "ರಾಜಾಜಿನಗರ ಸಮುದಾಯ ಕೇಂದ್ರ", b2_details: "ಸನ್ನೆ ಭಾಷೆ ಇಂಟರ್ಪ್ರಿเตอร์ ಸೈಟ್ನಲ್ಲಿದ್ದಾರೆ.",
    b3_name: "ಯಶವಂತಪುರ ಹಿರಿಯ ಮಾಧ್ಯಮಿಕ ಶಾಲೆ", b3_details: "ಪ್ರಮಾಣಿತ ಪ್ರವೇಶ ನಿಯತಾಂಕಗಳು.",
    b4_name: "ಸದಾಶಿವನಗರ ಸಾಂಸ್ಕೃತಿಕ ಕೇಂದ್ರ", b4_details: "ಸಹಾಯ ಮತದಾನ ಬೆಂಬಲ ಪ್ರೋಟೋಕಾಲ್ಗಳು."
  },
  bn: { 
    title: "নির্বাচনী সীমানা: কলকাতা", subtitle: "জিরো-স্ক্রোল ভূস্থানিক ম্যাপিং", fallback: "সুরক্ষিত ফলব্যাক প্রোটোকল", live: "লাইভ স্যাটেলাইট ইন্টিগ্রেশন", init: "GIS শুরু হচ্ছে", offline_btn: "🔴 অফলাইন GIS ব্যবহার", live_btn: "🟢 লাইভ ম্যাপ ব্যবহার", pwd_only: "শুধু প্রতিবন্ধী", show_pwd: "প্রতিবন্ধী-বান্ধব দেখান", standalone: "স্বতন্ত্র যাচাই মোড", select_booth: "পোলিং স্টেশন বেছে নিন", close: "বন্ধ", walkthrough: "♿ 360° অ্যাক্সেস ওয়াকথ্রু",
    b1_name: "ভবানীপুর প্রাথমিক বিদ্যালয়", b1_details: "ব্রেইল ব্যালট, হুইলচেয়ার র‌্যাম্প উপলব্ধ।",
    b2_name: "বালিগঞ্জ কমিউনিটি সেন্টার", b2_details: "সাইন ল্যাঙ্গুয়েজ অনুবাদক উপস্থিত আছেন।",
    b3_name: "আলিপুর সিনিয়র সেকেন্ডারি স্কুল", b3_details: "প্রমিত অ্যাক্সেসযোগ্যতার পরামিতি।",
    b4_name: "কালীঘাট সাংস্কৃতিক কেন্দ্র", b4_details: "সহায়তা প্রাপ্ত ভোটিং সহায়তা প্রোটোকল।"
  },
  ml: { 
    title: "മണ്ഡല അതിർത്തി: തിരുവനന്തപുരം", subtitle: "സീറോ-സ്ക്രോൾ ജിയോസ്പേഷ്യൽ മാപ്പിംഗ്", fallback: "സുരക്ഷിത ഫാൾബ്യാック പ്രോട്ടോക്കോൾ", live: "തത്സമയ ഉപഗ്രഹ സംയോജനം", init: "GIS ആരംഭിക്കുന്നു", offline_btn: "🔴 ഓഫ്‌ലൈൻ GIS ഉപയോഗിക്കുന്നു", live_btn: "🟢 തത്സമയ മാപ്പ് ഉപയോഗിക്കുന്നു", pwd_only: "ഭിന്നശേഷിക്കാർ മാത്രം", show_pwd: "ഭിന്നശേഷി സൗഹൃദം കാണിക്കുക", standalone: "സ്വതന്ത്ര സ്ഥിരീകരണ മോഡ്", select_booth: "പോളിംഗ് സ്‌റ്റേഷൻ തിരഞ്ഞെടുക്കുക", close: "അടയ്ക്കുക", walkthrough: "♿ 360° ആക്‌സസ് വാക്ക്ത്രൂ",
    b1_name: "പാളയം പ്രൈമറി സ്കൂൾ", b1_details: "ബ്രെയ്‌ലി ബാലറ്റുകൾ, വീൽചെയർ റാമ്പുകൾ ലഭ്യമാണ്.",
    b2_name: "കിഴക്കേക്കോട്ട കമ്മ്യൂणीറ്റി സെന്റർ", b2_details: "ആംഗ്യഭാഷാ വ്യാഖ്യാതാവ് ലഭ്യമാണ്.",
    b3_name: "പട്ടം സീനിയർ സെക്കൻഡറി സ്കൂൾ", b3_details: "സാധാരണ പ്രവേശനക്ഷമത പാരാമീറ്ററുകൾ.",
    b4_name: "വെള്ളയമ്പലം കൾച്ചറൽ സെന്റർ", b4_details: "സഹായത്തോടെയുള്ള വോട്ടിംഗ് പിന്തുണാ പ്രോട്ടോക്കോളുകൾ."
  },
  mr: { 
    title: "मतदारसंघ सीमा: मुंबई", subtitle: "शून्य-स्क्रोल भू-स्थानिक मॅपिंग", fallback: "संरक्षित फॉलबॅक प्रोटोकॉल", live: "थेट उपग्रह एकीकरण", init: "GIS सुरू होत आहे", offline_btn: "🔴 offline GIS वापरत आहे", live_btn: "🟢 थेट नकाशे वापरत आहे", pwd_only: "केवळ अपंग", show_pwd: "अपंग-अनुकूल दाखवा", standalone: "स्वतंत्र सत्यापन मोड", select_booth: "मतदान केंद्र निवडा", close: "बंद करा", walkthrough: "♿ 360° सुलभता भ्रमण",
    b1_name: "वरळी प्राथमिक शाळा", b1_details: "ब्रेल मतपत्रिका, व्हीलचेअर रॅम्प उपलब्ध आहेत.",
    b2_name: "प्रभादेवी कम्युनिटी सेंटर", b2_details: "साइन लँग्वेज इंटरप्रेटर जागेवर उपलब्ध आहे.",
    b3_name: "दादर सीनियर सेकेंडरी स्कूल", b3_details: "प्रमाणित सुलभता पॅरामीटर्स.",
    b4_name: " Shivaji Park सांस्कृतिक केंद्र", b4_details: "सहाय्यक मतदान समर्थन प्रोटोकॉल."
  },
  gu: { 
    title: "મત વિભાગ સીમા: અમદાવાદ", subtitle: "ઝીરો-સ્ક્રોલ ભૂ-અવકાશ મેપિંગ", fallback: "સંરક્ષિત ફોલ્બેક પ્રોટોકોલ", live: "લાઇવ સેટેલાઇટ એકીકરણ", init: "GIS શરૂ થઈ રહ્યું છે", offline_btn: "🔴 ઑફ્‍લાઇન GIS ઉપયોગ", live_btn: "🟢 લાઇવ નકશા ઉપયોગ", pwd_only: "માત્ર દિવ્યાંગ", show_pwd: "દિવ્યાંગ-સ્નેહી બતાવો", standalone: "સ્વતંત્ર ચકાસણી મોડ", select_booth: "મતદાન મથક પસંદ કરો", close: "બંધ", walkthrough: "♿ 360° ઍક્સેસ વૉકથ્રૂ",
    b1_name: "ઘાટલોડિયા પ્રાઇમરી સ્કૂલ", b1_details: "બ્રેઇલ મતપત્રો, વ્હીલચેર રેમ્પ ઉપલબ્ધ છે.",
    b2_name: "નારણપુરા કોમ્યુનિટી સેન્ટર", b2_details: "સાઇન લેંગ્વેજ ઇન્ટરપ્રીટર હાજર છે.",
    b3_name: "સેટેલાઇટ સિનિયર સેકન્ડਰੀ સ્કૂલ", b3_details: "પ્રમાણભૂત ઍક્સેસિબિલિٹی પરિમાણો.",
    b4_name: "વસ્ત્રાપુર સાંસ્કૃતિક કેન્દ્ર", b4_details: "સહાયક મતદાન સપોર્ટ પ્રોટોકોલ."
  },
  or: { 
    title: "ନିର୍ବାଚନ ମଣ୍ଡଳ ସୀମା: ଭୁବନେଶ୍ୱର", subtitle: "ଶୂନ୍ୟ-ସ୍କ୍ରୋଲ୍ ଭୌଗୋଳିକ ମ୍ୟାପିଂ", fallback: "ସୁରକ୍ଷିତ ଫଲ୍‌ବ୍ୟାକ୍ ପ୍ରୋଟୋକଲ", live: "ଲାଇଭ୍ ସ୍ୟାଟେଲਾਈଟ୍ ଏକୀକରଣ", init: "GIS ଆରଭ ହେଉଛି", offline_btn: "🔴 ଅଫ୍‌ଲਾਈନ୍ GIS ବ୍ୟବହାର", live_btn: "🟢 ଲାଇଭ୍ ମ୍ୟାପ ବ୍ୟବହାର", pwd_only: "ବିକଳାଙ୍ଗ ଅଟ", show_pwd: "ବିକଳαଙ୍ଗ-ଅନੁକૂଳ ଦେଖାନ୍ତୁ", standalone: "ସ୍ୱતંત્ર ଯାଞચ ମୋଡ", select_booth: "ମତ ଦାନ କେନ୍ଦ୍ର ବାଛନ୍ତು", close: "ବନ୍ଦ", walkthrough: "♿ 360° ଅ୍ୟାକ୍ସେସ ୱାକ୍‌ଥ୍ରୁ",
    b1_name: "ଏକାମ୍ର ପ୍ରାଥମିକ ବିଦ୍ୟାଳୟ", b1_details: "ବ୍ରେଲ୍ ବ୍ୟାଲଟ୍, ହ୍ୱିଲ୍ ଚେୟାର୍ ର‌୍ୟାମ୍ପ ଉପଲବ୍ଧ |",
    b2_name: "ସହୀଦ ନଗର କମ୍ୟୁନିଟି ସେଣ୍ଟର", b2_details: "ସଙ୍କେତ ଭାଷା ଅନುବାଦକ ଉପସ୍ଥିତ ଅଛନ୍ତି |",
    b3_name: "ଖଣ୍ଡଗିରି ସିନିୟର ସେକେଣ୍ਡାରୀ ସ୍କୁଲ", b3_details: "ମାନକ ପ୍ରବେଶ ପାରାମିଟର |",
    b4_name: "ପଟିଆ ସାଂସ୍କୃତିକ କେન્દ્ર", b4_details: "ସହାୟକ ମତଦାନ ସମର୍ଥନ ପ୍ରୋଟୋକଲ୍ |"
  },
  pa: { 
    title: "ਹਲਕਾ ਸੀਮਾਵਾਂ: ਅੰਮ੍ਰਿਤਸਰ", subtitle: "ਜ਼ੀਰੋ-ਸਕ੍ਰੋਲ ਭੂ-ਸਥਾਨਿਕ ਮੈਪਿੰਗ", fallback: "ਸੁਰੱਖਿਅਤ ਫਾਲਬੈਕ ਪ੍ਰੋਟੋਕੋਲ", live: "ਲਾਈਵ ਸੈਟੇਲਾਈਟ ਏਕੀਕਰਨ", init: "GIS ਸ਼ੁਰੂ ਹੋ ਰਿਹਾ ਹੈ", offline_btn: "🔴 ਆਫਲਾਈਨ GIS ਵਰਤੋਂ", live_btn: "🟢 ਲਾਈਵ ਨਕਸ਼ੇ ਵਰਤੋਂ", pwd_only: "ਸਿਰਫ਼ ਅਪਾਹਜ", show_pwd: "ਅਪਾਹਜ-ਅਨੁਕੂਲ ਦਿਖਾਓ", standalone: "ਸੁਤੰਤਰ ਤਸਦੀਕ ਮੋਡ", select_booth: "ਵੋਟਿੰਗ ਸਟੇਸ਼ਨ ਚੁਣੋ", close: "ਬੰਦ ਕਰੋ", walkthrough: "♿ 360° ਪਹੁੰਚ ਵਾਕਥਰੂ",
    b1_name: "ਗੋਲਡਨ ਟੈਂਪਲ ਪ੍ਰਾਇਮਰੀ ਸਕੂਲ", b1_details: "ਬ੍ਰੇਲ ਬੈਲਟ, ਵ੍ਹੀਲਚੇਅਰ ਰੈਂਪ ਉਪਲਬਧ ਹਨ।",
    b2_name: "ਰਣਜੀਤ ਐਵੇਨਿਊ ਕਮਿਊਨਿਟੀ ਸੈਂਟਰ", b2_details: "ਸਾਈਨ ਲੈਂਗੂਏਜ ਇੰਟਰਪ੍ਰੇਟਰ ਸਾਈਟ 'ਤੇ ਹੈ।",
    b3_name: "ਪੁਤਲੀਘਰ ਸੀਨੀਅਰ ਸੈਕੰਡਰੀ ਸਕੂਲ", b3_details: "ਮਿਆਰੀ ਪਹੁੰਚਯੋਗਤਾ ਮਾਪਦੰਡ।",
    b4_name: "ਸਿਵਲ ਲਾਈਨਜ਼ ਸੱਭਿਆਚਾਰਕ ਕੇਂਦਰ", b4_details: "ਸਹਾਇਤਾ ਪ੍ਰਾਪਤ ਵੋਟਿੰਗ ਸਹਾਇਤਾ ਪ੍ਰੋਟੋਕੋਲ।"
  }
}

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

  const boothsForLang = MOCK_BOOTHS_BY_LANG[lang] || MOCK_BOOTHS_BY_LANG['en']

  const filteredBooths = showPwdOnly 
    ? boothsForLang.filter(b => b.pwd) 
    : boothsForLang

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

      const center = MAP_CENTERS[lang] || MAP_CENTERS['en']
      
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

    if (script) {
      if (script.src.includes(`language=${i18n.language}`)) {
        if (window.google) {
          initMap()
        }
        return;
      } else {
        script.remove();
        if (window.google) delete window.google;
        setMapLoaded(false);
      }
    }

    script = document.createElement("script")
    script.id = scriptId
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&language=${i18n.language}`
    script.async = true
    script.defer = true
    script.onload = initMap
    document.head.appendChild(script)

    return () => {
      markersRef.current.forEach(m => m.setMap(null))
      markersRef.current = []
    }
  }, [isOpen, forceOffline, i18n.language, lang])

  useEffect(() => {
    if (!googleMapRef.current || !window.google || forceOffline) return

    markersRef.current.forEach(m => m.setMap(null))
    markersRef.current = []

    filteredBooths.forEach(booth => {
      const isSelected = selectedBooth?.id === booth.id
      const marker = new window.google.maps.Marker({
        position: { lat: booth.lat, lng: booth.lng },
        map: googleMapRef.current,
        title: ml[`b${booth.id}_name`],
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
  }, [filteredBooths, mapLoaded, isOpen, forceOffline, selectedBooth, ml])

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
                      transform={`translate(${(booth.lat % 5) * 50 + 200}, ${(booth.lng % 5) * 50 + 100})`}
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
                <h4 className="text-xs font-bold mt-1.5 text-slate-200">{ml[`b${booth.id}_name`]}</h4>
              </div>
            ))}
          </div>

          {selectedBooth && (
            <div className="absolute bottom-4 left-4 right-4 md:right-[340px] bg-slate-950/95 border border-white/10 rounded-xl p-4 backdrop-blur-2xl shadow-2xl animate-in slide-in-from-bottom-5 z-30">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-black text-white flex items-center gap-2">
                    <MapPin size={14} className={selectedBooth.pwd ? "text-emerald-400" : "text-amber-500"} />
                    {ml[`b${selectedBooth.id}_name`]}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">{ml[`b${selectedBooth.id}_details`]}</p>
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
