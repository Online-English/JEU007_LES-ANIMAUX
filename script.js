// --- BASE DE DONNÉES CONSOLIDÉE (100 Animaux sur 5 Niveaux) ---
const fruitsData = [
    // NIVEAU 1 : Animaux domestiques & de la ferme (20 mots)
    { en: "Dog", fr: "Chien", emoji: "🐶", level: 1 },
    { en: "Cat", fr: "Chat", emoji: "🐱", level: 1 },
    { en: "Rabbit", fr: "Lapin", emoji: "🐰", level: 1 },
    { en: "Mouse", fr: "Souris", emoji: "🐭", level: 1 },
    { en: "Cow", fr: "Vache", emoji: "🐮", level: 1 },
    { en: "Pig", fr: "Cochon", emoji: "🐷", level: 1 },
    { en: "Sheep", fr: "Mouton", emoji: "🐑", level: 1 },
    { en: "Goat", fr: "Chèvre", emoji: "🐐", level: 1 },
    { en: "Horse", fr: "Cheval", emoji: "🐴", level: 1 },
    { en: "Donkey", fr: "Âne", emoji: "🫏", level: 1 },
    { en: "Chicken", fr: "Poule / Poulet", emoji: "🐔", level: 1 },
    { en: "Duck", fr: "Canard", emoji: "🦆", level: 1 },
    { en: "Turkey", fr: "Dindon", emoji: "🦃", level: 1 },
    { en: "Goose", fr: "Oie", emoji: "🪿", level: 1 },
    { en: "Pigeon", fr: "Pigeon", emoji: "🐦", level: 1 },
    { en: "Rooster", fr: "Coq", emoji: "🐓", level: 1 },
    { en: "Hamster", fr: "Hamster", emoji: "🐹", level: 1 },
    { en: "Parrot", fr: "Perroquet", emoji: "🦜", level: 1 },
    { en: "Goldfish", fr: "Poisson rouge", emoji: "🐠", level: 1 },
    { en: "Turtle", fr: "Tortue", emoji: "🐢", level: 1 },

    // NIVEAU 2 : Animaux aquatiques & marins (20 mots)
    { en: "Fish", fr: "Poisson", emoji: "🐟", level: 2 },
    { en: "Shark", fr: "Requin", emoji: "🦈", level: 2 },
    { en: "Dolphin", fr: "Dauphin", emoji: "🐬", level: 2 },
    { en: "Whale", fr: "Baleine", emoji: "🐳", level: 2 },
    { en: "Octopus", fr: "Pieuvre", emoji: "🐙", level: 2 },
    { en: "Crab", fr: "Crabe", emoji: "🦀", level: 2 },
    { en: "Lobster", fr: "Homard", emoji: "🦞", level: 2 },
    { en: "Shrimp", fr: "Crevette", emoji: "🦐", level: 2 },
    { en: "Squid", fr: "Calamar", emoji: "🦑", level: 2 },
    { en: "Jellyfish", fr: "Méduse", emoji: "🪼", level: 2 },
    { en: "Starfish", fr: "Étoile de mer", emoji: "⭐", level: 2 },
    { en: "Seahorse", fr: "Hippocampe", emoji: "🐴", level: 2 },
    { en: "Seal", fr: "Phoque", emoji: "🦭", level: 2 },
    { en: "Walrus", fr: "Morse", emoji: "🦭", level: 2 },
    { en: "Penguin", fr: "Manchot / Pingouin", emoji: "🐧", level: 2 },
    { en: "Otter", fr: "Loutre", emoji: "🦦", level: 2 },
    { en: "Beaver", fr: "Castor", emoji: "🦫", level: 2 },
    { en: "Frog", fr: "Grenouille", emoji: "🐸", level: 2 },
    { en: "Toad", fr: "Crapaud", emoji: "🐸", level: 2 },
    { en: "Crocodile", fr: "Crocodile", emoji: "🐊", level: 2 },

    // NIVEAU 3 : Oiseaux & Insectes volants (20 mots)
    { en: "Eagle", fr: "Aigle", emoji: "🦅", level: 3 },
    { en: "Owl", fr: "Hibou / Chouette", emoji: "🦉", level: 3 },
    { en: "Falcon", fr: "Faucon", emoji: "🦅", level: 3 },
    { en: "Crow", fr: "Corbeau", emoji: "🐦", level: 3 },
    { en: "Swan", fr: "Cygne", emoji: "<b></b>🦢", level: 3 },
    { en: "Flamingo", fr: "Flamant rose", emoji: "🦩", level: 3 },
    { en: "Peacock", fr: "Paon", emoji: "🦚", level: 3 },
    { en: "Bat", fr: "Chauve-souris", emoji: "🦇", level: 3 },
    { en: "Bee", fr: "Abeille", emoji: "🐝", level: 3 },
    { en: "Ant", fr: "Fourmi", emoji: "🐜", level: 3 },
    { en: "Butterfly", fr: "Papillon", emoji: "🦋", level: 3 },
    { en: "Ladybug", fr: "Coccinelle", emoji: "🐞", level: 3 },
    { en: "Mosquito", fr: "Moustique", emoji: "🦟", level: 3 },
    { en: "Fly", fr: "Mouche", emoji: "🪰", level: 3 },
    { en: "Spider", fr: "Araignée", emoji: "🕷️", level: 3 },
    { en: "Cricket", fr: "Criquet / Grillon", emoji: "🦗", level: 3 },
    { en: "Dragonfly", fr: "Libellule", emoji: "🪰", level: 3 },
    { en: "Caterpillar", fr: "Chenille", emoji: "🐛", level: 3 },
    { en: "Snail", fr: "Escargot", emoji: "🐌", level: 3 },
    { en: "Worm", fr: "Ver", emoji: "🪱", level: 3 },

    // NIVEAU 4 : Animaux de la jungle & de la savane (20 mots)
    { en: "Lion", fr: "Lion", emoji: "🦁", level: 4 },
    { en: "Tiger", fr: "Tigre", emoji: "🐯", level: 4 },
    { en: "Leopard", fr: "Léopard", emoji: "🐆", level: 4 },
    { en: "Cheetah", fr: "Guépard", emoji: "🐆", level: 4 },
    { en: "Elephant", fr: "Éléphant", emoji: "🐘", level: 4 },
    { en: "Zebra", fr: "Zèbre", emoji: "🦓", level: 4 },
    { en: "Giraffe", fr: "Girafe", emoji: "🦒", level: 4 },
    { en: "Gorilla", fr: "Gorille", emoji: "🦍", level: 4 },
    { en: "Monkey", fr: "Singe", emoji: "🐒", level: 4 },
    { en: "Chimpanzee", fr: "Chimpanzé", emoji: "🦧", level: 4 },
    { en: "Hippo", fr: "Hippopotame", emoji: "🦛", level: 4 },
    { en: "Rhino", fr: "Rhinocéros", emoji: "🦏", level: 4 },
    { en: "Kangaroo", fr: "Kangourou", emoji: "🦘", level: 4 },
    { en: "Koala", fr: "Koala", emoji: "🐨", level: 4 },
    { en: "Panda", fr: "Panda", emoji: "🐼", level: 4 },
    { en: "Sloth", fr: "Paresseux", emoji: "🦥", level: 4 },
    { en: "Camel", fr: "Chameau", emoji: "🐪", level: 4 },
    { en: "Hyena", fr: "Hyène", emoji: "🦧", level: 4 },
    { en: "Ostrich", fr: "Autruche", emoji: "🦩", level: 4 },
    { en: "Bear", fr: "Ours", emoji: "🐻", level: 4 },

    // NIVEAU 5 : Animaux de la forêt & zones polaires (20 mots)
    { en: "Wolf", fr: "Loup", emoji: "🐺", level: 5 },
    { en: "Fox", fr: "Renard", emoji: "🦊", level: 5 },
    { en: "Deer", fr: "Cerf / Biche", emoji: "🦌", level: 5 },
    { en: "Moose", fr: "Élan", emoji: "🫎", level: 5 },
    { en: "Squirrel", fr: "Écureuil", emoji: "🐿️", level: 5 },
    { en: "Hedgehog", fr: "Hérisson", emoji: "🦔", level: 5 },
    { en: "Raccoon", fr: "Raton laveur", emoji: "🦝", level: 5 },
    { en: "Skunk", fr: "Moufette", emoji: "🦨", level: 5 },
    { en: "Badger", fr: "Blaireau", emoji: "🦡", level: 5 },
    { en: "Polar bear", fr: "Ours polaire", emoji: "🐻‍❄️", level: 5 },
    { en: "Arctic fox", fr: "Renard polaire", emoji: "🦊", level: 5 },
    { en: "Reindeer", fr: "Renne / Caribou", emoji: "🦌", level: 5 },
    { en: "Boar", fr: "Sanglier", emoji: "🐗", level: 5 },
    { en: "Snake", fr: "Serpent", emoji: "🐍", level: 5 },
    { en: "Lizard", fr: "Lézard", emoji: "🦎", level: 5 },
    { en: "Chameleon", fr: "Caméléon", emoji: "🦎", level: 5 },
    { en: "Scorpion", fr: "Scorpion", emoji: "🦂", level: 5 },
    { en: "Echidna", fr: "Echidné", emoji: "🦔", level: 5 }, // 🟢 Corrigé (Echidna)
    { en: "Lynx", fr: "Lynx", emoji: "🐱", level: 5 },       // 🟢 Corrigé (Lynx)
    { en: "Sea lion", fr: "Otarie", emoji: "🦭", level: 5 }   // 🟢 Corrigé (Sea lion)
];

