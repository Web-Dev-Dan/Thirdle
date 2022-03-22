'use strict'

// Arrays
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',];
const words = ['ace', 'act', 'add', 'age', 'aid', 'aim', 'air', 'ale', 'all', 'and', 'ant', 'any', 'ape', 'app', 'apt', 'arc', 'are', 'arm', 'art', 'ash', 'act', 'ate', 'awe', 'axe', 'bad', 'bag', 'ban', 'bar', 'bat', 'bed', 'bee', 'beg', 'bet', 'bid', 'big', 'bin', 'bug', 'bye', 'cap', 'car', 'cat', 'cod', 'cog', 'dig', 'dim', 'dog', 'dry', 'egg', 'ego', 'far', 'fin', 'ham', 'hut', 'lie', 'low', 'mad', 'map', 'man', 'now', 'oak', 'odd', 'pad', 'pay', 'pen', 'pet', 'pin', 'red', 'rye', 'sad', 'sit', 'shy', 'tin', 'wax'];

// Generate Random Word
const randomNumber = Math.floor(Math.random() * words.length);
let randomWord = words[randomNumber];
let randomWordArray = randomWord.split('');

/* ----- 🕹 GAMEPLAY 🕹 ----- */
// User Guess
let userGuess = [];
let correctLetterArray = [];

// Turn Number
let turn = 1;
let currentLetter = 0;

// Game Status
let isGameWon = false;

// Points
let points = 100;

// Stats
let totalPoints = 0;
let gamesPlayed = 0;
let gamesWon = 0;
let gamesLost = 0;
let hintsUsed = 0;
let winPercentage = 0;
let losePercentage = 0;

// DOM Elements (tiles)
const top1 = document.querySelector('.top-1');
const top2 = document.querySelector('.top-2');
const top3 = document.querySelector('.top-3');
const mid1 = document.querySelector('.mid-1');
const mid2 = document.querySelector('.mid-2');
const mid3 = document.querySelector('.mid-3');
const bot1 = document.querySelector('.bot-1');
const bot2 = document.querySelector('.bot-2');
const bot3 = document.querySelector('.bot-3');


/* ----- 🔠 TYPING FUNCTIONALITY 🔠 ----- */
const keys = document.querySelectorAll('.key');

// Keyboard
keys.forEach((key) => {
    key.addEventListener('click', (e) => {
        checkKey(e.target.textContent);
    });
});

// Onscreen Keyboard
document.addEventListener('keydown', (e) => {
    checkKey(e.key);
});

// Check Key
function checkKey(key) {
    if (alphabet.includes(key)) {
        addLetter(key);
    } else if (key === 'Enter') {
        submitGuess();
    } else if (key === 'Delete' || key === 'Backspace') {
        deleteLetter();
    } else {
        return;
    }
}

// Add Letter to Onscreen Display (Tiles):
function addLetter(letter) {
    if (userGuess.length < 3) {
        userGuess.push(letter);
       
        // Modify DOM:
        if (turn === 1) {
            top1.textContent = userGuess[0];
            top2.textContent = userGuess[1];
            top3.textContent = userGuess[2];
        } else if (turn === 2) {
            mid1.textContent = userGuess[0];
            mid2.textContent = userGuess[1];
            mid3.textContent = userGuess[2];
        } else if (turn === 3) {
            bot1.textContent = userGuess[0];
            bot2.textContent = userGuess[1];
            bot3.textContent = userGuess[2];
        }
    } else {
        return;
    }
}

// Delete Previous Letter:
function deleteLetter() {
    if (userGuess.length > 0) {
        userGuess.pop();

        // Modify DOM:
        if (turn === 1) {
            top1.textContent = userGuess[0];
            top2.textContent = userGuess[1];
            top3.textContent = userGuess[2];
        } else if (turn === 2) {
            mid1.textContent = userGuess[0];
            mid2.textContent = userGuess[1];
            mid3.textContent = userGuess[2];
        } else if (turn === 3) {
            bot1.textContent = userGuess[0];
            bot2.textContent = userGuess[1];
            bot3.textContent = userGuess[2];
        }
    } else {
        return;
    }
}

// Submit Guess:
function submitGuess() {
    if (userGuess.length === 3) {
        checkGuess();
        userGuess = [];
        turn++;
    } else {
        return;
    }
}

function checkGuess() {
    changeColours();
    checkWin();
}

