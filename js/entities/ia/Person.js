(function(window) {

    function Person(imgSrc) {
        this.initialize(imgSrc);
        this.currentAnimation = "s_down";
    }

    var p = Person.prototype = new createjs.BitmapAnimation();

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

    p.active;

    p.initialize = function(imgSrc) {

        this.name = "Person";

        this.active = true;

        var img = new Image();

        img.src = imgSrc;

//    	var localSpriteSheet = new createjs.SpriteSheet({
//            images: [img], //image to use
//            frames: {width: 60, height: 120, regX: 30, regY: 120},
//            animations: {
//            	
//////                down: [0, 7, "down", 4],
//////                up: [23, 30, "up", 4],
//////                left: [8, 15, "left", 4],
//////	            right: [16, 22, "right", 4],
//////	            stoped_down: [0, 1, "s_down", 4],
//////	            stoped_up: [23, 24, "s_up", 4],
//////	            stoped_left: [8, 9, "s_left", 4],
//////	            stoped_right: [16, 17, "s_right", 4],
////            	
//                down: [23, 30, "down", 4],
//                up: [0, 7, "up", 4],
//                left: [16, 22, "left", 4],
//	            right: [8, 15, "right", 4],
//	            stoped_down: [31, 33, "s_down", 4],
//	            stoped_up: [40, 42, "s_up", 4],
//	            stoped_left: [34, 36, "s_left", 4],
//	            stoped_right: [37, 39, "s_right", 4],
//            }
//        });

        var localSpriteSheet = new createjs.SpriteSheet({
            images: [img], //image to use
            frames: {width: this.width, height: this.height, regX: 47, regY: 62},
            animations: {
                down: [0, 1, "down", 4],
                up: [9, 10, "up", 4],
                left: [3, 4, "left", 4],
                right: [6, 7, "right", 4],
                s_down: [2, 2, "s_down", 4],
                s_up: [11, 11, "s_up", 4],
                s_left: [5, 5, "s_left", 4],
                s_right: [8, 8, "s_right", 4],
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
                this.gotoAndPlay(this.newDirection);
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
                Game.map.removeChild(this);
            } else if (mode == ObjectMode.ELEMENT) {
                this.setRandomDirection();
//                console.log("This Person ("+this.id+") has encontered another Person ("+obj.id+")");
            } else if (mode == ObjectMode.BLOCK) {
                this.setRandomDirection();
//                console.log("This Person ("+this.id+") has encontered an Block");
            }
        }
    };

    window.Person = Person;
}(window));