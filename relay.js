// --- VARIABLES LOCALES DE GESTION DES JEUX ---
let slideshowTimeout = null;
let isSlideshowActive = false;
let currentFlashIndex = 0;
let quizTimeout = null;  
let speakTimeout = null; 

let quizStep = 1, quizScore = 0, currentQuizItem = null;
let currentSpeakItem = null, speakScore = 0; 
let selectedEnglishNode = null, selectedFrenchNode = null;
let isProcessingMatch = false; 

// VARIABLES DE CONTRE-LA-MONTRE
let taTimerInterval = null;
let taTimeout = null; 
let taTimeLeft = 60;
let taScore = 0;
let currentTAItem = null;

// --- INITIALISATION DES COMPOSANTS AU DEMARRAGE ---
window.onload = () => {
    loadStats(); // Charge les données du localStorage via script.js
    
    // Remplissage initial des scores dans l'interface
    document.getElementById('stat-high-quiz').innerText = highScores.quiz;
    document.getElementById('stat-high-speak').innerText = highScores.speak || 0;
    document.getElementById('stat-high-timeattack').innerText = highScores.timeattack || 0;
    document.getElementById('stat-max-streak').innerText = maxStreak;
    
    // Force la vérification des cadenas et affichage initial
    updateLevelLockUI();
    renderDict();
    updateFlashcard();
    renderBadgesUI();
    renderErrorHistory();
};

// --- SELECTIONNEUR DE NIVEAU DE VOCABULAIRE ---
function setVocabLevel(level) {
    selectedVocabularyLevel = parseInt(level);
    
    // Réinitialise le style visuel de tous les boutons de niveau (style moderne)
    document.querySelectorAll('#vocab-level-selector button').forEach(btn => {
        if (!btn.disabled) {
            btn.className = "p-2.5 rounded-xl font-extrabold text-xs bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-transparent transition hover:border-brandPurple";
        }
    });
    
    // Active le bouton cliqué
    const activeBtn = document.getElementById(`btn-vlevel-${level}`);
    activeBtn.className = "p-2.5 rounded-xl font-extrabold text-xs bg-brandPurple text-white shadow-md border border-brandPurple transition";
    
    // Actualise les modules
    renderDict();
    updateFlashcard();
    resetQuizToMenu();
}

function updateLevelLockUI() {
    const playerLevel = getUserPlayerLevel();
    const hint = document.getElementById('vocab-unlock-hint');
    if (!hint) return;

    const levelsConfig = [
        { level: 2, req: 3, label: "Aquatiques 🐬" },
        { level: 3, req: 6, label: "Volants 🦅" },
        { level: 4, req: 9, label: "Jungle 🦁" },
        { level: 5, req: 12, label: "Sauvages 🐺" }
    ];

    levelsConfig.forEach(cfg => {
        const btn = document.getElementById(`btn-vlevel-${cfg.level}`);
        if (!btn) return;

        if (playerLevel >= cfg.req) {
            btn.disabled = false;
            btn.innerHTML = cfg.label;
            if (selectedVocabularyLevel !== cfg.level) {
                btn.className = "p-2.5 rounded-xl font-extrabold text-xs bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-transparent transition hover:border-brandPurple";
            }
        } else {
            btn.disabled = true;
            btn.innerHTML = `<i class="fa-solid fa-lock text-[10px]"></i> Niv.${cfg.level}`;
            btn.className = "p-2.5 rounded-xl font-extrabold text-xs bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600 border border-transparent cursor-not-allowed flex items-center justify-center gap-1 transition";
            if (selectedVocabularyLevel === cfg.level) selectedVocabularyLevel = 1;
        }
    });

    if (playerLevel >= 12) {
        hint.innerHTML = "🏆 Félicitations ! Tout le règne animal est accessible !";
    } else {
        const nextUnlock = levelsConfig.find(cfg => playerLevel < cfg.req);
        if (nextUnlock) {
            hint.innerHTML = `⚡ Passe au <b>Niveau Joueur ${nextUnlock.req}</b> pour débloquer les Animaux ${nextUnlock.label.split(' ')[0]} !`;
        }
    }

    if (selectedVocabularyLevel === 1) {
        const btn1 = document.getElementById('btn-vlevel-1');
        if (btn1) btn1.className = "p-2.5 rounded-xl font-extrabold text-xs bg-brandPurple text-white shadow-md border border-brandPurple transition";
    }
}

