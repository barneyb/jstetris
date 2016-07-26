/*
 * Bonus Assignment!
 *
 * In the last assignment, you had to implement the Piece.isAt method. The
 * instructions told you to just use indexes to get the coordinates out of the
 * 'layout' array, because it's well-known that there are always exactly four
 * blocks making up a given piece. However, there's no reason that Piece should
 * necessarily assume Tetris. In fact, the entire game makes no assumptions
 * about the size of the board or the size (or shape) of the pieces. Excepting
 * that new isAt method you wrote. :)
 *
 * This assignment is to reimplement isAt using a loop, so that it will
 * gracefully handle Pieces with any number of blocks in the layout array. Don't
 * go change last assignment though, start over below. There isn't a helper
 * console.log this time though, just a blank function.
 *
 * Also, because JavaScript methods are added with the assignment operator, that
 * means you can change them by simply assigning a new function. That's what
 * will happening below when you uncomment. So even though your function from
 * the last assignment is still being set as the Piece.isAt method, this
 * assignment's function is replacing it, just as if you were to do this:
 *
 *    var x = 4; // set the value
 *    x = 5;     // replace it with another
 */

/**
 * I return whether any of the piece's four blocks are at the passed row/column
 * coordinates.
 *
 * @param r The row of the block in question
 * @param c The column of the block in question
 * @returns {boolean} Whether the piece is at the requested row and column.
 */
Piece.prototype.isAt = function isAt(r, c) {
    for (var i = 0; i < this.layout.length; i += 2) {
        if (this.layout[i] == r && this.layout[i + 1] == c) {
            return true;
        }
    }
    return false;
};
