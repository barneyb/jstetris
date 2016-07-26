/*
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
