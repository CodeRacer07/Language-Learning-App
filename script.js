const words = [
    { english: "Hello", translation: "Hola" },
    { english: "Thank You", translation: "Gracias" },
    { english: "Good Morning", translation: "Buenos Dias" },
    { english: "Friend", translation: "Amigo" },
    { english: "Water", translation: "Agua" }
];

const facts = [
    "👋 Hola means Hello in Spanish.",
    "🙏 Gracias means Thank You in Spanish.",
    "🌅 Buenos Dias means Good Morning in Spanish.",
    "🤝 Amigo means Friend in Spanish.",
    "💧 Agua means Water in Spanish."
];

let current = 0;

let viewed = Number(localStorage.getItem("viewed")) || 0;
let score = Number(localStorage.getItem("score")) || 0;

document.getElementById("score").textContent = score;
document.getElementById("wordsViewed").textContent = viewed;

showWord();
updateLevel();
updateProgressBar();

function showWord() {

    document.getElementById("englishWord").textContent =
        words[current].english;

    document.getElementById("translation").textContent = "";

    document.getElementById("question").textContent =
        `Translate: ${words[current].english}`;

    document.getElementById("fact").textContent =
        facts[current];
}

function showTranslation() {

    document.getElementById("translation").textContent =
        words[current].translation;
}

function nextWord() {

    current = (current + 1) % words.length;

    viewed++;

    localStorage.setItem("viewed", viewed);

    document.getElementById("wordsViewed").textContent = viewed;

    document.getElementById("result").textContent = "";

    showWord();
}

function checkAnswer() {

    let userAnswer =
        document.getElementById("answer").value.trim();

    if (
        userAnswer.toLowerCase() ===
        words[current].translation.toLowerCase()
    ) {

        score++;

        localStorage.setItem("score", score);

        document.getElementById("score").textContent = score;

        document.getElementById("result").innerHTML =
            "🎉 Correct! Great Job! 🎉";

        if (typeof confetti === "function") {
            confetti({
                particleCount: 150,
                spread: 90,
                origin: { y: 0.6 }
            });
        }

        if (score === 3) {
            alert("🏅 Beginner Learner!");
        }

        if (score === 5) {
            alert("🥈 Language Explorer!");
        }

        if (score === 10) {
            alert("🥇 Vocabulary Master!");
        }

        updateLevel();
        updateProgressBar();

    } else {

        document.getElementById("result").innerHTML =
            `❌ Wrong! Correct answer is ${words[current].translation}`;
    }

    document.getElementById("answer").value = "";
}

function updateLevel() {

    if (score >= 10) {
        document.getElementById("level").textContent =
            "Expert 🥇";
    }
    else if (score >= 5) {
        document.getElementById("level").textContent =
            "Intermediate 🥈";
    }
    else {
        document.getElementById("level").textContent =
            "Beginner 🏅";
    }
}

function updateProgressBar() {

    let progress = Math.min(score * 10, 100);

    document.getElementById("progressFill").style.width =
        progress + "%";
}