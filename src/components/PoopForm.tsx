import { useState, useEffect } from 'react';
import { Calendar, Clock, Smile, MessageSquare, Save, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { PoopLog, NewPoopLog, Mood } from '../types/database';
import { supabase } from '../lib/supabase';

interface PoopFormProps {
  onSuccess: () => void;
  editEntry?: PoopLog | null;
  onCancel?: () => void;
}

const moods: Mood[] = ['amazing', 'good', 'okay', 'bad', 'terrible'];

const moodEmojis: Record<Mood, string> = {
  amazing: '🌟',
  good: '😌',
  okay: '🤷',
  bad: '😣',
  terrible: '😵',
};

export function PoopForm({ onSuccess, editEntry, onCancel }: PoopFormProps) {
  const { t } = useLanguage();
  const [timestamp, setTimestamp] = useState('');
  const [duration, setDuration] = useState(5);
  const [mood, setMood] = useState<Mood>('okay');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editEntry) {
      const localDate = new Date(editEntry.timestamp);
      const localIso = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      setTimestamp(localIso);
      setDuration(editEntry.duration_minutes);
      setMood(editEntry.mood);
      setNotes(editEntry.notes || '');
    } else {
      const now = new Date();
      const localIso = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      setTimestamp(localIso);
      setDuration(5);
      setMood('okay');
      setNotes('');
    }
  }, [editEntry]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!timestamp) return;

    setSaving(true);
    try {
      const entry: NewPoopLog = {
        timestamp: new Date(timestamp).toISOString(),
        duration_minutes: duration,
        mood,
        notes: notes.trim() || null,
      };

      if (editEntry) {
        const { error } = await supabase
          .from('poop_logs')
          .update(entry)
          .eq('id', editEntry.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('poop_logs').insert(entry);
        if (error) throw error;
      }

      onSuccess();
      if (!editEntry) {
        setNotes('');
        setDuration(5);
        setMood('okay');
        const now = new Date();
        const localIso = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 16);
        setTimestamp(localIso);
      }
    } catch (err) {
      console.error('Failed to save:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">💩</span>
        {editEntry ? t('editEntry') : t('addEntry')}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {t('when')}
          </label>
          <input
            type="datetime-local"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {t('durationLabel')}
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="1"
              max="60"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="flex-1 h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <span className="text-lg font-bold text-orange-600 min-w-[80px] text-right">
              {duration} {t('minutes')}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Smile className="w-4 h-4" />
            {t('moodLabel')}
          </label>
          <div className="grid grid-cols-5 gap-2">
            {moods.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMood(m)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  mood === m
                    ? 'border-orange-500 bg-orange-50 scale-105'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <span className="text-2xl block mb-1">{moodEmojis[m]}</span>
                <span className="text-xs text-gray-600 block">
                  {t(`mood${m.charAt(0).toUpperCase() + m.slice(1)}` as any)}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            {t('notes')}
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t('notesPlaceholder')}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving || !timestamp}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
          >
            <Save className="w-5 h-5" />
            {saving ? '...' : t('save')}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
            >
              <X className="w-5 h-5" />
              {t('cancel')}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
