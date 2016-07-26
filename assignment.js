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
 * has the function that you'll need to implement, commented out. The first
 * thing you should do for EVERY assignment is to uncomment the function, and
 * refresh to see it break. Then you can start filling in the function.
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
