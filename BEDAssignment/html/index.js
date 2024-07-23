const option1 = document.getElementById("button1");
const option2 = document.getElementById("button2");
const option3 = document.getElementById("button3");
const option4 = document.getElementById("button4");
const pageId = document.body.getAttribute('data-page-id');
const Content = document.getElementById("content");
const SubmitButton = document.getElementById("Submit");
const UserScore = document.getElementById('text1')
const HighScoreUser = document.getElementById("text2");
const HighScore = document.getElementById("text3");
var timer = document.getElementById("timer");
const quizButton = document.getElementById("quiz");
let timerInterval;
const backButton = document.getElementById("Back");
const linkContainer = document.getElementById('link');

document.getElementById('menu-icon').addEventListener('click', function () {
    document.querySelector('.navbar').classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function () {

    const timerElement = document.getElementById('timer');
    let timerInterval;

    const startTimer = (duration) => {
        const startTime = Date.now();
        localStorage.setItem('startTime', startTime);
        localStorage.setItem('duration', duration);

        let totalSeconds = duration;

        const updateTimerDisplay = () => {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            timerElement.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        };

        if (timerInterval) {
            clearInterval(timerInterval);
        }

        timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            totalSeconds = duration - elapsed;

            if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                timerElement.innerHTML = "Time is up";
                localStorage.setItem('timeIsUp', 'true');
                disableBackButton();
            } else {
                updateTimerDisplay();
            }
        }, 1000);

        updateTimerDisplay();
    };

    const disableBackButton = () => {
        const backButton = document.getElementById('Back');
        if (backButton) {
            backButton.classList.add('disabled');
            backButton.disabled = true;
        }
    };

    const backButton = document.getElementById('Back');
    if (backButton) {
        backButton.addEventListener('click', function () {
            if (!backButton.disabled) {
                window.location.href = 'Quiz15.html';
            }
        });
    }

    const quizButton = document.getElementById('quiz');
    if (quizButton) {
        quizButton.addEventListener('click', function () {
            localStorage.removeItem('remainingTime');
            localStorage.removeItem('timeIsUp');
            startTimer(900);
        });
    }

    if (localStorage.getItem('timeIsUp') === 'true') {
        timerElement.innerHTML = "Time is up";
        disableBackButton();
    } else {
        const startTime = localStorage.getItem('startTime');
        const duration = parseInt(localStorage.getItem('duration'));

        if (startTime && duration) {
            const elapsed = Math.floor((Date.now() - parseInt(startTime)) / 1000);
            const remainingTime = duration - elapsed;

            if (remainingTime > 0) {
                startTimer(remainingTime);
            } else {
                timerElement.innerHTML = "Time is up";
                localStorage.setItem('timeIsUp', 'true');
                disableBackButton();
            }
        }
    }

    window.addEventListener('beforeunload', function () {
        if (timerInterval) {
            clearInterval(timerInterval);
        }
    });
});

const correctAnswers = {
    "1": "button1",
    "2": "button2",
    "3": "button2",
    "4": "button3",
    "5": "button1",
    "6": "button1",
    "7": "button3",
    "8": "button2",
    "9": "button2",
    "10": "button1",
    "11": "button1",
    "12": "button4",
    "13": "button2",
    "14": "button3",
    "15": "button2"
};