// Update Tile Colours:
function changeColours() {
    if (turn === 1) {
        if (userGuess[0] === randomWordArray[0]) {
            top1.classList.add('correct');
            correctLetterArray.push(userGuess[0]);
        } else if (userGuess[0] !== randomWordArray[0] && randomWordArray.includes(userGuess[0])) {
            top1.classList.add('wrong-location');
        } else if (userGuess[0] !== randomWordArray[0]) {
            top1.classList.add('wrong');
        }

        if (userGuess[1] === randomWordArray[1]) {
            top2.classList.add('correct');
            correctLetterArray.push(userGuess[1]);
        } else if (userGuess[1] !== randomWordArray[1] && randomWordArray.includes(userGuess[1])) {
            top2.classList.add('wrong-location');
        } else if (userGuess[1] !== randomWordArray[1]) {
            top2.classList.add('wrong');
        }

        if (userGuess[2] === randomWordArray[2]) {
            top3.classList.add('correct');
            correctLetterArray.push(userGuess[2]);
        } else if (userGuess[2] !== randomWordArray[2] && randomWordArray.includes(userGuess[2])) {
            top3.classList.add('wrong-location');
        } else if (userGuess[2] !== randomWordArray[2]) {
            top3.classList.add('wrong');
        }
    } else if (turn === 2) {
        if (userGuess[0] === randomWordArray[0]) {
            mid1.classList.add('correct');
            correctLetterArray.push(userGuess[0]);
        } else if (userGuess[0] !== randomWordArray[0] && randomWordArray.includes(userGuess[0])) {
            mid1.classList.add('wrong-location');
        } else if (userGuess[0] !== randomWordArray[0]) {
            mid1.classList.add('wrong');
        }

        if (userGuess[1] === randomWordArray[1]) {
            mid2.classList.add('correct');
            correctLetterArray.push(userGuess[1]);
        } else if (userGuess[1] !== randomWordArray[1] && randomWordArray.includes(userGuess[1])) {
            mid2.classList.add('wrong-location');
        } else if (userGuess[1] !== randomWordArray[1]) {
            mid2.classList.add('wrong');
        }

        if (userGuess[2] === randomWordArray[2]) {
            mid3.classList.add('correct');
            correctLetterArray.push(userGuess[2]);
        } else if (userGuess[2] !== randomWordArray[2] && randomWordArray.includes(userGuess[2])) {
            mid3.classList.add('wrong-location');
        } else if (userGuess[2] !== randomWordArray[2]) {
            mid3.classList.add('wrong');
        }
    } else if (turn === 3) {
        if (userGuess[0] === randomWordArray[0]) {
            bot1.classList.add('correct');
            correctLetterArray.push(userGuess[0]);
        } else if (userGuess[0] !== randomWordArray[0] && randomWordArray.includes(userGuess[0])) {
            bot1.classList.add('wrong-location');
        } else if (userGuess[0] !== randomWordArray[0]) {
            bot1.classList.add('wrong');
        }

        if (userGuess[1] === randomWordArray[1]) {
            bot2.classList.add('correct');
            correctLetterArray.push(userGuess[1]);
        } else if (userGuess[1] !== randomWordArray[1] && randomWordArray.includes(userGuess[1])) {
            bot2.classList.add('wrong-location');
        } else if (userGuess[1] !== randomWordArray[1]) {
            bot2.classList.add('wrong');
        }

        if (userGuess[2] === randomWordArray[2]) {
            bot3.classList.add('correct');
            correctLetterArray.push(userGuess[2]);
        } else if (userGuess[2] !== randomWordArray[2] && randomWordArray.includes(userGuess[2])) {
            bot3.classList.add('wrong-location');
        } else if (userGuess[2] !== randomWordArray[2]) {
            bot3.classList.add('wrong');
        }
    }
}


// Hint
let hintUsed = false;
const hintBtn = document.querySelector('.stats-btn__hint');
const hintBackground = document.querySelector('.hint-background');
const hintContainer = document.querySelector('.hint-container');
const hintModal = document.querySelector('.hint-modal');
const hintModalText = document.querySelector('.hint-modal-text');
const closeHintModalBtn = document.querySelector('.hint-modal-btn');
const hintLetterCircle = document.querySelector('.hint-letter');

hintBtn.addEventListener('click', getHint);

function getHint() {
    if (hintBtn.classList.contains('btn-disabled')) {
        return;
    } else {
        hintBtn.classList.add('btn-disabled');
        hintUsed = true;
        openHintModal();
    }
}

function openHintModal() {
    hintBackground.style.display = 'flex';
    hintContainer.style.display = 'flex';
    hintModal.style.display = 'flex';
    closeHintModalBtn.classList.add('hint-modal-btn-in');

    function chooseHintLetter() {
        let hintLetter = randomWordArray[Math.floor(Math.random() * randomWordArray.length)];
        hintModalText.textContent = hintLetter.toUpperCase();
    }

    chooseHintLetter();
}

closeHintModalBtn.addEventListener('click', function () {
    hintLetterCircle.style.display = 'flex';
    hintLetterCircle.style.zIndex = '50';
    hintLetterCircle.textContent = hintModalText.textContent;
    hintBackground.style.display = 'none';
    hintContainer.style.display = 'none';
    hintModal.style.display = 'none';
    hintsUsed += 1;
});

