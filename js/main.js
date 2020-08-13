
/*------Constants------*/

//defines the board piece objects naming convention and what they contain help define items later
const pieces = {
'destroyerShip': 'TT',
'cruiserShip': 'SSS',
'subShip': 'UUU',
'battleShip': 'MMMM',
'carrierShip': 'LLLLL'
}

/*------Variables (state)------*/

//sets the pieces in the board how many of each ship could be used later to make the game easier or more difficult
let ships = [
  pieces.destroyerShip,
  pieces.cruiserShip,
  pieces.subShip,
  pieces.battleShip,
  pieces.carrierShip
]

let shipSize = ships.map(size => size.length)
let winner, board, clicked, boardX, boardY, winCnt, score, jokes = []

/*------Cached Element References------*/

const highScoreEl = document.getElementById('hscore')
const squaresEl = document.querySelectorAll('div')
const resetBtn = document.getElementById('resetButton')
const tsBtn = document.getElementById('ts')
const dadJokeEl = document.getElementById('dad-joke')
const messageEl = document.getElementById('message')
const square = document.querySelector('board')
const currScoreEl = document.getElementById('score')
const SAVE_KEY_SCORE = "highscore" //key for local storage required
const highscore = localStorage.getItem(SAVE_KEY_SCORE) 
const darkBtn = document.getElementById('darkButton')
const winSound = new Audio('Sounds/win.wav')
const boom = new Audio('Sounds/boom.wav')
const splash = new Audio('Sounds/splash.wav')
const colorScheme = {
  dark: false,
  changeColorScheme: function(){
      colorScheme.dark ? colorScheme.dark = false : colorScheme.dark = true
      const color = colorScheme.dark ? "dark" : ""
      body.setAttribute("class", color)
  }
}

/*------Event Listeners------*/

resetBtn.addEventListener('click', init)
document.querySelector('.board').addEventListener('click', onClick)
darkBtn.addEventListener('click', colorScheme.changeColorScheme)
tsBtn.addEventListener("click", async function(){
  await fetch("https://icanhazdadjoke.com/",{
      method: 'get',
      headers: {
          'Accept': 'application/json',
      }
  })
  .then((response) => {
      return response.json()
  })
  .then((data) => {
      let newJoke = {}
      newJoke["joke"] = data.joke
    jokes.push(newJoke)
    console.log(jokes)
  })
  .catch((err) => {
      console.log(err)
  })
  let dadjoke = jokes[jokes.length - 1]
  dadJokeEl.innerHTML = dadjoke.joke
})

/*------Functions------*/

//sets the initial game state upon loading
init()
checkUserColorSchemePreference()
function init(){
  board = [
    [null, null, null, null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null, null, null, null],  
  ]
  messageEl.innerHTML = "Fire your first missile!"
  currScoreEl.innerHTML = "Current Score: 0"
  dadJokeEl.innerHTML = ""
  winner = null
  squaresEl.forEach(element => {
    element.style.background = ''
  })
  winCnt = 0
  score = 0
  generateShips()
  console.log(board)
}

function getDirection(){
  return Math.floor(Math.random() * 2) + 1
}

function generateShips(){
  let counter // counter is identified to ensure later that the code can properly handle ships colliding
  ships.forEach(ship => {
    if (ship === 'LLLLL'){
      counter = 0
      while (counter < 1 ){
        if(generateCarrier()){
          counter += 1
        }
      }
    }
    else if (ship === 'MMMM'){
      counter = 0
    while (counter < 1 ) {
        if (generateBattleship()){
          counter += 1
        }
      }
    }
    else if (ship === 'SSS'){
      counter = 0
    while (counter < 1 ) {
        if (generateCruiser()){
          counter += 1
        }
      }
    }
    else if (ship === 'UUU'){
      counter = 0
    while (counter < 1 ) {
        if (generateSub()){
          counter += 1
        }
      }
    }
    else if (ship === 'TT'){
      counter = 0
    while (counter < 1 ) {
        if (generateDestroyer()){
          counter += 1
        }
      }
    }
  }) 
}

