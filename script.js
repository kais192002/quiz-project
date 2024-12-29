const questions = [
    { 
        question: "La phrase suivante est-elle à la voix active ou passive ? 'Le gâteau a été mangé par Paul.'", 
        options: ["Active", "Passive"], 
        answer: "Passive" 
    },
    { 
        question: "La phrase suivante est-elle à la voix active ou passive ? 'Paul mange un gâteau.'", 
        options: ["Active", "Passive"], 
        answer: "Active" 
    },
    { 
        question: "Transformez à la voix passive : 'Marie écrit une lettre.'", 
        options: ["Une lettre est écrite par Marie.", "Marie est écrite par une lettre."], 
        answer: "Une lettre est écrite par Marie." 
    },
    { 
        question: "La phrase suivante est-elle correcte ? 'Le livre est lu par Pierre.'", 
        options: ["Oui", "Non"], 
        answer: "Oui" 
    },
    { 
        question: "Transformez à la voix active : 'Le ballon est lancé par l'enfant.'", 
        options: ["L'enfant lance le ballon.", "Le ballon lance l'enfant."], 
        answer: "L'enfant lance le ballon." 
    },
    { 
        question: "La phrase suivante est-elle correcte ? 'Le gâteau mange Paul.'", 
        options: ["Oui", "Non"], 
        answer: "Non" 
    },
    { 
        question: "Transformez à la voix passive : 'Les étudiants préparent le projet.'", 
        options: ["Le projet est préparé par les étudiants.", "Les étudiants sont préparés par le projet."], 
        answer: "Le projet est préparé par les étudiants." 
    },
    { 
        question: "La phrase suivante est-elle à la voix active ou passive ? 'Une maison est construite par des ouvriers.'", 
        options: ["Active", "Passive"], 
        answer: "Passive" 
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer; // Variable pour le compte à rebours
let timeLeft = 10; // Temps en secondes

function loadQuestion() {
    const questionContainer = document.getElementById("question");
    const optionsContainer = document.getElementById("options");
    const nextButton = document.getElementById("next-button");
    const timerElement = document.getElementById("timer");

    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;

    optionsContainer.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => {
            clearInterval(timer); // Arrêter le compte à rebours
            if (option === currentQuestion.answer) {
                score++;
            }
            nextQuestion();
        };
        optionsContainer.appendChild(button);
    });

    timeLeft = 10; // Réinitialiser le temps
    timerElement.textContent = `Temps restant : ${timeLeft} secondes`;
    clearInterval(timer); // Assurez-vous qu'il n'y a pas de timer actif
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Temps restant : ${timeLeft} secondes`;
        if (timeLeft <= 0) {
            clearInterval(timer); // Arrêter le compte à rebours
            nextQuestion(); // Passer à la question suivante automatiquement
        }
    }, 1000);

    nextButton.disabled = true; // Désactiver le bouton "Suivant" jusqu'à la fin de la question
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("question-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";
    document.getElementById("score").textContent = `Vous avez obtenu ${score} sur ${questions.length}.`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("result-container").style.display = "none";
    document.getElementById("question-container").style.display = "block";
    loadQuestion();
}

// Charger la première question au début
loadQuestion();
