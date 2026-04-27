import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Activity, ShieldCheck, X, AlertOctagon, Terminal, RefreshCcw, UserCheck, CheckCircle2 } from 'lucide-react';

const SRE_I18N = {
  en: {
    issue: "Issue:",
    action: "Action:",
    healed: "Healed",
    pending: "Pending HIL",
    informed: "HIL Informed",
    db_pool: "Database Pool",
    gemini_gateway: "Gemini AI Gateway",
    cache: "Cache",
    api: "API",
    issue_db: "Transient connection drop detected.",
    action_db: "Automated database pool re-pooling initiated. Cache invalidated.",
    issue_ai: "Latency spike > 2000ms",
    action_ai: "Traffic re-routed to backup Gemini Flash endpoint.",
    heal_db: "Physical database pool refresh executed over Cloud SQL sockets.",
    heal_cache: "Internal memory cleanup routines invoked.",
    heal_api: "Synchronized worker threads.",
    issue_intentional: "Intentional Database connection timeout simulation.",
    manual_hil: "Manual HIL Check"
  },
  hi: {
    issue: "समस्या:",
    action: "कार्रवाई:",
    healed: "स्वस्थ",
    pending: "लंबित एचआईएल",
    informed: "एचआईएल को सूचित किया",
    db_pool: "डेटाबेस पूल",
    gemini_gateway: "जेमिनी एआई गेटवे",
    cache: "कैश",
    api: "एपीआई",
    issue_db: "अस्थायी कनेक्शन ड्रॉप पाया गया।",
    action_db: "स्वचालित डेटाबेस पूल पुनर्गठन शुरू किया गया। कैश अमान्य कर दिया गया।",
    issue_ai: "विलंबता स्पाइक > 2000 मिलीसेकंड",
    action_ai: "ट्रैफ़िक को बैकअप जेमिनी फ्लैश एंडपॉइंट पर भेज दिया गया।",
    heal_db: "क्लाउड एसक्यूएल सॉकेट पर भौतिक डेटाबेस पूल रीफ्रेश किया गया।",
    heal_cache: "आंतरिक मेमोरी क्लीनअप रूटीन लागू किए गए।",
    heal_api: "वर्कर थ्रेड्स को सिंक्रनाइज़ किया गया।",
    issue_intentional: "जानबूझकर डेटाबेस कनेक्शन टाइमआउट सिमुलेशन।",
    manual_hil: "मानव हस्तक्षेप - एचआईएल सत्यापन"
  },
  ta: {
    issue: "பிரச்சனை:",
    action: "நடவடிக்கை:",
    healed: "குணமடைந்தது",
    pending: "நிலுவையில் உள்ளது",
    informed: "ஹெச்ஐஎல் க்கு தெரிவிக்கப்பட்டது",
    db_pool: "தரவுத்தள குளம்",
    gemini_gateway: "ஜெமினி ஏஐ கேட்வே",
    cache: "தற்காலிக சேமிப்பு",
    api: "ஏபிஐ",
    issue_db: "தற்காலிக இணைப்பு துண்டிப்பு கண்டறியப்பட்டது.",
    action_db: "தானியங்கி தரவுத்தள குளம் சீரமைப்பு தொடங்கப்பட்டது. தற்காலிக சேமிப்பு ரத்து செய்யப்பட்டது.",
    issue_ai: "தாமத அதிகரிப்பு > 2000 மில்லி விநாடிகள்",
    action_ai: "போக்குவரத்து மாற்று ஜெமினி பிளாஷ் இறுதிப்புள்ளிக்கு மாற்றப்பட்டது.",
    heal_db: "கிளவுட் எஸ்குயுஎல் சாக்கெட்டில் தரவுத்தள குளம் புதுப்பித்தல் செயல்படுத்தப்பட்டது.",
    heal_cache: "உள் நினைவக துப்புரவு நடைமுறைகள் செயல்படுத்தப்பட்டன.",
    heal_api: "ஒத்திசைக்கப்பட்ட தொழிலாளர் இழைகள்.",
    issue_intentional: "திட்டமிட்ட தரவுத்தள இணைப்பு காலாவதி உருவகப்படுத்துதல்.",
    manual_hil: "மனிதப் பங்களிப்பு - ஹெச்ஐஎல் கையேடு சரிபார்ப்பு"
  },
  te: {
    issue: "సమస్య:",
    action: "చర్య:",
    healed: "స్వస్థమైంది",
    pending: "పెండింగ్ హెచ్ఐఎల్",
    informed: "హెచ్ఐఎల్ కి తెలిపారు",
    db_pool: "డేటాబేస్ పూల్",
    gemini_gateway: "జెమిని ఏఐ గేట్‌వే",
    cache: "కాష్",
    api: "ఏపీఐ",
    issue_db: "తాత్కాలిక కనెక్షన్ డ్రాప్ గుర్తించబడింది.",
    action_db: "ఆటోమేటెడ్ డేటాబేస్ పూల్ పునర్వ్యవస్థీకరణ ప్రారంభించబడింది. కాష్ చెల్లదు.",
    issue_ai: "లేటెన్సీ స్పైక్ > 2000 మిల్లీసెకన్లు",
    action_ai: "ట్రాఫిక్ బ్యాకప్ జెమిని ఫ్లాష్ ఎండ్‌పాయింట్‌కు మళ్లించబడింది.",
    heal_db: "క్లౌడ్ ఎస్‌క్యూఎల్ సాకెట్‌లో భౌతిక డేటాబేస్ పూల్ రిఫ్రెష్ అమలు చేయబడింది.",
    heal_cache: "అంతర్గత మెమరీ క్లీనప్ నిత్యకృత్యాలు అమలు చేయబడ్డాయి.",
    heal_api: "వర్కర్ థ్రెడ్‌లు సమకాలీకరించబడ్డాయి.",
    issue_intentional: "ఉద్దేశపూర్వక డేటాబేస్ కనెక్షన్ సమయం ముగిసే అనుకరణ.",
    manual_hil: "మాన్యువల్ హెచ్ఐఎల్ తనిఖీ"
  },
  kn: {
    issue: "ಸಮಸ್ಯೆ:",
    action: "ಕ್ರಮ:",
    healed: "ಗುಣಮುಖವಾಯಿತು",
    pending: "ಬಾಕಿ ಎಚ್‌ಐಎಲ್",
    informed: "ಎಚ್‌ಐಎಲ್ ಗೆ ತಿಳಿಸಲಾಗಿದೆ",
    db_pool: "ಡೇಟಾಬೇಸ್ ಪೂಲ್",
    gemini_gateway: "ಜೆಮಿನಿ ಎಐ ಗೇಟ್‌ವೇ",
    cache: "ಸಂಗ್ರಹ",
    api: "ಎಪಿಐ",
    issue_db: "ತಾತ್ಕಾಲಿಕ ಸಂಪರ್ಕ ಡ್ರಾಪ್ ಪತ್ತೆಯಾಗಿದೆ.",
    action_db: "ಸ್ವಯಂಚಾಲಿತ ಡೇಟಾಬೇಸ್ ಪೂಲ್ ಮರುಸಂಘಟನೆ ಪ್ರಾರಂಭಿಸಲಾಗಿದೆ. ಸಂಗ್ರಹವನ್ನು ಅಮಾನ್ಯಗೊಳಿಸಲಾಗಿದೆ.",
    issue_ai: "ಲೇಟೆನ್ಸಿ ಸ್ಪೈಕ್ > 2000 ಮಿಲಿಸೆಕೆಂಡ್‌ಗಳು",
    action_ai: "ದಟ್ಟಣೆಯನ್ನು ಬ್ಯಾಕಪ್ ಜೆಮಿನಿ ಫ್ಲ್ಯಾಶ್ ಅಂತಿಮ ಬಿಂದುವಿಗೆ ಮರು-ರೂಟ್ ಮಾಡಲಾಗಿದೆ.",
    heal_db: "ಕ್ಲೌಡ್ ಎಸ್‌ಕ್ಯೂಎಲ್ ಸಾಕೆಟ್‌ನಲ್ಲಿ ಭೌತಿಕ ಡೇಟಾಬೇಸ್ ಪೂಲ್ ರಿಫ್ರೆಶ್ ಅನ್ನು ಕಾರ್ಯಗತಗೊಳಿಸಲಾಗಿದೆ.",
    heal_cache: "ಆಂತರಿಕ ಮೆಮೊರಿ ಕ್ಲೀನಪ್ ವಾಡಿಕೆಯಂತೆ ಆಹ್ವಾನಿಸಲಾಗಿದೆ.",
    heal_api: "ವರ್ಕರ್ ಥ್ರೆಡ್‌ಗಳನ್ನು ಸಿಂಕ್ರೊನೈಸ್ ಮಾಡಲಾಗಿದೆ.",
    issue_intentional: "ಉದ್ದೇಶಪೂರ್ವಕ ಡೇಟಾಬೇಸ್ ಸಂಪರ್ಕ ಕಾಲಾವಧಿ ಸಿಮ್ಯುಲೇಶನ್.",
    manual_hil: "ಹಸ್ತಚಾಲಿತ ಎಚ್‌ಐಎಲ್ ಪರಿಶೀಲನೆ"
  },
  bn: {
    issue: "সমস্যা:",
    action: "পদক্ষেপ:",
    healed: "নিরাময়",
    pending: "অমীমাংসিত এইচআইএল",
    informed: "এইচআইএল কে জানানো হয়েছে",
    db_pool: "ডেটাবেস পুল",
    gemini_gateway: "জেমিনি এআই গেটওয়ে",
    cache: "ক্যাশে",
    api: "এপিআই",
    issue_db: "অস্থায়ী সংযোগ ড্রপ সনাক্ত করা হয়েছে।",
    action_db: "স্বয়ংক্রিয় ডেটাবেস পুল পুনর্গঠন শুরু হয়েছে। ক্যাশে অবৈধ করা হয়েছে।",
    issue_ai: "বিলম্বিত স্পাইক > 2000 মিলিসেকেন্ড",
    action_ai: "ট্র্যাফিক ব্যাকআপ জেমিনি ফ্ল্যাশ এন্ডপয়েন্টে পুনঃনির্দেশিত হয়েছে।",
    heal_db: "ক্লাউড এসকিউএল সকেটে ফিজিক্যাল ডেটাবেস পুল রিফ্রেশ করা হয়েছে।",
    heal_cache: "অভ্যন্তরীণ মেমরি ক্লিনআপ রুটিন চালু করা হয়েছে।",
    heal_api: "কর্মী থ্রেড সিঙ্ক্রোনাইজ করা হয়েছে।",
    issue_intentional: "ইচ্ছাকৃত ডেটাবেস সংযোগ টাইমআউট সিমুলেশন।",
    manual_hil: "ম্যানুয়াল এইচআইএল চেক"
  },
  ml: {
    issue: "പ്രശ്നം:",
    action: "നടപടി:",
    healed: "ഭേദമായി",
    pending: "എച്ച്ഐഎൽ കാത്തിരിക്കുന്നു",
    informed: "എച്ച്ഐഎൽ അറിയിച്ചു",
    db_pool: "ഡാറ്റാബേസ് പൂൾ",
    gemini_gateway: "ജെമിനി എഐ ഗേറ്റ്‌വേ",
    cache: "കാഷെ",
    api: "എപിഐ",
    issue_db: "താൽക്കാലിക കണക്ഷൻ ഡ്രോപ്പ് കണ്ടെത്തി.",
    action_db: "യാന്ത്രിക ഡാറ്റാബേസ് പൂൾ പുനഃസംഘടന ആരംഭിച്ചു. കാഷെ അസാധുവായി.",
    issue_ai: "ലേറ്റൻസി സ്പൈക്ക് > 2000 മില്ലിസെക്കൻഡ്",
    action_ai: "ബാക്കപ്പ് ജെമിനി ഫ്ലാഷ് എൻഡ് പോയിന്റിലേക്ക് ട്രാഫിക് വഴിതിരിച്ചുവിട്ടു.",
    heal_db: "ക്ലൗഡ് എസ്‌ക്യുഎൽ സോക്കറ്റിൽ ഫിസിക്കൽ ഡാറ്റാബേസ് പൂൾ പുതുക്കൽ നടപ്പിലാക്കി.",
    heal_cache: "ആന്തരിക മെമ്മറി ക്ലീനപ്പ് ദിനചര്യകൾ നടപ്പിലാക്കി.",
    heal_api: "വർക്കർ ത്രെഡുകൾ സമന്വയിപ്പിച്ചു.",
    issue_intentional: "മനഃപൂർവമായ ഡാറ്റാബേസ് കണക്ഷൻ ടൈംഔട്ട് സിമുലേഷൻ.",
    manual_hil: "മാനുവൽ എച്ച്ഐഎൽ പരിശോധന"
  },
  mr: {
    issue: "समस्या:",
    action: "कृती:",
    healed: "बरे झाले",
    pending: "एचआयएल प्रलंबित",
    informed: "एचआयएल ला सूचित केले",
    db_pool: "डेटाबेस पूल",
    gemini_gateway: "जेमिनी एआई गेटवे",
    cache: "कॅशे",
    api: "एपीआई",
    issue_db: "हंगामी कनेक्शन ड्रॉप आढळला.",
    action_db: "स्वयंचलित डेटाबेस पूल पुनर्रचना सुरू झाली. कॅशे अवैध करण्यात आली.",
    issue_ai: "विलंबता स्पाइक > 2000 मिलीसेकंद",
    action_ai: "रहदारी बॅकअप जेमिनी फ्लॅश एंडपॉईंटवर वळवली.",
    heal_db: "क्लाउड एसक्यूएल सॉकेटवर भौतिक डेटाबेस पूल रिफ्रेश चालवले.",
    heal_cache: "अंतर्गत मेमरी क्लीनअप प्रक्रिया सुरू केली.",
    heal_api: "वर्कर थ्रेड्स सिंक्रोनाइझ केले.",
    issue_intentional: "हेतूने डेटाबेस कनेक्शन कालबाह्य सिम्युलेशन.",
    manual_hil: "मॅन्युअल एचआयएल तपासणी"
  },
  gu: {
    issue: "સમસ્યા:",
    action: "ક્રિયા:",
    healed: "સ્વસ્થ",
    pending: "એચઆઈએલ બાકી",
    informed: "એચઆઈએલ ને જાણ કરી",
    db_pool: "ડેટાબેઝ પૂલ",
    gemini_gateway: "જેમિની એઆઈ ગેટવે",
    cache: "કેશ",
    api: "એપીઆઈ",
    issue_db: "કામચલાઉ કનેક્શન ડ્રોપ જણાયું.",
    action_db: "સ્વચાલિત ડેટાબેઝ પૂલ પુનર્ગઠન શરૂ કરાયું. કેશ અમાન્ય કરાઈ.",
    issue_ai: "લેટન્સી સ્પાઇક > 2000 મિલિસેકન્ડ",
    action_ai: "ટ્રાફિકને બેકઅપ જેમિની ફ્લેશ એન્ડપોઇન્ટ પર રી-રૂટ કરવામાં આવ્યો.",
    heal_db: "ક્લાઉડ એસક્યુએલ સોકેટ પર ફિઝિકલ ડેટાબેઝ પૂલ રિફ્રેશ એક્ઝિક્યુટ થયું.",
    heal_cache: "આંતરિક મેમરી સફાઇના નિયમો ચલાવાયા.",
    heal_api: "વર્કર થ્રેડો સુમેળ સાધ્યા.",
    issue_intentional: "ઇરાદાપૂર્વક ડેટાબેઝ કનેક્શન સમયસમાપ્તિ સિમ્યુલેશન.",
    manual_hil: "મેન્યુઅલ એચઆઈએલ ચેક"
  },
  or: {
    issue: "ସମସ୍ୟା:",
    action: "କ୍ରିୟା:",
    healed: "ଆରୋଗ୍ୟ",
    pending: "ଏଚଆଇଏଲ ଅମ୍ଳ",
    informed: "ଏଚଆଇଏଲ କୁ ଜଣାଯାଇଛି",
    db_pool: "ଡାଟାବେସ୍ ପୁଲ୍",
    gemini_gateway: "ଜେମିନି ଏଆଇ ଗେଟୱେ",
    cache: "କ୍ୟାଚ୍",
    api: "ଏପିଆଇ",
    issue_db: "ଅସ୍ଥାୟୀ ସଂଯୋਗ ଡ୍ରପ୍ ଚିହ୍നଟ ହୋଇଛି |",
    action_db: "ସ୍ୱୟଂଚାଳିତ ଡାଟାବେସ୍ ପୁଲ୍ ପୁନର୍ଗଠନ ଆରମ୍ଭ ହେଲା | କ୍ୟାච୍ ଅମାନ୍ય ହେଲା |",
    issue_ai: "ଲେଟେନ୍ସି ସ୍ପାଇକ୍ > 2000 ମିଲିସେକେଣ୍ଡ",
    action_ai: "ଟ୍ରାଫିକ୍ ବ୍ୟାକଅପ୍ ଜେମିନି ଫ୍ଲାସ୍ ଏଣ୍ਡପଏଣ୍ଟକୁ ପୁନ-ନିର୍ଦ្ଦେଶିତ କରାଗଲା |",
    heal_db: "କ୍ଲାଉଡ୍ SQL ସକେଟରେ ଶାରୀରିକ ଡାଟାବେସ୍ ପୁଲ୍ ସତେଜ କାର୍ଯ್ಯକାରୀ ହେଲା |",
    heal_cache: "ଆଭ୍ୟନ୍ତରୀଣ ମେମୋରୀ ସଫା କରିବା କାର୍ଯ್ಯକ୍ରମ ଆରମ୍ଭ ହେଲା |",
    heal_api: "କର୍ମୀ ଥ୍ରେଡ୍ ସମକାଳୀନ ହେଲା |",
    issue_intentional: "ଉଦ୍ଦେଶ୍ୟମୂଳକ ଡାଟାବେସ୍ ସଂଯୋਗ ସମୟ ସମାପ୍ତି ଅନੁକରଣ |",
    manual_hil: "ମାନୁଆଲ୍ ଏଚଆଇଏଲ ଯାଞ୍ચ"
  },
  pa: {
    issue: "ਸਮੱਸਿਆ:",
    action: "ਕਾਰਵਾਈ:",
    healed: "ਠੀਕ ਹੋਇਆ",
    pending: "ਐਚਆਈਐਲ ਲੰਬਿਤ",
    informed: "ਐਚਆਈਐਲ ਨੂੰ ਸੂਚਿਤ ਕੀਤਾ",
    db_pool: "ਡਾਟਾਬੇਸ ਪੂਲ",
    gemini_gateway: "ਜੇਮਿਨੀ ਏਆਈ ਗੇਟਵੇ",
    cache: "ਕੈਸ਼",
    api: "ਏਪੀਆਈ",
    issue_db: "ਅਸਥਾਈ ਕਨੈਕਸ਼ਨ ਡਰਾਪ ਦਾ ਪਤਾ ਲੱਗਿਆ ਹੈ।",
    action_db: "ਆਟੋਮੇਟਿਡ ਡਾਟਾਬੇਸ ਪੂਲ ਪੁਨਰਗਠਨ ਸ਼ੁਰੂ ਕੀਤਾ ਗਿਆ। ਕੈਸ਼ ਅਵੈਧ ਕਰ ਦਿੱਤਾ ਗਿਆ।",
    issue_ai: "ਲੇਟੈਂਸੀ ਸਪਾਈਕ > 2000 ਮਿਲੀਸਕਿੰਟ",
    action_ai: "ਟ੍ਰੈਫਿਕ ਨੂੰ ਬੈਕਅੱਪ ਜੇਮਿਨੀ ਫਲੈਸ਼ ਐਂਡਪੁਆਇੰਟ 'ਤੇ ਰੀ-ਰੂਟ ਕੀਤਾ ਗਿਆ।",
    heal_db: "ਕਲਾਉਡ ਐਸਕਿਊਐਲ ਸਾਕਟ 'ਤੇ ਭੌਤਿਕ ਡਾਟਾਬੇਸ ਪੂਲ ਰਿਫ੍ਰੈਸ਼ ਚਲਾਇਆ ਗਿਆ।",
    heal_cache: "ਅੰਦਰੂਨੀ ਮੈਮੋਰੀ ਕਲੀਨਅੱਪ ਰੁਟੀਨ ਸ਼ੁਰੂ ਕੀਤੇ ਗਏ।",
    heal_api: "ਵਰਕਰ ਥ੍ਰੈੱਡ ਸਮਕਾਲੀ ਕੀਤੇ ਗਏ।",
    issue_intentional: "ਜਾਣਬੁੱਝ ਕੇ ਡਾਟਾਬੇਸ ਕਨੈਕশন ਟਾਈਮਆਉਟ ਸਿਮੂਲੇਸ਼ਨ।",
    manual_hil: "ਮੈਨੂਅਲ ਐਚਆਈਐਲ ਚੈੱਕ"
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
    if (!serviceName) return serviceName;
    const lower = serviceName.toLowerCase();
    if (lower.includes('database')) {
      return local.db_pool || serviceName;
    }
    if (lower.includes('gemini')) {
      return local.gemini_gateway || serviceName;
    }
    if (lower.includes('cache')) {
      return local.cache || serviceName;
    }
    if (lower.includes('api')) {
      return local.api || serviceName;
    }
    return serviceName;
  };

  const getLogTranslation = (text) => {
    if (!text) return text;
    const lower = text.toLowerCase();
    
    if (lower.includes('connection drop') || lower.includes('transient')) {
      return local.issue_db || text;
    }
    if (lower.includes('latency spike')) {
      return local.issue_ai || text;
    }
    if (lower.includes('manual hil')) {
      return local.manual_hil || text;
    }
    if (lower.includes('intentional') || lower.includes('timeout')) {
      return local.issue_intentional || text;
    }
    if (lower.includes('automated re-pooling')) {
      return local.action_db || text;
    }
    if (lower.includes('re-routed')) {
      return local.action_ai || text;
    }
    if (lower.includes('physical pool refresh')) {
      return local.heal_db || text;
    }
    if (lower.includes('memory cleanup')) {
      return local.heal_cache || text;
    }
    if (lower.includes('synchronized worker')) {
      return local.heal_api || text;
    }
    return text;
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
                     <p className="text-slate-300"><span className="text-slate-500">{local.issue}</span> {getLogTranslation(log.issue)}</p>
                     <p className={log.status === 'Healed' ? 'text-emerald-400' : 'text-amber-400'}>
                       <span className="text-slate-500">{local.action}</span> {getLogTranslation(log.action_taken)}
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
