/*
 * Now we implement Piece.canMoveRight. There isn't really anything to say about
 * it that wasn't already said for canMoveLeft, just everything in the opposite
 * direction.
 *
 * Ready GO!
 */

/**
 * I return whether or not the piece can move right, considering both the edge
 * of the board and any leftover parts of previous pieces (via the
 * Model.isCellEmpty method).
 *
 * @returns {boolean} whether the piece can move right.
 */
Piece.prototype.canMoveRight = function canMoveRight() {
    if (this.isAtRightEdge()) {
        return false;
    }
    for (var i = 0; i < this.layout.length; i += 2) {
        var r = this.layout[i],
            c = this.layout[i + 1];
        if (! model.isCellEmpty(r, c + 1)) {
            return false;
        }
    }
    return true;
};
