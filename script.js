// База вопросов
const questions = [
    {
        question: "Как мы познакомились?",
        answers: [
            { text: "В звонке", correct: true },
            { text: "В соцсетях", correct: false },
            { text: "Через друзей", correct: false }
        ]
    },
    {
        question: "Где мы первый раз гуляли?",
        answers: [
            { text: "В парке", correct: true },
            { text: "В кинотеатре", correct: false },
            { text: "В кафе", correct: false }
        ]
    },
    {
        question: "Как я чаще всего тебя называю?",
        answers: [
            { text: "Кися", correct: true },
            { text: "Зая", correct: false },
            { text: "Солнышко", correct: false }
        ]
    }
];

// Рисунок сердца (1 - показывать сердечко, 0 - пусто)
const heartShape = [
    [0, 1, 1, 0, 0, 0, 1, 1, 0],
    [1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0]
];

let currentQuestionIndex = 0;

const soundCorrect = document.getElementById('sound-correct');
const soundWrong = document.getElementById('sound-wrong');
const soundFinal = document.getElementById('sound-final');

function startQuiz() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('question-screen').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question-title').innerText = currentQuestion.question;
    
    const optionsBox = document.getElementById('options-box');
    optionsBox.innerHTML = '';

    // Перемешивание ответов
    const shuffledAnswers = [...currentQuestion.answers].sort(() => Math.random() - 0.5);

    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectAnswer(button, answer.correct));
        optionsBox.appendChild(button);
    });
}

function selectAnswer(button, isCorrect) {
    if (isCorrect) {
        soundCorrect.currentTime = 0;
        soundCorrect.play().catch(e => console.log("Ошибка звука:", e));

        button.classList.add('correct');
        disableAllOptions();

        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showFinal();
            }
        }, 1000);
    } else {
        soundWrong.currentTime = 0;
        soundWrong.play().catch(e => console.log("Ошибка звука:", e));

        button.classList.add('wrong');
        button.disabled = true;
    }
}

function disableAllOptions() {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.disabled = true);
}

function showFinal() {
    document.getElementById('question-screen').classList.add('hidden');
    document.getElementById('final-screen').classList.remove('hidden');
    
    soundFinal.currentTime = 0;
    soundFinal.play().catch(e => console.log("Ошибка звука:", e));

    generateHeartMatrix();
}

function generateHeartMatrix() {
    const matrixContainer = document.getElementById('heart-matrix');
    let delay = 0;

    for (let row = 0; row < heartShape.length; row++) {
        for (let col = 0; col < heartShape[row].length; col++) {
            const dot = document.createElement('div');
            dot.classList.add('heart-dot');
            
            if (heartShape[row][col] === 1) {
                dot.innerHTML = '❤️';
                dot.style.animationDelay = `${delay}s`;
                dot.style.opacity = '1';
                delay += 0.05;
            } else {
                dot.innerHTML = '';
                dot.style.animation = 'none';
            }
            matrixContainer.appendChild(dot);
        }
    }
}
