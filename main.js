let score = 0
alert("The following is a version of the AX-CPT! The instructions are simple: press the space bar every time a letter appears, UNLESS it's an X. Press OK to continue!");

const display = document.querySelector("#display-screen");
const scoreDisplay = document.querySelector("#score-display");
const letters = ["N", "F", "X", "Y", "A", "B", "C", "X", "D", "M", "U", "X", "N", "X", "P", "K", "I", "O", "X", "Z", "E", "D", "F", "X", "X", "B", "K", "I", "M", "X", "O", "N", "Z", "A", "F", "O", "X", "Z", "E", "M", "U,", "G", "A", "L", "O", "X", "V", "U", "I", "P", "M", "E", "F", "X", "O", "J", "T", "L", "G", "U", "H", "L", "I", "A", "X", "B", "Y", "N", "K", "H", "P", "T", "Z", "X", "J", "M", "P", "O", "Y", "U", "L", "Z", "I", "M", "T", "B", "O", "H", "D", "A", "X", "Q", "X", "I", "Z", "Y", "P", "G", "X", "X", "N", "Q", "S", "Z", "H", "X", "P", "L", "A", "U"];
const letterDuration = 400;
const blankDuration = 700;
const delayBetweenLetters = letterDuration + blankDuration;
const pressCounts = new Map(letters.map((letter) => [letter, 0]));
const results = document.querySelector("#results");
const resultsBody = document.querySelector("#results-body");
let currentLetter = letters[0];
let sequenceComplete = false;

display.textContent = currentLetter;

setTimeout(() => {
    currentLetter = null;
    display.textContent = "";
}, letterDuration);

document.addEventListener("keydown", (event) => {
if (event.code !== "Space" || event.repeat || sequenceComplete || currentLetter === null) {
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

        setTimeout(() => {
            currentLetter = null;
            display.textContent = "";
        }, letterDuration);
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