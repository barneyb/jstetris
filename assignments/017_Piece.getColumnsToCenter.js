/*
 * Now that we can get the column bounds of the piece, we can figure out how
 * many columns it should be moved in order to center it on the board.
 *
 * Again with the purple "T", it's initial layout looks like this:
 *
 *        0 1 2 3
 *      +--------
 *    0 | - x - -
 *    1 | x x - -
 *    2 | - x - -
 *    3 | - - - -
 *
 * Thus it's column bounds look like this:
 *
 *    {
 *      minCol: 0,
 *      maxCol: 1
 *    }
 *
 * We want it to look like this:
 *
 *        0 1 2 3 4 5 6 7 8 9
 *      +--------------------
 *    0 | - - - - - x - - - -
 *    1 | - - - - x x - - - -
 *    2 | - - - - - x - - - -
 *    3 | - - - - - - - - - -
 *
 * You can count and see that we need to move it over four columns, but it's
 * going to be a different amount for each piece (and for each different
 * orientation of some pieces!). Sounds like another method, this time called
 * `getColumnsToCenter`, which will get passed the column bounds as a parameter,
 * and in this case should return 4.
 *
 * We need some sort of formula that can use the bounds information and the
 * width of the board to calculate that 4, however. Here's it is:
 *
 *     (total_columns - (max_col - min_col + 1))
 *    -------------------------------------------  -  min_col
 *                         2
 *
 * In this particular case, when we plug in the numbers we get this:
 *
 *     (10 - (1 - 0 + 1))
 *    --------------------  -  0
 *             2
 *
 * This simplifies to
 *
 *     10 - 2               8
 *    --------  -  0   =   ---  -  0   =   4 - 0   =   4
 *       2                  2
 *
 * We'll use that four in the next assignment to actually center the piece.
 */

/**
 * I compute how many columns a piece must be scooted over in order to center
 * it, based on the passed `bounds` object (as retrieved from getColumnBounds).
 *
 * @param bounds The column bounds to use in the calculation
 * @returns {number} The number of columns to scoot the piece over so that it is
 *    centered on the board.
 */
//Piece.prototype.getColumnsToCenter = function getColumnsToCenter(bounds) {
//};
