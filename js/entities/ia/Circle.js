/*
 * Used only to debug collisions
 */
(function(window) {

    function Circle(imgSrc) {
        this.initialize(imgSrc);
        this.currentAnimation = "s_down";
    }

    var p = Circle.prototype = new createjs.Shape();

    p.bounds;
    p.hit;
    p.randomDirection;
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

    p.initialize = function(imgSrc) {

        this.name = "Person";

        this.active = true;

        this.makeShape();

        this.setRandomSpeed(3, 1);
        this.setRandomDirection();
        this.setRandomTime(50);

    };

    p.makeShape = function() {
        //draw ship body
        var g = this.graphics;

        g.beginFill("blue").drawCircle(0, 0, 47.5);
        //furthest visual element
        this.bounds = 10;
        this.hit = this.bounds;
        this.radius = 40;
    };

    p.setRandomSpeed = function(max, min) {
        this.randomSpeedForWalk = Math.floor(Math.random() * (max - min + 1)) + min; //(maxSpeed - minSpeed + 1) + minSpeed //cheat to return a randomic value in a range
    };

    p.setRandomDirection = function() {
        this.randomDirection = parseInt(Math.random() * 10);
    };

    p.setRandomTime = function(averageTime) {
        this.randomTimeForWalk = parseInt(Math.random() * 10 + averageTime);
    };

    p.tick = function(event) {
        if (this.active) {
            if (this.randomTimeForWalk <= this.countTimeForWalk) {
                this.setRandomDirection();
                this.setRandomSpeed(3, 1);
                this.setRandomTime(50);
                this.countTimeForWalk = 0;
            }

            if (this.randomDirection <= 1) {
                //Incrementa X : Está indo para a ESQUERDA
                this.x += this.randomSpeedForWalk;
                this.newDirection = "right";

            } else if (this.randomDirection <= 3) {
                //Incrementa Y : Está indo para CIMA
                this.y += this.randomSpeedForWalk;
                this.newDirection = "down";

            } else if (this.randomDirection <= 5) {
                //Decrementa X : Está indo para DIREITA
                this.x -= this.randomSpeedForWalk;
                this.newDirection = "left";

            } else if (this.randomDirection <= 7) {
                //Decrementa Y : Está indo para BAIXO
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

            this.countTimeForWalk++;
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
        console.log("WARNIG: object (name:" + this.name + ") get Map limit");
        switch (dir) {
            case Directions.UP:
                {
                    this.changeDirection(Directions.DOWN);
                }

            case Directions.RIGHT:
                {
                    this.changeDirection(Directions.LEFT);
                }

            case Directions.DOWN:
                {
                    this.changeDirection(Directions.UP);
                }

            case Directions.LEFT:
                {
                    this.changeDirection(Directions.RIGHT);
                }

        }
    };

    p.changeDirection = function(dir) {
        switch (dir) {
            case Directions.UP:
                {
                    this.randomDirection = 7;
                    this.newDirection = "up";
                }

            case Directions.RIGHT:
                {
                    this.randomDirection = 1;
                    this.newDirection = "right";
                }

            case Directions.DOWN:
                {
                    this.randomDirection = 3;
                    this.newDirection = "down";
                }

            case Directions.LEFT:
                {
                    this.randomDirection = 5;
                    this.newDirection = "left";
                }

        }
    };

    /**
     * Inverete a direção do circulo
     * @returns void
     */
    p.invertDirection = function() {

        if (this.randomDirection <= 1) {

            this.randomDirection = 5;
            this.newDirection = "left";

        } else if (this.randomDirection <= 3) {
            this.randomDirection = 7;
            this.newDirection = "up";

        } else if (this.randomDirection <= 5) {

            this.randomDirection = 1;
            this.newDirection = "right";

        } else if (this.randomDirection <= 7) {

            this.randomDirection = 3;
            this.newDirection = "down";
        }
    };

    window.Circle = Circle;
}(window));