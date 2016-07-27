/*
 * Surprise! Piece.isAtRightEdge is the next assignment, but it's not quite the
 * same as isAtLeftEdge. Remember when the bonus isAt assignment where you
 * learned that the game makes no assumption about board size? That's going to
 * make a difference here.
 *
 * Fortunately, Piece already has access to the number of columns for the
 * current game board, so don't fret. Piece objects have a 'model' property,
 * which in turn has a 'COLS' property. Thus you can use "this.model.COLS" to
 * access the number of columns on the game board (which will always be 10, at
 * least for the moment).
 *
 * With that additional bit of information, now you can implement isAtRightEdge.
 * The normal "this function returns boolean" caveats apply. Use the right arrow
 * to smash the piece against the right edge to get your "failure" error.
 */

/**
 * I return whether or not the active piece is against the right edge of the
 * board (that is, has at least one block in the right-most column).
 *
 * @returns {boolean} whether the piece is at the right edge.
 */
//Piece.prototype.isAtRightEdge = function isAtRightEdge() {
//};