// --- INTERCEPTEUR DE CHANGEMENT D'ONGLET ---
function switchTab(event, tabName) {
    stopSlideshow();
    stopTimeAttack();
    
    if (quizTimeout) clearTimeout(quizTimeout);
    if (speakTimeout) clearTimeout(speakTimeout);
    
    resetQuizToMenu();

    document.querySelectorAll('.tab-content').forEach(el => { el.classList.add('hidden'); el.classList.remove('active'); });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.className = "tab-btn bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-5 py-2.5 rounded-xl font-bold text-sm transition-all transform hover:scale-105";
    });

    const targetTab = document.getElementById(`tab-${tabName}`);
    targetTab.classList.remove('hidden'); targetTab.classList.add('active');
    event.currentTarget.className = "tab-btn bg-brandPurple text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all transform shadow-md scale-105";

    document.getElementById('autoplay-container').className = tabName === 'flash' ? "flex items-center gap-2" : "hidden";

    if (tabName === 'speak') initSpeak();
    if (tabName === 'match') initMatching();
    if (tabName === 'stats') {
        renderBadgesUI();
        renderErrorHistory();
    }
}

// --- COMMUNICATEUR DE RÉSULTAT ---
function processAnswerResult(isCorrect) {
    if (isCorrect) {
        currentStreak++;
        if (currentStreak > maxStreak) maxStreak = currentStreak;
        playSoundEffect('success');
        totalPoints += 10;
        document.getElementById('total-points').innerText = totalPoints;
        updateLevelAndTitle();
        
        if (currentStreak >= 15) checkAndUnlockBadge("streak_15");
    } else {
        currentStreak = 0;
        playSoundEffect('fail');
    }
    document.getElementById('streak-count').innerText = currentStreak;
    document.getElementById('stat-max-streak').innerText = maxStreak;
    saveStats();
}

// --- DICTIONNAIRE ---
function toggleDirectionDico() {
    searchDirection = (searchDirection === 'EN_FR') ? 'FR_EN' : 'EN_FR';
    document.getElementById('direction-label').innerText = (searchDirection === 'EN_FR') ? 'FR ➔ EN' : 'EN ➔ FR';
    document.getElementById('search-input').placeholder = (searchDirection === 'EN_FR') ? 'Rechercher un animal...' : 'Search for an animal...';
    filterWords();
}

function renderDict(data = null) {
    const container = document.getElementById('dict-list');
    if (!container) return;
    container.innerHTML = '';
    
    if (data === null) {
        data = fruitsData.filter(f => f.level === selectedVocabularyLevel);
    }
    if(data.length === 0) {
        container.innerHTML = `<p class="text-center text-sm py-6 text-slate-400 italic">Aucun animal trouvé dans cette zone.</p>`;
        return;
    }

    data.forEach(item => {
        const isFav = favoriteFruits.includes(item.en);
        const div = document.createElement('div');
        div.className = "bg-white dark:bg-darkCard p-3.5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex justify-between items-center cursor-pointer hover:border-brandPurple/40 active:bg-slate-100 dark:active:bg-slate-700 transition duration-150";
        div.onclick = () => playAudio(item.en);
        
        const primaryText = (searchDirection === 'EN_FR') ? item.en : item.fr;
        const secondaryText = (searchDirection === 'EN_FR') ? item.fr : item.en;

        div.innerHTML = `
            <div class="flex items-center gap-4">
                <span class="text-3xl">${item.emoji}</span>
                <div>
                    <p class="font-extrabold text-base text-slate-800 dark:text-white">${primaryText}</p>
                    <p class="text-xs font-bold text-slate-400 dark:text-slate-500">${secondaryText}</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <button onclick="toggleFavorite('${item.en}', event)" class="p-2 text-xl transition text-slate-300 dark:text-slate-600 hover:text-yellow-400 hover:scale-110">
                    <i class="${isFav ? 'fa-solid text-yellow-400' : 'fa-regular'} fa-star"></i>
                </button>
                <span class="text-brandPurple dark:text-brandPurple/80 p-2 text-lg"><i class="fa-solid fa-volume-high"></i></span>
            </div>
        `;
        container.appendChild(div);
    });
}

