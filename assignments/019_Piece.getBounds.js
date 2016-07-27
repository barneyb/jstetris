/*
 * In addition to centering the piece when we first put it on the board, it
 * should also start in the top row. With the purple "T" we've used so far, it
 * is already in the top row, but if we consider a different rotation (with the
 * stem pointed down), it won't be in the top row:
 *
 *        0 1 2 3
 *      +--------
 *    0 | - - - -
 *    1 | x x x -
 *    2 | - x - -
 *    3 | - - - -
 *
 * And in array form:
 *
 *    [1,0, 1,1, 2,1, 1,2]
 *
 * In this case, we'll want to start the piece one row higher than it is in the
 * layouts. We could conceivably just change the layout to put it up on the top
 * row, but remember that the different layouts are used to represent the
 * orientations of a piece, so we need them to flow smoothly together to give
 * the appearance of rotating. In the case of the "T" piece, the center of
 * rotation is the middle block of the cross (or the top block of the stem).
 *
 * So in order to put the piece on the board, we need to both center AND
 * potentially raise it up a row or two. Centering is already taken care of, so
 * we just need to raise the piece. To start with, we'll need row bounds, or at
 * least the `minRow` bound. We don't really need `maxRow`, but for sake of
 * symmetry, we're going to figure out both just like we did for columns.
 *
 * In the case of the stem-down purple "T" above, the returned bounds object
 * should look like this:
 *
 *    {
 *      minCol: 0,
 *      maxCol: 2,
 *      minRow: 1,
 *      maxRow: 2
 *    }
 *
 * This assignment is to write a getBounds method that returns a single object
 * containing both the column and the row bounds. You should start by copying
 * the body of your getColumnBounds method into the getBounds skeleton below.
 * With that as a starting point, modify your function so that it returns the
 * row bounds as well.
 */

/**
 * I calculate the row and column bounds of the piece's active layout, and
 * return it as an object with four properties: minRow, maxRow, minCol, and
 * maxCol.
 *
 * @returns {{minRow: number, maxRow: number, minCol: number, maxCol: number}}
 *    the row/col bounds expressed as a four-property object.
 */
Piece.prototype.getBounds = function getBounds() {
    var bounds = {
        minRow: this.model.ROWS,
        maxRow: 0,
        minCol: this.model.COLS,
        maxCol: 0
    };
    for (var i = 0; i < this.layout.length; i += 2) {
        var r = this.layout[i],
            c = this.layout[i + 1];
        bounds.minRow = Math.min(bounds.minRow, r);
        bounds.maxRow = Math.max(bounds.maxRow, r);
        bounds.minCol = Math.min(bounds.minCol, c);
        bounds.maxCol = Math.max(bounds.maxCol, c);
    }
    return bounds;
};
