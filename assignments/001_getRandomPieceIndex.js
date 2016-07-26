/*
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