function filterWords() {
    const query = document.getElementById('search-input').value.toLowerCase();
    let sourceData = fruitsData.filter(f => f.level === selectedVocabularyLevel);
    if(filterOnlyFavs) {
        sourceData = sourceData.filter(f => favoriteFruits.includes(f.en));
    }
    const filtered = sourceData.filter(f => f.en.toLowerCase().includes(query) || f.fr.toLowerCase().includes(query));
    renderDict(filtered);
}

function toggleFavorite(englishName, event) {
    if(event) event.stopPropagation();
    const index = favoriteFruits.indexOf(englishName);
    if (index > -1) favoriteFruits.splice(index, 1);
    else favoriteFruits.push(englishName);
    localStorage.setItem('oe_fav_anim', JSON.stringify(favoriteFruits));
    filterWords();
}

function toggleFavFilter() {
    filterOnlyFavs = !filterOnlyFavs;
    document.getElementById('fav-filter-btn').className = filterOnlyFavs 
        ? "px-4 bg-yellow-400 text-slate-900 border-2 border-yellow-400 rounded-2xl shadow-md transition"
        : "px-4 bg-white dark:bg-darkCard border-2 border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-yellow-500 transition";
    filterWords();
}

// --- FLASHCARDS & DIAPORAMA ---
function updateFlashcard() {
    const card = document.getElementById('main-flashcard');
    if (!card) return;
    card.classList.remove('flipped');
    
    const activeLevelWords = fruitsData.filter(f => f.level === selectedVocabularyLevel);
    if(activeLevelWords.length === 0) return;
    
    if (currentFlashIndex >= activeLevelWords.length) currentFlashIndex = 0;

    setTimeout(() => {
        const item = activeLevelWords[currentFlashIndex];
        document.getElementById('flash-emoji').innerText = item.emoji;
        document.getElementById('flash-en').innerText = item.en;
        document.getElementById('flash-fr').innerText = item.fr;
        if(document.getElementById('autoplay-checkbox').checked && !isSlideshowActive) playAudio(item.en);
    }, 150);
}

function nextFlashcard() { 
    const maxLen = fruitsData.filter(f => f.level === selectedVocabularyLevel).length;
    currentFlashIndex = (currentFlashIndex + 1) % maxLen; 
    updateFlashcard(); 
}
function prevFlashcard() { 
    const maxLen = fruitsData.filter(f => f.level === selectedVocabularyLevel).length;
    currentFlashIndex = (currentFlashIndex - 1 + maxLen) % maxLen; 
    updateFlashcard(); 
}

function toggleSlideshow() { if (isSlideshowActive) stopSlideshow(); else startSlideshow(); }
function startSlideshow() {
    isSlideshowActive = true;
    document.getElementById('slideshow-btn').className = "bg-brandCoral text-white px-5 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase shadow-md hover:scale-105 transition-all";
    document.getElementById('slideshow-btn').innerHTML = `<i class="fa-solid fa-square mr-1"></i> Arrêter le Mode`;
    document.getElementById('flash-prev-btn').disabled = true;
    document.getElementById('flash-next-btn').disabled = true;
    document.getElementById('flash-prev-btn').classList.add('opacity-30');
    document.getElementById('flash-next-btn').classList.add('opacity-30');
    runSlideshowLoop();
}

function stopSlideshow() {
    isSlideshowActive = false;
    clearTimeout(slideshowTimeout);
    const btn = document.getElementById('slideshow-btn');
    if (btn) {
        btn.className = "bg-brandNeonGreen text-slate-950 px-5 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase shadow-md hover:scale-105 transition-all";
        btn.innerHTML = `<i class="fa-solid fa-play mr-1"></i> Lancer le Diaporama`;
    }
    const pB = document.getElementById('flash-prev-btn');
    if(pB) {
        pB.disabled = false; pB.classList.remove('opacity-30');
        document.getElementById('flash-next-btn').disabled = false; document.getElementById('flash-next-btn').classList.remove('opacity-30');
    }
    const card = document.getElementById('main-flashcard');
    if (card) card.classList.remove('flipped');
}

