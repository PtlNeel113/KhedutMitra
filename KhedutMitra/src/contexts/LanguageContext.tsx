import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'gu';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // App Name
    'app.name': 'KhedutMitra',
    'app.tagline': 'Your Smart Farming Companion',
    'app.aiName': 'Farming Assistant',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.cropAdvisory': 'Crop Advisory',
    'nav.marketplaces': 'Marketplaces',
    'nav.farmCredit': 'Farm Credit',
    'nav.community': 'Community',
    'nav.impact': 'Impact',
    'nav.home': 'Home',
    'nav.logout': 'Logout',
    'nav.getStarted': 'Get Started',
    'nav.schemes': 'Govt Schemes',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.happeningToday': "Here's what's happening with your",
    'dashboard.farm': 'farm',
    'dashboard.organization': 'organization',
    'dashboard.account': 'account',
    'dashboard.today': 'today',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.todayWeather': "Today's Weather",
    'dashboard.cropHealth': 'Crop Health Score',
    'dashboard.excellentCondition': 'Excellent condition',
    'dashboard.viewDetailedReport': 'View Detailed Report',
    'dashboard.thisMonthEarnings': "This Month's Earnings",
    'dashboard.produceSales': 'Produce Sales',
    'dashboard.carbonCredits': 'Carbon Credits',
    'dashboard.total': 'Total',
    'dashboard.newAdvisory': 'New Advisory Available',
    'dashboard.viewAdvisory': 'View Advisory',
    'dashboard.governmentSchemes': 'Government Schemes',
    'dashboard.exploreSchemes': 'Explore All Schemes',
    
    // Stats
    'stats.totalAcreage': 'Total Acreage',
    'stats.acres': 'acres',
    'stats.carbonCredits': 'Carbon Credits',
    'stats.earned': 'earned',
    'stats.creditAvailable': 'Credit Available',
    'stats.approved': 'approved',
    'stats.insuranceActive': 'Insurance Active',
    'stats.policies': 'policies',
    
    // Weather
    'weather.temperature': 'Temperature',
    'weather.humidity': 'Humidity',
    'weather.rainfall': 'Rainfall',
    
    // AI Agent
    'ai.title': 'AI Farming Assistant',
    'ai.live': 'Live',
    'ai.poweredBy': 'Powered by Advanced AI',
    'ai.scanCrop': 'Scan Your Crop',
    'ai.analyzing': 'AI is analyzing...',
    'ai.tryAsking': 'Try asking:',
    'ai.placeholder': 'Ask about crops, pests, soil, weather...',
    'ai.greeting': "Hello! I'm your AI Farming Assistant. 🌱 I can help you with crop advisory, pest management, soil health, weather insights, and farming best practices. You can also use the camera to scan your crops for disease detection!",
    'ai.voiceInput': 'Voice Input',
    'ai.selectLanguage': 'Select AI Language',
    'ai.captureAnalyze': 'Capture & Analyze',
    'ai.analyzingWithAI': 'Analyzing with AI...',
    'ai.analyzeCropHealth': 'Analyze Crop Health',
    'ai.retakePhoto': 'Retake Photo',
    'ai.positionCrop': 'Position the crop clearly in the frame',
    'ai.aiWillAnalyze': 'AI will analyze for diseases, pests & health',
    'ai.startListening': 'Start Voice Input',
    'ai.stopListening': 'Stop Listening',
    'ai.voiceLanguage': 'Voice Language',
    
    // Roles
    'role.farmer': 'Farmer',
    'role.fpo': 'FPO',
    'role.buyer': 'Institutional Buyer',
    'role.investor': 'Investor',
    
    // Auth
    'auth.chooseRole': 'Choose Your Role',
    'auth.tellAboutYourself': 'Tell Us About Yourself',
    'auth.enableFeatures': 'Enable Features',
    'auth.welcome': 'Welcome to KhedutMitra!',
    'auth.accountReady': 'Your account is ready!',
    
    // Theme
    'theme.light': 'Light Mode',
    'theme.dark': 'Dark Mode',
  },
  hi: {
    // App Name
    'app.name': 'खेडूतमित्र',
    'app.tagline': 'आपका स्मार्ट खेती साथी',
    'app.aiName': 'कृष��� सहायक',
    
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.cropAdvisory': 'फसल सलाह',
    'nav.marketplaces': 'बाज़ार',
    'nav.farmCredit': 'कृषि ऋण',
    'nav.community': 'समुदाय',
    'nav.impact': 'प्रभाव',
    'nav.home': 'होम',
    'nav.logout': 'लॉगआउट',
    'nav.getStarted': 'शुरू करें',
    'nav.schemes': 'सरकारी योजनाएं',
    
    // Dashboard
    'dashboard.welcome': 'स्वागत है',
    'dashboard.happeningToday': 'आज आपके',
    'dashboard.farm': 'खेत',
    'dashboard.organization': 'संगठन',
    'dashboard.account': 'खाते',
    'dashboard.today': 'में क्या हो रहा है',
    'dashboard.quickActions': 'त्वरित कार्य',
    'dashboard.recentActivity': 'हाल की गतिविधि',
    'dashboard.todayWeather': 'आज का मौसम',
    'dashboard.cropHealth': 'फसल स्वास्थ्य स्कोर',
    'dashboard.excellentCondition': 'उत्कृष्ट स्थिति',
    'dashboard.viewDetailedReport': 'विस्तृत रिपोर्ट देखें',
    'dashboard.thisMonthEarnings': 'इस महीने की कमाई',
    'dashboard.produceSales': 'उत्पाद बिक्री',
    'dashboard.carbonCredits': 'कार्बन क्रेडिट',
    'dashboard.total': 'कुल',
    'dashboard.newAdvisory': 'नई सलाह उपलब्ध',
    'dashboard.viewAdvisory': 'सलाह देखें',
    'dashboard.governmentSchemes': 'सरकारी योजनाएं',
    'dashboard.exploreSchemes': 'सभी योजनाएं देखें',
    
    // Stats
    'stats.totalAcreage': 'कुल क्षेत्रफल',
    'stats.acres': 'एकड़',
    'stats.carbonCredits': 'कार्बन क्रेडिट',
    'stats.earned': 'अर्जित',
    'stats.creditAvailable': 'उपलब्ध ऋण',
    'stats.approved': 'स्वीकृत',
    'stats.insuranceActive': 'सक्रिय बीमा',
    'stats.policies': 'पॉलिसी',
    
    // Weather
    'weather.temperature': 'तापमान',
    'weather.humidity': 'नमी',
    'weather.rainfall': 'वर्षा',
    
    // AI Agent
    'ai.title': 'AI कृषि सहायक',
    'ai.live': 'लाइव',
    'ai.poweredBy': 'उन्नत AI द्वारा संचालित',
    'ai.scanCrop': 'अपनी फसल स्कैन करें',
    'ai.analyzing': 'AI विश्लेषण कर रहा है...',
    'ai.tryAsking': 'पूछने का प्रयास करें:',
    'ai.placeholder': 'फसलों, कीटों, मिट्टी, मौसम के बारे में पूछें...',
    'ai.greeting': 'नमस्ते! मैं आपका AI कृषि सहायक हूँ। 🌱 मैं फसल सलाह, कीट प्रबंधन, मिट्टी स्वास्थ्य, मौसम जानकारी और खेती की सर्वोत्तम प्रथाओं में आपकी मदद कर सकता हूँ। आप रोग पहचान के लिए कैमरा से फसल स्कैन भी कर सकते हैं!',
    'ai.voiceInput': 'आवाज़ इनपुट',
    'ai.selectLanguage': 'AI भाषा चुनें',
    'ai.captureAnalyze': 'कैप्चर और विश्लेषण करें',
    'ai.analyzingWithAI': 'AI से विश्लेषण कर रहे हैं...',
    'ai.analyzeCropHealth': 'फसल स्वास्थ्य का विश्लेषण करें',
    'ai.retakePhoto': 'फिर से फोटो लें',
    'ai.positionCrop': 'फसल को फ्रेम में स्पष्ट रूप से रखें',
    'ai.aiWillAnalyze': 'AI रोग, कीट और स्वास्थ्य का विश्लेषण करेगा',
    'ai.startListening': 'आवाज़ इनपुट शुरू करें',
    'ai.stopListening': 'सुनना बंद करें',
    'ai.voiceLanguage': 'आवाज़ की भाषा',
    
    // Roles
    'role.farmer': 'किसान',
    'role.fpo': 'FPO',
    'role.buyer': 'संस्थागत खरीदार',
    'role.investor': 'निवेशक',
    
    // Auth
    'auth.chooseRole': 'अपनी भूमिका चुनें',
    'auth.tellAboutYourself': 'अपने बारे में बताएं',
    'auth.enableFeatures': 'सुविधाएं सक्षम करें',
    'auth.welcome': 'खेडूतमित्र में आपका स्वागत है!',
    'auth.accountReady': 'आपका खाता तैयार है!',
    
    // Theme
    'theme.light': 'लाइट मोड',
    'theme.dark': 'डार्क मोड',
  },
  gu: {
    // App Name
    'app.name': 'ખેડૂતમિત્ર',
    'app.tagline': 'તમારો સ્માર્ટ ખેતી સાથી',
    'app.aiName': 'ધારીયો AI',
    
    // Navigation
    'nav.dashboard': 'ડેશબોર્ડ',
    'nav.cropAdvisory': 'પાક સલાહ',
    'nav.marketplaces': 'બજાર',
    'nav.farmCredit': 'ખેતી લોન',
    'nav.community': 'સમુદાય',
    'nav.impact': 'અસર',
    'nav.home': 'હોમ',
    'nav.logout': 'લૉગઆઉટ',
    'nav.getStarted': 'શરૂ કરો',
    'nav.schemes': 'સરકારી યોજનાઓ',
    
    // Dashboard
    'dashboard.welcome': 'ફરી સ્વાગત છે',
    'dashboard.happeningToday': 'આજે તમારા',
    'dashboard.farm': 'ખેતર',
    'dashboard.organization': 'સંસ્થા',
    'dashboard.account': 'ખાતા',
    'dashboard.today': 'સાથે શું થઈ રહ્યું છે',
    'dashboard.quickActions': 'ઝડપી ક્રિયાઓ',
    'dashboard.recentActivity': 'તાજેતરની પ્રવૃત્તિ',
    'dashboard.todayWeather': 'આજનું હવામાન',
    'dashboard.cropHealth': 'પાક સ્વાસ્થ્ય સ્કોર',
    'dashboard.excellentCondition': 'ઉત્કૃષ્ટ સ્થિતિ',
    'dashboard.viewDetailedReport': 'વિગતવાર રિપોર્ટ જુઓ',
    'dashboard.thisMonthEarnings': 'આ મહિનાની કમાણી',
    'dashboard.produceSales': 'ઉત્પાદન વેચાણ',
    'dashboard.carbonCredits': 'કાર્બન ક્રેડિટ',
    'dashboard.total': 'કુલ',
    'dashboard.newAdvisory': 'નવી સલાહ ઉપલબ્ધ',
    'dashboard.viewAdvisory': 'સલાહ જુઓ',
    'dashboard.governmentSchemes': 'સરકારી યોજનાઓ',
    'dashboard.exploreSchemes': 'બધી યોજનાઓ જુઓ',
    
    // Stats
    'stats.totalAcreage': 'કુલ વિસ્તાર',
    'stats.acres': 'એકર',
    'stats.carbonCredits': 'કાર્બન ક્રેડિટ',
    'stats.earned': 'મેળવ્યું',
    'stats.creditAvailable': 'ઉપલબ્ધ લોન',
    'stats.approved': 'મંજૂર',
    'stats.insuranceActive': 'સક્રિય વીમો',
    'stats.policies': 'પોલિસી',
    
    // Weather
    'weather.temperature': 'તાપમાન',
    'weather.humidity': 'ભેજ',
    'weather.rainfall': 'વરસાદ',
    
    // AI Agent
    'ai.title': 'ધારીયો AI',
    'ai.live': 'લાઇવ',
    'ai.poweredBy': 'અદ્યતન AI દ્વારા સંચાલિત',
    'ai.scanCrop': 'તમારો પાક સ્કેન કરો',
    'ai.analyzing': 'ધારીયો વિશ્લેષણ કરી રહ્યો છે...',
    'ai.tryAsking': 'પૂછવાનો પ્રયાસ કરો:',
    'ai.placeholder': 'પાક, જીવાત, માટી, હવામાન વિશે પૂછો...',
    'ai.greeting': 'નમસ્તે! હું તમારો ધારીયો AI છું। 🌱 હું પાક સલાહ, જીવાત વ્યવસ્થાપન, માટી સ્વાસ્થ્ય, હવામાન માહિતી અને ખેતીની શ્રેષ્ઠ પદ્ધતિઓમાં મદદ કરી શકું છું। તમે રોગ શોધ માટે કેમેરાથી પાક સ્કેન પણ કરી શકો છો!',
    'ai.voiceInput': 'અવાજ ઇનપુટ',
    'ai.selectLanguage': 'ધારીયોની ભાષા પસંદ કરો',
    'ai.captureAnalyze': 'કેપ્ચર અને વિશ્લેષણ કરો',
    'ai.analyzingWithAI': 'ધારીયો સાથે વિશ્લેષણ કરી રહ્યા છીએ...',
    'ai.analyzeCropHealth': 'પાક સ્વાસ્થ્યનું વિશ્લેષણ કરો',
    'ai.retakePhoto': 'ફરી ફોટો લો',
    'ai.positionCrop': 'પાકને ફ્રેમમાં સ્પષ્ટપણે રાખો',
    'ai.aiWillAnalyze': 'ધારીયો રોગ, જીવાત અને સ્વાસ્થ્યનું વિશ્લેષણ કરશે',
    'ai.startListening': 'અવાજ ઇનપુટ શરૂ કરો',
    'ai.stopListening': 'સાંભળવાનું બંધ કરો',
    'ai.voiceLanguage': 'અવાજની ભાષા',
    
    // Roles
    'role.farmer': 'ખેડૂત',
    'role.fpo': 'FPO',
    'role.buyer': 'સંસ્થાકીય ખરીદદાર',
    'role.investor': 'રોકાણકાર',
    
    // Auth
    'auth.chooseRole': 'તમારી ભૂમિકા પસંદ કરો',
    'auth.tellAboutYourself': 'તમારા વિશે જણાવો',
    'auth.enableFeatures': 'સુવિધાઓ સક્ષમ કરો',
    'auth.welcome': 'ખેડૂતમિત્રમાં આપનું સ્વાગત છે!',
    'auth.accountReady': 'તમારું ખાતું તૈયાર છે!',
    
    // Theme
    'theme.light': 'લાઇટ મોડ',
    'theme.dark': 'ડાર્ક મોડ',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('khedutmitra_language');
    return (saved as Language) || 'en';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('khedutmitra_language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}