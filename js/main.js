/* Project setup
some of the things i will need
on start setup game (initialize function)
Randomly generate a winning combination/where pieces go on board (maybe there is a way i can use an api here to grab random numbers?)
define constants 
define variables
store elements

onclick interaction that will when clicked ineract with board 
Hit or miss function:
1) if hit has ship been sunk?
2) if sunk does this meet win conidition? (call a check winner function)
  2.1) if sunk and does not meet win condition place a destroyed ship piece on board (maybe something at the bottom of the grid to indicate how many ships are left)
3) if miss place a marker for miss

when reset button is clicked what happens

Check winner function

initiliaze function

check ship sunk function

Top Secret Button (if i dont randomly generate the ship placement via an api this will call on api for something TBD) */

/* solving what I think will be my biggest issue with this game: placing ships randomly on the board both horizontally (easy) and vertically (much harder):

If i make the board an array that contains arrays for each row i.e. a 5x5 would be 
board [
  [sq01, sq02, sq03, sq04, sq05],
  [sq06, sq07, sq08, sq09, sq10],
  [sq11, sq12, sq13, sq14, sq15],
  [sq16, sq17, sq18, sq19, sq20],
  [sq21, sq22, sq23, sq24, sq25],
]
lets assume the ship size for this is 3x1 
I can generate a random number/coinflip that will determine if the piece will be 1(heads) horizontal or 2(tales) vertical

if 1 generate a random number between 1 and 5 to determine which row(j) the ship will go
then generate a random number between 1 and 3 as 3 would be the furthers place from the left a 3x1 ship would fit in a row.
Before placing the piece it should call on a function that will ensure that places the ship wants to go are currently empty.

if 2 generate a random number between 1 and 5 to determine which column(i) the ship will go in to 
then generate a random number between 1 and 3 as 3 would be the furthest place from the top that the ship could be placed.
Before placing call on a function that will ensure that places the ship wants to go are currently empty. */

/*------Classes------*/
// class Cell {
//   constructor(
//     id,
//     xcor,
//     ycor,
//     hasShip,
//     shipHit,
//     hasWater,
//     ) {
//     this.id = id
//     this.xcor = xcor
//     this.ycor = ycor
//     this.hasShip = hasShip
//     this.shipHit = shipHit
//     this.hasWater = hasWater
//   }
// }


/*------Constants------*/
// i.e. audio/picture elments that are being placed later

// on the board
// 0 = ship
// 1 = hit
// x = miss
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
let winner, board, clicked, boardX, boardY, idx //board, shipSunk
// let board = [
//   [null, null, null, null, null], 
//   [null, null, null, null, null], 
//   [null, null, null, null, null], 
//   [null, null, null, null, null], 
//   [null, null, null, null, null], 
// ]

/*------Cached Element References------*/
const highScoreEl = document.getElementById('highscore')
const squaresEl = document.querySelectorAll('div')
const resetBtn = document.getElementById('resetButton')
const messageEl = document.getElementById('message')


/*------Event Listeners------*/

resetBtn.addEventListener('click', init)
document.querySelector('section').addEventListener('click', onClick)

/*------Functions------*/

function init(){
  board = [
    [null, null, null, null, null], 
    [null, null, null, null, null], 
    [null, null, null, null, null], 
    [null, null, null, null, null], 
    [null, null, null, null, null], 
  ]
  messageEl.innerHTML = "Make your first move"
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
    console.log(locY, locX)
  }
  if (direction === 1 && board[locY][locX] === null && board[locY][locX + 1] === null && board[locY][locX + 2] === null && board[locY][locX + 3] === null){
    board[locY].splice(locX, 1, "M")
    board[locY].splice((locX+1), 1, "M")
    board[locY].splice((locX+2), 1, "M")
    board[locY].splice((locX+3), 1, "M")
    console.log(board)
    return board
  } else if (direction !== 1 && board[locY][locX] === null && board[locY +1][locX] === null && board[locY +2][locX] === null && board[locY +3][locX] === null){
    board[locY].splice(locX, 1, "M")
    board[locY+1].splice(locX, 1, "M")
    board[locY+2].splice(locX, 1, "M")
    board[locY+3].splice(locX, 1, "M")
    console.log(board)
    return board
  } 
}

