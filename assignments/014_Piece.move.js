/*
 * Now that we have Piece.canMove, let's implement the Piece.move method. We'll
 * adopt the same rowDelta/columnDelta parameters that canMove takes, allowing
 * our single method to support horizontal, vertical, and even diagonal moves.
 * The implementation probably seems pretty straightforward, but there is a
 * wrinkle.
 *
 * This is the first time your assignment will mutate the piece; everything so
 * far has simply read existing values. Because of this, we need to know about
 * another property of Piece objects: "layouts". To this point we've read stuff
 * out of the "layout" property (an array of numbers). But that layout is
 * actually one of four layouts the piece has, one for each orientation. The
 * "layouts" property is also an array (of length four), but instead of numbers
 * representing a block's coordinate, it contains arrays representing an
 * orientation's layout.
 *
 * Reusing the purple "T" piece for an example, we have these layouts for the
 * various rotations:
 *
 *        0 1 2 3   0 1 2 3   0 1 2 3   0 1 2 3
 *      +--------   -------   -------   -------
 *    0 | - - - -   - x - -   - x - -   - x - -
 *    1 | x x x -   x x - -   x x x -   - x x -
 *    2 | - x - -   - x - -   - - - -   - x - -
 *    3 | - - - -   - - - -   - - - -   - - - -
 *
 * The second layout (stem pointed left) can be expressed as this array of
 * coordinates, which you probably recall from the Piece.isAt assignment:
 *
 *    [0,1, 1,0, 1,1, 2,1]
 *
 * That array of coordinates is only one of four arrays that actually define the
 * "T" piece. Here is the full definition:
 *
 *    [
 *      [1,0, 1,1, 2,1, 1,2],
 *      [0,1, 1,0, 1,1, 2,1], // here's the array from before
 *      [1,0, 0,1, 1,1, 1,2],
 *      [0,1, 1,1, 1,2, 2,1]
 *    ]
 *
 * This array is an example of what you'll find in the "layouts" property. As
 * the piece rotates, the "layout" property is updated to point at the correct
 * index of the "layouts" array. So while you've never had to interact with the
 * "layouts" property directly, you have been using it through the "layout"
 * property this whole time.
 *
 * So when we move a piece, we don't want to update just the "layout" array,
 * otherwise when the piece rotates, it'll be as if it never moved. Instead we
 * need to update all the layouts in parallel, so even if the piece subsequently
 * rotates, the new orientation's layout array will have also moved on the
 * board.
 *
 * At this point you're an expert at using loops, but because there are nested
 * arrays (that is, arrays within an array), you'll need nested loops. Since
 * there are two levels of arrays, you'll need two loops. Convention is to use
 * the variable 'i' for your loop counter, but when you have nested loops,
 * you'll end up running into each other because the variables have to coexist.
 *
 * The usual solution is to simply pick the next letter: 'j'. If you have more
 * than a couple nested loops, that's often a sign that there's a problem with
 * the way you've designed your functions. But for now, don't worry about it
 *
 * You should not use "this.layout" anywhere in your code, only "this.layouts".
 */

/**
 * I move the piece in the direction specified by the two parameters. No checks
 * are performed about whether that makes sense or is allowed - use canMove for
 * that.
 *
 * <p>All orientation layouts are updated with the deltas, so a subsequent
 * rotation doesn't undo the move.
 *
 * @param rowDelta The number of rows to move.
 * @param columnDelta The number of columns to move.
 */
//Piece.prototype.move = function move(rowDelta, columnDelta) {
//};
