// Configuration of the game board
const boardBlocks = 3
const boardSize = 450
const boardBackground = 'white'

// Instance of the game
let gameBoard = new Gameboard(boardSize, boardBackground, boardBlocks)

/**
 * Create the canvas and navigation
 */
function setup() {
	let cnv = createCanvas(boardSize, boardSize).parent('container')
	cnv.mousePressed(boardClick)

	addBots()
	addButtons()

	gameBoard.resetGame()
}

/**
 * Create the game buttons
 */
function addButtons() {
	const buttonContainer = createDiv().class('button-container')
	
	let resetBtn = createButton('Reset').parent(buttonContainer)
  	resetBtn.mousePressed(resetGame)

  	let startBtn = createButton('Start').parent(buttonContainer)
  	startBtn.mousePressed(autoGame)
}

/**
 * Add a dropdown with the possible players
 */
function addBots() {
	const container = createDiv().class('button-container')

	addSelect('1', container)
	addSelect('2', container)
}

function addSelect(player, container) {
	createSpan(`Player ${player}:`).parent(container)

	let innerSel = createSelect().class(`player${player}`).parent(container)
  	
  	innerSel.option('Human')
  	innerSel.option('Sequential')
  	innerSel.option('Random')

  	innerSel.changed(pickBot)

  	return innerSel
}

/**
 * Handler for the player selection dropdown
 */
function pickBot() {
	const elName = this.elt.className
	const bot = this.value()

	if (elName === 'player1') {
		gameBoard.changePlayerA(bot)
	} else {
		gameBoard.changePlayerB(bot)
	}
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
	gameBoard.resetResults()
}

function autoGame() {
	do {
		gameBoard.resetGame()
		gameBoard.startAutoGame()
	} while (gameBoard.getResults().games % 100 > 0)

	console.log(gameBoard.getResults())
}