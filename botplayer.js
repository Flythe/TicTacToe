class BotPlayer {
	players = {
		'Human': 'human',
		'Sequential': 'sequentialBot',
		'Random': 'randomBot',
		'Neural network': 'neuralNetBot'
	}

	constructor(gameState, gamePiece) {
		this.gameState = gameState
		this.gamePiece = gamePiece

		this.bot = this.players.Human
	}

	setBotInstance(botName) {
		this.bot = this.players[botName]
	}

	botInstance() {
		return window[this.bot]
	}

	takeTurn() {
		if (this.isHuman() || this.gameState.gameHasEnded() || this.gameState.error === true) {
			return
		}

		const [x, y] = this.botInstance().findMove(this.gameState)
		
		this.gamePiece.place(x, y)
	}

	gameEnded() {
		if (typeof this.botInstance().gameEnded === 'function') {
			this.botInstance().gameEnded(this.gameState)
		}		
	}

	isHuman() {
		return this.bot === 'human'
	}
}