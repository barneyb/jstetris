/*
 * You have undoubtedly noticed that every new piece start in the center of the
 * board, in the top row. When you wrote getRandomBoolean, there was some
 * discussion about centering pieces on the board when they start to explain why
 * the function was needed.
 *
 * In order to center a piece on the board, you need three pieces of
 * information, in addition to whether to bias left or right (via
 * getRandomBoolean) if it can't be centered perfectly. What are they?
 *
 * The first one is the width of the board, but you already know how to get that
 * information. It's present in Model.COLS, which we can access in any Piece
 * method via `this.model.COLS`.
 *
 * The second one is the width of the piece, in it's initial orientation. We
 * don't have access to this information yet. Or do we?
 *
 * The third one is which columns the piece is currently in. Remember that our
 * piece layouts are all with the piece jammed up in the top-left corner. When
 * we place a piece we'll just put it up in the corner and the move it (using
 * the move method) over. We don't have this information yet either. Right?
 *
 * We can certainly figure those two we don't know out based on the information
 * in the "layout" property of Piece. This assignment's task is to do exactly
 * that, by implementing a getColumnBounds method on Piece.
 *
 * The method should return a JavaScript object with two properties: `minCol`
 * and `maxCol`, which will contain the lowest and highest column index that the
 * piece occupies. Going back to the layout of our friend the purple "T":
 *
 *        0 1 2 3
 *      +--------
 *    0 | - x - -
 *    1 | x x - -
 *    2 | - x - -
 *    3 | - - - -
 *
 * And in array form:
 *
 *    [0,1, 1,0, 1,1, 2,1]
 *
 * For the "T" piece in this orientation, the lowest column it occupies is
 * column zero (with one block), and the highest column it occupies is column
 * one (with the other three blocks). Thus if this piece's getColumnBounds
 * method were called, it should return this object:
 *
 *    {
 *      minCol: 0,
 *      maxCol: 1
 *    }
 *
 * Remember you only care about the current orientation, so you'll want to be
 * using "this.layout" in your method; you don't care about the other
 * orientations that live in "this.layouts". You will also find it useful to
 * use Google to look up the Math.min() and Math.max() functions.
 */

/**
 * I calculate the column bounds of the piece in it's current orientation. The
 * bounds are expressed as an object with two properties: minCol and maxCol.
 *
 * @returns {{minCol: number maxCol: number}} An object with bounds information.
 */
//Piece.prototype.getColumnBounds = function getColumnBounds() {
//};
