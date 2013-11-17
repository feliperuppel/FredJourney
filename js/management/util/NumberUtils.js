var NumberUtils = {};

/**
 * 
 * @param {int} min
 * @param {int} max
 * @returns Integer
 */
NumberUtils.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

