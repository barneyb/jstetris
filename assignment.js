/*
 * This file contains the pieces of functionality that need to be implemented in
 * order to make your Tetris game work. Make sure you get each piece working
 * correctly before you move on to the next one, as later pieces depend on
 * earlier ones. Since this isn't nearly as fancy as CodeCombat or CodeAcademy,
 * when you make a change, save your file, and hit reload in the browser to see
 * the updated code.
 *
 * Each assignment has some comments describing what you need to do, as well as
 * laying out any information you might need in order to complete it. It also
 * has the function that you'll need to implement, commented out. As long as the
 * function is commented out, the game will work with it's own internal logic.
 * As soon as the function is uncommented, it'll start being used (and since
 * it's empty, the game will undoubtedly break). The first thing you should do
 * for EVERY assignment is to uncomment the function, and refresh to see it
 * break. Then you can start filling in the function.
 *
 * While you're working, if you just comment out the whole function again, the
 * game will go back to it's original state. So you can always 'undo' your
 * changes by commenting out your function, without having to delete it.
 *
 * It will also be helpful to keep the developer tools open so you can see the
 * console. That way you can see if there are any errors, but more importantly,
 * you can use the `console.log` function to print out messages and/or variable
 * to see what's going on. If you know how to use the debugger, you can do that
 * instead, but don't worry if not. We'll get there later.
 */

/*
 * Assignment #
 *
 * One of the first things Tetris needs is the ability to select a random piece
 * to start dropping. There are 7 pieces to choose from, so we need a function
 * that can randomly return a number from zero to six.
 *
 * Why 0-6 instead of 1-7?
 *
 * The Math.random() and Math.floor() functions will be helpful. Use Google to
 * find some documentation that explains what they do.
 */

/**
 * I return a random piece index to use for creating the 'next' piece in the
 * game. There are seven pieces, so the function should return one of the
 * numbers 0, 1, 2, 3, 4, 5, and 6 at random, each with equal likelihood.
 *
 * @returns {number} The index of the next random piece.
 */
function getRandomPieceIndex() {
    return Math.floor(Math.random() * 7);
}

/*
 * Assignment #
 *
 * As it turns out, not only do we want to select a random piece, we also want
 * it to start in a random orientation. Every piece can be four different
 * orientations, though some of them only have one or two visually distinct
 * orientations. However, even though the player can't tell the difference, it's
 * easier to treat all the pieces as if they have four orientations. That way we
 * don't have to treat the pieces differently based on how many visually
 * distinct orientations, we can just have a single approach that works for all.
 */

/**
 * I return a random piece orientation to use for the 'next' piece. There are
 * four potential orientations, so the function should return one of the numbers
 * 0, 1, 2, and 3 at random, each with equal likelihood.
 *
 * @returns {number} The random orientation for a piece.
 */
function getRandomPieceOrientation() {
    return Math.floor(Math.random() * 4);
}

/*
 * Assignment #
 *
 * You may have noticed that getRandomPieceIndex and getRandomPieceOrientation
 * are quite similar. According to DRY (Don't Repeat Yourself) we want to avoid
 * that sort of duplication. So instead, we want to create a single function
 * that returns a random number greater than or equal to zero and less than 'n',
 * where 'n' is a parameter passed to the function. Then that single function
 * can be used to replace both of the other two, reducing duplication.
 *
 * Why don't we want to allow returning 'n' itself, only numbers less than 'n'?
 *
 * Don't worry about if 'n' is less than zero. The calling code will ensure that
 * never happens. In programming terms, we say "the behaviour is undefined",
 * meaning we are explicitly indicating that we make no guarantees what will
 * happen if such a value is passed. The function might do something useful, it
 * might throw an error, it might cause an infinite loop, we make no promises.
 * it's up to the calling code to ensure they don't violate the rule(s) we set
 * on valid values to pass to the function. Those rules are called
 * "constraints", and are an important part of creating flexible, reusable code.
 *
 * Once getRandomInteger (this assignment's function) is available, the two
 * functions it's designed to replace will stop being used. So no need to go fix
 * them. In fact, you can go comment them out if you want. But you should at
 * least consider how you'd reimplement them using the new function.
 */

