const questions = [
	{
		question: "Quel est le plus gros animal du monde ?",
		answers: [
			{ text: "Requin", correct: false },
			{ text: "Baleine Bleue", correct: true },
			{ text: "Eléphant", correct: false },
			{ text: "Girafe", correct: false },
		]
	},
	{
		question: "Quel est le plus petit pays du monde ?",
		answers: [
			{ text: "Vatican", correct: true },
			{ text: "Bhutan", correct: false },
			{ text: "Nepal", correct: false },
			{ text: "Shri Lanka", correct: false },
		]
	},
	{
		question: "Quel est le plus grand désert du monde ?",
		answers: [
			{ text: "Kalahari", correct: false },
			{ text: "Gobi", correct: false },
			{ text: "Sahara", correct: false },
			{ text: "Antarctica", correct: true },
		]
	},
	{
		question: "Quel est le plus petit continent du monde ?",
		answers: [
			{ text: "Asie", correct: false },
			{ text: "Australie", correct: true },
			{ text: "Antarctique", correct: false },
			{ text: "Afrique", correct: false },
		]
	}
];

// Récupère les éléments HTML pour afficher la question, les boutons de réponse et le bouton "suivant"
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerBtns");
const nextButton = document.getElementById("nextBtn");

let currentQuestionIndex = 0; // Index de la question actuelle
let score = 0; // Score de l'utilisateur

// Fonction pour démarrer le quiz
function startQuiz(){
	currentQuestionIndex = 0; // Réinitialise l'index des questions
	score = 0; // Réinitialise le score
	nextButton.innerHTML = "Suivant";
	showQuestion() // Affiche la première question
}

// Affiche la question suivante et ses réponses
function showQuestion(){
	resetState(); // Réinitialise l'état des boutons
	let currentQuestion = questions[currentQuestionIndex]; // Récupère la question actuelle
	let questionNo = currentQuestionIndex + 1; // Numéro de la question
	questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // Affiche le texte de la question

	// Pour chaque réponse de la question actuelle, crée un bouton et l'ajoute
	currentQuestion.answers.forEach(answer => {
		const button = document.createElement("button");
		button.innerHTML = answer.text; // Définit le texte du bouton
		button.classList.add("btn"); // Ajoute une classe pour le style
		answerButtons.appendChild(button); // Ajoute le bouton au conteneur de réponses
		if (answer.correct){
			button.dataset.correct = answer.correct; // Marque le bouton si c'est la bonne réponse
		}
		button.addEventListener('click', selectAnswer); // Ajoute un événement pour gérer le clic sur le bouton
	});
}

// Réinitialise les boutons de réponse et cache le bouton "suivant"
function resetState(){
	nextButton.style.display = "none"; // Cache le bouton "suivant"
	while(answerButtons.firstChild){ // Supprime tous les boutons de réponse
		answerButtons.removeChild(answerButtons.firstChild);
	}
}

// Gère la sélection d'une réponse
function selectAnswer(e){
	const selectedBtn = e.target; // Récupère le bouton cliqué
	const isCorrect = selectedBtn.dataset.correct === 'true'; // Vérifie si c'est la bonne réponse
	if (isCorrect){
		selectedBtn.classList.add('correct'); // Ajoute une classe pour le style de bonne réponse
		score++; // Incrémente le score
	} else {
		selectedBtn.classList.add('incorrect'); // Ajoute une classe pour le style de mauvaise réponse
	}
	// Affiche la bonne réponse en vert pour toutes les options
	Array.from(answerButtons.children).forEach(button => {
		if (button.dataset.correct === 'true'){
			button.classList.add('correct');
		}
		button.disabled = true; // Désactive tous les boutons après un choix
	});
	nextButton.style.display = "block"; // Affiche le bouton "suivant" pour la prochaine question
}

// Affiche le score final après la dernière question
function showScore(){
	resetState(); // Réinitialise l'état
	questionElement.innerHTML = `Vous avez obtenu ${score} sur ${questions.length} !`; // Affiche le score final
	nextButton.innerHTML = "Rejouer ?"; // Changer le texte du bouton pour rejouer
	nextButton.style.display = "block"; // Affiche le bouton
}

// Gère le bouton "suivant" pour passer à la question suivante ou afficher le score final
function handleNextButton(){
	currentQuestionIndex++; // Passe à la question suivante
	if (currentQuestionIndex < questions.length){
		showQuestion(); // Affiche la prochaine question si elle existe
	} else {
		showScore(); // Affiche le score si c'était la dernière question
	}
}

// Ajoute un événement au bouton "suivant" pour appeler la fonction appropriée
nextButton.addEventListener('click', () => {
	if (currentQuestionIndex < questions.length){
		handleNextButton(); // Va à la question suivante
	} else {
		startQuiz(); // Redémarre le quiz si c'était la dernière question
	}
});

// Démarre le quiz dès que la page est chargée
startQuiz();