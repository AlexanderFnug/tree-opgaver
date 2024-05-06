const dialogueText = document.getElementById('dialogueText');
const choiceButtons = document.getElementById('choiceButtons');
const scorePanel = document.getElementById('scorePanel'); // Element to display scores

let scores = {
    death: 0,
    insanity: 0,
    escape: 0
};

function updateScores(deathChange, insanityChange, escapeChange) {
    scores.death += deathChange;
    scores.insanity += insanityChange;
    scores.escape += escapeChange;
    displayScores(); // Update the score display after every change
    updateBackgroundImage(); // Update the background image based on new scores
}

function updateBackgroundImage() {
    if (scores.escape > 5) {
        //upgrade background image of body
        document.body.style.backgroundImage = "url('neutral_spirit.webp')";

    } else if (scores.death > 10) {
        //upgrade background image of body
        document.body.style.backgroundImage = "url('insanity_background.webp')";

    } else if (scores.insanity > 10){
        //upgrade background image of body
        document.body.style.backgroundImage = "url('insanity_background.webp')";
    }
     else {
        //upgrade background image of body
        document.body.style.backgroundImage = "url('background.webp')";
    }
}

function displayScores() {
    scorePanel.innerHTML = `Death: ${scores.death}<br>Insanity: ${scores.insanity}<br>Escape: ${scores.escape}`;
}

function displayDialogue(text, choices, imageUrl) {
    dialogueText.textContent = text;
    choiceButtons.innerHTML = '';  // Clear previous choices
    if (imageUrl) {
        endingImage.src = imageUrl;  // Set the image source if provided
        endingImage.style.display = 'block';  // Make sure the image is visible
    } else {
        endingImage.style.display = 'none';  // Hide the image if not relevant
    }
    choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.onclick = () => choice.action();
        choiceButtons.appendChild(button);
    });
    displayScores(); // Update the score display
}



function startGame() {
    displayDialogue("You wake up in a dark room with a mysterious figure in front of you.", [
        { text: "Who are you?", action: () => firstChoice() },
        { text: "What do you want from me?", action: () => secondChoice() },
        { text: "Can we find peace?", action: () => thirdChoice() }
    ]);
}

function secondChoice() {
    updateScores(10, 10, 0);
    displayDialogue("Your soul wanders in my domain.", [
        { text: "Never!", action: () => escapeSuccessfully() }, // Direct to an escape scenario
        { text: "How can I serve you to win my freedom?", action: () => goThroughWithSacrifice() } // Direct to a moral dilemma ending
    ]);
}

function thirdChoice() {
    updateScores(0, 5, 10);
    displayDialogue("Peace? Only through sacrifice.", [
        { text: "I'm prepared to sacrifice.", action: () => proceedWithSacrifice() }, // Direct to a sacrifice scenario
        { text: "I refuse to sacrifice anyone.", action: () => weighRisksAndDecide() } // Direct to a continued endurance scenario
    ]);
}
function firstChoice() {
    updateScores(0, 10, 5);
    displayDialogue("I am your worst nightmare.", [
        { text: "What do you want with me?", action: () => firstSubChoiceA() },
        { text: "I recognize your power.", action: () => firstSubChoiceB() }
    ]);
}

function firstSubChoiceA() {
    updateScores(5, 10, 0);
    displayDialogue("To see you suffer. Would you dare defy me?", [
        { text: "Defy", action: () => endureAttack() },
        { text: "Submit", action: () => pleadForMercy() }
    ]);
}

function firstSubChoiceB() {
    updateScores(0, 5, 10);
    displayDialogue("You show wisdom, but can you prove your worth?", [
        { text: "Prove worth", action: () => proveWorth() },
        { text: "Seek alliance", action: () => offerTruce() }
    ]);
}

