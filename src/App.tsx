import { useState, useEffect, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { Header } from './components/Header';
import { PoopForm } from './components/PoopForm';
import { History } from './components/History';
import { Stats } from './components/Stats';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { PoopLog } from './types/database';
import { supabase } from './lib/supabase';

function AppContent() {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<PoopLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<PoopLog | null>(null);

  const fetchEntries = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('poop_logs')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (err) {
      console.error('Failed to fetch entries:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('poop_logs').delete().eq('id', id);
      if (error) throw error;
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const handleEdit = (entry: PoopLog) => {
    setEditingEntry(entry);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    fetchEntries();
    setShowForm(false);
    setEditingEntry(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingEntry(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-6">
        {showForm ? (
          <PoopForm
            onSuccess={handleFormSuccess}
            editEntry={editingEntry}
            onCancel={handleCancelForm}
          />
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="w-full mb-6 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
          >
            <Plus className="w-6 h-6" />
            <span className="text-xl">{t('logPoop')}</span>
          </button>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-6xl animate-bounce">💩</div>
          </div>
        ) : (
          <div className="space-y-6">
            <Stats entries={entries} />
            <History
              entries={entries}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
        )}
      </main>

      <footer className="py-6 text-center text-sm text-gray-500">
        <p>Made with 💩 for throne enthusiasts</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
