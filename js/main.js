/* Project setup
some of the things i will need
on start setup game (initialize function)
Randomly generate a winning combination (maybe there is a way i can use an api here to grab random numbers?)
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


/*------Constants------*/
// i.e. audio/picture elments that are being placed later
let ships [
  {location: [0,0],[0,0] hits:[ "", ""]}
  {location: [0,0],[0,0],[0,0] hits:["", "", ""]}
  {location: [0,0],[0,0],[0,0] hits:["", "", ""]}
]

/*------Variables (state)------*/

// Variables might include (board/turn/winner)

let board, shipsSunk
/*------Cached Element References------*/

// You might choose to put your game status here

/*------Event Listeners------*/

// This is where you should put the event listener
// for a mouse-click

/*------Functions------*/


// Initialization function:
// Where you set your initial state, setting up 
// what the board will look like upon loading
// set board to let board = [
//   [null, null, null, null, null, ],
//   [null, null, null, null, null, ],
//   [null, null, null, null, null, ],
//   [null, null, null, null, null, ],
//   [null, null, null, null, null, ]
// ]

// On-Click function:
// Set up what happens when one of the elements
// is clicked  hit if not hit then miss 


// Check winner function:
// Checks the current state of the board for
// a winner and changes the state of the winner
// variable if so


// Render function:
// Displays the current state of the board
// on the page, updating the elements to reflect

// check if ship is sunk function:
// might be able to pair this with the check winner?

// avoid collision function:
// will make sure the spaces a ship is about to be placed are empty before placing

//place ships function