// Stats
const statsBtn = document.querySelectorAll('.stats-btn__stats');
const closeStatsBtn = document.querySelector('.stats-modal-close-btn');
const statsModalBackground = document.querySelector('.stats-modal-background');
const statsModal = document.querySelector('.stats-modal');

statsBtn.forEach(btn => {
    btn.addEventListener('click', openStatsModal);
});

closeStatsBtn.addEventListener('click', closeStatsModal);
statsModalBackground.addEventListener('click', closeStatsModal);

function openStatsModal() {
    statsModalBackground.style.display = 'flex';
    statsModal.style.display = 'flex';
    updateDate();
    updateStats();
}

function closeStatsModal() {
    statsModalBackground.style.display = 'none';
    statsModal.style.display = 'none';
}


// Rules
const rulesBtn = document.querySelector('.stats-btn__rules');
const closeRulesBtn = document.querySelector('.rules-modal-close-btn');
const rulesModalBackground = document.querySelector('.rules-modal-background');
const rulesModal = document.querySelector('.rules-modal');

rulesBtn.addEventListener('click', openRulesModal);
closeRulesBtn.addEventListener('click', closeRulesModal);
rulesModalBackground.addEventListener('click', closeRulesModal);

function openRulesModal() {
    rulesModalBackground.style.display = 'flex';
    rulesModal.style.display = 'flex';
    updateDate();
}

function closeRulesModal() {
    rulesModalBackground.style.display = 'none';
    rulesModal.style.display = 'none';
}

function updateDate() {
    const currentDate = document.querySelectorAll('#currentDate');

    currentDate.forEach(year => {
        const currentYear = new Date().getFullYear();
        year.textContent = currentYear;
    });
}


// Check whether the user has won or not
const winModal_correctAnswerText = document.getElementById('winAnswer');
const loseModal_correctAnswerText = document.getElementById('loseAnswer');
const winModal_pointsText = document.getElementById('gamePointsWin');
const loseModal_pointsText = document.getElementById('gamePointsLose');
const winModal_hintText = document.getElementById('usedHintWin');
const loseModal_hintText = document.getElementById('usedHintLose');

function checkWin() {
    if (userGuess.join('') === randomWord) {
        if (turn === 1) {
            points -= 0;
        } else if (turn === 2) {
            points -= 25;
        } else if (turn === 3) {
            points -= 50;
        }
        setTimeout(winModalIn, 1000);
        if (hintUsed === true) {
            winModal_hintText.textContent = "used";
            points -= 25;
        } else {
            winModal_hintText.textContent = "didn't use";
        }
        winModal_correctAnswerText.textContent = randomWord;
        winModal_pointsText.textContent = points;
    } else if (userGuess.join('') !== randomWordArray) {
        if (turn === 3) {
            setTimeout(loseModalIn, 1000);
            if (hintUsed === true) {
                loseModal_hintText.textContent = "used";
                points -= 100;
            } else {
                loseModal_hintText.textContent = "didn't use";
                points -= 75;
            }
            loseModal_correctAnswerText.textContent = randomWord;
            loseModal_pointsText.textContent = points;
        } else {
            return;
        }
    }

    // Display Turn Number
    const turnNumberText = document.getElementById('turnNumber');
    if (turn === 1) {
        turnNumberText.textContent = 'first';
    } else if (turn === 2) {
        turnNumberText.textContent = 'second';
    } else if (turn === 3) {
        turnNumberText.textContent = 'third';
    }
}

function chooseRandomWord() {
    const randomNumber = Math.floor(Math.random() * words.length);
    randomWord = words[randomNumber];
    randomWordArray = randomWord.split('');
    console.log(randomWord);
}


// ---------- IN-GAME ANIMATIONS ----------
const modalBackground = document.querySelector('.background');
const modalContainer = document.querySelector('.modal-container');
const modal = document.querySelector('.modal');
const modalBody = document.querySelector('.modal-content');
const loseModalBody = document.querySelector('.lose-modal-content');

function winModalIn() {
    modalBackground.classList.add('modal-background-shown');
    modalContainer.style.display = 'flex';
    modal.classList.add('modal-in-animation');
    setTimeout(() => {
        modalBody.classList.add('text-fade-animation');
    }, 500);
    totalPoints += points;
    gamesPlayed += 1;
    gamesWon += 1;
}

function loseModalIn() {
    modalBackground.classList.add('modal-background-shown');
    modalContainer.style.display = 'flex';
    modal.classList.add('modal-in-animation');
    setTimeout(() => {
        loseModalBody.classList.add('text-fade-animation');
    }, 500);
    totalPoints += points;
    gamesPlayed += 1;
    gamesLost += 1;
}


