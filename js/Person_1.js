(function(window) {

    function Person(imgSrc) {
        this.initialize(imgSrc);
        this.currentAnimation = "s_down";
    }

    var p = Person.prototype = new createjs.Container();

    // public properties:
    p.shipFlame;
    p.shipBody;

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

    p.initialize = function(imgSrc) {

        this.name = "Person";

        this.Container_initialize();

        this.setRandomSpeed(3, 1);
        this.setRandomDirection();
        this.setRandomTime(50);

        this.block = new createjs.Shape();

        var g = this.block.graphics;

        g.beginStroke("#000");
        g.moveTo(0, 0); //nose
        g.lineTo(0, this.height); //nose
        g.lineTo(this.width, this.height); //nose
        g.lineTo(this.width, 0); //nose

        g.closePath(); // nose

        this.addChild(this.block);

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

            if (this.lastDirection == "right") {
                this.newDirection = "s_right";
            } else if (this.lastDirection == "left") {
                this.newDirection = "s_left";
            } else if (this.lastDirection == "up") {
                this.newDirection = "s_up";
            } else if (this.lastDirection == "down") {
                this.newDirection = "s_down";
            }

        }


        if (this.lastDirection != this.newDirection) {
            this.lastDirection = this.newDirection;
            this.gotoAndPlay(this.newDirection);
        }

        this.countTimeForWalk++;

    };


    p.impact = function(a, b) {
        map.removeChild(this);
    }

    window.Person = Person;
}(window));