function secondChoice() {
    updateScores(10, 10, 0);
    displayDialogue("Your soul wanders in my domain.", [
        { text: "Never!", action: () => secondSubChoiceA() },
        { text: "How can I serve you to win my freedom?", action: () => secondSubChoiceB() }
    ]);
}

function secondSubChoiceA() {
    updateScores(10, 10, 10);
    displayDialogue("Your defiance amuses me. What will you do?", [
        { text: "Fight", action: () => fightSpirit() },
        { text: "Escape", action: () => escapeSuccessfully() }
    ]);
}

function secondSubChoiceB() {
    updateScores(0, 5, 10);
    displayDialogue("Serve me well and I may spare you. What do you offer?", [
        { text: "Offer service", action: () => serveSpirit() },
        { text: "Offer sacrifice", action: () => goThroughWithSacrifice() }
    ]);
}

function thirdChoice() {
    updateScores(0, 10, 10);
    displayDialogue("Peace? Only through sacrifice.", [
        { text: "I'm prepared to sacrifice.", action: () => thirdSubChoiceA() },
        { text: "I refuse to sacrifice anyone.", action: () => thirdSubChoiceB() }
    ]);
}

function thirdSubChoiceA() {
    updateScores(0, 10, 10);
    displayDialogue("Whom will you sacrifice?", [
        { text: "Sacrifice self", action: () => proceedWithSacrifice() },
        { text: "Sacrifice another", action: () => sacrificeAnother() }
    ]);
}

function thirdSubChoiceB() {
    updateScores(20, 5, 10);
    displayDialogue("So, you choose to defy me?", [
        { text: "Defy", action: () => resistSpirit() },
        { text: "Negotiate", action: () => weighRisksAndDecide() }
    ]);
}



// Implementing additional endings or dialogue conclusions
function pleadForMercy() {
    displayDialogue("The spirit spares you but at a cost of your dignity and freedom.", [], 'insanity.webp');
}

function proveWorth() {
    displayDialogue("You engage in a trial set by the spirit, proving your worth and earning a begrudging respect.", [], 'escape.webp');
}

function fightSpirit() {
    displayDialogue("You bravely confront the spirit, but it overwhelms you. Your last moments are filled with regret and pain.", [], 'death.webp');
}

function serveSpirit() {
    displayDialogue("You agree to serve the spirit, surrendering your freedom for a promise of safety.", [], 'insanity.webp');
}

function sacrificeAnother() {
    displayDialogue("You choose another to sacrifice. The guilt of your decision haunts you even as you gain your freedom.", [], 'death.webp');
}

function resistSpirit() {
    displayDialogue("You resist the spirit's demands, enduring its wrath as you seek another escape.", [], 'insanity.webp');
}


// Add appropriate image URLs in the final functions
function endureAttack() {
    displayDialogue("You barely withstand the spirit's wrath, but your resolve strengthens.", [], 'insanity.webp');
}

function offerTruce() {
    displayDialogue("The spirit accepts the truce, cautiously. You live to see another day, always aware that peace with such a being is fragile and temporary.", [], 'escape.webp');
}

function escapeSuccessfully() {
    displayDialogue("You seize the moment and escape the dark room, evading the grasp of the spirit. The night’s horrors linger in your mind, haunting you forever.", [], 'escape.webp');
}

function goThroughWithSacrifice() {
    displayDialogue("With a heavy heart, you sacrifice another soul to the spirit. The act grants you freedom but at a great moral cost. You escape, but the guilt of your choice weighs on you eternally.", [], 'death.webp');
}

function proceedWithSacrifice() {
    displayDialogue("You make a personal sacrifice, enduring great pain and loss. The spirit honors your sacrifice, granting you freedom, but you are forever changed by the ordeal.", [], 'escape.webp');
}

function weighRisksAndDecide() {
    displayDialogue("After careful consideration, you decide the risks are too great. You choose to endure the spirit’s domain, seeking another way to escape that may never come.", [], 'death.webp');
}

startGame();