document.addEventListener("DOMContentLoaded", function () {
    const pageId = document.body.getAttribute('data-page-id');
    const sessionStorageKey = (buttonId) => `buttonShowState_${pageId}_${buttonId}`;

    const retrieveButtonState = (buttonId) => {
        return localStorage.getItem(sessionStorageKey(buttonId)) === "true";
    };

    const initializeButtonState = (button, buttonId) => {
        const isButtonShown = retrieveButtonState(buttonId);
        if (isButtonShown) {
            button.classList.add("selected");
        }
    };

    const updateButtonState = (button, buttonId) => {
        button.addEventListener("click", function () {
            const isSelected = button.classList.contains("selected");

            if (isSelected) {
                button.classList.remove("selected");
                localStorage.setItem(sessionStorageKey(buttonId), "false");
            } else {
                const parentNode = button.closest('[data-question-id]');
                if (parentNode) {
                    document.querySelectorAll(`#${button.parentNode.id} button`).forEach(btn => {
                        btn.classList.remove("selected");
                        localStorage.setItem(sessionStorageKey(btn.id), "false");
                    });
                }
                button.classList.add("selected");
                localStorage.setItem(sessionStorageKey(buttonId), "true");
            }
        });
    };

    const answerButtons = document.querySelectorAll(".content button");

    answerButtons.forEach((button, index) => {
        initializeButtonState(button, `button${index + 1}`);
        updateButtonState(button, `button${index + 1}`);
    });

    const loadLogMessages = () => {
        const logMessages = JSON.parse(localStorage.getItem('logMessages')) || [];
        logMessages.forEach(msg => console.log(msg));
    };

    const addLogMessage = (msg) => {
        const logMessages = JSON.parse(localStorage.getItem('logMessages')) || [];
        logMessages.push(msg);
        localStorage.setItem('logMessages', JSON.stringify(logMessages));
    };

    loadLogMessages();

    if (SubmitButton) {
        SubmitButton.addEventListener('click', function (event) {
            event.preventDefault();

            let score = 0;

            for (const [questionId, correctButton] of Object.entries(correctAnswers)) {
                const selectedButtonId = Object.keys(localStorage).find(key => key.endsWith(`_${questionId}_${correctButton}`) && localStorage.getItem(key) === "true");
                const logMessage = `Question ${questionId}: Selected Button ID - ${selectedButtonId}, Correct Button ID - ${correctButton}`;
                addLogMessage(logMessage);
                console.log(logMessage);
                if (selectedButtonId) {
                    score += 1;
                }
                const scoreMessage = `Score after question ${questionId}: ${score}`;
                addLogMessage(scoreMessage);
                console.log(scoreMessage);
            }

            const finalScoreMessage = `Final Score: ${score}`;
            addLogMessage(finalScoreMessage);
            console.log(finalScoreMessage);

            const Username = "Antman";
            const Score = score;

            console.log('Submitting:', { Username, Score });

            localStorage.setItem('Score', score);

            fetch('http://localhost:3000/Submit.html', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Username, Score })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message === 'Score submitted successfully') {
                        window.location.href = 'results.html';
                    } else {
                        alert('Error submitting score.');
                    }
                })
                .catch(error => {
                    console.error('Error submitting score:', error);
                    alert('Error submitting score.');
                });
        });
    }

    if (window.location.pathname === '/results.html') {
        fetch('/api/results')
            .then(response => response.json())
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(response => {
                if (response && response.Username && response.Score) {
                    localStorage.setItem('HighScoreUsername', response.Username);
                    localStorage.setItem('HighScoreScore', response.Score);
                } else {
                    console.log('error');
                }
            })
            .catch(error => {
                console.error('Error fetching high score:', error);
            });
        const Score = localStorage.getItem('Score');
        const HighScoreUsername = localStorage.getItem('HighScoreUsername');
        const HighScoreScore = localStorage.getItem('HighScoreScore');

        UserScore.innerText = `Your score: ${Score}`;
        HighScoreUser.innerText = `User with the highest score: ${HighScoreUsername}`;
        HighScore.innerText = `Score of that user: ${HighScoreScore}`;
    }

    if (quizButton) {
        quizButton.addEventListener('click', function () {
            localStorage.removeItem('remainingTime');
            localStorage.removeItem('timeIsUp');

            const keysToRemove = Object.keys(localStorage).filter(key => key.startsWith('buttonShowState_'));
            keysToRemove.forEach(key => localStorage.removeItem(key));

            window.location.href = 'Quiz1.html';
        });
    }
});