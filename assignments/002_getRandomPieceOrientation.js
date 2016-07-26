/*
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
