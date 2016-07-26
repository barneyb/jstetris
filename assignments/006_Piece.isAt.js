/*
 * Within the internals of the game, the concept of "a piece" comes up all over
 * the place. Much like JavaScript itself has a Date object, this game has a
 * Piece object to encapsulate that concept. One of the things that Pieces know
 * about themselves is where on the board they're currently located. This is
 * needed for a bunch of things: drawing the piece, deciding if a piece can
 * rotate, seeing if it's at the edge of the board, piece preview, etc.
 *
 * Consider the purple T piece, oriented with it's stem pointed left, jammed up
 * in the top-left corner of the board:
 *
 *        0 1 2 3
 *      +--------
 *    0 | - x - -
 *    1 | x x - -
 *    2 | - x - -
 *    3 | - - - -
 *
 * In row zero (remember, we always count from zero!) the only block that is
 * part of the piece is in column one (counting from zero!). In row one, the
 * blocks in both column zero and one are part of the piece. In row two, the
 * block in column one is part of the piece. No blocks in row four (nor in
 * columns two or three) are present in this orientation of the purple T.
 *
 * These four block can be expressed as four (row, column) pairs:
 *
 *    (0, 1)
 *    (1, 0)
 *    (1, 1)
 *    (2, 1)
 *
 * Given those pairs, they can be "squashed" into an eight-element JavaScript
 * array simply by putting the pairs of numbers one after each other:
 *
 *    [0,1, 1,0, 1,1, 2,1]
 *
 * Among other things, Piece objects have a 'layout' property which is exactly
 * that array.
 *
 * This assignment is to write the 'isAt' method for Piece. A method is simply
 * a function that is attached to an object, instead of being all by itself.
 * Where standalone functions only operate on their arguments, methods can also
 * operate on the object they're attached to via a special variable named "this"
 * which is provided automatically.
 *
 * So if 'this' means the current Piece, and Pieces have a 'layout' property
 * containing an eight-element array, then within a method, you can use
 * 'this.layout' as the name of that array.
 *
 * Usually when you deal with arrays, you use a loop. But in this case, since
 * you know the array is eight numbers long, and those numbers are really four
 * (row, column) coordinate pairs, there isn't really any need to use a loop.
 * You can get a specific item of an array by using it's zero-based index, so
 * "this.layout[3]" will be the column coordinate of the second block (a zero),
 * and "this.layout[6]" will be the row coordinate of the fourth block (a two).
 *
 * Note: when you uncomment and refresh, both the piece preview and the active
 * piece will stop showing up. Like the random boolean for centering, this is
 * due to the "false-y" nature of 'undefined', since isAt also returns a boolean
 * value. Once a piece lands at the bottom of the board it WILL show up. You can
 * use the down arrow to drop the active piece to the bottom immediately.
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
    // this 'if' statement is here simply to assist in getting started by
    // logging the current layout to the console. You can safely delete it.
    if (r == 5 && c == 5) {
        console.log("isAt(" + r + ", " + c + ")", this.layout);
    }
    // end "getting started" if statement
    return (this.layout[0] == r && this.layout[1] == c) ||
        (this.layout[2] == r && this.layout[3] == c) ||
        (this.layout[4] == r && this.layout[5] == c) ||
        (this.layout[6] == r && this.layout[7] == c);
};
