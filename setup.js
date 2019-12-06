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

	addSelect('A', pickBotA, container)
	addSelect('B', pickBotB, container)
}

function addSelect(player, callback, container) {
	createSpan(`Player ${player}:`).parent(container)

	let innerSel = createSelect().parent(container)
  	
  	addSelectOptions(innerSel)

  	innerSel.changed(callback)

  	return innerSel
}

function addSelectOptions(innerSel) {
	innerSel.option('Human')
  	innerSel.option('Sequential')
  	innerSel.option('Random')
}

/**
 * Handler for the player selection dropdown
 */
function pickBotA() {
	const bot = this.value()

	gameBoard.changePlayerA(bot)
}

function pickBotB() {
	const bot = this.value()

	gameBoard.changePlayerB(bot)
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

function autoGame() {
	gameBoard.resetGame()
	gameBoard.startAutoGame()
}