import { TrendingUp, Flame, Timer } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { PoopLog, Mood } from '../types/database';

interface StatsProps {
  entries: PoopLog[];
}

const moodEmojis: Record<Mood, string> = {
  amazing: '🌟',
  good: '😌',
  okay: '🤷',
  bad: '😣',
  terrible: '😵',
};

export function Stats({ entries }: StatsProps) {
  const { t } = useLanguage();

  if (entries.length === 0) {
    return null;
  }

  const totalPoops = entries.length;

  const avgDuration = Math.round(
    entries.reduce((sum, e) => sum + e.duration_minutes, 0) / entries.length
  );

  let currentStreak = 0;
  let bestStreak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysWithPoops = new Set(
    entries.map((e) => {
      const d = new Date(e.timestamp);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    })
  );

  for (let i = 0; i <= 365; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - i);
    if (daysWithPoops.has(checkDate.getTime())) {
      currentStreak++;
    } else if (i > 0) {
      break;
    }
  }

  for (let i = 0; i <= 365; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - i);
    if (daysWithPoops.has(checkDate.getTime())) {
      const prevDate = new Date(checkDate);
      prevDate.setDate(prevDate.getDate() - 1);
      if (daysWithPoops.has(prevDate.getTime())) {
        let streak = 1;
        for (let j = i + 1; j <= 365; j++) {
          const nextDate = new Date(today);
          nextDate.setDate(nextDate.getDate() - j);
          if (daysWithPoops.has(nextDate.getTime())) {
            streak++;
          } else {
            break;
          }
        }
        bestStreak = Math.max(bestStreak, streak);
      }
    }
  }

  bestStreak = Math.max(bestStreak, currentStreak);

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  oneWeekAgo.setHours(0, 0, 0, 0);

  const oneMonthAgo = new Date();
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
  oneMonthAgo.setHours(0, 0, 0, 0);

  const thisWeek = entries.filter(
    (e) => new Date(e.timestamp) >= oneWeekAgo
  ).length;
  const thisMonth = entries.filter(
    (e) => new Date(e.timestamp) >= oneMonthAgo
  ).length;

  const moodCounts = entries.reduce(
    (acc, e) => {
      acc[e.mood] = (acc[e.mood] || 0) + 1;
      return acc;
    },
    {} as Record<Mood, number>
  );

  const mostCommonMood = (
    Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] as Mood
  ) || 'okay';

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b bg-gradient-to-r from-amber-50 to-orange-50">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <span>📊</span>
          {t('stats')}
        </h2>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg p-4 text-center">
            <div className="text-3xl mb-1">💩</div>
            <div className="text-2xl font-bold text-orange-600">{totalPoops}</div>
            <div className="text-xs text-gray-600">{t('totalPoops')}</div>
          </div>

          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg p-4 text-center">
            <div className="text-3xl mb-1">
              <Timer className="w-8 h-8 mx-auto text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{avgDuration}</div>
            <div className="text-xs text-gray-600">{t('avgDuration')}</div>
          </div>

          <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-lg p-4 text-center">
            <div className="text-3xl mb-1">
              <Flame className="w-8 h-8 mx-auto text-red-500" />
            </div>
            <div className="text-2xl font-bold text-red-600">{currentStreak}</div>
            <div className="text-xs text-gray-600">{t('currentStreak')}</div>
          </div>

          <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg p-4 text-center">
            <div className="text-3xl mb-1">
              <TrendingUp className="w-8 h-8 mx-auto text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-600">{bestStreak}</div>
            <div className="text-xs text-gray-600">{t('bestStreak')}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-gray-700">{thisWeek}</div>
            <div className="text-xs text-gray-500">{t('thisWeek')}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-gray-700">{thisMonth}</div>
            <div className="text-xs text-gray-500">{t('thisMonth')}</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">{t('moodAfter')}</p>
          <div className="text-4xl mb-1">{moodEmojis[mostCommonMood]}</div>
          <p className="text-sm font-medium text-gray-700">
            {t(`mood${mostCommonMood.charAt(0).toUpperCase() + mostCommonMood.slice(1)}` as any)}
          </p>
        </div>
      </div>
    </div>
  );
}
