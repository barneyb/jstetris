/*
 * Since a Piece knows where it is on the board, it makes sense that we could
 * also ask a Piece higher-level questions that are based on it's position. This
 * assignment is to implement the isAtLeftEdge method on Piece.
 *
 * This is another method that returns boolean, and thus the empty method will
 * be treated as returning false. This will end up causing the game to be over
 * immediately because of the way some of the internals are implemented. Once
 * the function doesn't always return a "false-y" value, the game will progress
 * again.
 */

/**
 * I return whether or not the active piece is against the left edge of the
 * board (that is, has at least one block in column zero).
 *
 * @returns {boolean} whether the piece is at the left edge.
 */
Piece.prototype.isAtLeftEdge = function isAtLeftEdge() {
    for (var i = 0; i < this.layout.length; i += 2) {
        if (this.layout[i + 1] == 0) {
            return true;
        }
    }
    return false
};
