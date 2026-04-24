import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: "Welcome to Election Rover",
      tagline: "The ultimate agentic intelligence platform for voters and candidates. Navigate the world's largest democratic exercise with precision.",
      protocol_badge: "India 2026 Election Protocol",
      hero_title_1: "DEFEND YOUR",
      hero_title_2: "DEMOCRACY.",
      voter: "General Elector",
      voter_portal: "Voter Portal",
      voter_desc: "Master the registration process, locate your booth, and verify your rights.",
      candidate: "Candidate",
      candidate_portal: "Contestant Portal",
      candidate_desc: "Technical compliance, nomination protocols, and campaign integrity.",
      ops_overview: "Operations Overview",
      life_cycle: "Election Life Cycle",
      clarity_index: "Clarity Index",
      protocols: "Protocols",
      voter_reg_title: "The Registration Trail",
      voter_reg_desc: "Ensure you are on the electoral roll and ready to vote.",
      voter_booth_title: "Booth Locator",
      voter_booth_desc: "Find where your voice will be heard.",
      execute_protocol: "Execute Protocol",
      review_protocol: "Review Protocol"
    }
  },
  hi: {
    translation: {
      welcome: "इलेक्शन रोवर में आपका स्वागत है",
      tagline: "मतदाताओं और उम्मीदवारों के लिए अंतिम एजेंटিক इंटेलिजेंस प्लेटफॉर्म। दुनिया के सबसे बड़े लोकतांत्रिक अभ्यास को सटीकता के साथ नेविगेट करें।",
      protocol_badge: "भारत 2026 चुनाव प्रोटोकॉल",
      hero_title_1: "अपने रक्षा करें",
      hero_title_2: "लोकतंत्र की।",
      voter: "सामान्य मतदाता",
      voter_portal: "मतदाता पोर्टल",
      voter_desc: "पंजीकरण प्रक्रिया में महारत हासिल करें, अपने बूथ का पता लगाएं और अपने अधिकारों को सत्यापित करें।",
      candidate: "उम्मीदवार",
      candidate_portal: "प्रत्याशी पोर्टल",
      candidate_desc: "तकनीकी अनुपालन, नामांकन प्रोटोकॉल और अभियान अखंडता।",
      ops_overview: "संचालन अवलोकन",
      life_cycle: "चुनाव जीवन चक्र",
      clarity_index: "स्पष्टता सूचकांक",
      protocols: "प्रोटोकॉल",
      voter_reg_title: "पंजीकरण मार्ग",
      voter_reg_desc: "सुनिश्चित करें कि आप मतदाता सूची में हैं और वोट देने के लिए तैयार हैं।",
      voter_booth_title: "बूথ लोकेटर",
      voter_booth_desc: "पता लगाएं कि आपकी आवाज कहां सुनी जाएगी।",
      execute_protocol: "प्रोटोकॉल निष्पादित करें",
      review_protocol: "प्रोटोकॉल की समीक्षा करें"
    }
  },
  ta: {
    translation: {
      welcome: "தேர்தல் ரோவருக்கு உங்களை வரவேற்கிறோம்",
      tagline: "வாக்காளர்கள் மற்றும் வேட்பாளர்களுக்கான இறுதி முகவர் நுண்ணறிவு தளம். உலகின் மிகப்பெரிய ஜனநாயகப் பயிற்சியை துல்லியமாக வழிநடத்துங்கள்.",
      protocol_badge: "இந்தியா 2026 தேர்தல் நெறிமுறை",
      hero_title_1: "ஜனநாயகத்தைப்",
      hero_title_2: "பாதுகாப்போம்.",
      voter: "பொது வாக்காளர்",
      voter_portal: "வாக்காளர் தளம்",
      voter_desc: "பதிவு செயல்முறையை அறிந்துகொள்ளுங்கள், உங்கள் பூத்தை கண்டறியுங்கள் மற்றும் உங்கள் உரிமைகளை சரிபார்க்குங்கள்.",
      candidate: "வேட்பாளர்",
      candidate_portal: "வேட்பாளர் தளம்",
      candidate_desc: "தொழில்நுட்ப இணக்கம், வேட்புமனு நெறிமுறைகள் மற்றும் பிரச்சார ஒருமைப்பாடு.",
      ops_overview: "நடவடிக்கைகளின் மேலோட்டம்",
      life_cycle: "தேர்தல் சுழற்சி",
      clarity_index: "தெளிவு குறியீடு",
      protocols: "நெறிமுறைகள்",
      voter_reg_title: "பதிவுப் பாதை",
      voter_reg_desc: "நீங்கள் வாக்காளர் பட்டியலில் இருப்பதை உறுதிசெய்து வாக்களிக்க தயாராகுங்கள்.",
      voter_booth_title: "வாக்குச்சாவடி கண்டறிவான்",
      voter_booth_desc: "உங்கள் வாக்குச்சாவடியைக் கண்டறியுங்கள்.",
      execute_protocol: "தொடங்கவும்",
      review_protocol: "மதிப்பாய்வு செய்க"
    }
  },
  te: {
    translation: {
      welcome: "ఎలక్షన్ రోవర్ కి స్వాగతం",
      tagline: "ఓటర్లు మరియు అభ్యర్థుల కోసం అంతిమ ఏజెంటిక్ ఇంటెలిజెన్స్ ప్లాట్‌ఫారమ్. ప్రపంచంలోనే అతిపెద్ద ప్రజాస్వామ్య అభ్యాసాన్ని ఖచ్చితత్వంతో నావిగేట్ చేయండి.",
      protocol_badge: "భారతదేశం 2026 ఎన్నికల ప్రోటోకాల్",
      hero_title_1: "మీ రక్షించండి",
      hero_title_2: "ప్రజాస్వామ్యాన్ని.",
      voter: "సాధారణ ఓటరు",
      voter_portal: "ఓటరు పోర్టల్",
      voter_desc: "రిజిస్ట్రేషన్ ప్రక్రియలో నైపుణ్యం సాధించండి, మీ బూత్‌ను గుర్తించండి మరియు మీ హక్కులను ధృవీకరించండి.",
      candidate: "అభ్యర్థి",
      candidate_portal: "అభ్యర్థి పోర్タル",
      candidate_desc: "సాంకేతిక సమ్మతి, నామినేషన్ ప్రోటోకால்స్ మరియు ప్రచార సమగ్రత.",
      ops_overview: "కార్యకలాపాల అవలోకనం",
      life_cycle: "ఎన్నికల జీవిత చక్రం",
      clarity_index: "స్పష్టత సూచిక",
      protocols: "ప్రోటోకాల్స్",
      voter_reg_title: "రిజిస్ట్రేషన్ ట్రైల్",
      voter_reg_desc: "మీరు ఓటర్ల జాబితాలో ఉన్నారని మరియు ఓటు వేయడానికి సిద్ధంగా ఉన్నారని నిర్ధారించుకోండి.",
      voter_booth_title: "బూత్ లొకేటర్",
      voter_booth_desc: "మీ గొంతు ఎక్కడ వినబడుతుందో కనుగొనండి.",
      execute_protocol: "ప్రోటోకాల్ అమలు చేయండి",
      review_protocol: "ప్రోటోకాల్ సమీక్షించండి"
    }
  },
  kn: {
    translation: {
      welcome: "ಚುನಾವಣಾ ರೋವರ್‌ಗೆ ಸ್ವಾಗತ",
      tagline: "ಮತದಾರರು ಮತ್ತು ಅಭ್ಯರ್ಥಿಗಳಿಗೆ ಅಂತಿಮ ಏಜೆಂಟಿಕ್ ಇಂಟೆಲಿಜೆನ್ಸ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್. ವಿಶ್ವದ ಅತಿದೊಡ್ಡ ಪ್ರಜಾಪ್ರಭುತ್ವ ವ್ಯಾಯಾಮವನ್ನು ನಿಖರವಾಗಿ ನ್ಯಾವಿಗೇಟ್ ಮಾಡಿ.",
      protocol_badge: "ಭಾರತ 2026 ಚುನಾವಣಾ ಪ್ರೋಟೋಕಾಲ್",
      hero_title_1: "ನಿಮ್ಮ ರಕ್ಷಿಸಿ",
      hero_title_2: "ಪ್ರಜಾಪ್ರಭುತ್ವವನ್ನು.",
      voter: "ಸಾಮಾನ್ಯ ಮತದಾರ",
      voter_portal: "ಮತದಾರರ ಪೋರ್ಟಲ್",
      voter_desc: "ನೋಂದಣಿ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಕರಗತ ಮಾಡಿಕೊಳ್ಳಿ, ನಿಮ್ಮ ಬೂತ್ ಅನ್ನು ಪತ್ತೆ ಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ ಹಕ್ಕುಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
      candidate: "ಅಭ್ಯರ್ಥಿ",
      candidate_portal: "ಅಭ್ಯರ್ಥಿ ಪೋರ್ಟಲ್",
      candidate_desc: "ತಾಂತ್ರಿಕ ಅನುಸರಣೆ, ನಾಮನಿರ್ದೇಶನ ಪ್ರೋಟೋಕಾಲ್‌ಗಳು ಮತ್ತು ಪ್ರಚಾರದ ಸಮಗ್ರತೆ.",
      ops_overview: "ಕಾರ್ಯಾಚರಣೆಗಳ ಅವಲೋಕನ",
      life_cycle: "ಚುನಾವಣಾ ಜೀವನ ಚಕ್ರ",
      clarity_index: "ಸ್ಪಷ್ಟತೆ ಸೂಚ್ಯಂಕ",
      protocols: "ಪ್ರೋಟೋಕಾಲ್‌ಗಳು",
      voter_reg_title: "ನೋಂದಣಿ ಹಾದಿ",
      voter_reg_desc: "ನೀವು ಮತದಾರರ ಪಟ್ಟಿಯಲ್ಲಿದ್ದೀರಿ ಮತ್ತು ಮತದಾನಕ್ಕೆ ಸಿದ್ಧರಿದ್ದೀರಿ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
      voter_booth_title: "ಬೂತ್ ಲೊಕೇಟರ್",
      voter_booth_desc: "ನಿಮ್ಮ ಧ್ವನಿ ಎಲ್ಲಿ ಕೇಳಿಸುತ್ತದೆ ಎಂಬುದನ್ನು ಕಂಡುಕೊಳ್ಳಿ.",
      execute_protocol: "ಪ್ರೋಟೋಕಾಲ್ ಕಾರ್ಯಗತಗೊಳಿಸಿ",
      review_protocol: "ಪ್ರೋಟೋಕಾಲ್ ಪರಿಶೀಲಿಸಿ"
    }
  },
  bn: {
    translation: {
      welcome: "ইলেকশন রোভারে আপনাকে স্বাগতম",
      tagline: "ভোটার এবং প্রার্থীদের জন্য চূড়ান্ত এজেন্টিক ইন্টেলিজেন্স প্ল্যাটফর্ম। নির্ভুলতার সাথে বিশ্বের বৃহত্তম গণতান্ত্রিক অনুশীলন নেভিগেট করুন।",
      protocol_badge: "ভারত ২০২৬ নির্বাচনী প্রোটোকল",
      hero_title_1: "আপনার রক্ষা করুন",
      hero_title_2: "গণতন্ত্রকে।",
      voter: "সাধারণ ভোটার",
      voter_portal: "ভোটার পোর্টাল",
      voter_desc: "নিবন্ধন প্রক্রিয়া আয়ত্ত করুন, আপনার বুথ সনাক্ত করুন এবং আপনার অধিকার যাচাই করুন।",
      candidate: "প্রার্থী",
      candidate_portal: "প্রার্থী পোর্টাল",
      candidate_desc: "প্রযুক্তিগত সম্মতি, মনোনয়ন প্রোটোকল এবং প্রচারের সততা।",
      ops_overview: "অপারেশন ওভারভিউ",
      life_cycle: "নির্বাচনী জীবন চক্র",
      clarity_index: "স্পষ্টতা সূচক",
      protocols: "প্রোটোকল",
      voter_reg_title: "নিবন্ধন পথ",
      voter_reg_desc: "আপনি ভোটার তালিকায় আছেন এবং ভোট দেওয়ার জন্য প্রস্তুত তা নিশ্চিত করুন।",
      voter_booth_title: "বুথ লোকেটার",
      voter_booth_desc: "আপনার কণ্ঠস্বর কোথায় শোনা যাবে তা খুঁজে বের করুন।",
      execute_protocol: "প্রোটোকল কার্যকর করুন",
      review_protocol: "প্রোটোকল পর্যালোচনা করুন"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
