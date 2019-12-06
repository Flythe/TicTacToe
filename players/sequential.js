class Sequential {
	findMove(gameState) {
		const guessSize = gameState.gameBoard.length

		for (let y = 0; y < guessSize; y++) {
			for (let x = 0; x < guessSize; x++) {
				if (gameState.gameBoard[y][x] === 0) {
					return [x, y]
				}
			}
		}
	}
}

var sequentialBot = new Sequential()