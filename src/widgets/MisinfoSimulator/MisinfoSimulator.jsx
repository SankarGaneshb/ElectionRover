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
      "Ingesting report into AI dataset...",
      "Running AI Inference with Gemini...",
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
    correct_assessment: "சரி! உங்கள் மதிப்பீடு செயற்கை நுண்ணறிவு சரிபார்ப்புடன் பொருந்துகிறது.",
    incorrect_assessment: "தவறு. ஏன் என்பதைப் புரிந்துகொள்ள கீழே உள்ள செயற்கை நுண்ணறிவு பகுப்பாய்வைப் பார்க்கவும்.",
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
      "AI தரவுத்தொகுப்பில் அறிக்கையை உட்செலுத்துகிறது...",
      "ஜெமினியுடன் AI Inference ஐ இயக்குகிறது...",
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
    correct_assessment: "सही! आपका आकलन कृत्रिम बुद्धिमत्ता सत्यापन से मेल खाता है।",
    incorrect_assessment: "गलत। यह समझने के लिए नीचे दिया गया कृत्रिम बुद्धिमत्ता विश्लेषण देखें कि क्यों।",
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
      "AI डेटासेट में रिपोर्ट दर्ज की जा रही है...",
      "जेमिनी के साथ AI Inference चलाया जा रहा है...",
      "समान रिपोर्टों के साथ क्लस्टरिंग की जा रही है...",
      "चुनाव आयोग के सत्यापित डेटा के साथ क्रॉस-रेफरेंसिंग...",
      "विश्वास स्कोर तैयार किया जा रहा है..."
    ]
  },
  te: {
    investigate_btn: "విచారించండి →",
    claim_under_investigation: "విచారణలో ఉన్న క్లెయిమ్",
    shares: "షేర్లు",
    assessment_prompt: "ఈ క్లెయిమ్‌పై మీ అంచనా ఏమిటి?",
    assessment_false: "ఇది తప్పు",
    assessment_real: "ఇది నిజం",
    live_query: "లైవ్ క్వెరీ",
    ai_prompt_text: "ఖచ్చితత్వం కోసం ఈ ఎన్నికల క్లెయిమ్‌ను సమీక్షించండి",
    correct_assessment: "సరియైనది! మీ అంచనా కృత్రిమ మేధస్సు ధృవీకరణతో సరిపోలుతోంది.",
    incorrect_assessment: "తప్పు. ఎందుకో అర్థం చేసుకోవడానికి కింద కృత్రిమ మేధస్సు విశ్లేషణను చూడండి.",
    gemini_result_title: "జెమినీ ధృవీకరణ ఫలితం",
    confidence_label: "విశ్వసనీయత",
    reports_clustered_label: "సమూహం చేసిన నివేదికలు",
    regions_affected_label: "ప్రభావిత ప్రాంతాలు",
    investigate_another_scenario: "← మరొక దృశ్యాన్ని పరిశీలించండి",
    scenarios: [
      {
        id: 1,
        claim: "అభ్యర్థి శర్మ ఆర్థిక మోసానికి పాల్పడి అరెస్ట్ అయ్యారు మరియు పోటీ చేయడానికి అనర్హులు.",
        source: "వాట్సాప్ ఫార్వర్డ్",
        spreadCount: 4200,
        regions: ["ఢిల్లీ NCR", "ఉత్తర ప్రదేశ్", "హర్యానా"],
        isFake: true,
        verdict: "తప్పు — ఎటువంటి ఎఫ్‌ఐఆర్ లేదు. ఎన్నికల సంఘం ధృవీకరించినట్లుగా అభ్యర్థి శర్మకు స్వచ్ఛమైన రికార్డు ఉంది. ఉపయోగించిన చిత్రం 2019 నాటి సంబంధం లేని వార్తా సంఘటనకు చెందినది.",
        confidence: 97.3,
        clusterSize: 47,
        detectedAt: "2 గంటల క్రితం"
      },
      {
        id: 2,
        claim: "నియోజకవర్గం #42 కోసం పోలింగ్ తేదీ ఏప్రిల్ 28 నుండి మే 5కి మార్చబడింది.",
        source: "ఫేస్‌బుక్ పోస్ట్",
        spreadCount: 8100,
        regions: ["తమిళనాడు", "కర్ణాటక"],
        isFake: true,
        verdict: "తప్పు — ఎన్నికల సంఘం ఎటువంటి తేదీ మార్పును ధృవీకరించలేదు. అధికారిక షెడ్యూల్ ఏప్రిల్ 28, 2026 అలాగే ఉంది. ఈ పోస్ట్ 12 సమన్వయ ఖాతాల నెట్‌వర్క్‌కు చెందినది.",
        confidence: 99.1,
        clusterSize: 112,
        detectedAt: "45 నిమిషాల క్రితం"
      },
      {
        id: 3,
        claim: "బూత్ #317 లోని ఈవీఎం యంత్రాలు ఒక నిర్దిష్ట పార్టీకి ఓట్లతో ముందుగానే లోడ్ చేయబడి ఉన్నాయి.",
        source: "ట్విట్టర్/X థ్రెడ్",
        spreadCount: 15600,
        regions: ["మహారాష్ట్ర", "గుజరాత్", "రాజస్థాన్"],
        isFake: true,
        verdict: "తప్పు — సీల్స్ చెక్కుచెదరకుండా ఉన్నాయని ఈసీఐ ప్రత్యక్ష ప్రదర్శన నిర్వహించింది. ప్రసారం చేయబడిన వీడియో శిక్షణ ప్రయోజనాల కోసం నిర్వహించిన మాక్ డ్రిల్‌కు చెందినది.",
        confidence: 94.8,
        clusterSize: 203,
        detectedAt: "6 గంటల క్రితం"
      }
    ],
    steps: [
      "బిగ్‌క్వెరీ డేటాసెట్‌లో నివేదిక నమోదు చేయబడుతోంది...",
      "జెమినీతో కృత్రిమ మేధస్సు విశ్లేషణను నడుపుతోంది...",
      "సారూప్య నివేదికలతో సమూహ పరుస్తోంది...",
      "ఎన్నికల సంఘం ధృవీకరించిన డేటాతో సరిపోలుస్తోంది...",
      "విశ్వసనీయత స్కోరును రూపొందిస్తోంది..."
    ]
  },
  kn: {
    investigate_btn: "ತನಿಖೆ ಮಾಡಿ →",
    claim_under_investigation: "ತನಿಖೆಯಲ್ಲಿರುವ ಹಕ್ಕು",
    shares: "ಷೇರುಗಳು",
    assessment_prompt: "ಈ ಹಕ್ಕಿನ ಬಗ್ಗೆ ನಿಮ್ಮ ಮೌಲ್ಯಮಾಪನ ಏನು?",
    assessment_false: "ಇದು ಸುಳ್ಳು",
    assessment_real: "ಇದು ಸತ್ಯ",
    live_query: "ಲೈವ್ ಕ್ವೆರಿ",
    ai_prompt_text: "ನಿಖರತೆಗಾಗಿ ಈ ಚುನಾವಣಾ ಹಕ್ಕನ್ನು ಪರಿಶೀಲಿಸಿ",
    correct_assessment: "ಸರಿಯಾಗಿದೆ! ನಿಮ್ಮ ಮೌಲ್ಯಮಾಪನ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಪರಿಶೀಲನೆಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ.",
    incorrect_assessment: "ತಪ್ಪು. ಏಕೆ ಎಂದು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಕೆಳಗಿನ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ವಿಶ್ಲೇಷಣೆಯನ್ನು ನೋಡಿ.",
    gemini_result_title: "ಜೆಮಿನಿ ಪರಿಶೀಲನಾ ಫಲಿತಾಂಶ",
    confidence_label: "ವಿಶ್ವಾಸಾರ್ಹತೆ",
    reports_clustered_label: "ಕ್ಲಸ್ಟರ್ ಮಾಡಿದ ವರದಿಗಳು",
    regions_affected_label: "ಪೀಡಿತ ಪ್ರದೇಶಗಳು",
    investigate_another_scenario: "← ಇನ್ನೊಂದು ಸನ್ನಿವೇಶವನ್ನು ತನಿಖೆ ಮಾಡಿ",
    scenarios: [
      {
        id: 1,
        claim: "ಅಭ್ಯರ್ಥಿ ಶರ್ಮಾ ಅವರನ್ನು ಆರ್ಥಿಕ ವಂಚನೆಗಾಗಿ ಬಂಧಿಸಲಾಗಿದೆ ಮತ್ತು ಸ್ಪರ್ಧೆಯಿಂದ ಅನರ್ಹಗೊಳಿಸಲಾಗಿದೆ.",
        source: "ವಾಟ್ಸಾಪ್ ಫಾರ್ವರ್ಡ್",
        spreadCount: 4200,
        regions: ["ದೆಹಲಿ NCR", "ಉತ್ತರ ಪ್ರದೇಶ", "ಹರಿಯಾಣ"],
        isFake: true,
        verdict: "ಸುಳ್ಳು — ಯಾವುದೇ ಎಫ್‌ಐಆರ್ ಅಸ್ತಿತ್ವದಲ್ಲಿಲ್ಲ. ಚುನಾವಣಾ ಆಯೋಗವು ಪರಿಶೀಲಿಸಿದಂತೆ ಅಭ್ಯರ್ಥಿ ಶರ್ಮಾ ಕ್ಲೀನ್ ರೆಕಾರ್ಡ್ ಹೊಂದಿದ್ದಾರೆ. ಬಳಸಿದ ಚಿತ್ರವು 2019 ರ ಸಂಬಂಧವಿಲ್ಲದ ಸುದ್ದಿ ಘಟನೆಯದ್ದಾಗಿದೆ.",
        confidence: 97.3,
        clusterSize: 47,
        detectedAt: "2 ಗಂಟೆಗಳ ಹಿಂದೆ"
      },
      {
        id: 2,
        claim: "ಕ್ಷೇತ್ರ #42 ರ ಮತದಾನದ ದಿನಾಂಕವನ್ನು ಏಪ್ರಿల్ 28 ರಿಂದ ಮೇ 5 ಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ.",
        source: "ಫೇಸ್‌ಬುಕ್ ಪೋಸ್ಟ್",
        spreadCount: 8100,
        regions: ["ತಮಿಳುನಾಡು", "ಕರ್ನಾಟಕ"],
        isFake: true,
        verdict: "ಸುಳ್ಳು — ಚುನಾವಣಾ ಆಯೋಗವು ಯಾವುದೇ ದಿನಾಂಕ ಬದಲಾವಣೆಯನ್ನು ದೃಢಪಡಿಸಿಲ್ಲ. ಅಧಿಕೃತ ವೇಳಾಪಟ್ಟಿ ಏಪ್ರಿಲ್ 28, 2026 ಕ್ಕೆ ಮುಂದುವರಿಯುತ್ತದೆ. ಈ ಪೋಸ್ಟ್ 12 ಸಂಘಟಿತ ಖಾತೆಗಳ ನೆಟ್‌ವರ್ಕ್‌ಗೆ ಸೇರಿದೆ.",
        confidence: 99.1,
        clusterSize: 112,
        detectedAt: "45 ನಿಮಿಷಗಳ ಹಿಂದೆ"
      },
      {
        id: 3,
        claim: "ಮತಗಟ್ಟೆ #317 ರಲ್ಲಿ ಇವಿಎಂ ಯಂತ್ರಗಳನ್ನು ಒಂದು ನಿರ್ದಿಷ್ಟ ಪಕ್ಷಕ್ಕೆ ಮತಗಳೊಂದಿಗೆ ಮುಂಚಿತವಾಗಿ ಲೋಡ್ ಮಾಡಲಾಗಿದೆ.",
        source: "ಟ್ವಿಟ್ಟರ್/X ಥ್ರೆಡ್",
        spreadCount: 15600,
        regions: ["ಮಹಾರಾಷ್ಟ್ರ", "ಗುಜರಾತ್", "ರಾಜಸ್ಥಾನ"],
        isFake: true,
        verdict: "ಸುಳ್ಳು — ಸೀಲ್‌ಗಳು ಹಾಗೇ ಇವೆ ಎಂದು ಇಸಿಐ ನೇರ ಪ್ರದರ್ಶನ ನೀಡಿದೆ. ಪ್ರಸಾರವಾದ ವೀಡಿಯೊ ತರಬೇತಿ ಉದ್ದೇಶಗಳಿಗಾಗಿ ನಡೆಸಲಾದ ಅಣಕು ಕಾರ್ಯಾಚರಣೆಯದ್ದಾಗಿದೆ.",
        confidence: 94.8,
        clusterSize: 203,
        detectedAt: "6 ಗಂಟೆಗಳ ಹಿಂದೆ"
      }
    ],
    steps: [
      "ಬಿಗ್‌ಕ್ವೆರಿ ಡೇಟಾಸೆಟ್‌ಗೆ ವರದಿ ದಾಖಲಿಸಲಾಗುತ್ತಿದೆ...",
      "ಜೆಮಿನಿ ಜೊತೆಗೆ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ವಿಶ್ಲೇಷಣೆ ನಡೆಸಲಾಗುತ್ತಿದೆ...",
      "ಸಮಾನ ವರದಿಗಳೊಂದಿಗೆ ಕ್ಲಸ್ಟರ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
      "ಚುನಾವಣಾ ಆಯೋಗದ ಪರಿಶೀಲಿಸಿದ ಡೇಟಾದೊಂದಿಗೆ ಕ್ರಾಸ್-ರೆಫರೆನ್ಸ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
      "ವಿಶ್ವಾಸಾರ್ಹತೆ ಸ್ಕೋರ್ ರಚಿಸಲಾಗುತ್ತಿದೆ..."
    ]
  },
  bn: {
    investigate_btn: "তদন্ত করুন →",
    claim_under_investigation: "তদন্তাধীন দাবি",
    shares: "শেয়ার",
    assessment_prompt: "এই দাবির বিষয়ে আপনার মূল্যায়ন কি?",
    assessment_false: "এটি মিথ্যা",
    assessment_real: "এটি সত্য",
    live_query: "লাইভ ক্যোয়ারী",
    ai_prompt_text: "সঠিকতার জন্য এই নির্বাচনী দাবিটি মূল্যায়ন করুন",
    correct_assessment: "সঠিক! আপনার মূল্যায়ন কৃত্রিম বুদ্ধিমত্তা যাচাইকরণের সাথে মেলে।",
    incorrect_assessment: "ভুল। কেন তা বুঝতে নিচে কৃত্রিম বুদ্ধিমত্তা বিশ্লেষণ দেখুন।",
    gemini_result_title: "জেমিনি যাচাইকরণের ফলাফল",
    confidence_label: "নির্ভরযোগ্যতা",
    reports_clustered_label: "একত্রিত রিপোর্ট",
    regions_affected_label: "প্রভাবিত অঞ্চল",
    investigate_another_scenario: "← অন্য দৃশ্যপট তদন্ত করুন",
    scenarios: [
      {
        id: 1,
        claim: "প্রার্থী শর্মাকে আর্থিক জালিয়াতির জন্য গ্রেপ্তার করা হয়েছে এবং তিনি প্রতিদ্বন্দ্বিতা করার অযোগ্য।",
        source: "হোয়াটসঅ্যাপ ফরোয়ার্ড",
        spreadCount: 4200,
        regions: ["দিল্লি NCR", "উত্তর প্রদেশ", "হরিয়ানা"],
        isFake: true,
        verdict: "মিথ্যা — কোনো এফআইআর নেই। নির্বাচন কমিশন যাচাই করেছে যে প্রার্থী শর্মার রেকর্ড পরিচ্ছন্ন। ব্যবহৃত ছবিটি ২০১৯ সালের একটি সম্পর্কহীন সংবাদ ঘটনার।",
        confidence: 97.3,
        clusterSize: 47,
        detectedAt: "২ ঘন্টা আগে"
      },
      {
        id: 2,
        claim: "নির্বাচনী এলাকা #৪২-এর ভোটের তারিখ ২৮ এপ্রিল থেকে পরিবর্তন করে ৫ মে করা হয়েছে।",
        source: "ফেসবুক পোস্ট",
        spreadCount: 8100,
        regions: ["তামিলনাড়ু", "কর্ণাটক"],
        isFake: true,
        verdict: "মিথ্যা — নির্বাচন কমিশন নিশ্চিত করেছে কোনো তারিখ পরিবর্তন হয়নি। অফিসিয়াল সময়সূচী ২৮ এপ্রিল, ২০২৬ রইল। এই পোস্টটি ১২টি সমন্বিত অ্যাকাউন্টের নেটওয়ার্কের সাথে যুক্ত।",
        confidence: 99.1,
        clusterSize: 112,
        detectedAt: "৪৫ মিনিট আগে"
      },
      {
        id: 3,
        claim: "বুথ #৩১৭-এর ইভিএম মেশিনগুলি একটি নির্দিষ্ট দলের ভোটের সাথে আগে থেকেই লোড করা হয়েছে।",
        source: "টুইটার/X থ্রেড",
        spreadCount: 15600,
        regions: ["মহারাষ্ট্র", "গুಜরাট", "রাজস্থান"],
        isFake: true,
        verdict: "মিথ্যা — ইসিআই সরাসরি প্রদর্শন করেছে যে সিলগুলি অক্ষত রয়েছে। প্রচারিত ভিডিওটি প্রশিক্ষণের উদ্দেশ্যে পরিচালিত মক ড্রিল থেকে নেওয়া।",
        confidence: 94.8,
        clusterSize: 203,
        detectedAt: "৬ ঘন্টা আগে"
      }
    ],
    steps: [
      "বিগকোয়েরি ডেটাসেটে রিপোর্ট অন্তর্ভুক্ত করা হচ্ছে...",
      "জেমিনির মাধ্যমে কৃত্রিম বুদ্ধিমত্তা বিশ্লেষণ চালানো হচ্ছে...",
      "অনুরূপ রিপোর্টের সাথে ক্লাস্টার করা হচ্ছে...",
      "নির্বাচন কমিশনের যাচাইকৃত ডেটার সাথে মেলানো হচ্ছে...",
      "নির্ভরযোগ্যতার স্কোর তৈরি করা হচ্ছে..."
    ]
  },
  ml: {
    investigate_btn: "അന്വേഷിക്കുക →",
    claim_under_investigation: "അന്വേഷണത്തിലുള്ള അവകാശവാദം",
    shares: "ഷെയറുകൾ",
    assessment_prompt: "ഈ അവകാശവാദത്തെക്കുറിച്ചുള്ള നിങ്ങളുടെ വിലയിരുത്തൽ എന്താണ്?",
    assessment_false: "ഇത് തെറ്റാണ്",
    assessment_real: "ഇത് ശരിയാണ്",
    live_query: "തത്സമയ ചോദ്യം",
    ai_prompt_text: "കൃത്യതയ്ക്കായി ഈ അവകാശവാദം വിലയിരുത്തുക",
    correct_assessment: "ശരിയാണ്! നിങ്ങളുടെ വിലയിരുത്തൽ കൃത്രിമ ബുദ്ധി പരിശോധനയുമായി പൊരുത്തപ്പെടുന്നു.",
    incorrect_assessment: "തെറ്റാണ്. എന്തുകൊണ്ടെന്ന് മനസ്സിലാക്കാൻ താഴെയുള്ള കൃത്രിമ ബുദ്ധി വിശകലനം കാണുക.",
    gemini_result_title: "ജെമിനി പരിശോധനാ ഫലം",
    confidence_label: "ആത്മവിശ്വാസം",
    reports_clustered_label: "ക്ലസ്റ്റർ ചെയ്ത റിപ്പോർട്ടുകൾ",
    regions_affected_label: "ബാധിച്ച പ്രദേശങ്ങൾ",
    investigate_another_scenario: "← മറ്റൊരു സാഹചര്യം അന്വേഷിക്കുക",
    scenarios: [
      {
        id: 1,
        claim: "സ്ഥാനാർത്ഥി ശർമ്മയെ സാമ്പത്തിക തട്ടിപ്പിന് അറസ്റ്റ് ചെയ്തു, മത്സരിക്കുന്നതിൽ നിന്ന് അയോഗ്യനാക്കി.",
        source: "വാട്ട്‌സ്ആപ്പ് ഫോർവേഡ്",
        spreadCount: 4200,
        regions: ["ഡൽഹി NCR", "ഉത്തർപ്രദേശ്", "ഹരിയാന"],
        isFake: true,
        verdict: "തെറ്റ് — എഫ്ഐആർ നിലവിലില്ല. തിരഞ്ഞെടുപ്പ് കമ്മീഷൻ സാക്ഷ്യപ്പെടുത്തിയതുപോലെ സ്ഥാനാർത്ഥി ശർമ്മയ്ക്ക് ക്ലീൻ റെക്കോർഡ് ഉണ്ട്. ഉപയോഗിച്ച ചിത്രം 2019 ലെ മറ്റൊരു വാർത്താ സംഭവത്തിൽ നിന്നുള്ളതാണ്.",
        confidence: 97.3,
        clusterSize: 47,
        detectedAt: "2 മണിക്കൂർ മുമ്പ്"
      },
      {
        id: 2,
        claim: "നിയോജകമണ്ഡലം #42-ന്റെ വോട്ടെടുപ്പ് തീയതി ഏപ്രിൽ 28-ൽ നിന്ന് മെയ് 5-ലേക്ക് മാറ്റി.",
        source: "ഫേസ്ബുക്ക് പോസ്റ്റ്",
        spreadCount: 8100,
        regions: ["തമിഴ്‌നാട്", "കർണാടക"],
        isFake: true,
        verdict: "തെറ്റ് — തിരഞ്ഞെടുപ്പ് കമ്മീഷൻ തീയതി മാറ്റമില്ലെന്ന് സ്ഥിരീകരിച്ചു. ഔദ്യോഗിക ഷെഡ്യൂൾ ഏപ്രിൽ 28, 2026 ആയി തുടരുന്നു. ഈ പോസ്റ്റ് 12 കോർഡിനേറ്റഡ് അക്കൗണ്ടുകളുടെ ശൃംഖലയിൽ നിന്നുള്ളതാണ്.",
        confidence: 99.1,
        clusterSize: 112,
        detectedAt: "45 മിനിറ്റ് മുമ്പ്"
      },
      {
        id: 3,
        claim: "ബൂത്ത് #317-ലെ ഇവിഎം മെഷീനുകളിൽ ഒരു പ്രത്യേക പാർട്ടിക്ക് വോട്ടുകൾ മുൻകൂട്ടി ലോഡ് ചെയ്തതായി കണ്ടെത്തി.",
        source: "ട്വിറ്റർ/X ത്രെഡ്",
        spreadCount: 15600,
        regions: ["മഹാരാഷ്ട്ര", "ഗുಜറാത്ത്", "രാജസ്ഥான்"],
        isFake: true,
        verdict: "തെറ്റ് — സീലുകൾ കേടുകൂടാതെയിരിക്കുന്നതായി ഇസിഐ തത്സമയ പ്രകടനം നടത്തി. പ്രചരിച്ച വീഡിയോ പരിശീലന ആവശ്യങ്ങൾക്കായി നടത്തിയ മോക്ക് ഡ്രില്ലിൽ നിന്നുള്ളതാണ്.",
        confidence: 94.8,
        clusterSize: 203,
        detectedAt: "6 മണിക്കൂർ മുമ്പ്"
      }
    ],
    steps: [
      "ബിഗ്ക്വറി ഡാറ്റാസെറ്റിലേക്ക് റിപ്പോർട്ട് ഉൾപ്പെടുത്തുന്നു...",
      "ജെമിനി ഉപയോഗിച്ച് കൃത്രിമ ബുദ്ധി വിശകലനം നടത്തുന്നു...",
      "സമാന റിപ്പോർട്ടുകളുമായി ക്ലസ്റ്റർ ചെയ്യുന്നു...",
      "തിരഞ്ഞെടുപ്പ് കമ്മീഷന്റെ പരിശോധിച്ച ഡാറ്റയുമായി ക്രോസ്-റഫറൻസ് ചെയ്യുന്നു...",
      "വിശ്വാസ്യത സ്കോർ ജനറേറ്റ് ചെയ്യുന്നു..."
    ]
  },
  mr: {
    investigate_btn: "तपास करा →",
    claim_under_investigation: "तपासाधीन दावा",
    shares: "शेअर्स",
    assessment_prompt: "या दाव्याबद्दल तुमचे मूल्यांकन काय आहे?",
    assessment_false: "हे खोटे आहे",
    assessment_real: "हे खरे आहे",
    live_query: "थेट क्वेरी",
    ai_prompt_text: "अचूकतेसाठी या निवडणूक दाव्याचे मूल्यांकन करा",
    correct_assessment: "बरोबर! तुमचे मूल्यांकन कृत्रिम बुद्धिमत्ता पडताळणीशी जुळते.",
    incorrect_assessment: "चूक. कारण समजून घेण्यासाठी खालील कृत्रिम बुद्धिमत्ता विश्लेषण पहा.",
    gemini_result_title: "जेमिनी पडताळणी निकाल",
    confidence_label: "आत्मविश्वास",
    reports_clustered_label: "एकत्रित केलेले अहवाल",
    regions_affected_label: "प्रभावित प्रदेश",
    investigate_another_scenario: "← दुसरा दावा तपासा",
    scenarios: [
      {
        id: 1,
        claim: "उमेदवार शर्मा यांना आर्थिक फसवणुकीसाठी अटक करण्यात आली असून ते निवडणूक लढवण्यास अपात्र ठरले आहेत.",
        source: "व्हॉट्सॲप फॉरवर्ड",
        spreadCount: 4200,
        regions: ["दिल्ली NCR", "उत्तर प्रदेश", "हरियाणा"],
        isFake: true,
        verdict: "खोटे — कोणतीही एफआयआर अस्तित्वात नाही. निवडणूक आयोगाने सत्यापित केल्यानुसार उमेदवार शर्मा यांची स्वच्छ पार्श्वभूमी आहे. वापरलेली प्रतिमा एका २०१९ च्या असंबद्ध बातमी घटनेतील आहे.",
        confidence: 97.3,
        clusterSize: 47,
        detectedAt: "२ तासांपूर्वी"
      },
      {
        id: 2,
        claim: "मतदारसंघ #४२ साठी मतदानाची तारीख २८ एप्रिलवरून ५ मे अशी बदलण्यात आली आहे.",
        source: "फेसबुक पोस्ट",
        spreadCount: 8100,
        regions: ["तमिळनाडू", "कर्नाटक"],
        isFake: true,
        verdict: "खोटे — निवडणूक आयोगाने पुष्टी केली आहे की मतदानाच्या तारखेत कोणताही बदल झालेला नाही. अधिकृत वेळापत्रक २८ एप्रिल २०२६ असेच राहील. ही पोस्ट १२ समन्वित खात्यांच्या नेटवर्कशी जोडलेली आहे.",
        confidence: 99.1,
        clusterSize: 112,
        detectedAt: "४५ मिनिटांपूर्वी"
      },
      {
        id: 3,
        claim: "बूथ #३१७ मधील ईव्हीएम मशिनमध्ये आधीच एका विशिष्ट पक्षाला मते लोड केली गेल्याचे आढळले.",
        source: "ट्विटर/X थ्रेड",
        spreadCount: 15600,
        regions: ["महाराष्ट्र", "गुजरात", "राजस्थान"],
        isFake: true,
        verdict: "खोटे — निवडणूक आयोगाने थेट प्रात्यक्षिक दाखवले आहे की सील अबाधित आहेत. प्रसारित झालेला व्हिडिओ प्रशिक्षणासाठी घेतलेल्या मॉक ड्रिलमधील आहे.",
        confidence: 94.8,
        clusterSize: 203,
        detectedAt: "६ तासांपूर्वी"
      }
    ],
    steps: [
      "बिगक्वेरी डेटासेटमध्ये अहवाल प्रविष्ट केला जात आहे...",
      "जेमिनीसह कृत्रिम बुद्धिमत्ता विश्लेषण चालवले जात आहे...",
      "समान अहवालांसह क्लस्टरिंग केले जात आहे...",
      "निवडणूक आयोगाच्या सत्यापित डेटासह क्रॉस-रेफरन्सिंग...",
      "आत्मविश्वास स्कोअर तयार केला जात आहे..."
    ]
  },
  gu: {
    investigate_btn: "તપાસ કરો →",
    claim_under_investigation: "તપાસ હેઠળનો દાવો",
    shares: "શેર",
    assessment_prompt: "આ દાવા વિશે તમારું મૂલ્યાંકન શું છે?",
    assessment_false: "આ ખોટું છે",
    assessment_real: "આ સાચું છે",
    live_query: "લાઇવ ક્વેરી",
    ai_prompt_text: "ચોકસાઈ માટે આ ચૂંટણી દાવાનું મૂલ્યાંકન કરો",
    correct_assessment: "સાચું! તમારું મૂલ્યાંકન કૃત્રિમ બુદ્ધિમત્તા ચકાસણી સાથે મેળ ખાય છે.",
    incorrect_assessment: "ખોટું. શા માટે તે સમજવા માટે કૃત્રિમ બુદ્ધિમત્તા વિશ્લેષણ નીચે જુઓ.",
    gemini_result_title: "જેમિની ચકાસણી પરિણામ",
    confidence_label: "આત્મવિશ્વાસ",
    reports_clustered_label: "એકત્રિત અહેવાલો",
    regions_affected_label: "અસરગ્રસ્ત પ્રદેશો",
    investigate_another_scenario: "← અન્ય પરિસ્થિતિની તપાસ કરો",
    scenarios: [
      {
        id: 1,
        claim: "ઉમેદવાર શર્માની નાણાકીય છેતરપિંડી બદલ ધરપકડ કરવામાં આવી છે અને તેઓ ચૂંટણી લડવા માટે અયોગ્ય છે.",
        source: "વોટ્સએપ ફોરવર્ડ",
        spreadCount: 4200,
        regions: ["દિલ્હી NCR", "ઉત્તર પ્રદેશ", "હરિયાણા"],
        isFake: true,
        verdict: "ખોટું — કોઈ એફઆઈઆર અસ્તિત્વમાં નથી. ચૂંટણી પંચ દ્વારા ચકાસાયેલ ઉમેદવાર શર્માનો રેકોર્ડ ક્લીન છે. વપરાયેલી છબી ૨૦૧૯ની એક અસંબંધિત સમાચાર ઘટનાની છે.",
        confidence: 97.3,
        clusterSize: 47,
        detectedAt: "૨ કલાક પહેલા"
      },
      {
        id: 2,
        claim: "મતવિસ્તાર #૪૨ માટે મતદાનની તારીખ ૨૮ એપ્રિલથી બદલીને ૫ મે કરવામાં આવી છે.",
        source: "ફેસબુક પોસ્ટ",
        spreadCount: 8100,
        regions: ["તમિલનાડુ", "કર્ણાટક"],
        isFake: true,
        verdict: "ખોટું — ભારતના ચૂંટણી પંચે પુષ્ટિ કરી છે કે કોઈ તારીખ બદલાઈ નથી. સત્તાવાર સમયપત્રક ૨૮ એપ્રિલ, ૨૦૨૬ જ રહેશે. આ પોસ્ટ ૧૨ સંકલિત ખાતાઓના નેટવર્ક સાથે જોડાયેલી છે.",
        confidence: 99.1,
        clusterSize: 112,
        detectedAt: "૪૫ મિનિટ પહેલા"
      },
      {
        id: 3,
        claim: "બૂથ #૩૧૭ માં ઈવીએમ મશીનોમાં કોઈ ચોક્કસ પક્ષના મતો અગાઉથી લોડ કરેલા મળી આવ્યા છે.",
        source: "ટ્વિટર/X થ્રેડ",
        spreadCount: 15600,
        regions: ["મહારાષ્ટ્ર", "ગુજરાત", "રાજસ્થાન"],
        isFake: true,
        verdict: "ખોટું — ચૂંટણી પંચે સીલ અકબંધ હોવાનું લાઈવ પ્રદર્શન કર્યું છે. પ્રસારિત થયેલો વીડિયો તાલીમ હેતુ માટે હાથ ધરાયેલી મોક ડ્રીલનો છે.",
        confidence: 94.8,
        clusterSize: 203,
        detectedAt: "૬ કલાક પહેલા"
      }
    ],
    steps: [
      "બિગક્વેરી ડેટાસેટમાં રિપોર્ટ સામેલ કરવામાં આવી રહ્યો છે...",
      "જેમિની સાથે કૃત્રિમ બુદ્ધિમત્તા વિશ્લેષણ ચલાવવામાં આવી રહ્યું છે...",
      "સમાન અહેવાલો સાથે ક્લસ્ટર કરવામાં આવી રહ્યું છે...",
      "ચૂંટણી પંચના ચકાસાયેલ ડેટા સાથે મેળ ખાવામાં આવી રહ્યો છે...",
      "આત્મવિશ્વાસ સ્કોર જનરેਟ કરવામાં આવી રહ્યો છે..."
    ]
  },
  or: {
    investigate_btn: "ତଦନ୍ତ କରନ୍ତୁ →",
    claim_under_investigation: "ତଦନ୍ତ ଚାଲିଥିବା ଦାବି",
    shares: "ସେୟାର",
    assessment_prompt: "ଏହି ଦାବି ଉପରେ ଆପଣଙ୍କର ମୂଲ୍ୟାଙ୍କନ କଣ?",
    assessment_false: "ଏହା ମିଥ୍ୟା",
    assessment_real: "ଏହା ସତ୍ୟ",
    live_query: "ଲାଇଭ୍ ପ୍ରଶ୍ନ",
    ai_prompt_text: "ସଠିକତା ପାଇଁ ଏହି ନିର୍ବାਚନ ଦାବିର ସମୀକ୍ଷା କରନ୍ତୁ",
    correct_assessment: "ସଠିକ୍! ଆପଣଙ୍କର ମୂଲ୍ୟାଙ୍କନ କୃତ୍ରିମ ବୁଦ୍ଧିମତ୍ତା ଯାଞ୍ଚ ସହିତ ମେଳ ଖାଉଛି |",
    incorrect_assessment: "ଭୁଲ୍ | କାହିଁକି ବুଝିବା ପାଇଁ ନିମ୍ନରେ ଦିଆଯାଇଥିବା କୃତ୍ରିମ ବୁଦ୍ଧିମତ୍ତା ବିଶ୍ଳେଷଣ ଦେଖନ୍ତୁ |",
    gemini_result_title: "ଜେମିନି ଯାଞ୍ଚ ଫଳାଫଳ",
    confidence_label: "ଆତ୍ମବିଶ୍ୱାସ",
    reports_clustered_label: "ଏକତ୍ରିତ ରିପୋର୍ଟ",
    regions_affected_label: "ପ୍ରଭାବିତ ଅଞ୍ଚଳ",
    investigate_another_scenario: "← ଅନ୍ୟ ଏକ ଦୃଶ୍ୟର ତଦନ୍ତ କରନ୍ତୁ",
    scenarios: [
      {
        id: 1,
        claim: "ପ୍ରାର୍ଥୀ ଶର୍ମାଙ୍କୁ ଆର୍ଥିକ ଜାଲିଆତି ପାଇଁ ଗିରଫ କରାଯାଇଛି ଏବଂ ସେ ନିର୍ବାଚନ ଲଢିବା ପାଇଁ ଅଯୋଗ୍ୟ।",
        source: "ହ୍ୱାਟସ୍ ଆପ୍ ଫରୱାର୍ଡ",
        spreadCount: 4200,
        regions: ["ଦିଲ୍ଲୀ NCR", "ଉତ୍ਤਰ ପ୍ରଦେଶ", "ହରିୟାଣା"],
        isFake: true,
        verdict: "ମିଥ୍ୟା — କୌଣସି ଏଫ୍ଆଇଆର୍ ନାହିଁ। ନିର୍ବାଚନ କମିଶନଙ୍କ ଦ୍ୱାରା ଯାଞ୍ଚ କରାଯାଇଥିବା ପ୍ରାର୍ଥୀ ଶର୍ମାଙ୍କ ରେକର୍ଡ ସ୍ୱଚ୍ଛ | ବ୍ୟବହୃତ ଚିତ୍ରଟି ୨୦୧୯ ର ଏକ ଅସମ୍ପୃକ୍ତ ଖବର ଘଟଣାର |",
        confidence: 97.3,
        clusterSize: 47,
        detectedAt: "୨ ଘଣ୍ଟା ପୂର୍ବରୁ"
      },
      {
        id: 2,
        claim: "ନିର୍ବାଚନ ମଣ୍ଡଳୀ #୪୨ ପାଇଁ ମତଦାନ ତାରିଖ ଅପ୍ରେଲ ୨୮ ରୁ ମଇ ୫ କୁ ପରିବର୍ତ୍ତନ କରାଯାଇଛି।",
        source: "ଫେସବୁକ୍ ପୋଷ୍ଟ",
        spreadCount: 8100,
        regions: ["ତାମିଲନାଡୁ", "କର୍ଣ୍ଣାটক"],
        isFake: true,
        verdict: "ମିଥ୍ୟା — ନିର୍ବାଚନ କମିଶନ ନିଶ୍ଚିତ କରିଛନ୍ତି ଯେ କୌଣସି ତାରିଖ ପରିବର୍ତ୍ତନ ହୋଇନାହିଁ। ସରକାରୀ କାର୍ଯյସୂଚୀ ଅପ୍ରେଲ ୨୮, ୨୦୨୬ ରହିଛି। ଏହି ପୋଷ୍ଟଟି ୧୨ ଟି ସମନ୍ୱିତ ଆକାଉଣ୍ଟର ନେଟୱର୍କ ସହ ଜଡିତ |",
        confidence: 99.1,
        clusterSize: 112,
        detectedAt: "୪୫ ମିନିଟ୍ ପୂର୍ବରୁ"
      },
      {
        id: 3,
        claim: "ବୁଥ୍ #୩୧୭ ର ଇଭିଏମ୍ ମେସିନ୍ ଗୁଡିକ ଏକ ନିର୍ଦ୍ଦିಷ್ಟ ଦଳକୁ ଭୋଟ୍ ସହିତ ପୂର୍ବରୁ ଲୋଡ୍ ହୋଇଥିବା ଦେଖିବାକୁ ମିଳିଛି |",
        source: "ଟ୍ୱିଟର/X ଥ୍ରେଡ୍",
        spreadCount: 15600,
        regions: ["ମହାରାଷ୍ଟ୍ର", "ଗୁଜରାଟ", "ରାଜସ୍ଥାନ"],
        isFake: true,
        verdict: "ମିଥ୍ୟା — ସିଲ୍ ଗୁଡିକ ଅକ୍ଷୁର୍ଣ୍ଣ ରହିଥିବା ନିର୍ବାଚନ କମିଶନ ଲାଇଭ୍ ପ୍ରଦର୍ଶନ କରିଛନ୍ତି | ପ୍ରସାରିତ ଭିଡିଓଟି ତାଲିମ ଉଦ୍ଦେଶ୍ୟରେ ପରିଚାଳିତ ମକ୍ ଡ୍ରିଲ୍ ରୁ ନିଆଯାଇଛି |",
        confidence: 94.8,
        clusterSize: 203,
        detectedAt: "୬ ଘଣ୍ଟା ପୂର୍ବରୁ"
      }
    ],
    steps: [
      "ବିଗ୍ କ୍ୱେରୀ ଡାಟାସେଟରେ ରିପୋର୍ଟ ଦାଖଲ କରାଯାଉଛି...",
      "ଜେମିନି ସହିତ କୃତ୍ରିମ ବୁଦ್ଧିମତ୍ତା ବିଶ୍ଳେଷଣ ଚାଲିଛି...",
      "ସମାନ ରିପୋର୍ଟ ସହିତ କ୍ଲଷ୍ଟରିଂ କରାଯାଉଛି...",
      "ନିର୍ବାଚନ କମିଶନଙ୍କ ଯାଞ୍ଚ ହୋଇଥିବା ଡାಟା ସହିତ ମେଳ କରାଯାଉଛି...",
      "ଆତ୍ମବିଶ୍ୱାସ ସ୍କୋର ପ୍ରସ୍ତուତ କରାଯାଉଛି..."
    ]
  },
  pa: {
    investigate_btn: "ਤਸਦੀਕ ਕਰੋ →",
    claim_under_investigation: "ਜਾਂਚ ਅਧੀਨ ਦਾਅਵਾ",
    shares: "ਸ਼ੇਅਰ",
    assessment_prompt: "ਇਸ ਦਾਅਵੇ ਬਾਰੇ ਤੁਹਾਡਾ ਮੁਲਾਂਕਣ ਕੀ ਹੈ?",
    assessment_false: "ਇਹ ਝੂਠ ਹੈ",
    assessment_real: "ਇਹ ਸੱਚ ਹੈ",
    live_query: "ਲਾਈਵ ਕਵੈਰੀ",
    ai_prompt_text: "ਸੱਚਾਈ ਲਈ ਇਸ ਚੋਣ ਦਾਅਵੇ ਦਾ ਮੁਲਾਂਕਣ ਕਰੋ",
    correct_assessment: "ਸਹੀ! ਤੁਹਾਡਾ ਮੁਲਾਂਕਣ ਬਣਾਉਟੀ ਬੁੱਧੀ ਤਸਦੀਕ ਨਾਲ ਮੇਲ ਖਾਂਦਾ ਹੈ।",
    incorrect_assessment: "ਗਲਤ। ਕਿਉਂ ਸਮਝਣ ਲਈ ਹੇਠਾਂ ਬਣਾਉਟੀ ਬੁੱਧੀ ਵਿਸ਼ਲੇਸ਼ਣ ਦੇਖੋ।",
    gemini_result_title: "ਜੈਮਿਨੀ ਤਸਦੀਕ ਨਤੀਜਾ",
    confidence_label: "ਭਰੋਸਾ",
    reports_clustered_label: "ਇਕੱਠੀਆਂ ਕੀਤੀਆਂ ਰਿਪੋਰਟਾਂ",
    regions_affected_label: "ਪ੍ਰਭਾਵਿਤ ਖੇਤਰ",
    investigate_another_scenario: "← ਕਿਸੇ ਹੋਰ ਦਾਅਵੇ ਦੀ ਜਾਂਚ ਕਰੋ",
    scenarios: [
      {
        id: 1,
        claim: "ਉਮੀਦਵਾਰ ਸ਼ਰਮਾ ਨੂੰ ਵਿੱਤੀ ਧੋਖਾਧੜੀ ਲਈ ਗ੍ਰਿਫਤਾਰ ਕੀਤਾ ਗਿਆ ਹੈ ਅਤੇ ਉਹ ਚੋਣ ਲੜਨ ਲਈ ਅਯੋਗ ਹਨ।",
        source: "ਵਟਸਐਪ ਫਾਰਵਰਡ",
        spreadCount: 4200,
        regions: ["ਦਿੱਲੀ NCR", "ਉੱਤਰ ਪ੍ਰਦੇਸ਼", "ਹਰਿਆਣਾ"],
        isFake: true,
        verdict: "ਝੂਠ — ਕੋਈ ਐਫਆਈਆਰ ਨਹੀਂ ਹੈ। ਚੋਣ ਕਮਿਸ਼ਨ ਵੱਲੋਂ ਤਸਦੀਕ ਕੀਤਾ ਗਿਆ ਹੈ ਕਿ ਉਮੀਦਵਾਰ ਸ਼ਰਮਾ ਦਾ ਰਿਕਾਰਡ ਸਾਫ਼ ਹੈ। ਵਰਤੀ ਗਈ ਤਸਵੀਰ 2019 ਦੀ ਇੱਕ ਗੈਰ-ਸੰਬੰਧਿਤ ਖ਼ਬਰ ਦੀ ਘਟਨਾ ਦੀ ਹੈ।",
        confidence: 97.3,
        clusterSize: 47,
        detectedAt: "2 ਘੰਟੇ ਪਹਿਲਾਂ"
      },
      {
        id: 2,
        claim: "ਹਲਕੇ #42 ਲਈ ਪੋਲਿੰਗ ਦੀ ਮਿਤੀ 28 ਅਪ੍ਰੈਲ ਤੋਂ ਬਦਲ ਕੇ 5 ਮਈ ਕਰ ਦਿੱਤੀ ਗਈ ਹੈ।",
        source: "ਫੇਸਬੁੱਕ ਪੋਸਟ",
        spreadCount: 8100,
        regions: ["ਤਮਿਲਨਾਡੂ", "ਕਰਨਾਟਕ"],
        isFake: true,
        verdict: "ਝੂਠ — ਭਾਰਤ ਦੇ ਚੋਣ ਕਮਿਸ਼ਨ ਨੇ ਪੁਸ਼ਟੀ ਕੀਤੀ ਹੈ ਕਿ ਕੋਈ ਤਰੀਕ ਨਹੀਂ ਬਦਲੀ ਗਈ। ਅਧਿਕਾਰਤ ਸਮਾਂ-ਸਾਰਣੀ 28 ਅਪ੍ਰੈਲ, 2026 ਹੀ ਰਹੇਗੀ। ਇਹ ਪੋਸਟ 12 ਤਾਲਮੇਲ ਵਾਲੇ ਖਾਤਿਆਂ ਦੇ ਨੈੱਟਵਰਕ ਨਾਲ ਜੁੜੀ ਹੋਈ ਹੈ।",
        confidence: 99.1,
        clusterSize: 112,
        detectedAt: "45 ਮਿੰਟ ਪਹਿਲਾਂ"
      },
      {
        id: 3,
        claim: "ਬੂਥ #317 ਵਿੱਚ ਈਵੀਐਮ ਮਸ਼ੀਨਾਂ ਵਿੱਚ ਕਿਸੇ ਖਾਸ ਪਾਰട്ടി ਦੀਆਂ ਵੋਟਾਂ ਪਹਿਲਾਂ ਹੀ ਲੋਡ ਕੀਤੀਆਂ ਪਾਈਆਂ ਗਈਆਂ।",
        source: "ਟਵਿੱਟਰ/X ਥ੍ਰੈਡ",
        spreadCount: 15600,
        regions: ["ਮਹਾਰਾష్ట్ర", "ਗੁਜਰਾਤ", "ਰਾਜਸਥਾਨ"],
        isFake: true,
        verdict: "ਝੂਠ — ਚੋਣ ਕਮਿਸ਼ਨ ਨੇ ਸਿੱਧਾ ਪ੍ਰਦਰਸ਼ਨ ਕਰਕੇ ਦਿਖਾਇਆ ਹੈ ਕਿ ਸੀਲਾਂ ਬਿਲਕುਲ ਸਹੀ ਹਨ। ਪ੍ਰਸਾਰਿਤ ਕੀਤੀ ਗਈ ਵੀਡੀਓ ਸਿਖਲਾਈ ਦੇ ਉਦੇਸ਼ਾਂ ਲਈ ਕਰਵਾਈ ਗਈ ਮੌਕ ਡਰਿੱਲ ਦੀ ਹੈ।",
        confidence: 94.8,
        clusterSize: 203,
        detectedAt: "6 ਘੰਟੇ ਪਹਿਲਾਂ"
      }
    ],
    steps: [
      "ਬਿਗਕੁਐਰੀ ਡੇਟਾਸੈਟ ਵਿੱਚ ਰਿਪੋਰਟ ਦਰਜ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...",
      "ਜੈਮਿਨੀ ਨਾਲ ਬਣਾਉਟੀ ਬੁੱਧੀ ਵਿਸ਼ਲੇਸ਼ਣ ਚਲਾਇਆ ਜਾ ਰਿਹਾ ਹੈ...",
      "ਸਮਾਨ ਰਿਪੋਰਟਾਂ ਨਾਲ ਇਕੱਠਾ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...",
      "ਚੋਣ ਕਮਿਸ਼ਨ ਦੇ ਤਸਦੀਕਸ਼ੁਦਾ ਡੇਟਾ ਨਾਲ ਮਿਲਾਇਆ ਜਾ ਰਿਹਾ ਹੈ...",
      "ਭਰੋਸੇਯੋਗਤਾ ਸਕੋਰ ਤਿਆਰ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ..."
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

  const runAISimulation = (scenario) => {
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
                  onClick={() => runAISimulation(scenario)}
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

                {/* AI Processing Pipeline */}
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
FROM AI Inference(
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