function runSlideshowLoop() {
    if (!isSlideshowActive) return;
    const activeLevelWords = fruitsData.filter(f => f.level === selectedVocabularyLevel);
    const card = document.getElementById('main-flashcard');
    card.classList.remove('flipped');
    playAudio(activeLevelWords[currentFlashIndex].en);

    slideshowTimeout = setTimeout(() => {
        if (!isSlideshowActive) return;
        card.classList.add('flipped');
        slideshowTimeout = setTimeout(() => {
            if (!isSlideshowActive) return;
            currentFlashIndex = (currentFlashIndex + 1) % activeLevelWords.length;
            updateFlashcard();
            runSlideshowLoop();
        }, 3000);
    }, 2500);
}

// --- GESTIONNAIRE D'ÉCRANS DU QUIZ ---
function resetQuizToMenu() {
    document.getElementById('quiz-mode-menu').classList.remove('hidden');
    document.getElementById('quiz-classic-zone').classList.add('hidden');
    document.getElementById('quiz-timeattack-zone').classList.add('hidden');
}

// --- QUIZ CLASSIQUE ---
function launchStandardQuiz() {
    document.getElementById('quiz-mode-menu').classList.add('hidden');
    document.getElementById('quiz-classic-zone').classList.remove('hidden');
    quizStep = 1; quizScore = 0; 
    document.getElementById('quiz-score').innerText = quizScore; 
    generateQuizQuestion();
}

function generateQuizQuestion() {
    if (quizStep > 10) {
        if (quizScore > highScores.quiz) { highScores.quiz = quizScore; saveStats(); }
        if (quizScore === 10) {
            triggerConfetti();
            checkAndUnlockBadge("first_perfect");
        }
        alert(`🔥 Session Terminée ! Score final : ${quizScore}/10.`);
        document.getElementById('stat-high-quiz').innerText = highScores.quiz;
        resetQuizToMenu();
        return;
    }
    document.getElementById('quiz-current').innerText = quizStep;
    
    currentQuizItem = getNextExerciseWord(); 
    document.getElementById('quiz-question').innerText = currentQuizItem.en;

    const activePack = fruitsData.filter(f => f.level === selectedVocabularyLevel);
    let choices = [currentQuizItem.fr];
    while (choices.length < Math.min(4, activePack.length)) {
        let randomFr = activePack[Math.floor(Math.random() * activePack.length)].fr;
        if (!choices.includes(randomFr)) choices.push(randomFr);
    }
    choices.sort(() => Math.random() - 0.5);

    const container = document.getElementById('quiz-options');
    container.innerHTML = '';
    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = "w-full bg-white dark:bg-darkCard border-2 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white p-4 rounded-2xl font-bold text-left transition-all hover:border-brandPurple hover:scale-[1.01] shadow-sm";
        btn.innerText = choice;
        btn.onclick = () => checkQuizAnswer(btn, choice);
        container.appendChild(btn);
    });
}

function checkQuizAnswer(button, selected) {
    document.querySelectorAll('#quiz-options button').forEach(b => b.disabled = true);
    if (selected === currentQuizItem.fr) {
        button.className = "w-full bg-brandNeonGreen text-slate-950 p-4 rounded-2xl font-black text-left shadow-md transition-all animate-bounce";
        quizScore++;
        document.getElementById('quiz-score').innerText = quizScore;
        removeError(currentQuizItem.en);
        processAnswerResult(true);
    } else {
        button.className = "w-full bg-brandCoral text-white p-4 rounded-2xl font-black text-left shadow-md transition-all";
        registerError(currentQuizItem);
        processAnswerResult(false);
        document.querySelectorAll('#quiz-options button').forEach(b => {
            if(b.innerText === currentQuizItem.fr) b.className = "w-full bg-brandNeonGreen text-slate-950 p-4 rounded-2xl font-black text-left transition-all";
        });
    }
    quizTimeout = setTimeout(() => { quizStep++; generateQuizQuestion(); }, 1200);
}

// --- MODE SPEED RUN (TIME ATTACK) ---
function launchTimeAttack() {
    document.getElementById('quiz-mode-menu').classList.add('hidden');
    document.getElementById('quiz-timeattack-zone').classList.remove('hidden');
    
    taScore = 0;
    taTimeLeft = 60;
    document.getElementById('ta-score').innerText = taScore;
    document.getElementById('ta-timer').innerText = taTimeLeft;
    
    generateTAQuestion();

    clearInterval(taTimerInterval);
    taTimerInterval = setInterval(() => {
        taTimeLeft--;
        document.getElementById('ta-timer').innerText = taTimeLeft;
        if (taTimeLeft <= 0) {
            stopTimeAttack(true);
        }
    }, 1000);
}

