const Rock = document.getElementById('rock');
const Paper = document.getElementById('paper');
const Scissor = document.getElementById('scissor');
const myScoreEl = document.getElementById('myScore');
const tieScoreEl = document.getElementById('tie');
const resetButton = document.getElementById('reset');
const computerScoreEl = document.getElementById('computerScore');
const resultText = document.querySelector('.js-result');
const moveIcons = document.querySelector('.js-move');
const resultBox = document.querySelector('.icon-result');
let autoPlayButton = document.getElementById('auto-play');

let myScore = parseInt(localStorage.getItem('myScore')) || 0;
let tieScore = parseInt(localStorage.getItem('tie')) || 0;
let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;

let compmove = '';

myScoreEl.textContent = myScore;
tieScoreEl.textContent = tieScore;
computerScoreEl.textContent = computerScore;

function computerChoice() {
  const rand = Math.random();
  if (rand < 1 / 3) compmove = 'Rock';
  else if (rand < 2 / 3) compmove = 'Paper';
  else compmove = 'Scissor';
}

let isAutoPlaying = false;
let intervalId;
function autoPlay(){
  if(!isAutoPlaying){
    intervalId = setInterval(function(){
    const autoPlayerMove = ['Rock','Paper','Scissor'];
    const autoRandomIndex = Math.floor(Math.random() * autoPlayerMove.length);
    const autoRandomMove = autoPlayerMove[autoRandomIndex];
    playRound(autoRandomMove);
  }, 1000);
  isAutoPlaying = true;
  autoPlayButton.textContent = 'Stop';

  }else{
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoPlayButton.textContent = 'Auto Play';
  }
}

function playRound(playerMove) {
  computerChoice();

  let result = '';
  if (playerMove === compmove) {
    result = 'Draw 😬';
    tieScore++;
    tieScoreEl.textContent = tieScore;
    localStorage.setItem('tie', tieScore);
  } else if (
    (playerMove === 'Rock' && compmove === 'Scissor') ||
    (playerMove === 'Paper' && compmove === 'Rock') ||
    (playerMove === 'Scissor' && compmove === 'Paper')
  ) {
    result = 'You Win! 😀';
    myScore++;
    myScoreEl.textContent = myScore;
    localStorage.setItem('myScore', myScore);
  } else {
    result = 'Computer Wins! 🤖';
    computerScore++;
    computerScoreEl.textContent = computerScore;
    localStorage.setItem('computerScore', computerScore);
  }

  resultBox.style.display = 'flex';
  resultText.textContent = result;

  moveIcons.innerHTML = `
    You
    <img src="images/${playerMove.toLowerCase()}Player.png" class="js-move-icon">
    <img src="images/${compmove.toLowerCase()}Player.png" class="js-move-icon">
    Computer
  `;
}

Rock.addEventListener('click', () => playRound('Rock'));
Paper.addEventListener('click', () => playRound('Paper'));
Scissor.addEventListener('click', () => playRound('Scissor'));

resetButton.addEventListener('click', () => {
  myScore = tieScore = computerScore = 0;

  myScoreEl.textContent = tieScoreEl.textContent = computerScoreEl.textContent = 0;
  localStorage.clear();

  resultText.textContent = '';
  moveIcons.innerHTML = '';
  resultBox.style.display = 'none';
});
