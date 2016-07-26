/*
 * As you expected, this assignment is to write Piece.isAtBottomEdge. As you'd
 * expect, next to the 'COLS' property on the Piece's model, there is a 'ROWS'
 * property for the number of rows on the current board (right now, always 20).
 *
 * Since we can never move pieces in an upward direction, we'll never need a
 * Piece.isAtTopEdge function. We'll see that to be a very slight lie when
 * dealing with piece rotation, since while it's allowed to rotate a piece off
 * the top of the board, we have to be careful about how we do it so we don't
 * ask the board to do things it can't. But that's for the future.
 *
 * Standard "undefined is false-y" warnings!
 */

/**
 * I return whether or not the active piece is against the bottom edge of the
 * board (that is, has at least one block in the bottom-most row).
 *
 * @returns {boolean} whether the piece is at the bottom edge.
 */
Piece.prototype.isAtBottomEdge = function isAtBottomEdge() {
    for (var i = 0; i < this.layout.length; i += 2) {
        if (this.layout[i] == this.model.ROWS - 1) {
            return true;
        }
    }
    return false
};
