(function(window) {

    function Bird() {
        this.initialize();
        this.currentAnimation = "down";
    }

    var p = Bird.prototype = new createjs.BitmapAnimation();


    // public properties:
    Bird.TOGGLE = 60;
    Bird.MAX_THRUST = 2;
    Bird.MAX_VELOCITY = 5;

    // public properties:
    p.shipFlame;
    p.shipBody;

    p.timeout;
    p.thrust;

    p.vX;
    p.vY;

    p.bounds;
    p.hit;

    p.map;

    p.isFlying = false;

    // constructor:
    p.Container_initialize = p.initialize; //unique to avoid overiding base class

    var img = new Image();
    img.src = "assets/Bird.png";

    p.initialize = function() {

        var localSpriteSheet = new createjs.SpriteSheet({
            images: [img], //image to use
            frames: {width: 60, height: 60, regX: 30, regY: 30},
            animations: {
                down: [0, 3, "down", 4],
                down_l: [4, 7, "down_l", 4],
                down_r: [8, 11, "down_r", 4],
                up: [12, 15, "up", 4],
                up_l: [4, 7, "up_l", 4],
                up_r: [8, 11, "up_r", 4],
                left: [4, 7, "left", 4],
                right: [8, 11, "right", 4]
            }
        });

        this.Container_initialize(localSpriteSheet);

        this.timeout = 0;
        this.thrust = 0;
        this.vX = 0;
        this.vY = 0;

        this.gotoAndPlay("down");
    };


    p.isApproximate = function(a, b) {
        
        // We will work with positive values.
        
        if (a < 0) {
            a = a * -1;
        }
        
        if (b < 0) {
            b = b * -1
        }

        return (b > a ? b / 2 < a : a / 2 < b);
    }

    p.tick = function(event) {
        var newAnimation;

        //Going up?
        if (map.velocityY > 0) {
            // Yes
            // Going left?
            if (map.velocityX > 0) {
                // Yes
                // Check diagonal
                if (this.isApproximate(map.velocityX, map.velocityY)) {
                    // In diagonal
                    newAnimation = "up_l";
                } else if (map.velocityY > map.velocityX) {
                    // Not in diagonal
                    newAnimation = "up";
                } else {
                    // Not in diagonal
                    newAnimation = "left";
                }
            } else {// Not going left
                if (this.isApproximate(map.velocityX, map.velocityY)) {
                    // In diagonal
                    newAnimation = "up_r";
                } else if (map.velocityY > (map.velocityX * -1)) {
                    // Not in diagonal  
                    newAnimation = "up";
                } else {
                    // Not in diagonal
                    newAnimation = "right";
                }
            }
        } else { // Not going up
            // Going left?
            if (map.velocityX > 0) {
                // Yes
                // Check diagonal
                if (this.isApproximate(map.velocityX, map.velocityY)) {
                    // In diagonal
                    newAnimation = "down_l";
                } else if (map.velocityY * -1 > map.velocityX) {
                    // Not in diagonal
                    newAnimation = "down";
                } else {
                    // Not in diagonal
                    newAnimation = "left";
                }
            } else {// Not going left
                if (this.isApproximate(map.velocityX, map.velocityY)) {
                    // In diagonal
                    newAnimation = "down_r";
                } else if (map.velocityY < map.velocityX) {
                    // Not in diagonal
                    newAnimation = "down";
                } else {
                    // Not in diagonal
                    newAnimation = "right";
                }
            }
        }

        if (this.currentAnimation !== newAnimation) {
            this.gotoAndPlay(newAnimation)

        }
        velocityField.text = velocityField.text + "\nMoving: " + newAnimation;
    };


    window.Bird = Bird;
}(window));