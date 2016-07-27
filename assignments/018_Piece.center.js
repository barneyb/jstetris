/*
 * Now that we've done all the legwork, we can actually center a piece. The
 * basic idea is to get the bounds, use that to get the columns to scoot the
 * piece over, and then move the piece that much. There's one more wrinkle to
 * handle however: that random left/right thing for odd-width pieces.
 *
 * If you look at the formula for getColumnsToCenter, you'll see that if the
 * piece occupies three columns (like a stem-down purple "T"), you'll end up
 * getting 3.5 as a result, and we clearly can't move the piece over that number
 * of cells. You've already seen the Math.floor function, but there is also a
 * Math.ceil function which goes up instead of down. Both of them leave integers
 * (whole numbers) unchanged. What we need to do is randomly select between
 * those two functions as a way of ensuring we have an integer.
 *
 * You've still got that getRandomBoolean function from earlier, but remember
 * that it's not a method of Piece, it's just a normal function, so you don't
 * use "this" in front of it.
 *
 * Once you've cleaned up the columns to scoot, just pass it to the 'move'
 * method, and you're done!
 */

/**
 * I center the piece on the board from wherever it's currently located, which
 * is most likely jammed up in the top-left corner.
 */
//Piece.prototype.center = function center() {
//};
