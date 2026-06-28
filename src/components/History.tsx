import { useState } from 'react';
import { Clock, Trash2, Edit2, MessageSquare } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { PoopLog, Mood } from '../types/database';

interface HistoryProps {
  entries: PoopLog[];
  onDelete: (id: string) => void;
  onEdit: (entry: PoopLog) => void;
}

const moodEmojis: Record<Mood, string> = {
  amazing: '🌟',
  good: '😌',
  okay: '🤷',
  bad: '😣',
  terrible: '😵',
};

export function History({ entries, onDelete, onEdit }: HistoryProps) {
  const { t } = useLanguage();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return `${t('today')} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return `${t('yesterday')} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays < 7) {
      return `${diffDays} ${t('daysAgo')}`;
    } else {
      return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
    }
  };

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">🚽</div>
        <p className="text-gray-500 text-lg">{t('noEntries')}</p>
        <p className="text-gray-400 text-sm mt-2">{t('startTracking')}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b bg-gradient-to-r from-amber-50 to-orange-50">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <span>📜</span>
          {t('history')}
        </h2>
      </div>
      <div className="divide-y max-h-[400px] overflow-y-auto">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="p-4 hover:bg-orange-50 transition-colors group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <Clock className="w-4 h-4" />
                  {formatDate(entry.timestamp)}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{moodEmojis[entry.mood]}</span>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {entry.duration_minutes} {t('minutes')}
                    </p>
                    <p className="text-sm text-gray-500">
                      {t(`mood${entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}` as any)}
                    </p>
                  </div>
                </div>
                {entry.notes && (
                  <div className="mt-2 flex items-start gap-2 text-gray-600 bg-gray-50 rounded-lg p-2">
                    <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm italic">{entry.notes}</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onEdit(entry)}
                  className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                {deleteConfirm === entry.id ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        onDelete(entry.id);
                        setDeleteConfirm(null);
                      }}
                      className="p-2 text-white bg-red-500 hover:bg-red-600 rounded-lg text-xs font-bold"
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="p-2 text-gray-500 bg-gray-200 hover:bg-gray-300 rounded-lg text-xs font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(entry.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
