let score = 0
alert("The following is a version of the AX-CPT! The instructions are simple: press the space bar every time a letter apprear, UNLESS it's an X. Press OK to continue!");

const display = document.querySelector("#display-screen");
const scoreDisplay = document.querySelector("#score-display");
const letters = ["N", "F", "X", "Y", "A", "B", "C", "X", "D", "M", "U", "X", ];
const delayBetweenLetters = 2000;
const pressCounts = new Map(letters.map((letter) => [letter, 0]));
const results = document.querySelector("#results");
const resultsBody = document.querySelector("#results-body");
let currentLetter = letters[0];
let sequenceComplete = false;

display.textContent = currentLetter;

document.addEventListener("keydown", (event) => {
    if (event.code !== "Space" || event.repeat || sequenceComplete) {
        return;
    }

    event.preventDefault();
    score += 1;
    pressCounts.set(currentLetter, pressCounts.get(currentLetter) + 1);
});

letters.slice(1).forEach((letter, index) => {
    setTimeout(() => {
        currentLetter = letter;
        display.textContent = letter;
    }, (index + 1) * delayBetweenLetters);
});

setTimeout(() => {
    sequenceComplete = true;
    display.textContent = "";

    for (const [letter, count] of pressCounts) {
        const row = resultsBody.insertRow();
        row.insertCell().textContent = letter;
        row.insertCell().textContent = String(count);
    }

    results.hidden = false;
}, letters.length * delayBetweenLetters);