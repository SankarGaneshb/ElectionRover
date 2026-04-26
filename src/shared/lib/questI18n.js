export const QUEST_I18N = {
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
    syncing: "Syncing with Electoral Roll...",
    badge_informed_voter: "Informed Voter",
    badge_ready_citizen: "Ready Citizen",
    badge_truth_guardian: "Truth Guardian",
    badge_legitimate_contestant: "Legitimate Contestant",
    badge_integrity_champion: "Integrity Champion",
    badge_sre_guardian: "SRE Guardian",
    steps: {
      "voter-reg": [
        { title: "Eligibility Check", content: "Are you 18? Are you a citizen?" },
        { title: "Form 6 Submission", content: "Learn how to apply for new registration." },
        { title: "Voter ID Verification", content: "Check your Voter ID status online." }
      ],
      "voter-booth": [
        { title: "District Mapping", content: "Find your DEO and constituency." },
        { title: "Station Selection", content: "Locate your specific polling station." }
      ],
      "voter-misinfo": [
        { title: "Spot the Fake", content: "You will be shown real-world examples of misinformation spread during elections — fake candidate statements, doctored images, and misleading poll dates. Your task: identify which claims are false and explain why." },
        { title: "Report & Flag", content: "Learn how citizens and political party agents can submit suspicious content for verification. Understand the reporting pipeline — from a single flagged post to a clustered misinformation pattern detected by AI systems." },
        { title: "See the Cluster", content: "Watch how advanced AI groups hundreds of individual reports into coordinated misinformation campaigns. The simulation shows how a single fake claim about a candidate spreads across platforms and how AI identifies the source patterns." },
        { title: "Verify with AI", content: "AI evaluates the flagged content against verified election commission data. See the confidence scores, source attribution, and final verdict — all powered by advanced AI." }
      ],
      "cand-nomination": [
        { title: "Security Deposit", content: "Understanding the financial commitment." },
        { title: "Affidavit (Form 26)", content: "Declare your assets and background." },
        { title: "Scrutiny Phase", content: "What happens during Returning Officer verification." }
      ],
      "cand-misinfo": [
        { title: "Anatomy of a Smear", content: "Examine real examples of coordinated false narratives against candidates — fake criminal records, doctored speeches, and fabricated endorsements. Understand how they originate and spread." },
        { title: "The Reporting Pipeline", content: "Learn how citizens, party workers, and election officials submit suspicious claims. Each report enters an AI system dataset where it is timestamped, geo-tagged, and source-mapped." },
        { title: "AI-Powered Cluster Detection", content: "Advanced AI groups individual reports by content similarity, timing patterns, and geographic spread. See how 50 separate reports about a fake candidate statement get linked to a single coordinated campaign." },
        { title: "Official Verification & Response", content: "The Election Commission reviews AI-generated verdicts. Candidates learn how to formally request fact-checks and how verified rebuttals are published through official channels." }
      ],
      "sre_self_heal": [
        { title: "SRE Health Check", content: "Review container health and active anomalies." },
        { title: "Apply Auto-Heal", content: "Authorize AI agent to scale up database connections." }
      ]
    }
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
    syncing: "मतदाता सूची के साथ समन्वय किया जा रहा है...",
    badge_informed_voter: "सूचित मतदाता",
    badge_ready_citizen: "तैयार नागरिक",
    badge_truth_guardian: "सत्य रक्षक",
    badge_legitimate_contestant: "वैध प्रतियोगी",
    badge_integrity_champion: "अखंडता चैंपियन",
    badge_sre_guardian: "साइट विश्वसनीयता अभियंता रक्षक",
    steps: {
      "voter-reg": [
        { title: "पात्रता जांच", content: "क्या आप 18 वर्ष के हैं? क्या आप नागरिक हैं?" },
        { title: "फॉर्म 6 सबमिशन", content: "नए पंजीकरण के लिए आवेदन कैसे करें, जानें।" },
        { title: "मतदाता पहचान पत्र सत्यापन", content: "अपना वोटर आईडी स्टेटस ऑनलाइन चेक करें।" }
      ],
      "voter-booth": [
        { title: "बूथ लोकेटर", content: "पता लगाएं कि आपकी आवाज कहां सुनी जाएगी।" },
        { title: "स्टेशन चयन", content: "अपने विशिष्ट मतदान केंद्र का पता लगाएं।" }
      ],
      "voter-misinfo": [
        { title: "झूठे दावों की पहचान", content: "आपको चुनावों के दौरान फैलाई गई गलत सूचनाओं के उदाहरण दिखाए जाएंगे।" },
        { title: "रिपोर्ट और फ्लैग", content: "संदेहास्पद सामग्री सबमिट करने का तरीका जानें।" },
        { title: "क्लस्टर देखें", content: "देखें कि कैसे बिगक्वेरी एमएल दावों को समूहीकृत करता है।" },
        { title: "कृत्रिम बुद्धिमत्ता से सत्यापन", content: "जेमिनी चुनाव आयोग के आंकड़ों के साथ दावों की समीक्षा करता है।" }
      ],
      "cand-nomination": [
        { title: "सुरक्षा जमा", content: "वित्तीय प्रतिबद्धता को समझना।" },
        { title: "शपथ पत्र (फॉर्म 26)", content: "अपनी संपत्ति और पृष्ठभूमि घोषित करें।" },
        { title: "पड़ताल चरण", content: "आरओ सत्यापन के दौरान क्या होता है।" }
      ],
      "cand-misinfo": [
        { title: "झूठे आख्यान", content: "उम्मीदवारों के खिलाफ समन्वित झूठे आख्यानों की जांच करें।" },
        { title: "रिपोर्टिंग पाइपलाइन", content: "जानें कि संदिग्ध दावों को कैसे प्रस्तुत किया जाए।" },
        { title: "कृत्रिम बुद्धिमत्ता-संचालित क्लस्टर पहचान", content: "बिगक्वेरी एमएल दावों को उनके समानता के आधार पर जोड़ता है।" },
        { title: "सत्यापन और प्रतिक्रिया", content: "चुनाव आयोग एआई-जनरेटेड फैसलों की समीक्षा करता है।" }
      ],
      "sre_self_heal": [
        { title: "साइट विश्वसनीयता अभियंता स्वास्थ्य जांच", content: "कंटेनर स्वास्थ्य और सक्रिय विसंगतियों की समीक्षा करें।" },
        { title: "ऑटो-हील लागू करें", content: "एआई एजेंट को डेटाबेस कनेक्शन बढ़ाने के लिए अधिकृत करें।" }
      ]
    }
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
    syncing: "வாக்காளர் பட்டியலுடன் ஒத்திசைக்கப்படுகிறது...",
    badge_informed_voter: "விழிப்புணர்வுள்ள வாக்காளர்",
    badge_ready_citizen: "தயாரான குடிமகன்",
    badge_truth_guardian: "உண்மைப் பாதுகாவலர்",
    badge_legitimate_contestant: "சட்டபூர்வமான போட்டியாளர்",
    badge_integrity_champion: "நேர்மையின் நாயகன்",
    badge_sre_guardian: "தள நம்பகத்தன்மை பொறியாளர் பாதுகாவலர்",
    steps: {
      "voter-reg": [
        { title: "தகுதி சரிபார்ப்பு", content: "உங்களுக்கு 18 வயதாகிவிட்டதா? நீங்கள் இந்திய குடிமகனா?" },
        { title: "படிவம் 6 சமர்ப்பிப்பு", content: "புதிய வாக்காளர் பதிவுக்கு எவ்வாறு விண்ணப்பிப்பது என்பதை அறியுங்கள்." },
        { title: "வாக்காளர் அடையாள அட்டை சரிபார்ப்பு", content: "உங்கள் வாக்காளர் அடையாள அட்டை நிலையை ஆன்லைனில் சரிபார்க்கவும்." }
      ],
      "voter-booth": [
        { title: "வாக்குச்சாவடி கண்டறிதல்", content: "உங்கள் குரல் எங்கு கேட்கப்படும் என்பதைக் கண்டறியவும்." },
        { title: "மையத் தேர்வு", content: "உங்கள் குறிப்பிட்ட வாக்குச்சாவடியைக் கண்டறியவும்." }
      ],
      "voter-misinfo": [
        { title: "போலிகளைக் கண்டறி", content: "தேர்தல் காலத்தில் பரவும் போலிச் செய்திகள் உங்களுக்குக் காட்டப்படும்." },
        { title: "புகார் மற்றும் கொடியிடுதல்", content: "சந்தேகத்திற்குரிய உள்ளடக்கத்தைச் சமர்ப்பிப்பது எப்படி என்று அறியவும்." },
        { title: "தொகுப்பைக் காண்க", content: "புகார்களை எவ்வாறு இணைக்கிறது என்று பாருங்கள்." },
        { title: "செயற்கை நுண்ணறிவு மூலம் சரிபார்", content: "தேர்தல் ஆணையத் தரவுகளுடன் புகார்களை மதிப்பிடுகிறது." }
      ],
      "cand-nomination": [
        { title: "காப்புத் தொகை", content: "நிதிப் பொறுப்புகளைப் புரிந்துகொள்வது." },
        { title: "உறுதிமொழிப் பத்திரம் (படிவம் 26)", content: "உங்கள் சொத்துக்கள் மற்றும் பின்னணியை அறிவியுங்கள்." },
        { title: "சரிபார்ப்புக் கட்டம்", content: "தேர்தல் அதிகாரி சரிபார்ப்பின் போது என்ன நடக்கும்." }
      ],
      "cand-misinfo": [
        { title: "வதந்திகளின் கட்டமைப்பு", content: "வேட்பாளர்களுக்கு எதிரான ஒருங்கிணைந்த வதந்திகளை ஆராயுங்கள்." },
        { title: "புகார் செய்யும் முறை", content: "சந்தேகத்திற்குரிய தகவல்களைச் சமர்ப்பிக்கும் வழியைக் கற்றுக் கொள்ளுங்கள்." },
        { title: "செயற்கை நுண்ணறிவு தொகுப்புக் கண்டறிதல்", content: "புகார்களை அவற்றின் ஒற்றுமையின் அடிப்படையில் குழுவாக்குகிறது." },
        { title: "சரிபார்ப்பும் பதிலும்", content: "தேர்தல் ஆணையம் செயற்கை நுண்ணறிவு முடிவுகளை ஆய்வு செய்கிறது." }
      ],
      "sre_self_heal": [
        { title: "தள நம்பகத்தன்மை பொறியாளர் நிலை சரிபார்ப்பு", content: "கன்டெய்னர் ஆரோக்கியம் மற்றும் முரண்பாடுகளைப் பரிசீலிக்கவும்." },
        { title: "தானியங்கி சரிசெய்தல்", content: "தரவுத்தள இணைப்புகளை அதிகரிக்க செயற்கை நுண்ணறிவு முகவருக்கு அங்கீகாரம் வழங்கவும்." }
      ]
    }
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
    syncing: "ఓటర్ల జాబితాతో సమకాలీకరిస్తోంది...",
    badge_informed_voter: "అవగాహన ఉన్న ఓటరు",
    badge_ready_citizen: "సిద్ధంగా ఉన్న పౌరుడు",
    badge_truth_guardian: "సత్య రక్షకుడు",
    badge_legitimate_contestant: "చట్టబద్ధమైన పోటీదారు",
    badge_integrity_champion: "చిత్తశుద్ధి గల విజేత",
    badge_sre_guardian: "సైట్ రిలయబిలిటీ ఇంజనీర్ రక్షకుడు",
    steps: {
      "voter-reg": [
        { title: "అర్హత తనిఖీ", content: "మీకు 18 ఏళ్లు నిండాయా? మీరు భారత పౌరులా?" },
        { title: "ఫారమ్ 6 సమర్పణ", content: "కొత్త రిజిస్ట్రేషన్ కోసం ఎలా దరఖాస్తు చేయాలో తెలుసుకోండి." },
        { title: "ఓటరు ఐడి ధృవీకరణ", content: "మీ ఓటర్ ఐడి స్థితిని ఆన్‌లైన్‌లో తనిఖీ చేయండి." }
      ],
      "voter-booth": [
        { title: "బూత్ లొకేటర్", content: "మీ గొంతు ఎక్కడ వినబడుతుందో కనుగొనండి." },
        { title: "స్టేషన్ ఎంపిక", content: "మీ నిర్దిష్ట పోలింగ్ స్టేషన్‌ను గుర్తించండి." }
      ],
      "voter-misinfo": [
        { title: "నకిలీలను గుర్తించండి", content: "ఎన్నికల సమయంలో వ్యాపించే తప్పుడు సమాచార ఉదాహరణలను చూడండి." },
        { title: "నివేదించండి మరియు ఫ్లాగ్ చేయండి", content: "అనుమానాస్పద కంటెంట్‌ను ఎలా సమర్పించాలో తెలుసుకోండి." },
        { title: "క్లస్టర్ చూడండి", content: "అధునాతన కృత్రిమ మేధస్సు నివేదికలను ఎలా కలుపుతుందో గమనించండి." },
        { title: "కృత్రిమ మేధస్సు తో ధృవీకరించండి", content: "జెమిని నివేదికలను అధికారిక డేటాతో తనిఖీ చేస్తుంది." }
      ],
      "cand-nomination": [
        { title: "సెక్యూరిటీ డిపాజిట్", content: "ఆర్థిక నిబద్ధతను అర్థం చేసుకోవడం." },
        { title: "అఫిడవిట్ (ఫారమ్ 26)", content: "మీ ఆస్తులు మరియు నేపథ్యాన్ని ప్రకటించండి." },
        { title: "పరిశీలన దశ", content: "రిటర్నింగ్ ఆఫీసర్ ధృవీకరణ సమయంలో ఏం జరుగుతుంది." }
      ],
      "cand-misinfo": [
        { title: "తప్పుడు కథనాలు", content: "సమన్వయంతో వ్యాపించే తప్పుడు కథనాల విశ్లేషణ." },
        { title: "రిపోర్టింగ్ పైప్‌లైన్", content: "సందేహాస్పద క్లెయిమ్‌లను ఎలా సమర్పించాలో తెలుసుకోండి." },
        { title: "కృత్రిమ మేధస్సు క్లస్టర్ గుర్తింపు", content: "అధునాతన కృత్రిమ మేధస్సు పోలికల ఆధారంగా నివేదికలను సమూహం చేస్తుంది." },
        { title: "అధికారిక ప్రతిస్పందన", content: "ఎన్నికల సంఘం కృత్రిమ మేధస్సు నిర్ణయాలను సమీక్షిస్తుంది." }
      ],
      "sre_self_heal": [
        { title: "సైట్ రిలయబిలిటీ ఇంజనీర్ ఆరోగ్య తనిఖీ", content: "కంటైనర్ ఆరోగ్యం మరియు లోపాలను సమీక్షించండి." },
        { title: "ఆటో-హీల్ వర్తింపజేయండి", content: "కృత్రిమ మేధస్సు ఏజెంట్‌కు డేటాబేస్ లింక్‌లను పెంచే అధికారం ఇవ్వండి." }
      ]
    }
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
    syncing: "ಮತದಾರರ ಪಟ್ಟಿಯೊಂದಿಗೆ ಸಿಂಕ್ ಆಗುತ್ತಿದೆ...",
    badge_informed_voter: "ತಿಳುವಳಿಕೆಯುಳ್ಳ ಮತದಾರ",
    badge_ready_citizen: "ಸಿದ್ಧ ನಾಗರಿಕ",
    badge_truth_guardian: "ಸತ್ಯ ರಕ್ಷಕ",
    badge_legitimate_contestant: "ಕಾನೂನುಬದ್ಧ ಸ್ಪರ್ಧಿ",
    badge_integrity_champion: "ಪ್ರಾಮಾಣಿಕತೆಯ ಚಾಂಪಿಯನ್",
    badge_sre_guardian: "ಸೈಟ್ ವಿಶ್ವಾಸಾರ್ಹತೆ ಎಂಜಿನಿಯರ್ ರಕ್ಷಕ",
    steps: {
      "voter-reg": [
        { title: "ಅರ್ಹತಾ ಪರಿಶೀಲನೆ", content: "ನಿಮಗೆ 18 ವರ್ಷ ತುಂಬಿದೆಯೇ? ನೀವು ಭಾರತೀಯ ನಾಗರಿಕರೇ?" },
        { title: "ಫಾರ್ಮ್ 6 ಸಲ್ಲಿಕೆ", content: "ಹೊಸ ನೋಂದಣಿಗೆ ಹೇಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಬೇಕು ಎಂದು ತಿಳಿಯಿರಿ." },
        { title: "ಮತದಾರರ ಗುರುತಿನ ಚೀಟಿ ಪರಿಶೀಲನೆ", content: "ನಿಮ್ಮ ಮತದಾರರ ಗುರುತಿನ ಚೀಟಿ ಸ್ಥಿತಿಯನ್ನು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ." }
      ],
      "voter-booth": [
        { title: "ಬೂತ್ ಲೊಕೇಟರ್", content: "ನಿಮ್ಮ ಧ್ವನಿ ಎಲ್ಲಿ ಕೇಳಿಸುತ್ತದೆ ಎಂಬುದನ್ನು ಕಂಡುಕೊಳ್ಳಿ." },
        { title: "ನಿಲ್ದಾಣದ ಆಯ್ಕೆ", content: "ನಿಮ್ಮ ನಿರ್ದಿಷ್ಟ ಮತದಾನ ಕೇಂದ್ರವನ್ನು ಪತ್ತೆ ಮಾಡಿ." }
      ],
      "voter-misinfo": [
        { title: "ಸುಳ್ಳುಗಳನ್ನು ಗುರುತಿಸಿ", content: "ಚುನಾವಣೆಯ ಸುಳ್ಳು ಮಾಹಿತಿಯ ಉದಾಹರಣೆಗಳನ್ನು ನಿಮಗೆ ತೋರಿಸಲಾಗುತ್ತದೆ." },
        { title: "ವರದಿ ಮತ್ತು ಧ್ವಜ", content: "ಅನುಮಾನಾಸ್ಪದ ವಿಷಯವನ್ನು ಸಲ್ಲಿಸುವುದನ್ನು ಕಲಿಯಿರಿ." },
        { title: "ಕ್ಲಸ್ಟರ್ ನೋಡಿ", content: "ವರದಿಗಳನ್ನು ಸುಧಾರಿತ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಹೇಗೆ ಲಿಂಕ್ ಮಾಡುತ್ತದೆ ಎಂಬುದನ್ನು ನೋಡಿ." },
        { title: "ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಪರಿಶೀಲನೆ", content: "ಜೆಮಿನಿ ಅಧಿಕೃತ ಡೇಟಾ ಬಳಸಿ ಕ್ಲೈಮ್ ಪರಿಶೀಲಿಸುತ್ತದೆ." }
      ],
      "cand-nomination": [
        { title: "ಭದ್ರತಾ ಠೇವಣಿ", content: "ಹಣಕಾಸಿನ ಬದ್ಧತೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು." },
        { title: "ಪ್ರಮಾಣಪತ್ರ (ಫಾರ್ಮ್ 26)", content: "ನಿಮ್ಮ ಆಸ್ತಿ ಮತ್ತು ಹಿನ್ನೆಲೆ ಘೋಷಿಸಿ." },
        { title: "ಪರಿಶೀಲನಾ ಹಂತ", content: "ಚುನಾವಣಾ ಅಧಿಕಾರಿ ಪರಿಶೀಲನೆಯ ಸಮಯದಲ್ಲಿ ಏನಾಗುತ್ತದೆ ನೋಡಿ." }
      ],
      "cand-misinfo": [
        { title: "ಸುಳ್ಳು ನಿರೂಪಣೆಗಳು", content: "ಅಭ್ಯರ್ಥಿಗಳ ವಿರುದ್ಧದ ಸುಳ್ಳು ಪ್ರಚಾರಗಳನ್ನು ಗಮನಿಸಿ." },
        { title: "ವರದಿ ಪೈಪ್‌ಲೈನ್", content: "ವರದಿಗಳನ್ನು ಸಲ್ಲಿಸುವ ವಿಧಾನವನ್ನು ತಿಳಿಯಿರಿ." },
        { title: "ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಕ್ಲಸ್ಟರ್ ಪತ್ತೆ", content: "ಸುಧಾರಿತ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ವರದಿಗಳನ್ನು ವಿಷಯದ ಸಾಮ್ಯತೆಯಿಂದ ಜೋಡಿಸುತ್ತದೆ." },
        { title: "ಅಧಿಕೃತ ಪ್ರತಿಕ್ರಿಯೆ", content: "ಚುನಾವಣಾ ಆಯೋಗ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ತೀರ್ಪುಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ." }
      ],
      "sre_self_heal": [
        { title: "ಸೈಟ್ ವಿಶ್ವಾಸಾರ್ಹತೆ ಎಂಜಿನಿಯರ್ ಆರೋಗ್ಯ ತಪಾಸಣೆ", content: "ಕಂಟೇನರ್ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ." },
        { title: "ಸ್ವಯಂ-ಗುಣಪಡಿಸುವಿಕೆ", content: "ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಏಜೆಂಟ್‌ಗೆ ಸವಲತ್ತುಗಳನ್ನು ಹೆಚ್ಚಿಸಲು ಆದೇಶ ನೀಡಿ." }
      ]
    }
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
    syncing: "ভোটার তালিকার সাথে সমন্বয় হচ্ছে...",
    badge_informed_voter: "সচেতন ভোটার",
    badge_ready_citizen: "প্রস্তুত নাগরিক",
    badge_truth_guardian: "সত্যের রক্ষক",
    badge_legitimate_contestant: "বৈধ প্রতিযোগী",
    badge_integrity_champion: "সততার চ্যাম্পিয়ন",
    badge_sre_guardian: "সাইট নির্ভরযোগ্যতা প্রকৌশলী রক্ষক",
    steps: {
      "voter-reg": [
        { title: "যোগ্যতা যাচাই", content: "আপনার কি ১৮ বছর হয়েছে? আপনি কি ভারতীয় নাগরিক?" },
        { title: "ফর্ম ৬ জমা", content: "নতুন নিবন্ধনের জন্য কীভাবে আবেদন করবেন তা শিখুন।" },
        { title: "ভোটার আইডি যাচাইকরণ", content: "অনলাইনে আপনার ভোটার আইডি স্ট্যাটাস চেক করুন।" }
      ],
      "voter-booth": [
        { title: "বুথ লোকেটার", content: "আপনার কণ্ঠস্বর কোথায় শোনা যাবে তা খুঁজে বের করুন।" },
        { title: "কেন্দ্র নির্বাচন", content: "আপনার নির্দিষ্ট পোলিং স্টেশন সনাক্ত করুন।" }
      ],
      "voter-misinfo": [
        { title: "ভুল তথ্য শনাক্তকরণ", content: "নির্বাচনের সময় ছড়ানো মিথ্যা তথ্যের উদাহরণগুলি দেখুন।" },
        { title: "প্রতিবেদন এবং পতাকা", content: "সন্দেহজনক সামগ্রী কীভাবে জমা দেবেন তা শিখুন।" },
        { title: "ক্লাস্টার দেখুন", content: "উন্নত কৃত্রিম বুদ্ধিমত্তা কীভাবে রিপোর্ট সংযুক্ত করে তা পর্যবেক্ষণ করুন।" },
        { title: "কৃত্রিম বুদ্ধিমত্তা এর সাথে যাচাইকরণ", content: "জেমিনি অফিসিয়াল ডেটা ব্যবহার করে দাবি পরীক্ষা করে।" }
      ],
      "cand-nomination": [
        { title: "সিকিউরিটি ডিপোজিট", content: "আর্থিক বাধ্যবাধকতা বোঝা।" },
        { title: "হলফনামা (ফর্ম ২৬)", content: "আপনার সম্পদ এবং পটভূমি ঘোষণা করুন।" },
        { title: "যাচাই পর্ব", content: "রিটার্নিং অফিসার যাচাইয়ের সময় কি ঘটে।" }
      ],
      "cand-misinfo": [
        { title: "মিথ্যা আখ্যান", content: "প্রার্থীদের বিরুদ্ধে মিথ্যা আখ্যানের তদন্ত করুন।" },
        { title: "রিপোর্টিং পাইপলাইন", content: "সন্দেহজনক দাবি কীভাবে দাখিল করতে হয় তা জানুন।" },
        { title: "কৃত্রিম বুদ্ধিমত্তা ক্লাস্টার সনাক্তকরণ", content: "উন্নত কৃত্রিম বুদ্ধিমত্তা বিষয়বস্তু অনুসারে ডেটা গোষ্ঠীভুক্ত করে।" },
        { title: "অফিসিয়াল প্রতিক্রিয়া", content: "নির্বাচন কমিশন কৃত্রিম বুদ্ধিমত্তা সিদ্ধান্তের পর্যালোচনা করে।" }
      ],
      "sre_self_heal": [
        { title: "সাইট নির্ভরযোগ্যতা প্রকৌশলী স্বাস্থ্য পরীক্ষা", content: "কন্টেইনারের স্বাস্থ্য এবং অস্বাভাবিকতা পর্যালোচনা করুন।" },
        { title: "অটো-হিল প্রয়োগ", content: "কৃত্রিম বুদ্ধিমত্তা এজেন্টকে সংযোগ বৃদ্ধির অনুমতি দিন।" }
      ]
    }
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
    syncing: "വോട്ടർ പട്ടികയുമായി സമന്വയിക്കുന്നു...",
    badge_informed_voter: "അറിവുള്ള വോട്ടർ",
    badge_ready_citizen: "സജ്ജനായ പൗരൻ",
    badge_truth_guardian: "സത്യ സംരക്ഷകൻ",
    badge_legitimate_contestant: "നിയമാനുസൃത മത്സരാർത്ഥി",
    badge_integrity_champion: "സമഗ്രതയുടെ താരം",
    badge_sre_guardian: "സൈറ്റ് വിശ്വാസ്യത എഞ്ചിനീയർ സംരക്ഷകൻ",
    steps: {
      "voter-reg": [
        { title: "യോഗ്യതാ പരിശോധന", content: "നിങ്ങൾക്ക് 18 വയസ്സ് തികഞ്ഞോ? നിങ്ങൾ ഇന്ത്യൻ പൗരനാണോ?" },
        { title: "ഫോം 6 സമർപ്പിക്കൽ", content: "പുതിയ രജിസ്ട്രേഷനായി എങ്ങനെ അപേക്ഷിക്കാമെന്ന് മനസിലാക്കുക." },
        { title: "വോട്ടർ ഐഡി പരിശോധന", content: "നിങ്ങളുടെ വോട്ടർ ഐഡി നില ഓൺലൈനിൽ പരിശോധിക്കുക." }
      ],
      "voter-booth": [
        { title: "ബൂത്ത് ലൊക്കേറ്റർ", content: "നിങ്ങളുടെ ശബ്ദം എവിടെ കേൾക്കുമെന്ന് കണ്ടെത്തുക." },
        { title: "സ്റ്റേഷൻ തിരഞ്ഞെടുക്കൽ", content: "നിങ്ങളുടെ പോളിംഗ് സ്റ്റേഷൻ കണ്ടെത്തുക." }
      ],
      "voter-misinfo": [
        { title: "വ്യാജൻമാരെ കണ്ടെത്തുക", content: "തെറ്റായ വിവരങ്ങളുടെ ഉദാഹരണങ്ങൾ കാണുക." },
        { title: "റിപ്പോർട്ടും ഫ്ലാഗും", content: "സംശയാസ്പദമായ വിവരങ്ങൾ റിപ്പോർട്ട് ചെയ്യുക." },
        { title: "ക്ലസ്റ്റർ കാണുക", content: "വിപുലമായ കൃത്രിമ ബുദ്ധി റിപ്പോർട്ടുകളെ എങ്ങനെ ഗ്രൂപ്പ് ചെയ്യുന്നു എന്ന് കാണുക." },
        { title: "കൃത്രിമ ബുദ്ധി സ്ഥിരീകരണം", content: "ജെമിനി വിവരങ്ങൾ ഔദ്യോഗിക ഡാറ്റയുമായി പരിശോധിക്കുന്നു." }
      ],
      "cand-nomination": [
        { title: "സെക്യൂരിറ്റി ഡിപ്പോസിറ്റ്", content: "സാമ്പത്തിക ബാധ്യതകൾ മനസിലാക്കുക." },
        { title: "സത്യവാങ്മൂലം (ഫോം 26)", content: "സ്വത്തുക്കളും പശ്ചാത്തലവും വ്യക്തമാക്കുക." },
        { title: "പരിശോധനാ ഘട്ടം", content: "റിട്ടേണിംഗ് ഓഫീസർ പരിശോധനയിൽ എന്ത് സംഭവിക്കുന്നു." }
      ],
      "cand-misinfo": [
        { title: "വ്യാജ പ്രചരണങ്ങൾ", content: "സ്ഥാനാർത്ഥികൾക്കെതിരെയുള്ള പ്രചരണങ്ങൾ പരിശോധിക്കുക." },
        { title: "റിപ്പോർട്ടിംഗ് സംവിധാനം", content: "പരാതികൾ സമർപ്പിക്കാനുള്ള മാർഗ്ഗങ്ങൾ." },
        { title: "കൃത്രിമ ബുദ്ധി ക്ലസ്റ്ററിംഗ്", content: "വിപുലമായ കൃത്രിമ ബുദ്ധി പരാതികൾ ലിങ്ക് ചെയ്യുന്നു." },
        { title: "ഔദ്യോഗിക മറുപടി", content: "തിരഞ്ഞെടുപ്പ് കമ്മീഷൻ തീരുമാനങ്ങൾ വിശകലനം ചെയ്യുന്നു." }
      ],
      "sre_self_heal": [
        { title: "സൈറ്റ് വിശ്വാസ്യത എഞ്ചിനീയർ ആരോഗ്യ പരിശോധന", content: "കണ്ടെയ്നർ ആരോഗ്യം ഉറപ്പുവരുത്തുക." },
        { title: "സ്വയം പരിഹാരം", content: "ഡാറ്റാബേസ് കണക്ഷനുകൾ വർദ്ധിപ്പിക്കാൻ കൃത്രിമ ബുദ്ധി-ക്ക് അനുമതി നൽകുക." }
      ]
    }
  },
  mr: {
    active_protocol: "सक्रिय प्रोटोकॉल प्रारंभ",
    phase: "टप्पा",
    current_objective: "सध्याचे उद्दिष्ट",
    consult_agent: "एजंटशी सल्ला घ्या",
    agent_hint: "या टप्प्यावर स्पष्टीकरण हवे आहे? सखोल माहितीसाठी शिक्षण एजंटला विचारा.",
    agent_welcome: "प्रोटोकॉल सक्रिय आहे। मी तुमच्या नोंदणीत कशी मदत करू शकतो?",
    analyzing: "प्रोटोकॉल विश्लेषण सुरू...",
    ask_placeholder: "या टप्प्याबद्दल काहीही विचारा...",
    terminate_protocol: "प्रोटोकॉल संपवा आणि सत्यापित करा",
    proceed: "पुढील टप्प्यावर जा",
    protocol_verified: "प्रोटोकॉल सत्यापित",
    integrity_seal: "अखंडता सील:",
    syncing: "मतदार यादीशी समक्रमित होत आहे...",
    badge_informed_voter: "माहितीगार मतदार",
    badge_ready_citizen: "सज्ज नागरिक",
    badge_truth_guardian: "सत्य रक्षक",
    badge_legitimate_contestant: "वैध उमेदवार",
    badge_integrity_champion: "अखंडतेचा चॅम्पियन",
    badge_sre_guardian: "साइट विश्वसनीयता अभियंता रक्षक",
    steps: {
      "voter-reg": [
        { title: "पात्रता तपासणी", content: "तुम्ही १८ वर्षांचे आहात का? तुम्ही भारतीय नागरिक आहात का?" },
        { title: "फॉर्म ६ सबमिशन", content: "नवीन नोंदणीसाठी अर्ज कसा करावा ते शिका." },
        { title: "मतदार ओळखपत्र पडताळणी", content: "तुमची मतदार ओळखपत्र स्थिती ऑनलाइन तपासा." }
      ],
      "voter-booth": [
        { title: "बूथ लोकेटर", content: "तुमचा आवाज कुठे ऐकला जाईल ते शोधा." },
        { title: "केंद्र निवड", content: "तुमचे विशिष्ट मतदान केंद्र शोधा." }
      ],
      "voter-misinfo": [
        { title: "खोट्या दाव्यांची ओळख", content: "निवडणुकीदरम्यानच्या खोट्या दाव्यांचे नमुने पहा." },
        { title: "तक्रार आणि फ्लॅग", content: "संशयास्पद मजकूर सबमिट करण्याचे मार्ग." },
        { title: "क्लस्टर पहा", content: "प्रगत कृत्रिम बुद्धिमत्ता मजकुराचे वर्गीकरण कसे करते." },
        { title: "कृत्रिम बुद्धिमत्ता पडताळणी", content: "जेमिनी अधिकृत माहितीशी तुलना करते।" }
      ],
      "cand-nomination": [
        { title: "सुरक्षा ठेव", content: "आर्थिक जबाबदारी समजून घेणे." },
        { title: "शपथपत्र (फॉर्म २६)", content: "मालमत्ता आणि पार्श्वभूमी घोषित करा." },
        { title: "छाननी टप्पा", content: "निवडणूक अधिकारी छाननीत काय होते." }
      ],
      "cand-misinfo": [
        { title: "अपप्रचार", content: "उमेदवारांच्या अपप्रचाराचे परीक्षण करा." },
        { title: "तक्रार निवारण", content: "तक्रारी दाखल करण्याची प्रक्रिया." },
        { title: "कृत्रिम बुद्धिमत्ता वर्गीकरण", content: "साम्य असलेल्या तक्रारींचे संकलन।" },
        { title: "सत्यापन", content: "निवडणूक आयोग निष्कर्षांची पडताळणी करतो." }
      ],
      "sre_self_heal": [
        { title: "साइट विश्वसनीयता अभियंता आरोग्य तपासणी", content: "कंटेनरची स्थिती तपासा." },
        { title: "स्वयं-दुरुस्ती", content: "कृत्रिम बुद्धिमत्ता एजंटला अधिकार प्रदान करा।" }
      ]
    }
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
    syncing: "મતદાર યાદી સાથે સુમેળ સધાઈ રહ્યો છે...",
    badge_informed_voter: "માહિતગાર મતદાર",
    badge_ready_citizen: "તૈયાર નાગરિક",
    badge_truth_guardian: "સત્ય રક્ષક",
    badge_legitimate_contestant: "કાયદેસર ઉમેદવાર",
    badge_integrity_champion: "પ્રામાણિકતાના વિજેતા",
    badge_sre_guardian: "સાઇટ વિશ્વસનીયતા ઇજનેર રક્ષક",
    steps: {
      "voter-reg": [
        { title: "પાત્રતા ચકાસણી", content: "શું તમે ૧૮ વર્ષના છો? શું તમે ભારતીય નાગરિક છો?" },
        { title: "ફોર્મ ૬ સબમિશન", content: "નવી નોંધણી માટે કેવી રીતે અરજી કરવી તે જાણો." },
        { title: "મતદાર આઈડી ચકાસણી", content: "તમારા મતદાર આઈડીની સ્થિતિ ઓનલાઈન તપાસો." }
      ],
      "voter-booth": [
        { title: "બૂથ લોકેટર", content: "તમારો અવાજ ક્યાં સંભળાશે તે શોધો." },
        { title: "કેન્દ્ર પસંદગી", content: "તમારું વિશિષ્ટ મતદાન કેન્દ્ર શોધો." }
      ],
      "voter-misinfo": [
        { title: "ખોટી માહિતી શોધો", content: "ખોટા દાવાઓના ઉદાહરણો જુઓ." },
        { title: "રિપોર્ટ અને ફ્લેગ", content: "શંકાસ્પદ સામગ્રી કેવી રીતે સબમિટ કરવી." },
        { title: "ક્લસ્ટર જુઓ", content: "અદ્યતન કૃત્રિમ બુદ્ધિમત્તા ડેટા કલેક્શન કેવી રીતે કરે છે." },
        { title: "કૃત્રિમ બુદ્ધિમત્તા ચકાસણી", content: "જેમિની આધારોની ચકાસણી કરે છે।" }
      ],
      "cand-nomination": [
        { title: "ડિપોઝીટ", content: "નાણાકીય જવાબદારીઓ સમજવી." },
        { title: "સોગંદનામું (ફોર્મ ૨૬)", content: "સંપત્તિ અને રેકોર્ડ જાહેર કરો." },
        { title: "ચકાસણી પ્રક્રિયા", content: "ચૂંટણી અધિકારી દ્વારા શું ચકાસાય છે." }
      ],
      "cand-misinfo": [
        { title: "ખોટી અફવાઓ", content: "ઉમેદવાર સામેની અફવાઓનો અભ્યાસ." },
        { title: "સબમિશન પ્રક્રિયા", content: "ફરિયાદો નોંધવાની રીત." },
        { title: "કૃત્રિમ બુદ્ધિમત્તા સામ્યતા તપાસ", content: "સમાન ડેટાનું જોડાણ કરવું।" },
        { title: "સત્તાવાર પુષ્ટિ", content: "ચૂંટણી પંચ દ્વારા પુષ્ટિ." }
      ],
      "sre_self_heal": [
        { title: "સાઇટ વિશ્વસનીયતા ઇજનેર હેલ્થ ચેક", content: "કન્ટેનરની તંદુરસ્તી માપો." },
        { title: "ઓટો-હીલિંગ", content: "કૃત્રિમ બુદ્ધિમત્તા એજન્ટને સત્તા સોંપો।" }
      ]
    }
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
    syncing: "ଭୋଟର ତାଲିକା ସହ ସିଙ୍କ ହେଉଛି...",
    badge_informed_voter: "ସଚେତନ ଭୋଟର",
    badge_ready_citizen: "ପ୍ରସ୍ତୁତ ନାଗରିକ",
    badge_truth_guardian: "ସତ୍ୟ ରକ୍ଷକ",
    badge_legitimate_contestant: "ବୈଧ ପ୍ରତିଯୋଗୀ",
    badge_integrity_champion: "ସଚ୍ଚୋଟତା ଚାମ୍ପିଅନ୍",
    badge_sre_guardian: "ସାଇଟ୍ ନିର୍ଭରଯୋଗ୍ୟତା ଇଞ୍ଜିନିୟର୍ ରକ୍ଷକ",
    steps: {
      "voter-reg": [
        { title: "ଯୋଗ୍ୟତା ଯାଞ୍ଚ", content: "ଆପଣଙ୍କୁ ୧୮ ବର୍ଷ ହୋଇଛି କି? ଆପଣ ଭାରତୀୟ ନାଗରିକ କି?" },
        { title: "ଫର୍ମ ୬ ଦାଖଲ", content: "ନୂତନ ପଞ୍ଜୀକରଣ ପାଇଁ କିପରି ଆବେଦନ କରିବେ ଜାଣନ୍ତୁ |" },
        { title: "ଭୋଟର ପରିଚୟ ପତ୍ର ଯାଞ୍ଚ", content: "ଅନଲାଇନରେ ଆପଣଙ୍କର ଭୋଟର ଆଇଡି ସ୍ଥିତି ଯାଞ୍ଚ କରନ୍ତୁ |" }
      ],
      "voter-booth": [
        { title: "ବୁଥ୍ ଲୋକେଟର", content: "ଆପଣଙ୍କ ସ୍ୱର କେଉଁଠାରେ ଶୁଣାଯିବ ତାହା ଖୋଜନ୍ତୁ |" },
        { title: "କେନ୍ଦ୍ର ଚୟନ", content: "ଆପଣଙ୍କର ନିର୍ଦ୍ଦିଷ୍ଟ ବୁଥ୍ ଚିହ୍ନଟ କରନ୍ତୁ |" }
      ],
      "voter-misinfo": [
        { title: "ମିଥ୍ୟା ଚିହ୍ନଟ", content: "ମିଥ୍ୟା ଖବରର ଉଦାହରଣ ଦେଖନ୍ତୁ |" },
        { title: "ରିପୋର୍ଟ ଏବଂ ଫ୍ଲାଗ୍", content: "ସନ୍ଦେହଜନକ ତଥ୍ୟ ଦାଖଲ କରନ୍ତୁ |" },
        { title: "ଗୋଷ୍ଠୀକରଣ", content: "ଉନ୍ନତ କୃତ୍ରିମ ବୁଦ୍ଧିମତ୍ତା ରିପୋର୍ଟ ଲିଙ୍କ୍ କରିବା ପ୍ରକ୍ରିୟା |" },
        { title: "କୃତ୍ରିମ ବୁଦ୍ଧିମତ୍ତା ଯାଞ୍ଚ", content: "ଜେମିନି ଡାଟା ମ୍ୟାଚ୍ କରି ଯାଞ୍ଚ କରେ |" }
      ],
      "cand-nomination": [
        { title: "ଅମାନତ ରାଶି", content: "ଆର୍ଥିକ ଦାୟିତ୍ୱ ବୁଝିବା |" },
        { title: "ଶପଥ ପତ୍ର", content: "ସମ୍ପତ୍ତି ତାଲିକା ଘୋଷଣା |" },
        { title: "ଯାଞ୍ଚ ପ୍ରକ୍ରିୟା", content: "ନିର୍ବାଚନ ଅଧିକାରୀ ଯାଞ୍ଚ ସମୟର କାର୍ଯ୍ୟ |" }
      ],
      "cand-misinfo": [
        { title: "ଅପପ୍ରଚାର", content: "ଭୁଲ୍ ପ୍ରଚାରର ସମୀକ୍ଷା |" },
        { title: "ରିପୋର୍ଟିଂ ଧାରା", content: "ଅଭିଯୋଗ ଦାଖଲ ପ୍ରକ୍ରିୟା |" },
        { title: "କୃତ୍ରିମ ବୁଦ୍ଧିମତ୍ତା ସହାୟତା", content: "ସମାନ ତଥ୍ୟର ଏକତ୍ରୀକରଣ |" },
        { title: "ସରକାରୀ ଯାଞ୍ଚ", content: "ନିର୍ବାଚନ ଆୟୋଗଙ୍କ ଯାଞ୍ଚ |" }
      ],
      "sre_self_heal": [
        { title: "ସାଇଟ୍ ନିର୍ଭରଯୋଗ୍ୟତା ଇଞ୍ଜିନିୟର୍ ଯାଞ୍ଚ", content: "ସିଷ୍ଟମର ସ୍ୱାସ୍ଥ୍ୟ ପରୀକ୍ଷା |" },
        { title: "ସମାଧାନ", content: "କୃତ୍ରିମ ବୁଦ୍ଧିମତ୍ତା କୁ ଅନୁମତି ପ୍ରଦାନ |" }
      ]
    }
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
    proceed: "ਅਗਲੇ ਪੜાਅ 'ਤੇ ਜਾਓ",
    protocol_verified: "ਪ੍ਰੋਟੋਕੋਲ ਤਸਦੀਕ ਹੋਇਆ",
    integrity_seal: "ਅਖੰਡਤਾ ਮੋਹਰ:",
    syncing: "ਵੋਟਰ ਸੂਚੀ ਨਾਲ ਸਿੰਕ ਹੋ ਰਿਹਾ ਹੈ...",
    badge_informed_voter: "ਜਾਗਰੂਕ ਵੋਟਰ",
    badge_ready_citizen: "ਤਿਆਰ ਨਾਗਰਿਕ",
    badge_truth_guardian: "ਸੱਚ ਦਾ ਰਖਵਾਲਾ",
    badge_legitimate_contestant: "ਕਾਨੂੰਨੀ ਉਮੀਦਵਾਰ",
    badge_integrity_champion: "ਇਮਾਨਦਾਰੀ ਦਾ ਜੇਤੂ",
    badge_sre_guardian: "ਸਾਈਟ ਭਰੋਸੇਯੋਗਤਾ ਇੰਜੀਨੀਅਰ ਰਖਵਾਲਾ",
    steps: {
      "voter-reg": [
        { title: "ਯੋਗਤਾ ਦੀ ਜਾਂਚ", content: "ਕੀ ਤੁਸੀਂ 18 ਸਾਲ ਦੇ ਹੋ? ਕੀ ਤੁਸੀਂ ਭਾਰਤੀ ਨਾਗਰਿਕ ਹੋ?" },
        { title: "ਫਾਰਮ 6 ਜਮ੍ਹਾਂ ਕਰਨਾ", content: "ਸਿੱਖੋ ਕਿ ਨਵੀਂ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਲਈ ਕਿਵੇਂ ਅਰਜ਼ੀ ਦੇਣੀ ਹੈ।" },
        { title: "ਵੋਟਰ ਆਈਡੀ ਤਸਦੀਕ", content: "ਆਪਣੀ ਵੋਟਰ ਆਈਡੀ ਸਥਿਤੀ ਦੀ ਔਨਲਾਈਨ ਜਾਂਚ ਕਰੋ।" }
      ],
      "voter-booth": [
        { title: "ਬੂਥ ਲੋਕੇਟਰ", content: "ਲੱਭੋ ਕਿ ਤੁਹਾਡੀ ਆਵਾਜ਼ ਕਿੱਥੇ ਸੁਣੀ ਜਾਵੇਗੀ।" },
        { title: "ਕੇਂਦਰ ਚੋਣ", content: "ਆਪਣਾ ਪੋਲਿੰਗ ਸਟੇਸ਼ਨ ਲੱਭੋ।" }
      ],
      "voter-misinfo": [
        { title: "ਗਲਤ ਜਾਣਕਾਰੀ", content: "ਝੂਠੀਆਂ ਖਬਰਾਂ ਦੇ ਨਮੂਨੇ ਦੇਖੋ।" },
        { title: "ਰਿਪੋਰਟ ਅਤੇ ਫਲੈਗ", content: "ਸ਼ੱਕੀ ਸਮੱਗਰੀ ਦਰਜ ਕਰੋ।" },
        { title: "ਕਲੱਸਟਰ ਦੇਖો", content: "ਉੱਨਤ ਬਣਾਉਟੀ ਬੁੱਧੀ ਡਾਟਾ ਨੂੰ ਕਿਵੇਂ ਇਕੱਠਾ ਕਰਦਾ ਹੈ।" },
        { title: "ਬਣਾਉਟੀ ਬੁੱਧੀ ਤਸਦੀਕ", content: "ਜੇਮਿਨੀ ਜਾਣਕਾਰੀ ਨੂੰ ਸਰਕਾਰੀ ਰਿਕਾਰਡ ਨਾਲ ਮਿਲਾਉਂਦਾ ਹੈ।" }
      ],
      "cand-nomination": [
        { title: "ਸੁਰੱਖਿਆ ਜਮ੍ਹਾਂ ਰਕਮ", content: "ਵਿੱਤੀ ਜ਼ਿੰਮੇਵਾਰੀ ਸਮਝੋ।" },
        { title: "ਹਲਫਨਾਮਾ", content: "ਆਪਣੀ ਜਾਇਦਾਦ ਬਾਰੇ ਜਾਣਕਾਰੀ ਦਿਓ।" },
        { title: "ਪੜਤਾਲ", content: "ਰਿਟਰਨਿੰਗ ਅਫਸਰ ਦੁਆਰਾ ਕੀਤੀ ਜਾਂਦੀ ਚੈਕਿੰਗ।" }
      ],
      "cand-misinfo": [
        { title: "ਝੂਠਾ ਪ੍ਰਚਾਰ", content: "ਉਮੀਦਵਾਰ ਦੇ ਖਿਲਾਫ ਪ੍ਰਚਾਰ ਦੀ ਸਮੀխਿਆ।" },
        { title: "ਸਬਮਿਸ਼ਨ ਪ੍ਰਣਾਲੀ", content: "ਸ਼ਿਕਾਇਤਾਂ ਦਰਜ ਕਰਵਾਉਣ ਦੀ ਪ੍ਰਕਿਰਿਆ।" },
        { title: "ਬਣਾਉਟੀ ਬੁੱਧੀ ਸਹਾਇਤਾ", content: "ਇੱਕੋ ਜਿਹੀ ਜਾਣਕਾਰੀ ਦਾ ਸੰਗ੍ਰਹਿ।" },
        { title: "ਸਰਕਾਰੀ ਪੁਸ਼ਟੀ", content: "ਚੋਣ ਕਮਿਸ਼ਨ ਦੀ ਪ੍ਰਵਾਨਗੀ।" }
      ],
      "sre_self_heal": [
        { title: "ਸਾਈਟ ਭਰੋਸੇਯੋਗਤਾ ਇੰਜੀਨੀਅਰ ਸਿਹਤ ਜਾਂਚ", content: "ਸਿਸਟਮ ਦੀ ਸਥਿਤੀ ਦੀ ਸਮੀխਿਆ।" },
        { title: "ਆਟੋ-ਹੀਲ", content: "ਬਣਾਉਟੀ ਬੁੱਧੀ ਏਜੰਟ ਨੂੰ ਅਧਿਕਾਰ ਦੇਣਾ।" }
      ]
    }
  }
};

export const getBadgeLabel = (badge, language) => {
  const lang = language || 'en';
  const local = QUEST_I18N[lang] || QUEST_I18N['en'];
  const key = `badge_${badge.toLowerCase().replace(' ', '_')}`;
  return local[key] || badge;
};