function generateCarrier(){
  direction = getDirection()
  if (direction === 1){
  locX = Math.floor(Math.random() * 6)
  locY = Math.floor(Math.random() * 10) 
  } else if (direction !== 1){
    locX = Math.floor(Math.random() * 10)
    locY = Math.floor(Math.random() * 6) 
  }
  if (direction === 1 && board[locY][locX] === null && board[locY][locX + 1] === null && board[locY][locX + 2] === null && board[locY][locX + 3] === null && board[locY][locX + 4] === null){
    board[locY].splice(locX, 1, "L")
    board[locY].splice((locX+1), 1, "L")
    board[locY].splice((locX+2), 1, "L")
    board[locY].splice((locX+3), 1, "L")
    board[locY].splice((locX+4), 1, "L")
    return board
  } else if (direction !== 1 && board[locY][locX] === null && board[locY +1][locX] === null && board[locY +2][locX] === null && board[locY +3][locX] === null && board[locY +4][locX] === null){
    board[locY].splice(locX, 1, "L")
    board[locY+1].splice(locX, 1, "L")
    board[locY+2].splice(locX, 1, "L")
    board[locY+3].splice(locX, 1, "L")
    board[locY+4].splice(locX, 1, "L")
    return board
  } 
}

function generateBattleship(){
  direction = getDirection()
  if (direction === 1){
  locX = Math.floor(Math.random() * 7)
  locY = Math.floor(Math.random() * 10) 
  } else if (direction !== 1){
    locX = Math.floor(Math.random() * 10)
    locY = Math.floor(Math.random() * 7) 
  }
  if (direction === 1 && board[locY][locX] === null && board[locY][locX + 1] === null && board[locY][locX + 2] === null && board[locY][locX + 3] === null){
    board[locY].splice(locX, 1, "M")
    board[locY].splice((locX+1), 1, "M")
    board[locY].splice((locX+2), 1, "M")
    board[locY].splice((locX+3), 1, "M")
    return board
  } else if (direction !== 1 && board[locY][locX] === null && board[locY +1][locX] === null && board[locY +2][locX] === null && board[locY +3][locX] === null){
    board[locY].splice(locX, 1, "M")
    board[locY+1].splice(locX, 1, "M")
    board[locY+2].splice(locX, 1, "M")
    board[locY+3].splice(locX, 1, "M")
    return board
  } 
}

function generateCruiser(){
  direction = getDirection()
  if (direction === 1){
  locX = Math.floor(Math.random() * 8)
  locY = Math.floor(Math.random() * 10) 
  } else if (direction !== 1){
    locX = Math.floor(Math.random() * 10)
    locY = Math.floor(Math.random() * 8) 
  }
  if (direction === 1 && board[locY][locX] === null && board[locY][locX + 1] === null && board[locY][locX + 2] === null){
    board[locY].splice(locX, 1, "S")
    board[locY].splice((locX+1), 1, "S")
    board[locY].splice((locX+2), 1, "S")
    return board
  } else if (direction !== 1 && board[locY][locX] === null && board[locY +1][locX] === null && board[locY +2][locX] === null){
    board[locY].splice(locX, 1, "S")
    board[locY+1].splice(locX, 1, "S")
    board[locY+2].splice(locX, 1, "S")
    return board
  } 
}

function generateSub(){
  direction = getDirection()
  if (direction === 1){
  locX = Math.floor(Math.random() * 8)
  locY = Math.floor(Math.random() * 10) 
  } else if (direction !== 1){
    locX = Math.floor(Math.random() * 10)
    locY = Math.floor(Math.random() * 8) 
  }
  if (direction === 1 && board[locY][locX] === null && board[locY][locX + 1] === null && board[locY][locX + 2] === null){
    board[locY].splice(locX, 1, "U")
    board[locY].splice((locX+1), 1, "U")
    board[locY].splice((locX+2), 1, "U")
    return board
  } else if (direction !== 1 && board[locY][locX] === null && board[locY +1][locX] === null && board[locY +2][locX] === null){
    board[locY].splice(locX, 1, "U")
    board[locY+1].splice(locX, 1, "U")
    board[locY+2].splice(locX, 1, "U")
    return board
  } 
}