// --- ÉTATS GÉNÉRAUX & STATISTIQUES ---
let currentStreak = 0, maxStreak = 0, totalPoints = 0;
let highScores = { quiz: 0, speak: 0, timeattack: 0 };
let favoriteFruits = [];
let errorHistory = []; 
let unlockedBadges = []; 
let audioSpeed = 1.0;
let filterOnlyFavs = false;
let searchDirection = 'EN_FR';
let globalAudioCtx = null; // Instance unique partagée 
let selectedVocabularyLevel = 1; 

// --- CONFIGURATION DES BADGES ---
const badgesDatabase = [
    { id: "first_perfect", title: "Zéro Faute !", desc: "Fais un sans-faute 10/10 en mode Quiz", icon: "🥇", color: "bg-gradient-to-tr from-yellow-400 to-amber-500" },
    { id: "streak_15", title: "Godmode", desc: "Enchaîne 15 bonnes réponses d'affilée", icon: "🔥", color: "bg-brandCoral" },
    { id: "time_20", title: "Speedrunner", desc: "Marque 20 points en Speed Run", icon: "⚡", color: "bg-cyan-500" },
    { id: "polyglotte", title: "Master Zoo", desc: "Débloque la catégorie Aquatique", icon: "👑", color: "bg-brandPurple" }
];

