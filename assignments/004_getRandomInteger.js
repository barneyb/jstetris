/*
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
 * It's up to the calling code to ensure they don't violate the rule(s) we set
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
