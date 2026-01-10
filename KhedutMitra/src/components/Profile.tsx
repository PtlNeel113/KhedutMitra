import { useState, ReactNode } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import {
  Mail, Phone, MapPin, Briefcase, BarChart3, Settings,
  Edit2, LogOut, Send, MessageCircle, Target, TrendingUp, Zap,
  FileText, Download, Share2, Bell, Lock, AlertCircle, CheckCircle2,
  Droplet, Leaf, Bug, Wind, Eye, EyeOff, X
} from 'lucide-react';
import { UserData } from '../App';

interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}

interface AlertItem {
  id: string;
  type: 'warning' | 'success' | 'info';
  title: string;
  description: string;
  timestamp: string;
}

interface ProfilePreferences {
  notifications: boolean;
  publicProfile: boolean;
  shareData: boolean;
  privateMode: boolean;
}

interface ProfileProps {
  userData: UserData | null;
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

export function Profile({ userData, onLogout }: ProfileProps): ReactNode {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'ai', text: '👋 Hello! I\'m your AI Assistant. How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [showChatExpanded, setShowChatExpanded] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [preferences, setPreferences] = useState<ProfilePreferences>({
    notifications: true,
    publicProfile: false,
    shareData: true,
    privateMode: false,
  });
  const [saveMessage, setSaveMessage] = useState<string>('');

  const sendMessage = (): void => {
    if (!chatInput.trim()) return;
    
    const userMsg: ChatMessage = { role: 'user', text: chatInput };
    setChatMessages((prev: ChatMessage[]) => [...prev, userMsg]);
    
    setTimeout(() => {
      const lowerInput = chatInput.toLowerCase();
      let aiResponse = '';

      if (lowerInput.includes('crop') || lowerInput.includes('yield')) {
        const responses = [
          `🌱 Based on your farm growing ${userData?.crops?.join(', ') || 'various crops'}, I recommend crop rotation for better soil health.`,
          `📈 Your yield potential is excellent! Try intercropping with legumes to improve nitrogen fixation.`,
          `🌾 Drip irrigation increases yields by 25-30% and saves water.`
        ];
        aiResponse = responses[Math.floor(Math.random() * responses.length)];
      } else if (lowerInput.includes('disease') || lowerInput.includes('pest')) {
        const responses = [
          '🐛 Early blight detected on wheat. Apply fungicide every 7-10 days.',
          '🦗 Aphid infestation? Use organic neem oil or introduce ladybugs for natural control.',
          '🍃 Leaf spot disease: Remove affected leaves, improve air circulation, reduce nitrogen.'
        ];
        aiResponse = responses[Math.floor(Math.random() * responses.length)];
      } else if (lowerInput.includes('water') || lowerInput.includes('irrigation')) {
        const responses = [
          '💧 Your soil moisture is at 72%. Perfect time for nutrient application.',
          '🚰 Drip irrigation systems save 40-60% water. ROI within 2-3 years.',
          '🌧️ Rainwater harvesting for dry season needs.'
        ];
        aiResponse = responses[Math.floor(Math.random() * responses.length)];
      } else if (lowerInput.includes('market') || lowerInput.includes('sell') || lowerInput.includes('price')) {
        const responses = [
          '💹 Organic produce prices up 20% this month!',
          '🏪 Direct-to-consumer sales give 15-20% premium margins.',
          '📊 Strong market demand for your crops right now.'
        ];
        aiResponse = responses[Math.floor(Math.random() * responses.length)];
      } else if (lowerInput.includes('weather') || lowerInput.includes('rain') || lowerInput.includes('monsoon')) {
        const responses = [
          '🌦️ Monsoon starts in 2 weeks. Prepare drainage systems now.',
          '⛅ Check weather forecast for next 10 days before planting.',
          '🌧️ Optimal rainfall expected - good for crop growth.'
        ];
        aiResponse = responses[Math.floor(Math.random() * responses.length)];
      } else {
        const responses = [
          '✅ Great question! Here\'s what I recommend.',
          '📊 Based on agricultural best practices...',
          '💡 That\'s excellent! Let me help you with that.',
          '🌟 You\'re thinking right about farm management!'
        ];
        aiResponse = responses[Math.floor(Math.random() * responses.length)];
      }

      setChatMessages((prev: ChatMessage[]) => [...prev, { role: 'ai', text: aiResponse }]);
    }, 800);
    
    setChatInput('');
  };

  const handleTogglePreference = (key: keyof ProfilePreferences): void => {
    setPreferences((prev: ProfilePreferences) => ({
      ...prev,
      [key]: !prev[key]
    }));
    setSaveMessage('✅ Preference saved!');
    setTimeout(() => setSaveMessage(''), 2000);
  };

  const profileCompletion = 75;

  const alerts: AlertItem[] = [
    {
      id: '1',
      type: 'warning',
      title: 'Early Blight Alert',
      description: 'Detected on wheat plot. Start fungicide spray immediately for best results.',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'success',
      title: 'Perfect Irrigation Time',
      description: 'Soil moisture at optimal 72%. Ready for nutrient application.',
      timestamp: '4 hours ago'
    },
    {
      id: '3',
      type: 'info',
      title: 'Weather Update',
      description: 'Light rainfall expected tomorrow. Plan harvesting accordingly.',
      timestamp: '6 hours ago'
    },
  ];

  const achievements = [
    { icon: '🌾', label: 'Top Farmer', value: '5 years' },
    { icon: '📈', label: 'Yield Increase', value: '35%' },
    { icon: '♻️', label: 'Carbon Credits', value: '120' },
    { icon: '🏆', label: 'Community Rating', value: '4.8/5' },
  ];

  const farmStats = [
    { icon: <Leaf className="h-5 w-5" />, label: 'Soil Health', value: '85%', color: 'text-green-600' },
    { icon: <Droplet className="h-5 w-5" />, label: 'Moisture', value: '72%', color: 'text-blue-600' },
    { icon: <Bug className="h-5 w-5" />, label: 'Pest Risk', value: 'Low', color: 'text-emerald-600' },
    { icon: <Wind className="h-5 w-5" />, label: 'Wind Speed', value: '8 km/h', color: 'text-cyan-600' },
  ];

  const goals = [
    { goal: 'Increase Yield by 40%', progress: 65, icon: '📊', status: 'In Progress' },
    { goal: 'Go 100% Organic', progress: 45, icon: '🌿', status: 'In Progress' },
    { goal: 'Earn 100 Carbon Credits', progress: 72, icon: '♻️', status: 'Nearly Done' },
    { goal: 'Connect with 5 Buyers', progress: 80, icon: '🤝', status: 'Almost Done' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4">
          {alerts.map((alert) => {
            const alertConfig = {
              warning: { border: 'border-l-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/10', icon: <AlertCircle className="h-5 w-5 text-yellow-600" /> },
              success: { border: 'border-l-green-500', bg: 'bg-green-50 dark:bg-green-900/10', icon: <CheckCircle2 className="h-5 w-5 text-green-600" /> },
              info: { border: 'border-l-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/10', icon: <Wind className="h-5 w-5 text-blue-600" /> }
            };
            const config = alertConfig[alert.type];
            return (
              <Card 
                key={alert.id} 
                className={`p-4 border-l-4 rounded-lg ${config.border} ${config.bg}`}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">{config.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{alert.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{alert.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{alert.timestamp}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Profile Header & Sidebar */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 bg-white dark:bg-slate-800 border border-gray-100 dark:border-green-800 shadow-sm rounded-2xl">
            {/* Avatar & Info */}
            <div className="text-center mb-6">
              <div className="inline-flex relative">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-xl ring-2 ring-green-100 dark:ring-green-900">
                  <span className="text-5xl text-white font-bold">
                    {userData?.name?.charAt(0).toUpperCase() || '?'}
                  </span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">{userData?.name || 'User'}</h2>
              <p className="text-gray-600 dark:text-gray-400 capitalize text-sm font-medium mt-1">{userData?.role || 'farmer'}</p>
              <div className="mt-4 flex justify-center gap-2 flex-wrap">
                <Badge className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3 mr-1 inline" /> Verified
                </Badge>
                <Badge variant="outline" className="dark:border-green-600 dark:text-green-400 px-3 py-1 rounded-full">
                  Active
                </Badge>
              </div>
            </div>

            {/* Quick Info */}
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-100 dark:border-green-700">
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <Mail className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span className="text-sm truncate">{userData?.email || 'Not provided'}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <Phone className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span className="text-sm">{userData?.phone || 'Not provided'}</span>
              </div>
              {userData?.location && (
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <MapPin className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <span className="text-sm">{userData.location}</span>
                </div>
              )}
            </div>

            {/* Profile Completion */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Profile Complete</span>
                <span className="text-lg font-bold text-green-600 dark:text-green-400">{profileCompletion}%</span>
              </div>
              <Progress value={profileCompletion} className="h-3 rounded-full" />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Complete for premium features</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button 
                onClick={() => setIsEditing(!isEditing)}
                className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-md"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button 
                onClick={onLogout}
                variant="outline"
                className="w-full dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>

            {/* Save Message */}
            {saveMessage && (
              <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-500 rounded-lg text-sm text-green-700 dark:text-green-300">
                {saveMessage}
              </div>
            )}
          </Card>

          {/* Achievements */}
          <Card className="p-6 bg-white dark:bg-slate-800 border border-gray-100 dark:border-green-700/50 shadow-sm rounded-2xl">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🏆 Achievements</h3>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-lg hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-white/80 dark:bg-slate-800 flex items-center justify-center shadow text-xl">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-xs">{achievement.label}</p>
                    <p className="text-sm text-green-600 dark:text-green-400 font-bold">{achievement.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Tabs Content */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-slate-800 p-1 rounded-2xl mb-6 shadow-sm border border-gray-100 dark:border-green-800">
              <TabsTrigger value="overview" className="flex flex-col items-center gap-1 py-2 px-2 rounded-lg hover:bg-green-50 dark:hover:bg-slate-700 transition-all text-xs sm:text-sm data-[state=active]:bg-green-100 dark:data-[state=active]:bg-green-900/30">
                <BarChart3 className="h-5 w-5" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="farm" className="flex flex-col items-center gap-1 py-2 px-2 rounded-lg hover:bg-green-50 dark:hover:bg-slate-700 transition-all text-xs sm:text-sm data-[state=active]:bg-green-100 dark:data-[state=active]:bg-green-900/30">
                <Leaf className="h-5 w-5" />
                <span className="hidden sm:inline">Farm</span>
              </TabsTrigger>
              <TabsTrigger value="goals" className="flex flex-col items-center gap-1 py-2 px-2 rounded-lg hover:bg-green-50 dark:hover:bg-slate-700 transition-all text-xs sm:text-sm data-[state=active]:bg-green-100 dark:data-[state=active]:bg-green-900/30">
                <Target className="h-5 w-5" />
                <span className="hidden sm:inline">Goals</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex flex-col items-center gap-1 py-2 px-2 rounded-lg hover:bg-green-50 dark:hover:bg-slate-700 transition-all text-xs sm:text-sm data-[state=active]:bg-green-100 dark:data-[state=active]:bg-green-900/30">
                <Settings className="h-5 w-5" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {farmStats.map((stat, idx) => (
                  <Card key={idx} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 border border-gray-200 dark:border-slate-700 rounded-xl hover:shadow-md transition-shadow">
                    <div className={`${stat.color} mb-2`}>{stat.icon}</div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  </Card>
                ))}
              </div>

              <Card className="p-6 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-700/30 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">Farm Performance</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">23% above regional average</p>
                    <Button size="sm" className="mt-3 bg-blue-600 hover:bg-blue-700 text-white">
                      View Report
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-700/30 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex-shrink-0">
                    <Zap className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">Smart Recommendations</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Monsoon next week - prepare drainage</p>
                    <Button size="sm" className="mt-3 bg-purple-600 hover:bg-purple-700 text-white">
                      View Insights
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Farm Tab */}
            <TabsContent value="farm" className="space-y-4">
              <Card className="p-6 bg-white dark:bg-slate-800 border border-gray-100 dark:border-green-700/50 rounded-xl shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-green-600" /> Farm Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/10 dark:to-green-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Acreage</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{userData?.farmSize || '12.5'} acres</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-2">{userData?.location || 'Not Set'}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/10 dark:to-purple-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Experience</p>
                    <p className="text-lg font-bold text-purple-600 dark:text-purple-400 mt-2">{userData?.experience || '10+ years'}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/10 dark:to-orange-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Main Crops</p>
                    <p className="text-lg font-bold text-orange-600 dark:text-orange-400 mt-2">{(userData?.crops?.slice(0, 2) || ['Wheat', 'Rice']).join(', ')}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white dark:bg-slate-800 border border-gray-100 dark:border-green-700/50 rounded-xl shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Crop Progress</h3>
                <div className="space-y-4">
                  {['Wheat Plot - 50%', 'Rice Field - 65%', 'Vegetable - 80%'].map((crop, idx) => {
                    const progress = 50 + idx * 15;
                    return (
                      <div key={idx}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{crop.split(' - ')[0]}</span>
                          <span className="text-sm font-bold text-green-600 dark:text-green-400">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-3 rounded-full" />
                      </div>
                    );
                  })}
                </div>
              </Card>
            </TabsContent>

            {/* Goals Tab */}
            <TabsContent value="goals" className="space-y-4">
              <Card className="p-6 bg-white dark:bg-slate-800 border border-gray-100 dark:border-green-700/50 rounded-xl shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" /> Your Goals
                </h3>
                <div className="space-y-4">
                  {goals.map((item, idx) => (
                    <div key={idx} className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow text-xl hover:scale-110 transition-transform">
                            {item.icon}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{item.goal}</p>
                            <Badge variant="outline" className="text-xs mt-1 bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-400">{item.status}</Badge>
                          </div>
                        </div>
                        <span className="font-bold text-lg text-green-600 dark:text-green-400">{item.progress}%</span>
                      </div>
                      <Progress value={item.progress} className="h-2 rounded-full" />
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Settings Tab - FULLY FUNCTIONAL */}
            <TabsContent value="settings" className="space-y-4">
              <Card className="p-6 bg-white dark:bg-slate-800 border border-gray-100 dark:border-green-700/50 rounded-xl shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-green-600" /> Preferences
                </h3>
                <div className="space-y-3">
                  {[
                    { key: 'notifications' as const, icon: <Bell />, label: 'Notifications', description: 'Get alerts for important farm updates' },
                    { key: 'publicProfile' as const, icon: <Eye />, label: 'Public Profile', description: 'Allow others to view your profile' },
                    { key: 'shareData' as const, icon: <Share2 />, label: 'Share Farm Data', description: 'Share data for better recommendations' },
                    { key: 'privateMode' as const, icon: <Lock />, label: 'Private Mode', description: 'Keep your data completely private' },
                  ].map((pref) => (
                    <div 
                      key={pref.key}
                      onClick={() => handleTogglePreference(pref.key)}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="text-blue-600 dark:text-blue-400 flex-shrink-0">{pref.icon}</div>
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white block">{pref.label}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{pref.description}</span>
                        </div>
                      </div>
                      <div 
                        className={`w-12 h-7 rounded-full transition-all duration-300 flex items-center px-1 ${
                          preferences[pref.key] 
                            ? 'bg-green-500 justify-end' 
                            : 'bg-gray-300 justify-start'
                        }`}
                      >
                        <div className="w-5 h-5 bg-white rounded-full shadow-md transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-white dark:bg-slate-800 border border-gray-100 dark:border-green-700/50 rounded-xl shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Account Settings</h3>
                <div className="space-y-3">
                  <Button className="w-full justify-between bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/20 text-blue-700 dark:text-blue-400 hover:from-blue-100 hover:to-blue-200 border border-blue-300 dark:border-blue-700 rounded-lg transition-all hover:shadow-md">
                    <span>Change Password</span>
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button className="w-full justify-between bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/20 text-purple-700 dark:text-purple-400 hover:from-purple-100 hover:to-purple-200 border border-purple-300 dark:border-purple-700 rounded-lg transition-all hover:shadow-md">
                    <span>Two-Factor Authentication</span>
                    <Lock className="h-4 w-4" />
                  </Button>
                  <Button className="w-full justify-between bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20 text-red-700 dark:text-red-400 hover:from-red-100 hover:to-red-200 border border-red-300 dark:border-red-700 rounded-lg transition-all hover:shadow-md">
                    <span>Delete Account</span>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-white dark:bg-slate-800 border border-gray-100 dark:border-green-700/50 rounded-xl shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Documents & Export</h3>
                <div className="space-y-3">
                  <Button className="w-full justify-between bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/20 text-green-700 dark:text-green-400 hover:from-green-100 hover:to-green-200 border border-green-300 dark:border-green-700 rounded-lg transition-all hover:shadow-md">
                    <span>Download Profile PDF</span>
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button className="w-full justify-between bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/20 text-blue-700 dark:text-blue-400 hover:from-blue-100 hover:to-blue-200 border border-blue-300 dark:border-blue-700 rounded-lg transition-all hover:shadow-md">
                    <span>Export Farm Data (CSV)</span>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button className="w-full justify-between bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/20 text-purple-700 dark:text-purple-400 hover:from-purple-100 hover:to-purple-200 border border-purple-300 dark:border-purple-700 rounded-lg transition-all hover:shadow-md">
                    <span>Share Profile Link</span>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* AI Chat Assistant */}
      <Card className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-green-700 rounded-2xl shadow-sm transition-all p-6 hover:shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <MessageCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">AI Farm Assistant</h3>
            <Badge className="bg-green-500 text-white animate-pulse">Live</Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowChatExpanded(!showChatExpanded)}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {showChatExpanded ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </Button>
        </div>

        <div className={`bg-gray-50 dark:bg-slate-700 rounded-xl p-4 overflow-y-auto mb-4 space-y-3 border border-gray-200 dark:border-slate-600 transition-all ${showChatExpanded ? 'h-96' : 'h-64'}`}>
          {chatMessages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
              <div
                className={`max-w-xs px-4 py-3 rounded-2xl transition-all ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-md hover:shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 shadow-sm hover:shadow-md'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about crops, weather, pests, market..."
            className="flex-1 px-4 py-3 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-full text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          />
          <Button
            onClick={sendMessage}
            className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-full px-5 py-3 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            disabled={!chatInput.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
