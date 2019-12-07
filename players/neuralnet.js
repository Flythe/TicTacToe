const trainingIterations = 10

class NeuralNet {
	decisionData = []
	player = 0

	trainingConfig = {
		iterations: trainingIterations,
		callback: this.updateProgress,
		callbackPeriod: 1,
		timeout: 10000
	}

	constructor(data) {
		this.train(data)
	}

	findMove(gameState) {
		this.player = gameState.getPlayer()

		const flatState = gameState.getState().flat()

		const results = this.netFunc(flatState);
		const validMoves = this.removeInvalidMoves(flatState, results)
		const move = this.getMoveXY(validMoves)

		this.storeDecision(flatState, validMoves)
		
		return move
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

	gameEnded(gameState) {
		const hasWon = gameState.getWinningPlayer() === this.player

		// Enrich the training data when the bot has won
		if (hasWon) {
			trainingData = trainingData.concat(this.decisionData)
		}
	}

	storeDecision(state, results) {
		const newState = this.applyMoveToState(state, results)

		const decisionDatum = {
			input: state,
			output: newState
		}

		this.decisionData.push(decisionDatum)
	}

	applyMoveToState(state, results) {
		const stateCopy = state.slice()

		const maxIdx = results.indexOf(Math.max(...results))

		stateCopy[maxIdx] = this.player

		return stateCopy
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
			hiddenLayers: [30, 30]
		});

		net.trainAsync(data, this.trainingConfig).then(result => {
			this.netFunc = net.toFunction();
		})
	}

	updateProgress(progress) {
		console.log(progress)

		let progressBar = document.getElementsByClassName('progress-bar')[0]

		const done = (progress.iterations / trainingIterations) * 100

		if (progressBar === undefined) {
			return
		}

		progressBar.style.setProperty('background', `linear-gradient(90deg, red ${done}%, white 0%)`)

		if (done === 100) {
			let progressBarContainer = document.getElementsByClassName('bar-container')[0]

			progressBarContainer.parentNode.removeChild(progressBarContainer)
		}
	}
}

var neuralNetBot = new NeuralNet(trainingData)