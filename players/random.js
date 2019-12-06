class Random {
	findMove(gameState) {
		const currentState = gameState.getState()
		const guessSize = currentState.length
		
		let possibilities = []

		for (let y = 0; y < guessSize; y++) {
			for (let x = 0; x < guessSize; x++) {
				if (currentState[y][x] === 0) {
					possibilities.push([x, y])
				}
			}
		}

		const randomIdx = Math.floor(Math.random() * possibilities.length)

		return possibilities[randomIdx]
	}
}

var randomBot = new Random()