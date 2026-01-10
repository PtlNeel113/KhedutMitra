import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Award, TrendingUp, Shield, Sprout, Droplets, 
  Zap, ArrowRight, CheckCircle, ExternalLink,
  IndianRupee, Users, Leaf, Tractor
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';
import { AIAgent, AIAgentButton } from './AIAgent';

interface GovernmentSchemesProps {
  compact?: boolean;
  onViewAll?: () => void;
}

export function GovernmentSchemes({ compact = false, onViewAll }: GovernmentSchemesProps) {
  const { language } = useLanguage();

  const schemes = [
    {
      id: 1,
      name: {
        en: 'PM-KISAN',
        hi: 'पीएम-किसान',
        gu: 'પીએમ-કિસાન'
      },
      description: {
        en: 'Direct income support of ₹6,000/year to farmer families',
        hi: 'किसान परिवारों को ₹6,000/वर्ष की प्रत्यक्ष आय सहायता',
        gu: 'ખેડૂત પરિવારોને ₹6,000/વર્ષની સીધી આવક સહાય'
      },
      icon: IndianRupee,
      color: 'green',
      category: {
        en: 'Income Support',
        hi: 'आय सहायता',
        gu: 'આવક સહાય'
      },
      benefits: ['₹6,000/year', '3 Installments', 'Direct Transfer'],
      eligibility: {
        en: 'All farmer families',
        hi: 'सभी किसान परिवार',
        gu: 'બધા ખેડૂત પરિવારો'
      },
      link: 'https://pmkisan.gov.in/'
    },
    {
      id: 2,
      name: {
        en: 'Fasal Bima Yojana',
        hi: 'फसल बीमा योजना',
        gu: 'ફસલ વીમા યોજના'
      },
      description: {
        en: 'Crop insurance for financial protection against crop loss',
        hi: 'फसल नुकसान के खिलाफ वित्तीय सुरक्षा के लिए फसल बीमा',
        gu: 'પાક નુકસાન સામે નાણાકીય સંરક્ષણ માટે પાક વીમો'
      },
      icon: Shield,
      color: 'blue',
      category: {
        en: 'Insurance',
        hi: 'बीमा',
        gu: 'વીમો'
      },
      benefits: ['Crop Loss Coverage', 'Low Premium', 'Quick Settlement'],
      eligibility: {
        en: 'Farmers with land records',
        hi: 'भूमि रिकॉर्ड वाले किसान',
        gu: 'જમીન રેકોર્ડ ધરાવતા ખેડૂતો'
      },
      link: 'https://pmfby.gov.in/'
    },
    {
      id: 3,
      name: {
        en: 'Soil Health Card',
        hi: 'मृदा स्वास्थ्य कार्ड',
        gu: 'માટી આરોગ્ય કાર્ડ'
      },
      description: {
        en: 'Free soil testing and nutrient recommendations for your farm',
        hi: 'आपके खेत के लिए मुफ्त मिट्टी परीक्षण और पोषक तत्व सिफारिशें',
        gu: 'તમારા ખેતર માટે મફત માટી પરીક્ષણ અને પોષક તત્વો ભલામણો'
      },
      icon: Sprout,
      color: 'emerald',
      category: {
        en: 'Soil Health',
        hi: 'मृदा स्वास्थ्य',
        gu: 'માટી આરોગ્ય'
      },
      benefits: ['Free Testing', 'Nutrient Analysis', 'Fertilizer Recommendations'],
      eligibility: {
        en: 'All farmers',
        hi: 'सभी किसान',
        gu: 'બધા ખેડૂતો'
      },
      link: 'https://soilhealth.dac.gov.in/'
    },
    {
      id: 4,
      name: {
        en: 'Micro Irrigation',
        hi: 'सूक्ष्म सिंचाई',
        gu: 'સૂક્ષ્મ સિંચાઈ'
      },
      description: {
        en: 'Subsidy on drip & sprinkler irrigation for water conservation',
        hi: 'जल संरक्षण के लिए ड्रिप और स्प्रिंकलर सिंचाई पर सब्सिडी',
        gu: 'પાણી બચાવવા માટે ડ્રીપ અને સ્પ્રિંકલર સિંચાઈ પર સબસિડી'
      },
      icon: Droplets,
      color: 'cyan',
      category: {
        en: 'Water Management',
        hi: 'जल प्रबंधन',
        gu: 'પાણી વ્યવસ્થાપન'
      },
      benefits: ['Up to 55% Subsidy', 'Water Saving 40-60%', 'Increased Yield'],
      eligibility: {
        en: 'Farmers with source of irrigation',
        hi: 'सिंचाई के स्रोत वाले किसान',
        gu: 'સિંચાઈના સ્રોત ધરાવતા ખેડૂતો'
      },
      link: 'https://pmksy.gov.in/'
    },
    {
      id: 5,
      name: {
        en: 'KCC - Kisan Credit Card',
        hi: 'केसीसी - किसान क्रेडिट कार्ड',
        gu: 'KCC - કિસાન ક્રેડિટ કાર્ડ'
      },
      description: {
        en: 'Easy access to credit at subsidized interest rates',
        hi: 'रियायती ब्याज दरों पर ऋण तक आसान पहुंच',
        gu: 'સબસિડીવાળા વ્યાજ દરે લોનની સરળ ઍક્સેસ'
      },
      icon: TrendingUp,
      color: 'purple',
      category: {
        en: 'Credit',
        hi: 'ऋण',
        gu: 'લોન'
      },
      benefits: ['Low Interest', 'Flexible Repayment', 'Insurance Coverage'],
      eligibility: {
        en: 'Farmers and tenant farmers',
        hi: 'किसान और पट्टेदार किसान',
        gu: 'ખેડૂતો અને ભાડૂત ખેડૂતો'
      },
      link: 'https://www.india.gov.in/spotlight/kisan-credit-card-kcc-scheme'
    },
    {
      id: 6,
      name: {
        en: 'Organic Farming Scheme',
        hi: 'जैविक खेती योजना',
        gu: 'જૈવિક ખેતી યોજના'
      },
      description: {
        en: 'Support for organic farming and certification',
        hi: 'जैविक खेती और प्रमाणन के लिए समर्थन',
        gu: 'જૈવિક ખેતી અને પ્રમાણપત્ર માટે સહાય'
      },
      icon: Leaf,
      color: 'green',
      category: {
        en: 'Organic',
        hi: 'जैविक',
        gu: 'જૈવિક'
      },
      benefits: ['Certification Support', 'Premium Prices', 'Market Linkage'],
      eligibility: {
        en: 'Farmers practicing organic methods',
        hi: 'जैविक तरीकों का अभ्यास करने वाले किसान',
        gu: 'જૈવિક પદ્ધતિઓ અપનાવતા ખેડૂતો'
      },
      link: 'https://pgsindia-ncof.gov.in/'
    },
    {
      id: 7,
      name: {
        en: 'Farm Mechanization',
        hi: 'कृषि यंत्रीकरण',
        gu: 'ખેતી યાંત્રિકીકરણ'
      },
      description: {
        en: 'Subsidy on farm equipment and machinery',
        hi: 'कृषि उपकरण और मशीनरी पर सब्सिडी',
        gu: 'ખેતી સાધનો અને મશીનરી પર સબસિડી'
      },
      icon: Tractor,
      color: 'orange',
      category: {
        en: 'Equipment',
        hi: 'उपकरण',
        gu: 'સાધનો'
      },
      benefits: ['Up to 50% Subsidy', 'Custom Hiring Centers', 'Technology Adoption'],
      eligibility: {
        en: 'Individual farmers & FPOs',
        hi: 'व्यक्तिगत किसान और FPO',
        gu: 'વ્યક્તિગત ખેડૂતો અને FPO'
      },
      link: 'https://agrimachinery.nic.in/'
    },
    {
      id: 8,
      name: {
        en: 'FPO Formation Support',
        hi: 'FPO गठन समर्थन',
        gu: 'FPO રચના સહાય'
      },
      description: {
        en: 'Financial assistance for forming Farmer Producer Organizations',
        hi: 'किसान उत्पादक संगठन बनाने के लिए वित्तीय सहायता',
        gu: 'ખેડૂત ઉત્પાદક સંસ્થાઓ બનાવવા માટે નાણાકીય સહાય'
      },
      icon: Users,
      color: 'indigo',
      category: {
        en: 'Organization',
        hi: 'संगठन',
        gu: 'સંસ્થા'
      },
      benefits: ['₹18 Lakh Grant', 'Training Support', 'Market Access'],
      eligibility: {
        en: 'Groups of 300+ farmers',
        hi: '300+ किसानों के समूह',
        gu: '300+ ખેડૂતોના જૂથો'
      },
      link: 'https://www.nafed.india.gov.in/'
    }
  ];

  const displaySchemes = compact ? schemes.slice(0, 4) : schemes;
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [agentPrompt, setAgentPrompt] = useState<string | undefined>(undefined);

  const colorStops: Record<string, { from: string; to: string; buttonFrom: string; buttonTo: string }> = {
    green: { from: '#16a34a', to: '#059669', buttonFrom: '#16a34a', buttonTo: '#059669' },
    blue: { from: '#3b82f6', to: '#2563eb', buttonFrom: '#3b82f6', buttonTo: '#2563eb' },
    emerald: { from: '#10b981', to: '#059669', buttonFrom: '#10b981', buttonTo: '#059669' },
    cyan: { from: '#06b6d4', to: '#0891b2', buttonFrom: '#06b6d4', buttonTo: '#0891b2' },
    purple: { from: '#8b5cf6', to: '#7c3aed', buttonFrom: '#8b5cf6', buttonTo: '#7c3aed' },
    orange: { from: '#f97316', to: '#fb923c', buttonFrom: '#f97316', buttonTo: '#fb923c' },
    indigo: { from: '#6366f1', to: '#4f46e5', buttonFrom: '#6366f1', buttonTo: '#4f46e5' },
    // fallback
    default: { from: '#6b7280', to: '#4b5563', buttonFrom: '#6b7280', buttonTo: '#4b5563' },
  };

  return (
    <div className="space-y-6">
      {!compact && (
        <div className="text-center mb-8">
          <h2 className="text-green-900 mb-2">
            {language === 'hi' ? 'सरकारी योजनाएं' : language === 'gu' ? 'સરકારી યોજનાઓ' : 'Government Schemes for Farmers'}
          </h2>
          <p className="text-gray-600">
            {language === 'hi' 
              ? 'किसानों की मदद के लिए विभिन्न सरकारी योजनाओं का लाभ उठाएं'
              : language === 'gu' 
              ? 'ખેડૂતોની મદદ માટે વિવિધ સરકારી યોજનાઓનો લાભ લો'
              : 'Explore various government schemes designed to support farmers'
            }
          </p>
        </div>
      )}

      <div className={`grid ${compact ? 'sm:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
        {displaySchemes.map((scheme) => (
          <Card 
            key={scheme.id} 
            className="group hover:shadow-2xl dark:hover:shadow-green-900/50 transition-all duration-300 border-2 border-gray-100 dark:border-green-700/50 hover:border-green-400 dark:hover:border-green-500 overflow-hidden bg-white dark:bg-slate-800"
          >
            {/* Header with gradient */}
            <div
              style={{
                background: `linear-gradient(90deg, ${colorStops[scheme.color as string]?.from || colorStops.default.from}, ${colorStops[scheme.color as string]?.to || colorStops.default.to})`,
              }}
              className="p-4 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-grid-white/10 mix-blend-overlay" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-2">
                  <div className={`bg-white/30 backdrop-blur-md p-3 rounded-lg hover:bg-white/40 transition-colors`}>
                    <scheme.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-white/30 text-white border-none backdrop-blur-md">
                    {scheme.category[language]}
                  </Badge>
                </div>
                <h3 className="text-white mb-1 font-bold text-lg">{scheme.name[language]}</h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <p className="text-gray-700 dark:text-gray-200 mb-4 font-medium leading-relaxed">
                {scheme.description[language]}
              </p>

              {/* Benefits */}
              <div className="space-y-2 mb-4">
                {scheme.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Eligibility */}
              <div className="mb-4 p-3 bg-gradient-to-r from-gray-50 to-green-50 dark:from-slate-700 dark:to-green-900/30 rounded-lg border border-green-200 dark:border-green-700/50">
                <div className="text-sm text-gray-600 dark:text-green-300 mb-1 font-semibold">
                  {language === 'hi' ? '✓ पात्रता:' : language === 'gu' ? '✓ લાયકાત:' : '✓ Eligibility:'}
                </div>
                <div className="text-sm text-gray-800 dark:text-gray-200 font-medium">{scheme.eligibility[language]}</div>
              </div>

              {/* Action Button */}
              <div className="space-y-3">
                <button
                  onClick={() => window.open(scheme.link, '_blank')}
                  className="w-full text-white group-hover:scale-105 transition-transform shadow-lg py-2 rounded-lg flex items-center justify-center gap-2"
                  style={{
                    background: `linear-gradient(90deg, ${colorStops[scheme.color as string]?.buttonFrom || colorStops.default.buttonFrom}, ${colorStops[scheme.color as string]?.buttonTo || colorStops.default.buttonTo})`,
                  }}
                >
                  {language === 'hi' ? '→ अभी आवेदन करें' : language === 'gu' ? '→ હમણાં અરજી કરો' : '→ Apply Now'}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </button>

                <Button
                  variant="ghost"
                  className="w-full border border-green-200 text-green-700 hover:bg-green-50"
                  onClick={() => {
                    setAgentPrompt(`${language === 'hi' ? 'धारियो को कॉल करें और किसानों के साथ कनेक्ट करें: ' : language === 'gu' ? 'ધારીઓને કૉલ કરો અને ખેડૂતો સાથે કનેક્ટ કરો: ' : 'Call Dhariyo and connect with farmer-side: '} ${scheme.name[language]}`);
                    setIsAgentOpen(true);
                  }}
                >
                  {language === 'hi' ? 'धारियो को कॉल करें' : language === 'gu' ? 'ધારીઓને કૉલ કરો' : 'Call Dhariyo'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* AI Agent + floating button */}
      <AIAgent isOpen={isAgentOpen} onClose={() => { setIsAgentOpen(false); setAgentPrompt(undefined); }} initialPrompt={agentPrompt} />
      <AIAgentButton onClick={() => { setIsAgentOpen(true); setAgentPrompt(undefined); }} />

      {compact && onViewAll && (
        <div className="text-center mt-6">
          <Button 
            onClick={onViewAll}
            variant="outline"
            className="border-green-500 text-green-600 hover:bg-green-50"
          >
            {language === 'hi' ? 'सभी योजनाएं देखें' : language === 'gu' ? 'બધી યોજનાઓ જુઓ' : 'View All Schemes'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
