var Directions = {};
Directions.UP = 0;
Directions.RIGHT_UP = 1;
Directions.RIGHT = 2;
Directions.RIGHT_DOWN = 3;
Directions.DOWN = 4;
Directions.LEFT_DOWN = 5;
Directions.LEFT = 6;
Directions.LEFT_UP = 7;

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