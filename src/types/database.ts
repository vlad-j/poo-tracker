export type Mood = 'amazing' | 'good' | 'okay' | 'bad' | 'terrible';

export interface PoopLog {
  id: string;
  timestamp: string;
  duration_minutes: number;
  mood: Mood;
  notes: string | null;
  created_at: string;
}

export interface NewPoopLog {
  timestamp: string;
  duration_minutes: number;
  mood: Mood;
  notes?: string | null;
}
