/*
 * Used only to debug collisions
 */
(function(window) {

    function CircleMovTest() {
        this.initialize();
        this.currentAnimation = "s_down";
    }

    var p = CircleMovTest.prototype = new createjs.Shape();

    p.bounds;
    p.hit;
    p.direction;
    p.randomSpeedForWalk;
    p.randomTimeForWalk;
    p.countTimeForWalk = 0;

    p.lastDirection;
    p.newDirection;

    // constructor:
    p.Container_initialize = p.initialize; //unique to avoid overiding base class

    p.imgSrc;

    p.width = 95;
    p.height = 125;

    p.active;

    p.initialize = function() {

        this.name = "CircleMovTest";

        this.active = true;
        this.hitAreaX = 95;
        this.hitAreaY = 95;
        this.centerX = 47.5;
        this.centerY = 47.5;

        this.height = 47.5 * 2;
        this.width = 47.5 * 2;
        this.bounds = 10;
        this.hit = this.bounds;
        this.radius = 40;

        this.moveQtds = 0;

        this.makeShape();

        this.setRandomSpeed(3, 1);
        this.setRandomDirection();
        this.setRandomTime(50);

        this.changeDirection(Directions.UP);

    };

    p.makeShape = function() {
        //draw ship body
        var g = this.graphics;

        g.beginFill("blue").drawCircle(0, 0, 47.5);
        //furthest visual element
    };

    p.setRandomSpeed = function() {
        this.randomSpeedForWalk = 3;
    };

    p.setRandomDirection = function() {
        this.direction = NumberUtils.getRandomInt(0, 7)
    };

    p.setRandomTime = function(averageTime) {
        this.randomTimeForWalk = parseInt(Math.random() * 10 + averageTime);
    };

    p.tick = function(event) {
        if (this.active) {

            if (this.moveQtds === 30) {
                this.moveQtds = 0;
                this.changeDirection();
            }

            if (this.direction === Directions.RIGHT) {
                //Incrementa X : Está indo para a ESQUERDA
                this.x += this.randomSpeedForWalk;
                this.newDirection = "right";

            } else if (this.direction === Directions.DOWN) {
                //Incrementa Y : Está indo para BAIXO
                this.y += this.randomSpeedForWalk;
                this.newDirection = "down";

            } else if (this.direction === Directions.LEFT) {
                //Decrementa X : Está indo para ESQUERDA
                this.x -= this.randomSpeedForWalk;
                this.newDirection = "left";

            } else if (this.direction === Directions.UP) {
                //Decrementa Y : Está indo para CIMA
                this.y -= this.randomSpeedForWalk;
                this.newDirection = "up";

            } else {
                if (this.lastDirection === "right") {
                    this.newDirection = "s_right";
                } else if (this.lastDirection === "left") {
                    this.newDirection = "s_left";
                } else if (this.lastDirection === "up") {
                    this.newDirection = "s_up";
                } else if (this.lastDirection === "down") {
                    this.newDirection = "s_down";
                }
            }

            if (this.lastDirection !== this.newDirection) {
                this.lastDirection = this.newDirection;
            }

            this.moveQtds++;
        }
    };

    p.impact = function(obj, mode) {
        if (this.active && obj.active) {
            if (mode === ObjectMode.BOMB) {
                this.active = false;
                obj.active = false;
                Game.map.removeChild(this);
            } else if (mode === ObjectMode.ELEMENT || mode === ObjectMode.BLOCK) {
                this.invertDirection();
            }
        }
    };

    p.notifyMapLimit = function(dir) {
        this.changeDirection(Directions.getInverted(dir));
    };

    p.changeDirection = function(dir) {
        if (!dir) {
            if (this.direction === Directions.DOWN) {
                this.direction = Directions.LEFT;
            } else if (this.direction === Directions.LEFT) {
                this.direction = Directions.UP;
            } else if (this.direction === Directions.RIGHT) {
                this.direction = Directions.DOWN;
            } else if (this.direction === Directions.UP) {
                this.direction = Directions.RIGHT;
            }
        } else {
            this.direction = dir;
        }
    };

    /**
     * Inverete a direção do circulo
     * @returns void
     */
    p.invertDirection = function() {
        this.direction = Directions.getInverted(this.direction);
    };

    window.CircleMovTest = CircleMovTest;
}(window));