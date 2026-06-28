import { Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export function Header() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ro' ? 'en' : 'ro');
  };

  return (
    <header className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-3xl">💩</span>
          {t('appName')}
        </h1>
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-medium"
          title={t('language')}
        >
          <Globe className="w-4 h-4" />
          <span className="uppercase">{language}</span>
        </button>
      </div>
    </header>
  );
}
