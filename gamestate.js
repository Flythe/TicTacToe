class GameState {
	gameBoard = []

	player = 1
	round = 0
	gameOver = false
	error = false

	constructor(size) {
		this.size = size
		this.numRounds = Math.pow(this.size, 2)

		this.reset()
	}

	createGameGrid() {
		const emptyArray = Array(this.size).fill(0)
		const emptyGrid = Array.from({length: this.size}, _ => emptyArray.slice())

		this.gameBoard = emptyGrid
	}

	reset() {
		this.createGameGrid()

		this.player = 1
		this.round = 0
		this.gameOver = false

		this.clearErrors()
	}

	progress(x, y) {
		this.gameBoard[y][x] = this.player

		this.playerHasWon()

		this.round += 1
		this.player = (this.round % 2) + 1

		if (this.round === this.numRounds && !this.gameOver) {
			this.endGame()
		}
	}

	playerHasWon() {
		if (this.checkWin()) {
			this.endGame(this.player)
		}
	}

	checkWin() {
		const rows = this.checkArrays(this.gameBoard)
		const cols = this.checkArrays(this.getGridCols())
		const diag = this.checkArrays(this.getGridDiagonals())

		const isWin = [rows, cols, diag].includes(true)
		
		return isWin
	}

	checkArrays(grid) {
		const equalValues = grid.map((val) => {
			return val.every((val, idx, arr) => (val === arr[0] && val !== 0))
		})

		return equalValues.includes(true)
	}

	getGridCols() {
		return this.gameBoard.map((val, idx) => {
			return this.gameBoard.map((val) => val[idx])
		})
	}

	getGridDiagonals() {
		const diagonalIdx = Array.from({length: this.size}, (_, i) => i)

		const leftRight = this.getGridDiagonal(diagonalIdx)
		const rightLeft = this.getGridDiagonal(diagonalIdx.reverse())

		return [leftRight, rightLeft]
	}

	getGridDiagonal(diagonal) {
		return this.gameBoard.map((val, idx) => {
			return val[diagonal[idx]]
		})
	}

	isValidMove(x, y) {
		const blockValue = this.gameBoard[y][x]
		
		if (blockValue !== 0) {
			this.error = true
			this.errorText = createSpan('Invalid move!').class('error-text').parent('container')

			return false
		}

		return true
	}

	endGame(playerWon) {
		if (playerWon !== undefined) {
			this.error = true
			this.errorText = createSpan(`Player ${this.player} has won!`).class('error-text').parent('container')
		} else {
			this.error = true
			this.errorText = createSpan('Tie!').class('error-text').parent('container')
		}

		this.gameOver = true
	}

	clearErrors() {
		this.error = false

		if (this.errorText !== undefined) {
			this.errorText.remove()
		}
	}
}