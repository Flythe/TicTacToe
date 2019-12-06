class Gameboard {
	constructor(boardSize, background, boardBlocks) {
		this.boardSize = boardSize
		this.boardBackground = background
		this.boardBlocks = boardBlocks

		// Calculate the size of the squares on the board grid
		this.blockSize = this.boardSize / this.boardBlocks

		this.gameState = new GameState(this.boardBlocks)
		this.gamePiece = new GamePiece(this.blockSize, background, this.gameState)

		// Bot hooks directly into the gamestate and game pieces
		// so it is able to place pieces onto the game board
		this.botPlayerA = new BotPlayer(this.gameState, this.gamePiece)
		this.botPlayerB = new BotPlayer(this.gameState, this.gamePiece)
	}

	resetGame() {
		this.gameBoard()

		this.gameState.reset()
	}

	startAutoGame() {
		// Prevent auto game when one or both of the bots are human
		if (this.botPlayerA.isHuman() || this.botPlayerB.isHuman()) {
			return
		}

		// Have each bot take a turn
		this.botPlayerA.takeTurn()
		this.botPlayerB.takeTurn()

		// If the game has not ended take another turn
		if (!this.gameState.gameHasEnded()) {
			this.startAutoGame()
		}
	}

	boardClick() {
		if (!this.botPlayerA.isHuman() && !this.botPlayerB.isHuman()) {
			return
		}

		if (this.gameState.gameHasEnded()) {
			this.resetGame()

			return
		}

		this.gameState.clearErrors()

		const blockX = floor(mouseX / this.blockSize)
		const blockY = floor(mouseY / this.blockSize)

		this.gamePiece.place(blockX, blockY)

		this.botPlayerA.takeTurn()
		this.botPlayerB.takeTurn()
	}

	gameBoard() {
		background(this.boardBackground)

		let posX = 0
		let posY = 0

		stroke('black')

		// Create a grid of squares of size: boardBlocks by boardBlocks
		for (let i = 0; i <= Math.pow(this.boardBlocks, 2); i++) {
			square(posX, posY, this.blockSize)
			
			// Move over the columns of the game board
			posX += this.blockSize

			// Move over the rows of the game board
			if (i % this.boardBlocks === 0 && i != 0) {
				posX = 0
				posY += this.blockSize
			}
		}

		noStroke()
	}

	changePlayerA(botName) {
		this.botPlayerA.setBotInstance(botName)
	}

	changePlayerB(botName) {
		this.botPlayerB.setBotInstance(botName)
	}
}