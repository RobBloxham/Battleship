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

Top Secret Button (if i dont randomly generate the ship placement via an api this will call on api for something TBD) */

/*------Constants------*/
// i.e. audio/picture elments that are being placed later


/*------Variables (state)------*/

// Variables might include (board/turn/winner)

/*------Cached Element References------*/

// You might choose to put your game status here

/*------Event Listeners------*/

// This is where you should put the event listener
// for a mouse-click

/*------Functions------*/


// Initialization function:
// Where you set your initial state, setting up 
// what the board will look like upon loading

// On-Click function:
// Set up what happens when one of the elements
// is clicked


// Check winner function:
// Checks the current state of the board for
// a winner and changes the state of the winner
// variable if so


// Render function:
// Displays the current state of the board
// on the page, updating the elements to reflect



// let board = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, ]

// [01, 02, 03, 04, 05,
//  06, 07, 08, 09, 10,
//  11, 12, 13, 14, 15,
//  16, 17, 18, 19, 20,
//  21, 22, 23, 24, 25,]

/* ship 1 = 2x1 
   ship 2 = 2x1
   ship 3 = 3x1

   ship 1 & 2 can go    01-02 02-03... 24-25   but they can also go 01&&06 02&&07 ... 20&&25
   ship 3  can go       01-03 02-04... 23-25   but it can also go   01&&06&&11 02&&07&&12 ... 15&&20&&25 */
