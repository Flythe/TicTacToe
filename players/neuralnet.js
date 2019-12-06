class NeuralNet {
	constructor(data) {
		this.netFunc = this.train(data)
	}

	findMove(gameState) {
		const flatState = gameState.getState().flat()

		const results = this.netFunc(flatState);

		const validMoves = this.removeInvalidMoves(flatState, results)

		return this.getMoveXY(validMoves)
	}

	getMoveXY(results) {
		// Get index of the largest confidence
		const maxIdx = results.indexOf(Math.max(...results))

		// Get the size of one side of the game board
		const boardSize = Math.sqrt(results.length)

		// Calculate the x and y position of the index with
		// the largest confidence
		const x = maxIdx % boardSize
		const y = Math.floor(maxIdx / boardSize)

		return [x, y]
	}

	/**
	 * Check the neural net output and set the confidence value of
	 * any index where a game piece is already placed to -1
	 */
	removeInvalidMoves(state, results) {
		return results.map((val, idx) => state[idx] === 0 ? val : -1)
	}

	train(data) {
		let net = new brain.NeuralNetwork({
			hiddenLayers: [18]
		});

		net.train(data);

		return net.toFunction();
	}
}

var neuralNetBot = new NeuralNet(trainingData)