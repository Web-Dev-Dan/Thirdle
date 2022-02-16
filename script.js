'use strict'

// Arrays
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',];
const words = ['cat', 'dog', 'ant', 'art', 'ham', 'hat'];

// Generate Random Word
const randomNumber = Math.floor(Math.random() * words.length);
let randomWord = words[randomNumber];
let randomWordArray = randomWord.split('');
console.log(randomWord);


/* ----- GAMEPLAY ----- */
// User Guess
let userGuess = [];

// Turn Number
let turn = 1;
let currentLetter = 0;

// DOM
const top1 = document.querySelector('.top-1');
const top2 = document.querySelector('.top-2');
const top3 = document.querySelector('.top-3');
const mid1 = document.querySelector('.mid-1');
const mid2 = document.querySelector('.mid-2');
const mid3 = document.querySelector('.mid-3');
const bot1 = document.querySelector('.bot-1');
const bot2 = document.querySelector('.bot-2');
const bot3 = document.querySelector('.bot-3');


/* ----- FUNCTIONALITY ----- */
const keys = document.querySelectorAll('.key');

keys.forEach((key) => {
    key.addEventListener('click', (e) => {
        checkKey(e.target.textContent);
    });
});

document.addEventListener('keydown', (e) => {
    checkKey(e.key);
});

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

function addLetter(letter) {
    if (userGuess.length < 3) {
        userGuess.push(letter);
        console.log(userGuess);
    } else {
        return;
    }
}

function deleteLetter() {
    if (userGuess.length > 0) {
        userGuess.pop();
        console.log(userGuess);
    } else {
        return;
    }
}

function submitGuess() {
    if (userGuess.length === 3) {
        console.log(userGuess.join(''));
        userGuess = [];
    } else {
        return;
    }
}
