
/*------Constants------*/

const game = {
  'ship': '0',
  'hit': '1',
  'miss': '2'
}
const pieces = {
'tinyShip': 'TT',
'smallShip': 'SSS',
'mediumShip': 'MMMM',
'largeShip': 'LLLLL'
}

/*------Variables (state)------*/

let ships = [
  pieces.tinyShip,
  pieces.smallShip,
  pieces.smallShip,
  pieces.mediumShip,
]

let shipSize = ships.map(size => size.length)
let winner, board, clicked, boardX, boardY, winCnt, clickCount

/*------Cached Element References------*/
const highScoreEl = document.getElementById('highscore')
const squaresEl = document.querySelectorAll('div')
const resetBtn = document.getElementById('resetButton')
const messageEl = document.getElementById('message')
const square = document.querySelector('board')

/*------Event Listeners------*/

resetBtn.addEventListener('click', init)
document.querySelector('.board').addEventListener('click', onClick)

/*------Functions------*/
init()
function init(){
  board = [
    [null, null, null, null, null], 
    [null, null, null, null, null], 
    [null, null, null, null, null], 
    [null, null, null, null, null], 
    [null, null, null, null, null], 
  ]
  messageEl.innerHTML = "Make your first move"
  winner = null
  squaresEl.forEach(element => {
    element.style.background = ''
  })
  winCnt = 0
  clickCount = 0
  generateShips()
  
}

function getDirection(){
  return Math.floor(Math.random() * 2) + 1
}

function generateShips(){
  let counter
  ships.forEach(ship => {
    if (ship === 'MMMM'){
      counter = 0
    while (counter < 1 ) {
        if (generateMedium()){
          counter += 1
        }
      }
    }
    else if (ship === 'SSS'){
      counter = 0
    while (counter < 1 ) {
        if (generateSmall()){
          counter += 1
        }
      }
    }
    else if (ship === 'TT'){
      counter = 0
    while (counter < 1 ) {
        if (generateTiny()){
          counter += 1
        }
      }
    }
  }) 
  console.log(board)
}

function generateLarge(){
  largeArr = []
  let location
  ships.forEach(ship => {
    direction = getDirection()
    if (ship === 'LLLLL') { 
      if (direction === 1) {
        locX = Math.floor(Math.random() * 1)
        locY = Math.floor(Math.random() * 5)
        location = [locX, locY, locX +1, locY, locX +2, locY, locX +3, locY, locX +4, locY]
      } else {
        locX = Math.floor(Math.random() * 5)
        locY = Math.floor(Math.random() * 1)
        location = [locX, locY, locX, locY +1, locX, locY +2, locX, locY +3, locX, locY +4]
          largeArr.push(location)
        }
      }
  })
}

function generateMedium(){
  direction = getDirection()
  if (direction === 1){
  locX = Math.floor(Math.random() * 2)
  locY = Math.floor(Math.random() * 5) 
  } else if (direction !== 1){
    locX = Math.floor(Math.random() * 5)
    locY = Math.floor(Math.random() * 2) 
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

function generateSmall(){
  direction = getDirection()
  if (direction === 1){
  locX = Math.floor(Math.random() * 3)
  locY = Math.floor(Math.random() * 5) 
  } else if (direction !== 1){
    locX = Math.floor(Math.random() * 5)
    locY = Math.floor(Math.random() * 3) 
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

function generateTiny(){
  direction = getDirection()
  if (direction === 1){
  locX = Math.floor(Math.random() * 4)
  locY = Math.floor(Math.random() * 5) 
  } else if (direction !== 1){
    locX = Math.floor(Math.random() * 5)
    locY = Math.floor(Math.random() * 4) 
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
  clickCount += 1
  render(e)
  }
  else {
    return board
  }
}

function render(e){
  if (board[boardY][boardX] === null){
    messageEl.innerHTML = 'You missed!'
    e.target.style.background = "red"
    board[boardY].splice(boardX, 1, "Z")
  } else if (board[boardY][boardX] === 'T'){
    messageEl.innerHTML = 'You hit my Tiny ship!'
    e.target.style.background = "grey"
    board[boardY].splice(boardX, 1, "H")
    winCnt += 1
  } else if (board[boardY][boardX] === 'S'){
    messageEl.innerHTML = 'You hit my Small ship!'
    e.target.style.background = "grey"
    board[boardY].splice(boardX, 1, "H")
    winCnt += 1
  }else if (board[boardY][boardX] === 'M'){
    messageEl.innerHTML = 'You hit my Medium ship!'
    e.target.style.background = "grey"
    board[boardY].splice(boardX, 1, "H")
    winCnt += 1
  } else if (board[boardY][boardX] === 'L'){
    messageEl.innerHTML = 'You hit my Large ship!'
    e.target.style.background = "grey"
    board[boardY].splice(boardX, 1, "H")
    winCnt += 1
  }
  if (winCnt === 12){
    winner = "win"
    messageEl.innerHTML = 'You Win!!!!'
    highScoreEl.innerHTML= `You fired ${clickCount} missles!`
  } 
}
