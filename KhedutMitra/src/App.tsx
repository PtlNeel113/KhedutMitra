import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Dashboard } from './components/Dashboard';
import { CropAdvisory } from './components/CropAdvisory';
import { InputMarketplace } from './components/InputMarketplace';
import { CarbonMarketplace } from './components/CarbonMarketplace';
import { Traceability } from './components/Traceability';
import { Insurance } from './components/Insurance';
import { FarmCredit } from './components/FarmCredit';
import { BuyBackGuarantee } from './components/BuyBackGuarantee';
import { Community } from './components/Community';
import { ImpactDashboard } from './components/ImpactDashboard';
import { AuthFlow } from './components/AuthFlow';
import { GovernmentSchemes } from './components/GovernmentSchemes';
import { Profile } from './components/Profile';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';

export type UserRole = 'farmer' | 'fpo' | 'buyer' | 'investor' | null;
export type ActivePage = 'home' | 'dashboard' | 'crop-advisory' | 'input-marketplace' | 'carbon-marketplace' | 'traceability' | 'insurance' | 'farm-credit' | 'buyback' | 'community' | 'impact' | 'schemes' | 'profile';

export interface UserData {
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  // Farmer specific
  farmSize?: string;
  location?: string;
  crops?: string[];
  experience?: string;
  // FPO specific
  organizationName?: string;
  memberCount?: string;
  // Location data
  latitude?: number;
  longitude?: number;
  // Permissions
  cameraPermission?: boolean;
  locationPermission?: boolean;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [showAuthFlow, setShowAuthFlow] = useState(false);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('khedutmitra_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserData(user);
      setIsAuthenticated(true);
      setActivePage('dashboard');
    }
  }, []);

  const handleAuthComplete = (user: UserData) => {
    setUserData(user);
    setIsAuthenticated(true);
    setActivePage('dashboard');
    localStorage.setItem('khedutmitra_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setUserData(null);
    setIsAuthenticated(false);
    setActivePage('home');
    localStorage.removeItem('khedutmitra_user');
  };

  const handleGetStarted = () => {
    setShowAuthFlow(true);
  };

  const renderPage = () => {
    if (!isAuthenticated) {
      if (showAuthFlow) {
        return <AuthFlow onComplete={handleAuthComplete} onBack={() => setShowAuthFlow(false)} />;
      }
      return <Hero onGetStarted={handleGetStarted} />;
    }

    switch (activePage) {
      case 'dashboard':
        return <Dashboard userRole={userData?.role || null} userData={userData} onNavigate={setActivePage} />;
      case 'crop-advisory':
        return <CropAdvisory userRole={userData?.role || null} userData={userData} />;
      case 'input-marketplace':
        return <InputMarketplace userRole={userData?.role || null} />;
      case 'carbon-marketplace':
        return <CarbonMarketplace userRole={userData?.role || null} />;
      case 'traceability':
        return <Traceability userRole={userData?.role || null} />;
      case 'insurance':
        return <Insurance userRole={userData?.role || null} />;
      case 'farm-credit':
        return <FarmCredit userRole={userData?.role || null} />;
      case 'buyback':
        return <BuyBackGuarantee userRole={userData?.role || null} />;
      case 'community':
        return <Community userRole={userData?.role || null} />;
      case 'impact':
        return <ImpactDashboard userRole={userData?.role || null} />;
      case 'schemes':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <GovernmentSchemes />
          </div>
        );
      case 'profile':
        return <Profile userData={userData} onLogout={handleLogout} onNavigate={setActivePage} />;
      default:
        return <Dashboard userRole={userData?.role || null} userData={userData} onNavigate={setActivePage} />;
    }
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-green-950 transition-colors duration-300">
          <Header 
            activePage={activePage} 
            onNavigate={setActivePage}
            isLoggedIn={isAuthenticated}
            userData={userData}
            onLogout={handleLogout}
          />
          <main className="relative">
            {/* Animated background pattern for dark mode */}
            <div className="fixed inset-0 z-0 pointer-events-none dark:opacity-30">
              <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full mix-blend-overlay blur-3xl animate-blob"></div>
              <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-500/10 rounded-full mix-blend-overlay blur-3xl animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-teal-500/10 rounded-full mix-blend-overlay blur-3xl animate-blob animation-delay-4000"></div>
            </div>
            <div className="relative z-10">
              {renderPage()}
            </div>
          </main>
          {/* Footer */}
          <footer className="mt-16 border-t border-green-100 dark:border-green-700/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-green-900 dark:text-green-300 font-bold mb-4">KhedutMitra</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Empowering farmers with sustainable agriculture solutions.</p>
                </div>
                <div>
                  <h4 className="text-green-900 dark:text-green-300 font-semibold mb-3">Platform</h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li><button className="hover:text-green-600 dark:hover:text-green-400">Features</button></li>
                    <li><button className="hover:text-green-600 dark:hover:text-green-400">Pricing</button></li>
                    <li><button className="hover:text-green-600 dark:hover:text-green-400">Security</button></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-green-900 dark:text-green-300 font-semibold mb-3">Company</h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li><button className="hover:text-green-600 dark:hover:text-green-400">About</button></li>
                    <li><button className="hover:text-green-600 dark:hover:text-green-400">Blog</button></li>
                    <li><button className="hover:text-green-600 dark:hover:text-green-400">Careers</button></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-green-900 dark:text-green-300 font-semibold mb-3">Legal</h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li><button className="hover:text-green-600 dark:hover:text-green-400">Privacy</button></li>
                    <li><button className="hover:text-green-600 dark:hover:text-green-400">Terms</button></li>
                    <li><button className="hover:text-green-600 dark:hover:text-green-400">Contact</button></li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-green-100 dark:border-green-700/50 text-center text-gray-600 dark:text-gray-400 text-sm">
                <p>&copy; 2026 KhedutMitra. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}