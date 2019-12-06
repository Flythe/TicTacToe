class GamePiece {
	piecePadding = 10
	pieceThickness = 20

	constructor(blockSize, background, gameState) {
		this.blockSize = blockSize
		this.boardBackground = background
		this.gameState = gameState
	}

	/**
	 * Places a game piece for the corresponding player on the game board
	 *
	 * @param x: row index of the clicked grid square
	 * @param y: column index of the clicked grid square
	 */
	place(x, y) {
		if (this.gameState.gameHasEnded()) {
			return
		}

		if (!this.gameState.isValidMove(x, y)) {
			return
		}

		// Get the pixel offset of the block
		const blockX = x * this.blockSize
		const blockY = y * this.blockSize
		
		if (this.gameState.player === 1) {
			this.placeCross(blockX, blockY)
		} else {
			this.placeCircle(blockX, blockY)
		}

		this.gameState.progress(x, y)
	}

	/**
	 * Places a cross piece on the game board
	 *
	 * @param x: row index of the grid square where we want to place the cross piece
	 * @param y: column index of the grid square where we want to place the cross piece
	 */
	placeCross(x, y) {
		// Find the center of the current block
		const midPointX = x + (this.blockSize / 2)
		const midPointY = y + (this.blockSize / 2)
		
		// Get width and height of one bar of the cross
		const straightSide = this.blockSize - this.pieceThickness - (2 * this.piecePadding)
		// Do some pythagoras to get the length at an angle of 45 degrees
		const sideLength = Math.sqrt(Math.pow(straightSide, 2) + Math.pow(straightSide, 2))

		push()
		fill('blue')

		angleMode(DEGREES);
		rectMode(CENTER)

		// Move the draw grid over so that the midpoint of the block we are
		// drawing in is at 0, 0
		translate(midPointX, midPointY)

		rotate(45);
		rect(0, 0, sideLength, this.pieceThickness)

		rotate(90);
		rect(0, 0, sideLength, this.pieceThickness)
		pop()
	}

	/**
	 * Places a circle piece on the game board
	 *
	 * @param x: row index of the grid square where we want to place the circle piece
	 * @param y: column index of the grid square where we want to place the circle piece
	 */
	placeCircle(x, y) {
		const midPointX = x + (this.blockSize / 2)
		const midPointY = y + (this.blockSize / 2)
		const diameter = this.blockSize - (2 * this.piecePadding)

		push()
		fill('red')

		circle(midPointX, midPointY, diameter)

		fill(this.boardBackground)

		circle(midPointX, midPointY, diameter - (this.pieceThickness * 2))

		noFill()
		pop()
	}
}