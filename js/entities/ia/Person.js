(function(window) {

    function Person(imgSrc) {
        this.initialize(imgSrc);
        this.currentAnimation = "s_down";
    }

    var p = Person.prototype = new createjs.Sprite();

    // public properties:
    p.shipFlame;
    p.shipBody;

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

    p.initialize = function(imgSrc) {

        this.name = "Person";

        this.active = true;

        var img = new Image();

        img.src = imgSrc;

        var localSpriteSheet = new createjs.SpriteSheet({
            images: [img], //image to use
            frames: {width: this.width, height: this.height, regX: 47, regY: 62},
            animations: {
                down: [0, 1, "down"],
                up: [9, 10, "up"],
                left: [3, 4, "left"],
                right: [6, 7, "right"],
                s_down: [2, 2, "s_down"],
                s_up: [11, 11, "s_up"],
                s_left: [5, 5, "s_left"],
                s_right: [8, 8, "s_right"],
            }
        });

        this.Container_initialize(localSpriteSheet);

        this.setRandomSpeed(3, 1);
        this.setRandomDirection();
        this.setRandomTime(50);

        this.gotoAndPlay("s_down");

    };

    p.setRandomSpeed = function(max, min) {
        this.randomSpeedForWalk = Math.floor(Math.random() * (max - min + 1)) + min; //(maxSpeed - minSpeed + 1) + minSpeed //cheat to return a randomic value in a range
    };

    p.setRandomDirection = function() {
        this.direction = NumberUtils.getRandomInt(1, 8);
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

            if (this.direction === Directions.RIGHT) {
                // Incrementa X : Está indo para a ESQUERDA
                this.x += this.randomSpeedForWalk;
                this.newDirection = "right";

            } else if (this.direction === Directions.DOWN) {
                // Incrementa Y : Está indo para BAIXO
                this.y += this.randomSpeedForWalk;
                this.newDirection = "down";

            } else if (this.direction === Directions.LEFT) {
                // Decrementa X : Está indo para ESQUERDA
                this.x -= this.randomSpeedForWalk;
                this.newDirection = "left";

            } else if (this.direction === Directions.UP) {
                // Decrementa Y : Está indo para CIMA
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
                this.gotoAndPlay(this.newDirection);
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
            } else if (mode === ObjectMode.ELEMENT) {
                this.setRandomDirection();
            } else if (mode === ObjectMode.BLOCK) {
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

    window.Person = Person;
}(window));