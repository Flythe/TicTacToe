// Configuration of the game board
const boardBlocks = 3
const boardSize = 450
const boardBackground = 'white'

// Instance of the game
let gameBoard = new Gameboard(boardSize, boardBackground, boardBlocks)

let sel, button, buttonContainer

/**
 * Create the canvas and navigation
 */
function setup() {
	let cnv = createCanvas(boardSize, boardSize).parent('container')
	cnv.mousePressed(boardClick)

	addButtons()
	addBots()

	gameBoard.resetGame()
}

/**
 * Create the game buttons
 */
function addButtons() {
	buttonContainer = createDiv().class('button-container').parent('container')
	button = createButton('Reset').parent(buttonContainer)
  	
  	button.mousePressed(resetGame)
}

/**
 * Add a dropdown with the possible players
 */
function addBots() {
	createSpan('Player:').parent(buttonContainer)

	sel = createSelect().parent(buttonContainer)
  	
  	sel.option('Human')
  	sel.option('Sequential')
  	sel.option('Random')

  	sel.changed(pickBot)
}

/**
 * Handler for the player selection dropdown
 */
function pickBot() {
	const bot = sel.value()

	gameBoard.changeBotPlayer(bot)
}

/**
 * Handler for mouse clicks on the game board canvas
 */
function boardClick() {
	gameBoard.boardClick()
}

/**
 * Handler for mouse clicks on the reset game button
 */
function resetGame() {
	gameBoard.resetGame()
}