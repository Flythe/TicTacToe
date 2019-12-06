class Random {
	findMove(gameState) {
		const guessSize = gameState.gameBoard.length
		
		let possibilities = []

		for (let y = 0; y < guessSize; y++) {
			for (let x = 0; x < guessSize; x++) {
				if (gameState.gameBoard[y][x] === 0) {
					possibilities.push([x, y])
				}
			}
		}

		const randomIdx = Math.floor(Math.random() * possibilities.length)

		return possibilities[randomIdx]
	}
}

var randomBot = new Random()