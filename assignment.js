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
 * The Math.random() function will be helpful. Use Google to find some
 * documentation that explains what it does.
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
