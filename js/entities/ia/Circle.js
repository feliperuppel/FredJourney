/**
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
        
        g.beginFill("red").drawCircle(0, 0, 40);
        //furthest visual element
        this.bounds = 10;
        this.hit = this.bounds;
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

//			switch(this.lastDirection){
//			case "right":
//				velocityField.text += "\ns_right";
//				this.newDirection = "s_right";
//				break;
//			case "left":
//				velocityField.text += "\ns_left";
//				this.newDirection = "s_left";
//				break;
//			case "up":
//				velocityField.text += "\ns_up";
//				this.newDirection = "s_up";
//				break;
//			case "down":
//				velocityField.text += "\ns_down";
//				this.newDirection = "s_down";
//				break;
//			}

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

//    	velocityField.text = "\nlastDirection: "+this.lastDirection;

            if (this.lastDirection != this.newDirection) {
                this.lastDirection = this.newDirection;
            }

//    	velocityField.text += "\nMoving: "+this.currentAnimation;
//    	velocityField.text += "\nnewDirection: "+this.newDirection;

            this.countTimeForWalk++;
        }
    };


    p.impact = function(obj, mode) {
        if (this.active && obj.active) {
            if (mode == ObjectMode.BOMB) {
                this.active = false;
                obj.active = false;
                map.removeChild(this);
            } else if (mode == ObjectMode.ELEMENT) {
                this.setRandomDirection();
//                console.log("This Person ("+this.id+") has encontered another Person ("+obj.id+")");
            } else if (mode == ObjectMode.BLOCK) {
                this.setRandomDirection();
//                console.log("This Person ("+this.id+") has encontered an Block");
            }
        }
    };

    window.Circle = Circle;
}(window));