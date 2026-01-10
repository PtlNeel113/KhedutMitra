import { Leaf, Menu, X, Globe, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { ActivePage, UserData } from '../App';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface HeaderProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  isLoggedIn: boolean;
  userData: UserData | null;
  onLogout: () => void;
}

export function Header({ activePage, onNavigate, isLoggedIn, userData, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const navItems = isLoggedIn ? [
    { label: t('nav.dashboard'), page: 'dashboard' as ActivePage },
    { label: t('nav.cropAdvisory'), page: 'crop-advisory' as ActivePage },
    { label: t('nav.marketplaces'), page: 'input-marketplace' as ActivePage },
    { label: t('nav.farmCredit'), page: 'farm-credit' as ActivePage },
    { label: t('nav.community'), page: 'community' as ActivePage },
    { label: t('nav.impact'), page: 'impact' as ActivePage },
  ] : [
    { label: t('nav.home'), page: 'home' as ActivePage },
  ];

  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-green-100 dark:border-green-700/50 shadow-md dark:shadow-green-900/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onNavigate(isLoggedIn ? 'dashboard' : 'home')}
          >
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 p-2 rounded-lg shadow-lg hover:shadow-green-600/50 transition-shadow">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-green-900 dark:text-green-300 font-bold text-lg">{t('app.name')}</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setMobileMenuOpen(false);
                }}
                className={`transition-all duration-200 font-medium ${
                  activePage === item.page
                    ? 'text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400 pb-1'
                    : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="gap-2 hover:bg-green-100 dark:hover:bg-green-900/30 text-green-700 dark:text-green-400"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <span className="text-xs hidden sm:inline">{theme === 'light' ? 'Dark' : 'Light'}</span>
            </Button>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 hover:bg-green-100 dark:hover:bg-green-900/30 text-green-700 dark:text-green-400">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">
                    {languages.find(l => l.code === language)?.nativeName}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="dark:bg-slate-800 dark:border-green-700">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={language === lang.code ? 'bg-green-50 dark:bg-green-900/50' : 'dark:hover:bg-slate-700'}
                  >
                    <span className={language === lang.code ? 'font-semibold text-green-600 dark:text-green-400' : 'dark:text-gray-300'}>
                      {lang.nativeName}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {isLoggedIn && userData && (
              <div className="flex items-center gap-3 pl-3 border-l border-green-200 dark:border-green-700">
                <div className="text-right hidden sm:block">
                  <div className="text-gray-900 dark:text-gray-100 text-sm font-semibold">{userData.name}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-xs capitalize">{t(`role.${userData.role}`)}</div>
                </div>
                <button
                  onClick={() => onNavigate('profile')}
                  className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-600 dark:to-emerald-600 p-2 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all"
                >
                  <span className="text-green-700 dark:text-white font-semibold cursor-pointer">{userData.name.charAt(0).toUpperCase()}</span>
                </button>
              </div>
            )}
            {isLoggedIn ? (
              <Button onClick={onLogout} variant="outline" className="ml-2 dark:border-green-600 dark:text-green-400 dark:hover:bg-green-900/20">
                {t('nav.logout')}
              </Button>
            ) : (
              <Button onClick={() => onNavigate('home')} className="ml-2 bg-green-600 dark:bg-green-600 hover:bg-green-700 dark:hover:bg-green-700">
                {t('nav.getStarted')}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="dark:text-green-400 text-gray-700" /> : <Menu className="dark:text-green-400 text-gray-700" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-100 dark:border-green-700/50 bg-white/50 dark:bg-slate-900/50">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 transition-colors font-medium ${
                  activePage === item.page
                    ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30'
                    : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Theme Toggle */}
            <div className="px-4 py-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="w-full justify-start gap-2 dark:border-green-600 dark:text-green-400 dark:hover:bg-green-900/20"
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="h-4 w-4" />
                    {t('theme.dark')}
                  </>
                ) : (
                  <>
                    <Sun className="h-4 w-4" />
                    {t('theme.light')}
                  </>
                )}
              </Button>
            </div>
            
            {/* Mobile Language Selector */}
            <div className="px-4 py-2 mt-2">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Language
              </div>
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors font-medium ${
                      language === lang.code
                        ? 'bg-green-600 text-white dark:bg-green-600'
                        : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {lang.nativeName}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="px-4 py-2 mt-2 flex flex-col gap-2">
              {isLoggedIn && userData && (
                <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg mb-2 border border-green-200 dark:border-green-700">
                  <div className="text-gray-900 dark:text-gray-100 font-semibold">{userData.name}</div>
                  <div className="text-gray-600 dark:text-gray-400 capitalize text-sm">{t(`role.${userData.role}`)}</div>
                </div>
              )}
              {isLoggedIn ? (
                <Button onClick={onLogout} variant="outline" className="w-full dark:border-green-600 dark:text-green-400 dark:hover:bg-green-900/20">
                  {t('nav.logout')}
                </Button>
              ) : (
                <Button onClick={() => onNavigate('home')} className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700">
                  {t('nav.getStarted')}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}