function generateTAQuestion() {
    currentTAItem = getNextExerciseWord();
    document.getElementById('ta-question').innerText = currentTAItem.en;

    const activePack = fruitsData.filter(f => f.level === selectedVocabularyLevel);
    let choices = [currentTAItem.fr];
    while (choices.length < Math.min(4, activePack.length)) {
        let randomFr = activePack[Math.floor(Math.random() * activePack.length)].fr;
        if (!choices.includes(randomFr)) choices.push(randomFr);
    }
    choices.sort(() => Math.random() - 0.5);

    const container = document.getElementById('ta-options');
    container.innerHTML = '';
    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = "w-full bg-white dark:bg-darkCard border-2 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white p-4 rounded-2xl font-bold text-left transition-all hover:border-brandCoral hover:scale-[1.01] shadow-sm";
        btn.innerText = choice;
        btn.onclick = () => checkTAAnswer(btn, choice);
        container.appendChild(btn);
    });
}

function checkTAAnswer(button, selected) {
    document.querySelectorAll('#ta-options button').forEach(b => b.disabled = true);
    
    if (selected === currentTAItem.fr) {
        taScore++;
        document.getElementById('ta-score').innerText = taScore;
        removeError(currentTAItem.en);
        processAnswerResult(true);
        generateTAQuestion(); 
    } else {
        button.className = "w-full bg-brandCoral text-white p-4 rounded-2xl font-black text-left shadow-md transition-all";
        registerError(currentTAItem);
        processAnswerResult(false);
        taTimeout = setTimeout(() => { generateTAQuestion(); }, 400);
    }
}

function stopTimeAttack(isFinishedFinished = false) {
    clearInterval(taTimerInterval);
    if (taTimeout) clearTimeout(taTimeout);
    
    if (isFinishedFinished) {
        alert(`⏱️ Fin du chrono ! Tu as validé ${taScore} mots !`);
        
        if (taScore >= 20) {
            checkAndUnlockBadge("time_20");
        }

        if (taScore > highScores.timeattack) {
            highScores.timeattack = taScore;
            document.getElementById('stat-high-timeattack').innerText = taScore;
            saveStats();
        }
        resetQuizToMenu();
    }
}

// --- MICRO / SPEAK MODE ---
function initSpeak() {
    speakScore = 0;
    document.getElementById('speak-score').innerText = speakScore;
    generateSpeakQuestion();
}

function generateSpeakQuestion() {
    currentSpeakItem = getNextExerciseWord();
    
    document.getElementById('speak-emoji').innerText = currentSpeakItem.emoji;
    document.getElementById('speak-prompt-fr').innerText = currentSpeakItem.fr;
    
    const resultBox = document.getElementById('speech-result');
    resultBox.className = "hidden text-sm font-bold p-4 rounded-2xl";
    document.getElementById('speech-status').innerText = "CLIQUE SUR LE MICRO POUR PARLER";
    document.getElementById('mic-pulse').classList.add('hidden');
}

function startSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("La reconnaissance vocale n'est pas supportée par ton navigateur. Utilise Google Chrome ou Safari.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const pulse = document.getElementById('mic-pulse');
    const statusText = document.getElementById('speech-status');
    const resultBox = document.getElementById('speech-result');

    pulse.classList.remove('hidden');
    statusText.innerText = "ÉCOUTE EN COURS... PARLE MAINTENANT !";
    resultBox.className = "hidden text-sm font-bold p-4 rounded-2xl";

    recognition.start();

    recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript.trim().toLowerCase();
        const targetWord = currentSpeakItem.en.toLowerCase();
        
        resultBox.classList.remove('hidden');
        resultBox.innerHTML = `Tu as dit : <span class="italic text-base">"${speechResult}"</span>`;

        if (speechResult === targetWord) {
            resultBox.classList.add('bg-green-100', 'text-green-800', 'dark:bg-green-950/40', 'dark:text-green-400');
            statusText.innerText = "GG ! EXCELLENTE PRONONCIATION ! +10 XP";
            
            speakScore++;
            document.getElementById('speak-score').innerText = speakScore;
            
            if (speakScore > highScores.speak) {
                highScores.speak = speakScore;
                document.getElementById('stat-high-speak').innerText = speakScore;
                saveStats();
            }

            removeError(currentSpeakItem.en); 
            processAnswerResult(true);
            
            speakTimeout = setTimeout(() => generateSpeakQuestion(), 2000);

        } else {
            resultBox.classList.add('bg-red-100', 'text-red-800', 'dark:bg-red-950/40', 'dark:text-brandCoral');
            statusText.innerText = "ESSAIE ENCORE, TU Y ES PRESQUE !";
            
            registerError(currentSpeakItem);
            processAnswerResult(false);
        }
    };

    recognition.onspeechend = () => {
        recognition.stop();
        pulse.classList.add('hidden');
    };

    recognition.onerror = () => {
        pulse.classList.add('hidden');
        statusText.innerText = "AUCUN SON DÉTECTÉ. RÉESSAIE !";
    };
}

// --- MATCHING GAME ---
function initMatching() {
    isProcessingMatch = false;
    const grid = document.getElementById('matching-grid'); 
    if(!grid) return;
    grid.innerHTML = '';
    
    const activePack = fruitsData.filter(f => f.level === selectedVocabularyLevel);
    let shuffled = [...activePack].sort(() => Math.random() - 0.5).slice(0, 4);
    
    let englishCards = shuffled.map(f => ({ text: f.en, type: 'en', id: f.en }));
    let frenchCards = shuffled.map(f => ({ text: f.fr, type: 'fr', id: f.en }));
    englishCards.sort(() => Math.random() - 0.5); 
    frenchCards.sort(() => Math.random() - 0.5);

    for(let i=0; i < englishCards.length; i++) {
        const btnEn = document.createElement('button');
        btnEn.className = "bg-white dark:bg-darkCard border-2 border-brandPurple text-brandPurple p-4 rounded-2xl font-black transition-all text-center text-xs sm:text-sm hover:scale-[1.02] shadow-sm";
        btnEn.innerText = englishCards[i].text; btnEn.onclick = () => { btnEn.dataset.id = englishCards[i].id; btnEn.dataset.type = 'en'; handleMatchSelect(btnEn); };

        const btnFr = document.createElement('button');
        btnFr.className = "bg-white dark:bg-darkCard border-2 border-brandCoral text-brandCoral p-4 rounded-2xl font-black transition-all text-center text-xs sm:text-sm hover:scale-[1.02] shadow-sm";
        btnFr.innerText = frenchCards[i].text; btnFr.onclick = () => { btnFr.dataset.id = frenchCards[i].id; btnFr.dataset.type = 'fr'; handleMatchSelect(btnFr); };

        grid.appendChild(btnEn); grid.appendChild(btnFr);
    }
}

