class BotPlayer {
	players = {
		'Human': 'human',
		'Sequential': 'sequentialBot',
		'Random': 'randomBot'
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
		if (this.bot === 'human' || this.gameState.gameOver || this.gameState.error === true) {
			return
		}

		const [x, y] = this.botInstance().findMove(this.gameState)
		
		this.gamePiece.place(x, y)
	}	
}