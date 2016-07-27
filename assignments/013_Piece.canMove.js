/*
 * In a unexpected turn of events, this assignment is NOT Piece.canMoveDown, but
 * rather just Piece.canMove.
 *
 * As you probably noticed, canMoveLeft and canMoveRight were nearly identical
 * in their implementation. If you imagine what canMoveDown would look like, it
 * would be very similar. The three isAtXxxEdge methods were also very similar
 * to one another. In fact, all six are remarkably similar in their structure,
 * though not as tight as the two groups of three
 *
 * So we'll forgo canMoveDown in favor of working on DRY-ing out the code a bit
 * with a single canMove. Your final canMove method should not use any of the
 * isAtXxxEdge methods nor the canMoveXxx method. You may find it helpful to
 * make a canMoveDown method to use while you're working on the flow of canMove,
 * but if you do, it should also not be used in the final version. The internal
 * implementation of canMove is the only place those five forbidden methods are
 * invoked, so once your canMove is done they will no longer be used in any way.
 *
 * In addition to handling the as-yet-unimplemented canMoveDown functionality,
 * this is where the very slight lie I mentioned in the Piece.isAtBottomEdge
 * assignment will manifest. It is sometimes possible to rotate a piece off the
 * top of board. That behaviour isn't excluded anywhere, so it seems that there
 * is nothing to do, but you WILL need to ensure that a negative row isn't
 * passed to Model.isCellEmpty, or you'll get an error.
 *
 * When you uncomment the method and refresh, the game will immediately end. Why
 * you ask? Because it's a boolean method that doesn't return a value and thus
 * is "false-y" and indicates that the very first piece doesn't have room on the
 * board to be placed, so the game must be over.
 */

/**
 * I return whether the piece can move in the direction specified by the two
 * parameters. Most flavors of tetris don't support diagonal movement (though
 * those with soft drop sometimes do), so it is most likely that at least one
 * of rowDelta and columnDelta will be zero, but that fact should not be relied
 * upon.
 *
 * <p>I am also used to check whether a piece can be placed onto the board, in
 * which case both params will be zero (i.e., no movement, just collision
 * checking).
 *
 * @param rowDelta The number of rows to move. Cannot be negative.
 * @param columnDelta The number of columns to move. Can be negative.
 * @returns {boolean} Whether the piece can move in the requested direction.
 */
//Piece.prototype.canMove = function canMove(rowDelta, columnDelta) {
//};