/**
 * I return a random integer between zero (inclusive) and 'n' (exclusive). If a
 * number less than zero is passed for 'n', the behaviour of the function is
 * undefined.
 *
 * @param n The upper (exclusive) bound to randomize within.
 * @returns {number} A random number greater than or equal to zero and less than
 *  'n'.
 */
function getRandomInteger(n) {
    return Math.floor(Math.random() * n);
}

/*
 * Assignment #
 *
 * There's one more bit of randomization involved with creating new pieces. If
 * the new piece is two or four columns wide, it can be centered on the board.
 * However, if it's one or three columns wide, it has to be one column left or
 * right of center (since the board has an even number of columns). What we need
 * is a function that will randomly return left or right for us. But that's
 * really specific, and there is a built-in datatype that supports exactly two
 * values already: boolean.
 *
 * instead, lets make a function that will return a boolean for whether we
 * should pick left. That makes the function more reusable. To make it even more
 * reusable, name it 'getRandomBoolean'. The implementation won't change (it's
 * still returning a random boolean value), but it'll be easier to see what the
 * function does compared to if it was named 'getRandomUseLeftSide'.
 *
 * Consider using 'getRandomInteger' to help implement the function.
 *
 * Note: when you uncomment and refresh, it will be tricky to see the "broken"
 * behaviour. Because of JavaScript's concepts of "truth-y" and "false-y", the
 * empty function will appear to always return 'false', thus placing every
 * odd-width piece just right of center. This is because the return value is
 * 'undefined', and when 'undefined' is used where a boolean is expected, it is
 * treated as a 'false' value. Thus we say that 'undefined' is "false-y". The
 * number zero and the empty string are also considered "false-y" in JavaScript.
 */

/**
 * I return a random boolean value.
 *
 * @returns {boolean} A random boolean value.
 */
function getRandomBoolean() {
    return getRandomInteger(2) == 0;
}

/*
 * Assignment #
 *
 * The box that indicates how many lines the player has completely needs to be
 * labeled. The label isn't always the same, though, because of pluralization
 * rules. Your job is to write a function that will provide the right label for
 * the current line count.
 */

/**
 * I return the label to use for the specified line count, pluralized
 * appropriately. For example, if lineCount is 23, the return value might be
 * "23 Lines".
 *
 * @param lineCount The line count to label.
 * @returns {string} The label to use for the line count.
 */
function labelLineCount(lineCount) {
    return lineCount + " " + (lineCount == 1 ? "Line" : "Lines");
}

/*
 * Assignment #
 *
 * Within the internals of the game, the concept of "a piece" comes up all over
 * the place. Much like JavaScript itself has a Date object, this game has a
 * Piece object to encapsulate that concept. One of the things that Pieces know
 * about themselves is where on the board they're currently located. This is
 * needed for a bunch of things: drawing the piece, deciding if a piece can move
 * or rotate, seeing if it's at the edge of the board, etc.
 *
 * Consider the purple T piece, oriented with it's stem pointed left:
 *
 *    - x - -
 *    x x - -
 *    - x - -
 *    - - - -
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
 * So if 'this' means the current Piece, and each Piece has a 'layout' property
 * containing an eight-element array, then within a method, you can use
 * 'this.layout' as the name of that array.
 *
 * Usually when you deal with arrays, you use a loop. But in this case, since
 * you know the array is eight numbers long, and those numbers are really four
 * (row, column) coordinate pairs, there isn't really any need to use a loop.
 * You can get a specific item of an array by using it's zero-based index, so
 * "this.layout[3]" will be the column coordinate of the second block, and
 * "this.layout[6]" will be the row coordinate of the fourth block.
 *
 * Note: when you uncomment and refresh, both the piece preview and the active
 * piece will stop showing up. Like the random boolean for centering, this is
 * due to the "false-y" nature of 'undefined', since isAt also returns a boolean
 * value. If you wait a few seconds, once the pieces land at the bottom of the
 * board they WILL show up. Or you can use the down arrow to drop the active
 * piece to the bottom immediately.
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
