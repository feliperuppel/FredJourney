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
        this.bounds = 10;
        this.hit = this.bounds;
        // Checa o borwser.
        //if (createjs.Sound.BrowserDetect.isIOS || createjs.Sound.BrowserDetect.isAndroid) {  // || createjs.Sound.BrowserDetect.isBlackberry  OJR blackberry has not been tested yet
        //document.getElementById("mobile").style.display = "block";
        //document.getElementById("content").style.display = "none";
        //return;
        //}
        this.radius = 40;
    };

    p.setRandomSpeed = function(max, min) {
        this.randomSpeedForWalk = Math.floor(Math.random() * (max - min + 1)) + min; //(maxSpeed - minSpeed + 1) + minSpeed //cheat to return a randomic value in a range
    };

    p.setRandomDirection = function() {
        this.direction = NumberUtils.getRandomInt(0, 7)
    };

    p.setRandomTime = function(averageTime) {
        this.randomTimeForWalk = parseInt(Math.random() * 10 + averageTime);
    };

    p.tick = function(event) {
        if (this.active) {

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
        console.log("WARNING: object (name:" + this.name + ") get Map limit");
        this.changeDirection(Directions.getInverted(dir));
        console.log("New direction: " + this.newDirection + "(" + this.direction + ")");
    };

    p.changeDirection = function(dir) {
        this.direction = dir;
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