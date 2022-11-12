//DOM Selectors (Variables)
const startButton = document.querySelector('.intro button');
const introScreen = document.querySelector('.intro');
const gameScreen = document.querySelector('.match');
const playerHand = document.querySelector('.player-hand');
const computerHand = document.querySelector('.computer-hand')
const playerOptions = document.querySelectorAll('.options button')
const winner = document.querySelector('.winner');
const playerScoreDiv = document.querySelector('.player-score p')
const computerScoreDiv = document.querySelector('.computer-score p')
const hands = document.querySelectorAll(".hands img");

//This Object keeps track of the game scores
const gameScores = {playerScore: 0, computerScore: 0}

//This function helps the computer to select a Random Choice
const getcomputerChoice = () => {
  let options = ['Rock', 'Paper', 'Scissors']
  let randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

//This fuction removes the introScreen and launches the gameScreen
const startGame = () => {
  startButton.addEventListener('click', () => {
    introScreen.classList.add('fadeOut');
    gameScreen.classList.remove('fadeOut');
    gameScreen.classList.add('fadeIn')
  })
}
startGame()

//This fuction monitors the DOM for any selection by the player and starts the game
const playGame = () => {
  hands.forEach(hand => {
  hand.addEventListener('animationend', () => {
    hand.style.animation = ''
    })
  })
  playerOptions.forEach(option => {
    option.addEventListener('click', () => {
      const playerChoice = option.textContent;      
      const computerChoice = getcomputerChoice()
      const winner = gameRules(playerChoice,computerChoice);
      playerHand.src = `./assets/${playerChoice}.png`;
      computerHand.src = `./assets/${computerChoice}.png`;
      if(winner == 'Player'){
        gameScores['playerScore']+=1;
      }else if(winner == 'Computer'){
        gameScores['computerScore']+=1;
      } 
      displayStats(winner)
    })
  })
}

//This Function displays the game stats
const displayStats = (whoWon) => {
playerScoreDiv.innerText = gameScores['playerScore'];
computerScoreDiv.innerText = gameScores['computerScore'];
playerHand.style.animation = "shakePlayer 2s ease";
computerHand.style.animation = "shakeComputer 2s ease";
  if(whoWon == "Nobody"){
     winner.innerText = `It's a Draw`;
  }else{
    winner.innerText = `${whoWon} won`;
  }
}

playGame()

//This Function specifies who won the game
const gameRules = (playerChoice, computerChoice) => {
  let whoWon;
  if(playerChoice == computerChoice){
    whoWon = 'Nobody';
  }
  else if(playerChoice == 'Rock' && computerChoice == 'Scissors'){
    whoWon = 'Player'
  }else if(playerChoice == 'Paper' && computerChoice == 'Rock'){
    whoWon = 'Player';
  }else if(playerChoice == 'Scissors' && computerChoice == 'Paper'){
    whoWon = 'Player'
  }else{
    whoWon = 'Computer';
  }  
  return whoWon;
}
