import { UserRole, ActivePage, UserData } from '../App';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { 
  Sprout, Leaf, Shield, CreditCard, TrendingUp, 
  Award, Users, BarChart3, ArrowRight, DollarSign,
  Cloud, Droplets, ThermometerSun, MapPin, Landmark
} from 'lucide-react';
import { Progress } from './ui/progress';
import bgImage from 'figma:asset/5f4b0e43e309076be457acc424d9520ef424fa22.png';
import { useLanguage } from '../contexts/LanguageContext';
import { GovernmentSchemes } from './GovernmentSchemes';

interface DashboardProps {
  userRole: UserRole;
  userData: UserData | null;
  onNavigate: (page: ActivePage) => void;
}

export function Dashboard({ userRole, userData, onNavigate }: DashboardProps) {
  const { t } = useLanguage();

  const quickActions = [
    { icon: Sprout, label: t('nav.cropAdvisory'), page: 'crop-advisory' as ActivePage, color: 'green' },
    { icon: Leaf, label: 'Carbon Credits', page: 'carbon-marketplace' as ActivePage, color: 'emerald' },
    { icon: Shield, label: 'Insurance', page: 'insurance' as ActivePage, color: 'blue' },
    { icon: CreditCard, label: t('nav.farmCredit'), page: 'farm-credit' as ActivePage, color: 'purple' },
    { icon: TrendingUp, label: 'Buy-Back', page: 'buyback' as ActivePage, color: 'orange' },
    { icon: Award, label: 'Traceability', page: 'traceability' as ActivePage, color: 'cyan' },
  ];

  const farmerStats = [
    { label: t('stats.totalAcreage'), value: userData?.farmSize || '12.5', unit: t('stats.acres'), icon: Sprout },
    { label: t('stats.carbonCredits'), value: '₹45,000', unit: t('stats.earned'), icon: Leaf },
    { label: t('stats.creditAvailable'), value: '₹2.5L', unit: t('stats.approved'), icon: CreditCard },
    { label: t('stats.insuranceActive'), value: '3', unit: t('stats.policies'), icon: Shield },
  ];

  const weatherData = [
    { label: t('weather.temperature'), value: '28°C', icon: ThermometerSun, color: 'orange' },
    { label: t('weather.humidity'), value: '65%', icon: Droplets, color: 'blue' },
    { label: t('weather.rainfall'), value: '12mm', icon: Cloud, color: 'gray' },
  ];

  // Get display name based on user data or role
  const getDisplayName = () => {
    if (userData?.name) {
      return userData.name;
    }
    // Fallback names if no user data (shouldn't happen in normal flow)
    return userRole === 'farmer' ? 'Farmer' : 
           userRole === 'fpo' ? 'Organization' : 
           userRole === 'buyer' ? 'Buyer' : 'Investor';
  };

  const getEntityType = () => {
    if (userRole === 'farmer') return t('dashboard.farm');
    if (userRole === 'fpo') return t('dashboard.organization');
    return t('dashboard.account');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-green-900 dark:text-green-300 mb-2">
          {t('dashboard.welcome')}, {getDisplayName()}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('dashboard.happeningToday')} {getEntityType()} {t('dashboard.today')}
        </p>
      </div>

      {/* Quick Stats */}
      {userRole === 'farmer' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {farmerStats.map((stat, index) => (
            <Card key={index} className="p-6 border-green-100 dark:border-green-700 bg-white dark:bg-slate-800 hover:shadow-lg dark:hover:shadow-green-900/30 transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-gradient-to-br from-green-100 dark:from-green-600 to-emerald-100 dark:to-emerald-600 p-3 rounded-lg">
                  <stat.icon className="h-5 w-5 text-green-600 dark:text-white" />
                </div>
              </div>
              <div className="text-green-900 dark:text-green-300 mb-1 font-semibold">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              <div className="text-gray-500 dark:text-gray-500 mt-1">{stat.unit}</div>
            </Card>
          ))}
        </div>
      )}

      {/* Government Schemes Section */}
      <Card className="p-6 border-green-100 dark:border-green-700 mb-8 bg-gradient-to-r from-amber-50 dark:from-slate-800 to-orange-50 dark:to-slate-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 p-3 rounded-lg shadow-lg">
              <Landmark className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-green-900 dark:text-green-300 mb-1">{t('dashboard.governmentSchemes')}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {userData?.location && `Available in ${userData.location}`}
              </p>
            </div>
          </div>
          <Button
            onClick={() => onNavigate('schemes')}
            variant="outline"
            className="border-orange-500 text-orange-600 hover:bg-orange-50"
          >
            {t('dashboard.exploreSchemes')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <GovernmentSchemes compact={true} onViewAll={() => onNavigate('schemes')} />
      </Card>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card className="p-6 border-green-100">
            <h2 className="text-green-900 mb-4">{t('dashboard.quickActions')}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => onNavigate(action.page)}
                  className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-md transition-all text-left"
                >
                  <div className={`bg-${action.color}-100 p-3 rounded-lg`}>
                    <action.icon className={`h-5 w-5 text-${action.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-900">{action.label}</div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </button>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6 border-green-100">
            <h2 className="text-green-900 mb-4">{t('dashboard.recentActivity')}</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Leaf className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="text-gray-900 mb-1">Carbon Credit Verified</div>
                  <div className="text-gray-600">₹15,000 credited to your account</div>
                  <div className="text-gray-500 mt-1">2 hours ago</div>
                </div>
              </div>
              <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-gray-900 mb-1">Insurance Claim Approved</div>
                  <div className="text-gray-600">₹25,000 claim processed successfully</div>
                  <div className="text-gray-500 mt-1">1 day ago</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <CreditCard className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="text-gray-900 mb-1">Loan Disbursed</div>
                  <div className="text-gray-600">₹1,00,000 transferred to your account</div>
                  <div className="text-gray-500 mt-1">3 days ago</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Weather Widget */}
          <Card className="p-6 border-green-100">
            <h3 className="text-green-900 mb-4">{t('dashboard.todayWeather')}</h3>
            {userData?.location && (
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <MapPin className="h-4 w-4" />
                {userData.location}
              </div>
            )}
            <div className="space-y-4">
              {weatherData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`bg-${item.color}-100 p-2 rounded-lg`}>
                      <item.icon className={`h-4 w-4 text-${item.color}-600`} />
                    </div>
                    <span className="text-gray-700">{item.label}</span>
                  </div>
                  <span className="text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Crop Health */}
          <Card className="p-6 border-green-100">
            <h3 className="text-green-900 mb-4">{t('dashboard.cropHealth')}</h3>
            <div className="text-center mb-4">
              <div className="text-green-900 mb-2">85/100</div>
              <div className="text-gray-600">{t('dashboard.excellentCondition')}</div>
            </div>
            <Progress value={85} className="mb-4" />
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onNavigate('crop-advisory')}
            >
              {t('dashboard.viewDetailedReport')}
            </Button>
          </Card>

          {/* Earnings Summary */}
          <Card className="p-6 border-green-100">
            <h3 className="text-green-900 mb-4">{t('dashboard.thisMonthEarnings')}</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t('dashboard.produceSales')}</span>
                <span className="text-gray-900">₹1,25,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t('dashboard.carbonCredits')}</span>
                <span className="text-gray-900">₹45,000</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <span className="text-green-900">{t('dashboard.total')}</span>
                <span className="text-green-900">₹1,70,000</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Notifications Banner */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-start gap-4">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <Sprout className="h-6 w-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-green-900 mb-2">{t('dashboard.newAdvisory')}</h3>
            <p className="text-gray-700 mb-3">
              Based on satellite analysis, we recommend adjusting irrigation for Plot #3. Temperature expected to rise next week.
            </p>
            <Button onClick={() => onNavigate('crop-advisory')}>
              {t('dashboard.viewAdvisory')} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}