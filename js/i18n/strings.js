// UI string tables. Curriculum and algorithm content live elsewhere.

export const SUPPORTED_LOCALES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'fr', label: 'Français', short: 'FR' },
];

const en = {
  app: {
    tagline: 'Trainer',
    footer: 'Cross · F2L · OLL · PLL — your sub-20 trajectory.',
  },
  nav: {
    curriculum: 'Curriculum',
    algorithms: 'Algorithms',
    solves: 'Solves',
  },
  stats: {
    ao5: 'ao5',
    ao12: 'ao12',
    ao100: 'ao100',
    best: 'best',
    solves: 'Solves',
  },
  buttons: {
    timer: 'Timer',
    newSolve: '+ New solve',
    continue: 'Continue',
    review: 'Review lesson',
    practiceTimer: 'Practice with timer',
    markComplete: 'Mark lesson complete',
    completed: '✓ Lesson completed',
    learning: 'Learning',
    mastered: 'Mastered',
    exportProgress: 'Export progress',
    importProgress: 'Import',
    reset: 'Reset',
  },
  dashboard: {
    pickUpWhere: 'Pick up where you left off',
    yourProgress: 'Your progress',
    lessonsSuffix: 'lessons',
    curriculumTitle: 'The curriculum',
    stagesAndLessons: '{stages} stages · {lessons} lessons',
    noAo: 'No data yet',
  },
  lesson: {
    allLessons: 'All lessons',
    practiceAlgs: 'Practice algorithms',
    practiceHint:
      'Mark each algorithm as you go. <em>Learning</em> means you can do it slowly with notation; <em>Mastered</em> means you can execute it without thinking and recognise the case from the cube.',
    notFound: 'Lesson not found.',
    back: 'Back',
    next: 'Next: {title}',
    algDrill: 'algorithm drill',
    completed: 'Completed',
  },
  algorithms: {
    title: 'Algorithms',
    description:
      'Reference library and personal mastery tracker for every CFOP algorithm. Use this with the timer in another tab — drill until recognition becomes instant.',
    algorithmsSuffix: 'algorithms',
    mastered: 'mastered',
    learning: 'learning',
    untouched: 'untouched',
    tabs: {
      '2look-oll-edges': '2L OLL edges',
      '2look-oll-corners': '2L OLL corners',
      '2look-pll-corners': '2L PLL corners',
      '2look-pll-edges': '2L PLL edges',
      'f2l-basic': 'F2L basics',
      'oll-full': 'Full OLL (57)',
      'pll-full': 'Full PLL (21)',
    },
  },
  solves: {
    title: 'Solves',
    subtitle: "All times you've logged with the timer.",
    empty: 'No solves yet. Hit the {kbd} key or the timer button to log your first solve.',
    columns: {
      number: '#',
      time: 'Time',
      scramble: 'Scramble',
      date: 'Date',
    },
  },
  timer: {
    pressHold: 'Press & hold space',
    holding: 'Hold...',
    ready: 'Release to start',
    solving: 'Solving — press space to stop',
    scrambleLabel: 'Scramble',
    spaceHint: 'start/stop',
    newScrambleHint: 'new scramble',
    closeHint: 'close',
  },
  language: {
    label: 'Language',
  },
  alerts: {
    confirmReset: 'Wipe all progress, algorithms and solves? This cannot be undone.',
    importFailed: 'Import failed: {message}',
  },
};

const fr = {
  app: {
    tagline: 'Entraîneur',
    footer: 'Croix · F2L · OLL · PLL — votre trajectoire sub-20.',
  },
  nav: {
    curriculum: 'Cursus',
    algorithms: 'Algorithmes',
    solves: 'Résolutions',
  },
  stats: {
    ao5: 'mo5',
    ao12: 'mo12',
    ao100: 'mo100',
    best: 'meilleur',
    solves: 'Résolutions',
  },
  buttons: {
    timer: 'Chrono',
    newSolve: '+ Nouvelle résolution',
    continue: 'Continuer',
    review: 'Revoir la leçon',
    practiceTimer: 'S’entraîner au chrono',
    markComplete: 'Marquer comme terminée',
    completed: '✓ Leçon terminée',
    learning: 'À apprendre',
    mastered: 'Maîtrisé',
    exportProgress: 'Exporter la progression',
    importProgress: 'Importer',
    reset: 'Réinitialiser',
  },
  dashboard: {
    pickUpWhere: 'Reprenez là où vous en étiez',
    yourProgress: 'Votre progression',
    lessonsSuffix: 'leçons',
    curriculumTitle: 'Le cursus',
    stagesAndLessons: '{stages} étapes · {lessons} leçons',
    noAo: 'Pas encore de données',
  },
  lesson: {
    allLessons: 'Toutes les leçons',
    practiceAlgs: 'Algorithmes à pratiquer',
    practiceHint:
      'Cochez chaque algorithme au fil de l’eau. <em>À apprendre</em> : vous savez l’exécuter lentement avec la notation. <em>Maîtrisé</em> : exécution sans réfléchir et reconnaissance immédiate du cas.',
    notFound: 'Leçon introuvable.',
    back: 'Retour',
    next: 'Suivante : {title}',
    algDrill: 'drill d’algorithmes',
    completed: 'Terminée',
  },
  algorithms: {
    title: 'Algorithmes',
    description:
      'Bibliothèque de référence et suivi personnel de maîtrise pour tous les algorithmes CFOP. Utilisez-la avec le chrono dans un autre onglet — drillez jusqu’à la reconnaissance instantanée.',
    algorithmsSuffix: 'algorithmes',
    mastered: 'maîtrisés',
    learning: 'à apprendre',
    untouched: 'non commencés',
    tabs: {
      '2look-oll-edges': 'OLL 2-look arêtes',
      '2look-oll-corners': 'OLL 2-look coins',
      '2look-pll-corners': 'PLL 2-look coins',
      '2look-pll-edges': 'PLL 2-look arêtes',
      'f2l-basic': 'F2L bases',
      'oll-full': 'OLL complet (57)',
      'pll-full': 'PLL complet (21)',
    },
  },
  solves: {
    title: 'Résolutions',
    subtitle: 'Tous les temps enregistrés avec le chrono.',
    empty: 'Aucune résolution. Appuyez sur {kbd} ou cliquez sur le bouton chrono pour enregistrer la première.',
    columns: {
      number: 'N°',
      time: 'Temps',
      scramble: 'Mélange',
      date: 'Date',
    },
  },
  timer: {
    pressHold: 'Maintenez Espace',
    holding: 'Maintenir…',
    ready: 'Relâchez pour démarrer',
    solving: 'En cours — appuyez sur Espace pour arrêter',
    scrambleLabel: 'Mélange',
    spaceHint: 'démarrer/arrêter',
    newScrambleHint: 'nouveau mélange',
    closeHint: 'fermer',
  },
  language: {
    label: 'Langue',
  },
  alerts: {
    confirmReset:
      'Effacer toute la progression, les algorithmes et les résolutions ? Action irréversible.',
    importFailed: 'Échec de l’import : {message}',
  },
};

export const STRINGS = { en, fr };
