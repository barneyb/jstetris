/*
 * The last three assignments have ensured a piece knows about the bounds of the
 * board. However, that's not the only thing to avoid: they also have to avoid
 * whatever's left of any previous pieces! And that avoidance has to happen
 * left, right, and down! So while the bounds checking is useful, it's only a
 * small part of deciding whether a piece can move.
 *
 * This assignment is to implement Piece.canMoveLeft, which needs to consider
 * both the board edge (which Piece.isAtLeftEdge will answer) and whether there
 * are parts of previous pieces in the way. Remember that since isAtLeftEdge is
 * a method of Piece, and 'this' always references the current Piece inside any
 * other method, you can call the isAtLeftEdge method from inside your
 * canMoveLeft method with "this.isAtLeftEdge()".
 *
 * Remember that 'model' property on Piece that you got ROWS and COLS from? Well
 * in addition to those properties, it also has methods of it's own! In
 * particular it has a 'isCellEmpty' method, which takes two arguments (a row
 * and a column) and returns a boolean indicating whether there are any leftover
 * parts from previous pieces in that specific cell of the board.
 *
 * While the very first piece is dropping, the board has no leftover parts on
 * it, so every cell will be empty. But after the first piece is down and the
 * second piece is dropping, you can say something like
 * "this.model.isCellEmpty(19, 4)" to ask whether that cell got "covered up".
 * If you just dropped the first piece, it probably does, but might not if you
 * got a piece on it's end or you slid it around. Obviously in your
 * "canMoveLeft" method you won't be able to hard-code numbers like that, but
 * you get the idea.
 *
 * Again, the "undefined as boolean" caveats, but this time you'l
 */

/**
 * I return whether or not the active piece can move left, considering both the
 * edge of the board and any leftover parts of previous pieces that might be
 * stacked up.
 *
 * @returns {boolean} whether the piece can move left.
 */
Piece.prototype.canMoveLeft = function canMoveLeft() {
    if (this.isAtLeftEdge()) {
        return false;
    }
    for (var i = 0; i < this.layout.length; i += 2) {
        var r = this.layout[i],
            c = this.layout[i + 1];
        if (! model.isCellEmpty(r, c - 1)) {
            return false;
        }
    }
    return true;
};
