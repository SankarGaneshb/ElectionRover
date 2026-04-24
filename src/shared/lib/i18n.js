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
  },
  ml: {
    translation: {
      welcome: "ഇലക്ഷൻ റോവറിലേക്ക് സ്വാഗതം",
      tagline: "വോട്ടർമാർക്കും സ്ഥാനാർത്ഥികൾക്കുമുള്ള ആത്യന്തിക ഏജന്റിക് ഇൻ്റലിജൻസ് പ്ലാറ്റ്‌ഫോം. ലോകത്തിലെ ഏറ്റവും വലിയ ജനാധിപത്യ പ്രക്രിയയെ കൃത്യതയോടെ നാവിഗേറ്റ് ചെയ്യുക.",
      protocol_badge: "ഇന്ത്യ 2026 ഇലക്ഷൻ പ്രോട്ടോക്കോൾ",
      hero_title_1: "നിങ്ങളുടെ",
      hero_title_2: "ജനാധിപത്യത്തെ സംരക്ഷിക്കുക.",
      voter: "പൊതു വോട്ടർ",
      voter_portal: "വോട്ടർ പോർട്ടൽ",
      voter_desc: "രജിസ്ട്രേഷൻ പ്രക്രിയയിൽ വൈദഗ്ധ്യം നേടുക, നിങ്ങളുടെ ബൂത്ത് കണ്ടെത്തുക, നിങ്ങളുടെ അവകാശങ്ങൾ പരിശോധിക്കുക.",
      candidate: "സ്ഥാനാർത്ഥി",
      candidate_portal: "സ്ഥാനാർത്ഥി പോർട്ടൽ",
      candidate_desc: "സാങ്കേതികമായ പാലിക്കൽ, നാമനിർദ്ദേശ പ്രോട്ടോക്കോളുകൾ, പ്രചാരണ സമഗ്രത.",
      ops_overview: "പ്രവർത്തന അവലോകനം",
      life_cycle: "തിരഞ്ഞെടുപ്പ് ജീവിത ചക്രം",
      clarity_index: "വ്യക്തത സൂചിക",
      protocols: "പ്രോട്ടോക്കോളുകൾ",
      voter_reg_title: "രജിസ്ട്രേഷൻ പാത",
      voter_reg_desc: "നിങ്ങൾ വോട്ടർ പട്ടികയിലുണ്ടെന്നും വോട്ട് ചെയ്യാൻ തയ്യാറാണെന്നും ഉറപ്പാക്കുക.",
      voter_booth_title: "ബൂത്ത് ലൊക്കേറ്റർ",
      voter_booth_desc: "നിങ്ങളുടെ ശബ്ദം എവിടെ കേൾക്കുമെന്ന് കണ്ടെത്തുക.",
      execute_protocol: "പ്രോട്ടോക്കോൾ നടപ്പിലാക്കുക",
      review_protocol: "പ്രോട്ടോക്കോൾ അവലോകനം ചെയ്യുക"
    }
  },
  mr: {
    translation: {
      welcome: "इलेक्शन रोव्हरमध्ये आपले स्वागत आहे",
      tagline: "मतदार आणि उमेदवारांसाठी अंतिम एजंट इंटेलिजेंस प्लॅटफॉर्म. जगातील सर्वात मोठ्या लोकशाही सरावाचा अचूकपणे मागोवा घ्या.",
      protocol_badge: "भारत २०२६ निवडणूक प्रोटोकॉल",
      hero_title_1: "तुमच्या",
      hero_title_2: "लोकशाहीचे रक्षण करा.",
      voter: "सामान्य मतदार",
      voter_portal: "मतदार पोर्टल",
      voter_desc: "नोंदणी प्रक्रियेत प्रभुत्व मिळवा, तुमचे बूथ शोधा आणि तुमच्या हक्कांची पडताळणी करा.",
      candidate: "उमेदवार",
      candidate_portal: "उमेदवार पोर्टल",
      candidate_desc: "तांत्रिक अनुपालन, नामांकन प्रोटोकॉल आणि मोहीम अखंडता.",
      ops_overview: "ऑपरेशन विहंगावलोकन",
      life_cycle: "निवडणूक जीवन चक्र",
      clarity_index: "स्पष्टता निर्देशांक",
      protocols: "प्रोटोकॉल",
      voter_reg_title: "नोंदणी मार्ग",
      voter_reg_desc: "तुम्ही मतदार यादीत आहात आणि मतदान करण्यास तयार आहात याची खात्री करा.",
      voter_booth_title: "बूथ लोकेटर",
      voter_booth_desc: "तुमचा आवाज कुठे ऐकला जाईल ते शोधा.",
      execute_protocol: "प्रोटोकॉल कार्यान्वित करा",
      review_protocol: "प्रोटोकॉल पुनरावलोकन करा"
    }
  },
  gu: {
    translation: {
      welcome: "ઈલેક્શન રોવરમાં આપનું સ્વાગત છે",
      tagline: "મતદારો અને ઉમેદવારો માટે અંતિમ એજન્ટ ઇન્ટેલિજન્સ પ્લેટફોર્મ. વિશ્વની સૌથી મોટી લોકશાહી કવાયતને ચોકસાઇ સાથે નેવિગેટ કરો.",
      protocol_badge: "ભારત ૨૦૨૬ ચૂંટણી પ્રોટોકોલ",
      hero_title_1: "તમારી",
      hero_title_2: "લોકશાહીનું રક્ષણ કરો.",
      voter: "સામાન્ય મતદાર",
      voter_portal: "મતદાર પોર્ટલ",
      voter_desc: "નોંધણી પ્રક્રિયામાં નિપુણતા મેળવો, તમારું બૂથ શોધો અને તમારા અધિકારોની ચકાસણી કરો.",
      candidate: "ઉમેદવાર",
      candidate_portal: "ઉમેદવાર પોર્ટલ",
      candidate_desc: "તકનીકી પાલન, નામાંકન પ્રોટોકોલ અને ઝુંબેશની અખંડિતતા.",
      ops_overview: "ઓપરેશન વિહંગાવલોકન",
      life_cycle: "ચૂંટણી જીવન ચક્ર",
      clarity_index: "સ્પષ્ટતા સૂચકાંક",
      protocols: "પ્રોટોકોલ",
      voter_reg_title: "નોંધણી પાથ",
      voter_reg_desc: "ખાતરી કરો કે તમે મતદાર યાદીમાં છો અને વોટ આપવા માટે તૈયાર છો.",
      voter_booth_title: "બૂથ લોકેટર",
      voter_booth_desc: "તમારો અવાજ ક્યાં સંભળાશે તે શોધો.",
      execute_protocol: "પ્રોટોકોલ અમલમાં મૂકો",
      review_protocol: "પ્રોટોકોલની સમીક્ષા કરો"
    }
  },
  or: {
    translation: {
      welcome: "ନିର୍ବାଚନ ରୋଭରକୁ ସ୍ୱାଗତ",
      tagline: "ମତଦାତା ଏବଂ ପ୍ରାର୍ଥୀଙ୍କ ପାଇଁ ଅନ୍ତିମ ଏଜେଣ୍ଟିକ୍ ଇଣ୍ଟେଲିଜେନ୍ସ ପ୍ଲାଟଫର୍ମ | ବିଶ୍ୱର ସର୍ବବୃହତ ଗଣତାନ୍ତ୍ରିକ ପ୍ରକ୍ରିୟାକୁ ସଠିକତାର ସହିତ ପରିଚାଳନା କରନ୍ତୁ |",
      protocol_badge: "ଭାରତ ୨୦୨୬ ନିର୍ବାଚନ ପ୍ରୋଟୋକଲ୍",
      hero_title_1: "ଆପଣଙ୍କର",
      hero_title_2: "ଗଣତନ୍ତ୍ରକୁ ରକ୍ଷା କରନ୍ତୁ |",
      voter: "ସାଧାରଣ ମତଦାତା",
      voter_portal: "ମତଦାତା ପୋର୍ଟାଲ",
      voter_desc: "ପଞ୍ଜୀକରଣ ପ୍ରକ୍ରିୟାରେ ଦକ୍ଷତା ହାସଲ କରନ୍ତୁ, ଆପଣଙ୍କର ବୁଥ୍ ଖୋଜନ୍ତୁ ଏବଂ ଆପଣଙ୍କର ଅଧିକାର ଯାଞ୍ଚ କରନ୍ତୁ |",
      candidate: "ପ୍ରାର୍ଥୀ",
      candidate_portal: "ପ୍ରାର୍ଥୀ ପୋର୍ଟାଲ",
      candidate_desc: "ଯାନ୍ତ୍ରିକ ଅନୁପାଳନ, ନାମାଙ୍କନ ପ୍ରୋଟୋକଲ୍ ଏବଂ ଅଭିଯାନର ଅଖଣ୍ଡତା |",
      ops_overview: "କାର୍ଯ୍ୟକ୍ଷମ ସମୀକ୍ଷା",
      life_cycle: "ନିର୍ବାଚନ ଜୀବନ ଚକ୍ର",
      clarity_index: "ସ୍ପଷ୍ଟତା ସୂଚକାଙ୍କ",
      protocols: "ପ୍ରୋଟୋକଲ୍",
      voter_reg_title: "ପଞ୍ಜୀକରଣ ପଥ",
      voter_reg_desc: "ଆପଣ ଭୋଟର ତାଲିକାରେ ଅଛନ୍ତି ଏବଂ ଭୋଟ୍ ଦେବା ପାଇଁ ପ୍ରସ୍ତୁତ ଅଛନ୍ତି କି ନାହିଁ ନିଶ୍ଚିତ କରନ୍ତୁ |",
      voter_booth_title: "ବୁଥ୍ ଲୋକେଟର",
      voter_booth_desc: "ଆପଣଙ୍କ ସ୍ୱର କେଉଁଠାରେ ଶୁଣାଯିବ ତାହା ଖୋଜନ୍ତୁ |",
      execute_protocol: "ପ୍ରୋଟୋକଲ୍ କାର୍ଯ୍ୟକାରୀ କରନ୍ତୁ",
      review_protocol: "ପ୍ରୋଟୋକଲ୍ ସମୀକ୍ଷା କରନ୍ତୁ"
    }
  },
  pa: {
    translation: {
      welcome: "ਇਲੈਕਸ਼ਨ ਰੋਵਰ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ",
      tagline: "ਵੋਟਰਾਂ ਅਤੇ ਉਮੀਦਵਾਰਾਂ ਲਈ ਅੰਤਮ ਏਜੰਟਿਕ ਇੰਟੈਲੀਜੈਂਸ ਪਲੇਟਫਾਰਮ। ਵਿਸ਼ਵ ਦੇ ਸਭ ਤੋਂ ਵੱਡੇ ਲੋਕਤੰਤਰੀ ਅਭਿਆਸ ਨੂੰ ਸ਼ੁੱਧਤਾ ਨਾਲ ਨੇਵੀਗੇਟ ਕਰੋ।",
      protocol_badge: "ਭਾਰਤ 2026 ਚੋਣ ਪ੍ਰੋਟੋਕੋਲ",
      hero_title_1: "ਆਪਣੇ",
      hero_title_2: "ਲੋਕਤੰਤਰ ਦੀ ਰੱਖਿਆ ਕਰੋ।",
      voter: "ਆਮ ਵੋਟਰ",
      voter_portal: "ਵੋਟਰ ਪੋਰਟਲ",
      voter_desc: "ਰਜਿਸਟਰੇਸ਼ਨ ਪ੍ਰਕਿਰਿਆ ਵਿੱਚ ਮੁਹਾਰਤ ਹਾਸਲ ਕਰੋ, ਆਪਣਾ ਬੂਥ ਲੱਭੋ ਅਤੇ ਆਪਣੇ ਅਧਿਕਾਰਾਂ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ।",
      candidate: "ਉਮੀਦਵਾਰ",
      candidate_portal: "ਉਮੀਦਵਾਰ ਪੋਰਟਲ",
      candidate_desc: "ਤਕਨੀਕੀ ਪਾਲਣਾ, ਨਾਮਜ਼ਦਗੀ ਪ੍ਰੋਟੋਕੋਲ ਅਤੇ ਚੋਣ ਪ੍ਰਚਾਰ ਦੀ ਅਖੰਡਤਾ।",
      ops_overview: "ਓਪਰੇਸ਼ਨ ਸੰਖੇਪ",
      life_cycle: "ਚੋਣ ਜੀਵਨ ਚੱਕਰ",
      clarity_index: "ਸਪਸ਼ਟਤਾ ਸੂਚਕਾਂਕ",
      protocols: "ਪ੍ਰੋਟੋਕੋਲ",
      voter_reg_title: "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਮਾਰਗ",
      voter_reg_desc: "ਯਕੀਨੀ ਬਣਾਓ ਕਿ ਤੁਸੀਂ ਵੋਟਰ ਸੂਚੀ ਵਿੱਚ ਹੋ ਅਤੇ ਵੋਟ ਪਾਉਣ ਲਈ ਤਿਆਰ ਹੋ।",
      voter_booth_title: "ਬੂਥ ਲੋਕੇਟਰ",
      voter_booth_desc: "ਲੱਭੋ ਕਿ ਤੁਹਾਡੀ ਆਵਾਜ਼ ਕਿੱਥੇ ਸੁਣੀ ਜਾਵੇਗੀ।",
      execute_protocol: "ਪ੍ਰੋਟੋਕੋਲ ਲਾਗੂ ਕਰੋ",
      review_protocol: "ਪ੍ਰੋਟੋਕੋਲ ਦੀ ਸਮੀਖਿਆ ਕਰੋ"
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