function handleMatchSelect(node) {
    if (isProcessingMatch) return;

    if (node.dataset.type === 'en') {
        if (selectedEnglishNode) selectedEnglishNode.classList.remove('bg-brandPurple/20', 'dark:bg-brandPurple/40');
        selectedEnglishNode = node; selectedEnglishNode.classList.add('bg-brandPurple/20', 'dark:bg-brandPurple/40');
    } else {
        if (selectedFrenchNode) selectedFrenchNode.classList.remove('bg-brandCoral/20', 'dark:bg-brandCoral/40');
        selectedFrenchNode = node; selectedFrenchNode.classList.add('bg-brandCoral/20', 'dark:bg-brandCoral/40');
    }

    if (selectedEnglishNode && selectedFrenchNode) {
        if (selectedEnglishNode.dataset.id === selectedFrenchNode.dataset.id) {
            selectedEnglishNode.className = "bg-brandNeonGreen text-slate-950 p-4 rounded-2xl font-black text-center pointer-events-none transition-all text-xs sm:text-sm matched-card shadow-md animate-pulse";
            selectedFrenchNode.className = "bg-brandNeonGreen text-slate-950 p-4 rounded-2xl font-black text-center pointer-events-none transition-all text-xs sm:text-sm matched-card shadow-md animate-pulse";
            removeError(selectedEnglishNode.dataset.id);
            processAnswerResult(true);
            selectedEnglishNode = null; selectedFrenchNode = null;

            const totalMatched = document.querySelectorAll('.matched-card').length;
            if (totalMatched === 8) {
                setTimeout(() => {
                    triggerConfetti();
                    alert("⚡ Épique ! Toutes les paires sont connectées !");
                    initMatching();
                }, 500);
            }
        } else {
            isProcessingMatch = true; 
            const eNode = selectedEnglishNode, fNode = selectedFrenchNode;
            eNode.className = "bg-brandCoral text-white p-4 rounded-2xl font-black text-center shadow-md transition-all";
            fNode.className = "bg-brandCoral text-white p-4 rounded-2xl font-black text-center shadow-md transition-all";
            
            const failFruit = fruitsData.find(f => f.en === eNode.dataset.id);
            if(failFruit) registerError(failFruit);
            
            processAnswerResult(false);
            setTimeout(() => {
                eNode.className = "bg-white dark:bg-darkCard border-2 border-brandPurple text-brandPurple p-4 rounded-2xl font-black transition-all text-center text-xs sm:text-sm shadow-sm";
                fNode.className = "bg-white dark:bg-darkCard border-2 border-brandCoral text-brandCoral p-4 rounded-2xl font-black transition-all text-center text-xs sm:text-sm shadow-sm";
                isProcessingMatch = false; 
            }, 800);
            selectedEnglishNode = null; selectedFrenchNode = null;
        }
    }
}

// --- TROPHÉES ---
function renderBadgesUI() {
    const container = document.getElementById('badges-list');
    if(!container) return;
    container.innerHTML = '';
    
    badgesDatabase.forEach(badge => {
        const isUnlocked = unlockedBadges.includes(badge.id);
        const div = document.createElement('div');
        div.className = `p-3.5 rounded-2xl border flex items-center gap-4 transition-all ${isUnlocked ? 'bg-white dark:bg-slate-800 border-brandNeonGreen/30 opacity-100 shadow-md' : 'bg-slate-100 dark:bg-slate-900/40 border-transparent opacity-30 select-none'}`;
        
        div.innerHTML = `
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${isUnlocked ? badge.color + ' text-white' : 'bg-slate-300 text-slate-500 dark:bg-slate-700'}">
                ${badge.icon}
            </div>
            <div class="text-left">
                <h4 class="font-extrabold text-xs text-slate-800 dark:text-white flex items-center gap-1 uppercase tracking-wide">
                    ${badge.title} 
                    ${isUnlocked ? '<i class="fa-solid fa-circle-check text-brandNeonGreen text-[11px]"></i>' : ''}
                </h4>
                <p class="text-[10px] text-slate-400 dark:text-slate-400 font-bold mt-0.5 leading-tight">${badge.desc}</p>
            </div>
        `;
        container.appendChild(div);
    });
}

// --- CARNET DE RÉVISIONS ---
function renderErrorHistory() {
    const container = document.getElementById('error-history-list');
    if (!container) return;
    container.innerHTML = '';

    if (errorHistory.length === 0) {
        container.innerHTML = `<p class="text-slate-400 dark:text-slate-500 italic text-center text-xs py-5 font-bold">🎯 Aucune erreur ! Tu gères la faune à la perfection.</p>`;
        return;
    }

    errorHistory.forEach(item => {
        const div = document.createElement('div');
        div.className = "flex items-center justify-between p-3 bg-brandCoral/5 dark:bg-brandCoral/10 border border-brandCoral/20 rounded-xl text-xs";
        div.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="text-lg">${item.emoji}</span>
                <span class="font-black text-brandPurple dark:text-brandCoral">${item.en}</span>
                <span class="text-slate-400 font-bold">(${item.fr})</span>
            </div>
            <button onclick="clearWordFromRevision('${item.en}')" class="bg-brandNeonGreen/20 text-brandNeonGreen border border-brandNeonGreen/20 hover:bg-brandNeonGreen hover:text-slate-900 font-black tracking-wider uppercase transition px-2.5 py-1 rounded-lg text-[10px]">
                <i class="fa-solid fa-check"></i> Acquis
            </button>
        `;
        container.appendChild(div);
    });
}

function clearWordFromRevision(englishName) {
    removeError(englishName);
    renderErrorHistory();
}