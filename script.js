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
        console.log(userGuess);
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
        console.log(userGuess);
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
        console.log(userGuess.join(''));
        checkGuess(); /* (to modify DOM) */
        userGuess = [];
        turn++;
    } else {
        return;
    }
}

function checkGuess() {
    // console.log(userGuess);
    // console.log(randomWordArray);
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
    console.log('Hint modal opened!');
    hintBackground.style.display = 'flex';
    hintContainer.style.display = 'flex';
    hintModal.style.display = 'flex';
    closeHintModalBtn.classList.add('hint-modal-btn-in');

    function chooseHintLetter() {
        let hintLetter = randomWordArray[Math.floor(Math.random() * randomWordArray.length)];
        hintModalText.textContent = hintLetter.toUpperCase();
        console.log(hintLetter);
        console.log(correctLetterArray);
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
});


// Stats
const statsBtn = document.querySelectorAll('.stats-btn__stats');
statsBtn.forEach(btn => {
    btn.addEventListener('click', openStatsModal);
});

function openStatsModal() {
    console.log('Stats modal opened');
}

// Rules
const rulesBtn = document.querySelector('.stats-btn__rules');

rulesBtn.addEventListener('click', openRulesModal);

function openRulesModal() {
    console.log('Rules modal opened');
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
        console.log('CONGRATS!');
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
        console.log('Points:' + points);
    } else if (userGuess.join('') !== randomWordArray) {
        if (turn === 3) {
            console.log('GAME OVER! The answer was ' + randomWord);
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
            console.log('Points:' + points);
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
    // winModal_correctAnswerText.forEach((answer) => {
    //     answer.textContent = randomWord;
    // });
}

function loseModalIn() {
    modalBackground.classList.add('modal-background-shown');
    modalContainer.style.display = 'flex';
    modal.classList.add('modal-in-animation');
    setTimeout(() => {
        loseModalBody.classList.add('text-fade-animation');
    }, 500);
}



// PLAY AGAIN
const playAgainBtn = document.querySelectorAll('#playAgainBtn');

playAgainBtn.forEach(btn => {
    btn.addEventListener('click', function () {
        playAgain();
    })
});

function playAgain() {
    location.reload();
}
