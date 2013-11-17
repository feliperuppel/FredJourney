var Directions = {};
Directions.UP = 1;
Directions.RIGHT_UP = 2;
Directions.RIGHT = 3;
Directions.RIGHT_DOWN = 4;
Directions.DOWN = 5;
Directions.LEFT_DOWN = 6;
Directions.LEFT = 7;
Directions.LEFT_UP = 8;

Directions.getInverted = function(dir) {
    if (dir === Directions.UP) {
        return Directions.DOWN;
    }else if (dir === Directions.DOWN) {
        return Directions.UP;
    } else  if (dir === Directions.LEFT) {
        return Directions.RIGHT;
    } else  if (dir === Directions.RIGHT) {
        return Directions.LEFT;
    } else  if (dir === Directions.RIGHT_UP) {
        return Directions.LEFT_DOWN;
    } else  if (dir === Directions.RIGHT_DOWN) {
        return Directions.LEFT_UP;
    } else  if (dir === Directions.LEFT_DOWN) {
        return Directions.RIGHT_UP;
    } else  if (dir === Directions.LEFT_UP) {
        return Directions.RIGHT_DOWN;
    }
};