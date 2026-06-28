export type Language = 'ro' | 'en';

export const translations = {
  ro: {
    // Header
    appName: 'ScaunTracker 💩',
    logPoop: 'Marchează scaunul 💩',
    history: 'Jurnalul rușinii',
    stats: 'Statistici dubioase',
    streak: 'Serie neîntreruptă de scaune',
    notes: 'Confesiuni',
    duration: 'Timp petrecut pe tron',
    moodAfter: 'Starea după eliberare',

    // Form
    addEntry: 'Adaugă o intrare',
    editEntry: 'Modifică confesiunea',
    when: 'Când s-a întâmplat?',
    durationLabel: 'Cât ai stat?',
    minutes: 'minute',
    moodLabel: 'Cum te-ai simțit după?',
    notesPlaceholder: 'Detalii intime... (opțional)',
    save: 'Salvează mărturisirea',
    cancel: 'Mă răzgândesc',
    delete: 'Șterge din istorie',

    // Moods
    moodAmazing: 'Ușor ca părul! 🌟',
    moodGood: 'Bine, dar nu grozav 😌',
    moodOkay: 'Meh, putea fi mai bine 🤷',
    moodBad: 'Mă doare burta... 😣',
    moodTerrible: 'Coșmar pe tron 😵',

    // Stats
    totalPoops: 'Total scaune',
    avgDuration: 'Media pe tron',
    bestStreak: 'Cea mai lungă serie',
    currentStreak: 'Seria actuală',
    thisWeek: 'Săptămâna asta',
    thisMonth: 'Luna asta',

    // Time
    today: 'Azi',
    yesterday: 'Ieri',
    daysAgo: 'zile în urmă',

    // Empty state
    noEntries: 'Nicio mărturisire încă...',
    startTracking: 'Începe să-ți urmărești activitatea pentru a vedea statistici!',

    // Confirmations
    deleteConfirm: 'Sigur vrei să ștergi această mărturisire?',
    saved: 'Salvat! 💾',
    deleted: 'Șters din istorie 🗑️',

    // Misc
    language: 'Limba',
    close: 'Închide',
    confirm: 'Confirm',

    // PWA
    installApp: 'Instalează aplicația',
    installPrompt: 'Adaugă ScaunTracker pe ecranul de start pentru acces rapid!',
  },
  en: {
    // Header
    appName: 'PoopTracker 💩',
    logPoop: 'Log a poop 💩',
    history: 'History',
    stats: 'Stats',
    streak: 'Streak',
    notes: 'Notes',
    duration: 'Duration',
    moodAfter: 'Mood after',

    // Form
    addEntry: 'Add an entry',
    editEntry: 'Edit entry',
    when: 'When did it happen?',
    durationLabel: 'How long did you sit?',
    minutes: 'minutes',
    moodLabel: 'How did you feel after?',
    notesPlaceholder: 'Details... (optional)',
    save: 'Save entry',
    cancel: 'Cancel',
    delete: 'Delete from history',

    // Moods
    moodAmazing: 'Amazing! 🌟',
    moodGood: 'Pretty good 😌',
    moodOkay: 'It was okay 🤷',
    moodBad: 'Not great... 😣',
    moodTerrible: 'Nightmare on the throne 😵',

    // Stats
    totalPoops: 'Total poops',
    avgDuration: 'Avg duration',
    bestStreak: 'Best streak',
    currentStreak: 'Current streak',
    thisWeek: 'This week',
    thisMonth: 'This month',

    // Time
    today: 'Today',
    yesterday: 'Yesterday',
    daysAgo: 'days ago',

    // Empty state
    noEntries: 'No entries yet...',
    startTracking: 'Start tracking to see your stats!',

    // Confirmations
    deleteConfirm: 'Are you sure you want to delete this entry?',
    saved: 'Saved! 💾',
    deleted: 'Deleted from history 🗑️',

    // Misc
    language: 'Language',
    close: 'Close',
    confirm: 'Confirm',

    // PWA
    installApp: 'Install app',
    installPrompt: 'Add PoopTracker to your home screen for quick access!',
  }
} as const;

export type TranslationKey = keyof typeof translations.ro;
