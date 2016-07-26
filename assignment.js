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
