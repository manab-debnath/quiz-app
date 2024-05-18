// https://opentdb.com/api.php?amount=10

let score = 0;
let currentQuestionIndex = 0;
const questionLength = 10;


const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

async function loadQuestion()   {
    const APIUrl = 'https://opentdb.com/api.php?amount=1';
    const result = await fetch(`${APIUrl}`);
    const data = await result.json();
    showQuestion(data.results[0]);
}

loadQuestion();     // it execute's for the question


function showQuestion(data) {
    currentQuestionIndex++;     // question no

    questionElement.innerHTML = data.question;
    let correctAnswer = data.correct_answer;
    let incorrectAnswer = data.incorrect_answers;
    let optionList = incorrectAnswer;

    // inserting correct answer in random position
    optionList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);

    resetState();   // hide next button
    optionList.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('btn');
        answerButton.appendChild(button);

        button.addEventListener('click', (e) => {
            const selectedBtn = e.target;
            // console.log(selectedBtn);
            const isCorrect = correctAnswer === selectedBtn.textContent ? true : false;

            if(isCorrect)   {
                selectedBtn.classList.add('correct');       // green
                score++;    // score
            }
            else    {
                selectedBtn.classList.add('inCorrect');     // red
            }

            // showing the correct answer
            Array.from(answerButton.children).forEach(button => {
                if(button.textContent === correctAnswer)   {
                    button.classList.add('correct');    // green
                }
                button.disabled = true;
            });


            nextButton.textContent = 'Next';
            nextButton.style.display = 'block';     // show next button
        });

    });


}


// hide next button
function resetState()   {
    nextButton.style.display = 'none';

    // remove answer button which are created in index.html file
    while(answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild)
    }
}



/* function startQuiz()    {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
} */


// next or play again button handler
nextButton.addEventListener('click', () => {
    if(nextButton.textContent === 'Play Again') {
        score = 0;
        currentQuestionIndex = 0;
        loadQuestion();
    }
    
    if(currentQuestionIndex < questionLength)  {
        loadQuestion();
    }
    else    {
        showScore();
    }
});


function showScore()    {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questionLength}!`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';
}