// --- ALGORITHME DE RÉPÉTITION ESPACÉE ---
function getNextExerciseWord() {
    const currentLevelWords = fruitsData.filter(f => f.level === parseInt(selectedVocabularyLevel));
    const currentLevelErrors = errorHistory.filter(err => err.level === parseInt(selectedVocabularyLevel));

    if (currentLevelErrors.length > 0 && Math.random() < 0.35) {
        return currentLevelErrors[Math.floor(Math.random() * currentLevelErrors.length)];
    }
    return currentLevelWords[Math.floor(Math.random() * currentLevelWords.length)];
}

// --- LOGIQUE DES BADGES ---
function checkAndUnlockBadge(badgeId) {
    if (!unlockedBadges.includes(badgeId)) {
        unlockedBadges.push(badgeId);
        localStorage.setItem('oe_unlocked_badges_anim', JSON.stringify(unlockedBadges));
        triggerConfetti();
        if(typeof renderBadgesUI === 'function') renderBadgesUI();
    }
}

// --- MODULE AUDIO DE HAUTE PRÉCISION (CORRIGÉ) ---
let preferredVoice = null;

// Fonction de sélection de la meilleure voix disponible sur l'appareil
function initVoices() {
    if (!('speechSynthesis' in window)) return;
    
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) return; // Le navigateur n'est pas encore prêt

    // Stratégie de sélection en 3 étapes :
    // 1. On cherche une voix anglaise moderne (Google, Natural, Neural ou Premium)
    let bestVoice = voices.find(voice => 
        voice.lang.toLowerCase().startsWith('en') && 
        (voice.name.includes('Google') || voice.name.includes('Natural') || voice.name.includes('Neural') || voice.name.includes('Premium'))
    );

    // 2. Si pas trouvé, on cherche une voix anglaise qui n'est PAS une vieille voix "Desktop" de Microsoft
    if (!bestVoice) {
        bestVoice = voices.find(voice => 
            voice.lang.toLowerCase().startsWith('en') && !voice.name.includes('Desktop')
        );
    }

    // 3. En dernier recours, on prend la première voix anglaise standard qui vient
    if (!bestVoice) {
        bestVoice = voices.find(voice => voice.lang.toLowerCase().startsWith('en'));
    }

    // On mémorise la voix pour éviter de refaire la recherche à chaque clic
    if (bestVoice) {
        preferredVoice = bestVoice;
    }
}

