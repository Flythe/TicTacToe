class Sequential {
	findMove(gameState) {
		const currentState = gameState.getState()
		const guessSize = currentState.length

		for (let y = 0; y < guessSize; y++) {
			for (let x = 0; x < guessSize; x++) {
				if (currentState[y][x] === 0) {
					return [x, y]
				}
			}
		}
	}
}

var sequentialBot = new Sequential()