function generateSmall(){
  direction = getDirection()
  if (direction === 1){
  locX = Math.floor(Math.random() * 3)
  locY = Math.floor(Math.random() * 5) 
  console.log(locY, locX)
  } else if (direction !== 1){
    locX = Math.floor(Math.random() * 5)
    locY = Math.floor(Math.random() * 3) 
    console.log(locY, locX)
  }
  if (direction === 1 && board[locY][locX] === null && board[locY][locX + 1] === null && board[locY][locX + 2] === null){
    board[locY].splice(locX, 1, "S")
    board[locY].splice((locX+1), 1, "S")
    board[locY].splice((locX+2), 1, "S")
    console.log(board)
    return board
  } else if (direction !== 1 && board[locY][locX] === null && board[locY +1][locX] === null && board[locY +2][locX] === null){
    board[locY].splice(locX, 1, "S")
    board[locY+1].splice(locX, 1, "S")
    board[locY+2].splice(locX, 1, "S")
    console.log(board)
    return board
  } 
}

function generateTiny(){
  direction = getDirection()
  if (direction === 1){
  locX = Math.floor(Math.random() * 4)
  locY = Math.floor(Math.random() * 5) 
  console.log(locY, locX)
  } else if (direction !== 1){
    locX = Math.floor(Math.random() * 5)
    locY = Math.floor(Math.random() * 4) 
    console.log(locY, locX)
  }
  if (direction === 1 && board[locY][locX] === null && board[locY][locX + 1] === null){
    board[locY].splice(locX, 1, "T")
    board[locY].splice([locX+1], 1, "T")
    console.log(board)
    return board
  } else if (direction !== 1 && board[locY][locX] === null && board[locY +1][locX] === null){
    board[locY].splice(locX, 1, "T")
    board[locY+1].splice(locX, 1, "T")
    console.log(board)
    return board
  } 
}

function onClick(e){
  let clicked = []
  clicked.push(e.target.id.split(', '))
  boardY = parseInt(clicked[0][0])
  boardX = parseInt(clicked[0][1])
  render()
}
// On-Click function:
// Set up what happens when one of the elements
// is clicked  hit if not hit then miss 
// if hit change value to 1 
// if miss change value to 2

function checkWinner(){
  if (board.includes("0")){
    winner = null
  } else {
    winner = 'win'
  }
}
// Check winner function:
// Checks the current state of the board for
// a winner and changes the state of the winner
// variable if so
// if board does not contain any 0's declare winner

function render(){
  if (board[boardY][boardX] === null){
    messageEl.innerHTML = 'You missed!'
    squaresEl[boardY][boardX].style.background = "red"
    board[boardY].splice(boardX, 1, "Z")
    console.log(board)
  } else if (board[boardY][boardX] === 'T')
  messageEl.innerHTML = 'You hit my Tiny ship!'
  else if (board[boardY][boardX] === 'S')
  messageEl.innerHTML = 'You hit my Small ship!'
  else if (board[boardY][boardX] === 'M')
  messageEl.innerHTML = 'You hit my Medium ship!'
}
// Render function:
// Displays the current state of the board
// on the page, updating the elements to reflect
// if spot on board is 1 place damaged img or css effect
// if spot on board is 2 place missed img
// render winner text if winner = win 








// function sunk(){

// }
// // check if ship is sunk function:
// // might be able to pair this with the check winner?

// function avoidCollision(){

// }
// // avoid collision function:
// // will make sure the spaces a ship is about to be placed are empty before placing
// // check each cell determined by the length of hte ship to see if its occupied
// // if all are null set each of those cells to 0 to represent that it is occupied
// // if any are 0 add/subtract 

// tempArr = []
// let locX 
// let locY 
// ships.forEach(ship => {
//   direction = getDirection()
//   if (direction === 1){ 
//     locX = Math.floor(Math.random() * 5)
//     locY = Math.floor(Math.random() * 3)
//     tempArr.push([locX, locY], [locX, locY+1], [locX, locY+2])
//   } else {
//     locX = Math.floor(Math.random() * 3)
//     locY = Math.floor(Math.random() * 5)
//     tempArr.push([locX, locY], [locX+1, locY], [locX+2, locY])
//   } 
//   console.log(tempArr)
// });