// Écouteur crucial : déclenché dès que le navigateur a fini de charger sa base de données vocales
if ('speechSynthesis' in window) {
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = initVoices;
    }
    initVoices(); // Premier essai immédiat au cas où elles seraient déjà prêtes
}

function setAudioSpeed(speed) {
    audioSpeed = speed;
    const btnNormal = document.getElementById('speed-normal');
    const btnSlow = document.getElementById('speed-slow');
    if (btnNormal && btnSlow) {
        if (speed === 1.0) {
            btnNormal.className = "px-2 py-1 bg-brandBlue text-white rounded font-bold";
            btnSlow.className = "px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded flex items-center gap-1";
        } else {
            btnNormal.className = "px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded font-bold";
            btnSlow.className = "px-2 py-1 bg-brandBlue text-white rounded flex items-center gap-1";
        }
    }
}

function playAudio(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Stoppe net toute lecture en cours
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = audioSpeed;

        // Si la voix n'a pas pu être choisie au démarrage, on fait une tentative de secours
        if (!preferredVoice) initVoices();

        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        window.speechSynthesis.speak(utterance);
    } else {
        // Fallback ultime si l'appareil ne supporte aucune synthèse vocale native
        const encodedText = encodeURIComponent(text.toLowerCase());
        const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodedText}`;
        const audio = new Audio(audioUrl);
        audio.playbackRate = audioSpeed;
        audio.play().catch(e => console.log("Audio playback failed:", e));
    }
}


function playSoundEffect(type) {
    if (!window.AudioContext && !window.webkitAudioContext) return;
    
    // Initialisation paresseuse au premier clic utilisateur
    if (!globalAudioCtx) {
        globalAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    // Sort de la mise en veille si le navigateur avait bloqué le flux audio
    if (globalAudioCtx.state === 'suspended') {
        globalAudioCtx.resume();
    }

    const osc = globalAudioCtx.createOscillator();
    const gain = globalAudioCtx.createGain();
    osc.connect(gain);
    gain.connect(globalAudioCtx.destination);

    if (type === 'success') {
        osc.frequency.setValueAtTime(523.25, globalAudioCtx.currentTime);
        osc.frequency.setValueAtTime(659.25, globalAudioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, globalAudioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, globalAudioCtx.currentTime + 0.3);
        osc.start(); osc.stop(globalAudioCtx.currentTime + 0.3);
    } else if (type === 'fail') {
        osc.frequency.setValueAtTime(196.00, globalAudioCtx.currentTime);
        osc.frequency.setValueAtTime(146.83, globalAudioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, globalAudioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, globalAudioCtx.currentTime + 0.4);
        osc.start(); osc.stop(globalAudioCtx.currentTime + 0.4);
    }
}

function triggerConfetti() {
    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = ['#F58634', '#52B788', '#1C3D5A', '#FFD166'][Math.floor(Math.random() * 4)];
        confetti.style.transform = `scale(${Math.random() * 0.8 + 0.5})`;
        confetti.style.animationDelay = Math.random() * 1.2 + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
    }
}

// --- CARNET DE RÉVISIONS ---
function registerError(fruitObj) {
    if (!errorHistory.some(f => f.en === fruitObj.en)) {
        errorHistory.push(fruitObj);
        localStorage.setItem('oe_error_history_anim', JSON.stringify(errorHistory));
    }
}
function removeError(englishName) {
    errorHistory = errorHistory.filter(f => f.en !== englishName);
    localStorage.setItem('oe_error_history_anim', JSON.stringify(errorHistory));
}

// --- GESTION DE LA PROGRESSION ---
function getUserPlayerLevel() {
    return Math.floor(totalPoints / 150) + 1;
}

// --- ADAPTATION DES TITRES (Zoologie) ---
function updateLevelAndTitle() {
    const pLevel = getUserPlayerLevel();
    const levelEl = document.getElementById('user-level');
    const titleEl = document.getElementById('user-title');
    
    if (levelEl) levelEl.innerText = pLevel;

    let title = "Novice de la Faune";
    if (pLevel >= 3) title = "Dresseur / Tamer";
    if (pLevel >= 6) title = "Ranger Émérite";
    if (pLevel >= 9) title = "Aventurier Légendaire";
    if (pLevel >= 12) title = "Dieu de la Nature 🐾";

    if (titleEl) titleEl.innerText = title;
    if (typeof updateLevelLockUI === 'function') updateLevelLockUI();

// --- MODULE DARK MODE (AJOUTÉ) ---
function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('oe_dark_mode', isDark);
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.className = isDark ? "fa-solid fa-sun text-yellow-300" : "fa-solid fa-moon text-yellow-300";
    }
}

// --- RÉINITIALISATION DES STATISTIQUES (AJOUTÉ) ---
function resetStats() {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser toutes vos statistiques et votre progression Faune ?")) {
        const keysToRemove = ['oe_total_points_anim', 'oe_high_quiz_anim', 'oe_high_speak_anim', 'oe_high_timeattack_anim', 'oe_max_streak_anim', 'oe_fav_anim', 'oe_error_history_anim', 'oe_unlocked_badges_anim'];
        keysToRemove.forEach(key => localStorage.removeItem(key));
        totalPoints = 0; highScores = { quiz: 0, speak: 0, timeattack: 0 }; maxStreak = 0; currentStreak = 0; errorHistory = []; unlockedBadges = []; favoriteFruits = [];
        document.getElementById('total-points').innerText = totalPoints;
        document.getElementById('streak-count').innerText = currentStreak;
        document.getElementById('stat-high-quiz').innerText = 0;
        document.getElementById('stat-high-speak').innerText = 0;
        document.getElementById('stat-high-timeattack').innerText = 0;
        document.getElementById('stat-max-streak').innerText = 0;
        updateLevelAndTitle();
        if (typeof renderDict === 'function') renderDict();
        if (typeof updateFlashcard === 'function') updateFlashcard();
        if (typeof renderBadgesUI === 'function') renderBadgesUI();
        if (typeof renderErrorHistory === 'function') renderErrorHistory();
        alert("Statistiques Faune réinitialisées !");
    }
}

// --- PERSISTENCE ---
function saveStats() {
    localStorage.setItem('oe_total_points_anim', totalPoints);
    localStorage.setItem('oe_high_quiz_anim', highScores.quiz);
    localStorage.setItem('oe_high_speak_anim', highScores.speak); 
    localStorage.setItem('oe_high_timeattack_anim', highScores.timeattack);
    localStorage.setItem('oe_max_streak_anim', maxStreak);
}
function loadStats() {
    totalPoints = parseInt(localStorage.getItem('oe_total_points_anim')) || 0;
    highScores.quiz = parseInt(localStorage.getItem('oe_high_quiz_anim')) || 0;
    highScores.speak = parseInt(localStorage.getItem('oe_high_speak_anim')) || 0; 
    highScores.timeattack = parseInt(localStorage.getItem('oe_high_timeattack_anim')) || 0;
    maxStreak = parseInt(localStorage.getItem('oe_max_streak_anim')) || 0;
    favoriteFruits = JSON.parse(localStorage.getItem('oe_fav_anim')) || [];
    errorHistory = JSON.parse(localStorage.getItem('oe_error_history_anim')) || [];
    unlockedBadges = JSON.parse(localStorage.getItem('oe_unlocked_badges_anim')) || [];
    
    if (localStorage.getItem('oe_dark_mode') === 'true') {
        document.documentElement.classList.add('dark');
        const icon = document.getElementById('theme-icon');
        if (icon) icon.className = "fa-solid fa-sun text-yellow-300";
    }
    const totalPointsEl = document.getElementById('total-points');
    if (totalPointsEl) totalPointsEl.innerText = totalPoints;
    updateLevelAndTitle();
}