// ---------- 🧠 POINTS AND STATS 🧠 ----------
const totalPointsText = document.getElementById('totalPointsText');
const winPercentageText = document.getElementById('winPercentageText');
const losePercentageText = document.getElementById('losePercentageText');
const statsBarCorrectColour = document.querySelector('.stats-bar__correct-colour');

const gamesPlayedText = document.getElementById('gamesPlayedText');
const gamesWonText = document.getElementById('gamesWonText');
const gamesLostText = document.getElementById('gamesLostText');
const hintsUsedText = document.getElementById('hintsUsedText');

function updateStats() {
    totalPointsText.textContent = totalPoints;
    gamesPlayedText.textContent = gamesPlayed;
    gamesWonText.textContent = gamesWon;
    gamesLostText.textContent = gamesLost;
    hintsUsedText.textContent = hintsUsed;

    if (gamesPlayed === 0) {
        return;
    } else {
        winPercentage = Math.round((gamesWon * 100) / gamesPlayed);
        winPercentageText.textContent = winPercentage;
        losePercentageText.textContent = 100 - winPercentage;
        statsBarCorrectColour.style.width = `${winPercentage}%`;
    }
}


// RESET STATS
const openResetStatsBtn = document.querySelector('.reset-btn');
const resetModalBackground = document.querySelector('.reset-modal-background');
const resetModalContainer = document.querySelector('.reset-modal-container');
const cancelResetStatsBtn = document.getElementById('closeResetModalBtn');
const resetStatsBtn = document.getElementById('resetStatsBtn');

openResetStatsBtn.addEventListener('click', openResetStats);
cancelResetStatsBtn.addEventListener('click', closeResetStats);
resetStatsBtn.addEventListener('click', resetStats);

function openResetStats() {
    resetModalBackground.style.display = 'flex';
    resetModalContainer.style.display = 'flex';
}

function closeResetStats() {
    resetModalBackground.style.display = 'none';
    resetModalContainer.style.display = 'none';
}

function resetStats() {
    resetModalBackground.style.display = 'none';
    resetModalContainer.style.display = 'none';

    points = 100;
    turn = 1;

    totalPoints = 0;
    gamesPlayed = 0;
    gamesWon = 0;
    gamesLost = 0;
    hintsUsed = 0;
    winPercentage = 0;
    losePercentage = 0;

    winPercentageText.textContent = 0;
    losePercentageText.textContent = 0;
    statsBarCorrectColour.style.width = '0%';

    updateStats();
    playAgain();
}


// PLAY AGAIN
const playAgainBtn = document.querySelectorAll('#playAgainBtn');

playAgainBtn.forEach(btn => {
    btn.addEventListener('click', function () {
        playAgain();
    })
});

function playAgain() {
    // Choose New Word
    randomWord = words[Math.floor(Math.random() * words.length)];
    randomWordArray = randomWord.split('');

    // Gameplay Reset
    userGuess = [];
    correctLetterArray = [];
    turn = 1;
    currentLetter = 0;
    isGameWon = false;
    points = 100;

    // Hint Reset
    hintUsed = false;
    hintLetterCircle.style.display = 'none';
    hintLetterCircle.style.zIndex = '0';
    hintBtn.classList.remove('btn-disabled');
    closeHintModalBtn.classList.remove('hint-modal-btn-in');

    modalBackground.classList.remove('modal-background-shown');
    modalContainer.style.display = 'none';
    modal.classList.remove('modal-in-animation');
    modalBody.classList.remove('text-fade-animation');
    loseModalBody.classList.remove('text-fade-animation');

    top1.textContent = '';
    top1.classList.remove('correct');
    top1.classList.remove('wrong-location');
    top1.classList.remove('wrong');

    top2.textContent = '';
    top2.classList.remove('correct');
    top2.classList.remove('wrong-location');
    top2.classList.remove('wrong');

    top3.textContent = '';
    top3.classList.remove('correct');
    top3.classList.remove('wrong-location');
    top3.classList.remove('wrong');

    mid1.textContent = '';
    mid1.classList.remove('correct');
    mid1.classList.remove('wrong-location');
    mid1.classList.remove('wrong');

    mid2.textContent = '';
    mid2.classList.remove('correct');
    mid2.classList.remove('wrong-location');
    mid2.classList.remove('wrong');

    mid3.textContent = '';
    mid3.classList.remove('correct');
    mid3.classList.remove('wrong-location');
    mid3.classList.remove('wrong');

    bot1.textContent = '';
    bot1.classList.remove('correct');
    bot1.classList.remove('wrong-location');
    bot1.classList.remove('wrong');

    bot2.textContent = '';
    bot2.classList.remove('correct');
    bot2.classList.remove('wrong-location');
    bot2.classList.remove('wrong');

    bot3.textContent = '';
    bot3.classList.remove('correct');
    bot3.classList.remove('wrong-location');
    bot3.classList.remove('wrong');
}
