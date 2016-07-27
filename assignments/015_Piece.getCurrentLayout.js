/*
 * While we're on the topic of layouts and references, there's one more method
 * we should write for Piece: getCurrentLayout. The UI needs to be able to draw
 * pieces, and it needs the layout of a piece in order to do the drawing. In
 * JavaScript, anything can just access the "layout" property directly, but that
 * has some potential problems, so we want to provide a better solution: a
 * getter method.
 *
 * One problem with accessing the "layout" property directly is that it's not
 * safe from mutation. If someone got the "layout" array and then changed one
 * of the values (say to -123), that would cause some problems, to put it
 * mildly.
 *
 * Even if they made a change that wasn't off the board, it would still
 * make that one layout in the "layouts" array inconsistent with the other
 * layouts. Remember how the "layout" property points at one of the layouts in
 * the "layouts" property and we had to be very careful to ensure that all four
 * layouts stayed in sync?
 *
 * Another problem is that we don't necessarily want to let other code know that
 * Piece has a "layout" property inside of it. Maybe later we'll want to get rid
 * of it in favor of using the "layouts" property directly. Maybe we decide that
 * we don't like the word 'layout' anymore and want to change it to 'blocks'.
 * Suddenly code *outside* the Piece object would have to be updated as well.
 *
 * By using a getter method we can address both problems. By using a method, if
 * we want to switch to the name 'blocks', we can update the method body and all
 * the calling code will just automatically get the right thing. We can also
 * duplicate the array when return it, so that any changes made to the array
 * will not change the internal "layouts" property's state. So not only are we
 * safe from corruption, we're also able to easily change things in the future.
 *
 * This isn't a terribly interesting method, so the solution is just sitting
 * there, commented out. The actual assignment is to use Google and find the
 * documentation for Array.slice (just as you did for Math.rand way back when)
 * and understand what it's doing and why.
 */

/**
 * I return a copy of the piece's current layout.
 *
 * @returns {Array.<number>}
 */
//Piece.prototype.getCurrentLayout = function getCurrentLayout() {
//    return this.layout.slice(0);
//};