function generateDestroyer(){
  direction = getDirection()
  if (direction === 1){
  locX = Math.floor(Math.random() * 9)
  locY = Math.floor(Math.random() * 10) 
  } else if (direction !== 1){
    locX = Math.floor(Math.random() * 10)
    locY = Math.floor(Math.random() * 9) 
  }
  if (direction === 1 && board[locY][locX] === null && board[locY][locX + 1] === null){
    board[locY].splice(locX, 1, "T")
    board[locY].splice([locX+1], 1, "T")
    return board
  } else if (direction !== 1 && board[locY][locX] === null && board[locY +1][locX] === null){
    board[locY].splice(locX, 1, "T")
    board[locY+1].splice(locX, 1, "T")
    return board
  } 
}

function onClick(e){
  if (winner === null){
  let clicked = []
  clicked.push(e.target.id.split(', '))
  boardY = parseInt(clicked[0][0])
  boardX = parseInt(clicked[0][1])
  render(e)
  }
  else {
    return board
  }
}

function render(e){
  if (board[boardY][boardX] === null){
    messageEl.innerHTML = 'You missed!'
    e.target.style.backgroundImage = 'url("Images/newsplash.png")'
    board[boardY].splice(boardX, 1, "Z")
    setTimeout(function(){splash.play();},0);
    score -= 50
    currScoreEl.innerHTML= `Score: ${score}`
  } else if (board[boardY][boardX] === 'T'){
    messageEl.innerHTML = 'You hit my Destroyer!'
    e.target.style.backgroundImage = 'url("Images/hit.png")'
    board[boardY].splice(boardX, 1, "H")
    setTimeout(function(){boom.play();},0);
    winCnt += 1
    score += 1000
    currScoreEl.innerHTML= `Current Score: ${score}`
  } else if (board[boardY][boardX] === 'S'){
    messageEl.innerHTML = 'You hit my Cruiser!'
    e.target.style.backgroundImage = 'url("Images/hit.png")'
    board[boardY].splice(boardX, 1, "H")
    setTimeout(function(){boom.play();},0);
    winCnt += 1
    score += 700
    currScoreEl.innerHTML= `Current Score: ${score}`
  } else if (board[boardY][boardX] === 'U'){
    messageEl.innerHTML = 'You hit my Submarine!'
    e.target.style.backgroundImage = 'url("Images/hit.png")'
    board[boardY].splice(boardX, 1, "H")
    setTimeout(function(){boom.play();},0);
    winCnt += 1
    score += 800
    currScoreEl.innerHTML= `Current Score: ${score}`
  }else if (board[boardY][boardX] === 'M'){
    messageEl.innerHTML = 'You hit my Battleship!'
    e.target.style.backgroundImage = 'url("Images/hit.png")'
    board[boardY].splice(boardX, 1, "H")
    setTimeout(function(){boom.play();},0);
    winCnt += 1
    score += 500
    currScoreEl.innerHTML= `Current Score: ${score}`
  } else if (board[boardY][boardX] === 'L'){
    messageEl.innerHTML = 'You hit my Aircraft Carrier!'
    e.target.style.backgroundImage = 'url("Images/hit.png")'
    board[boardY].splice(boardX, 1, "H")
    setTimeout(function(){boom.play();},0);
    winCnt += 1
    score += 300
    currScoreEl.innerHTML= `Current Score: ${score}`
  }
  if (winCnt === 17){
    winner = "win"
    messageEl.innerHTML = 'You Win!!!!'
    currScoreEl.innerHTML = `Final Score: ${score}`
    if (score > highscore){
      highScoreEl.innerHTML = `${score}`
    }
    confetti.start(3800)
    setTimeout(function(){winSound.play();},0);
  } 
}

function checkUserColorSchemePreference() {
  if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
    colorScheme.changeColorScheme()
  }
}
