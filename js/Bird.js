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

    p.tick = function(event) {
        var newAnimation;

        if (map.velocityY < 0) {

            var d2 = map.velocityY / 2;
            if (map.velocityX > 0 && map.velocityX > d2 * -1) {
                newAnimation = "down_l";
            } else if (map.velocityX < 0 && map.velocityX < d2) {
                newAnimation = "down_r";
            } else if (map.velocityY < map.velocityX) {
                newAnimation = "down";
            } else if(map.velocityX < 0) {
                newAnimation = "right";
            } else {
                newAnimation = "left";
            }
        } else if (map.velocityY > 0) {

            var d2 = map.velocityY / 2;
            if (map.velocityX > 0 && map.velocityX > d2) {
                newAnimation = "up_l"; // nothing
            } else if (map.velocityX < 0 && map.velocityX < d2 * -1) {
                newAnimation = "up_r";
            } else if (map.velocityY > map.velocityX) {
                newAnimation = "up";
            } else if(map.velocityX < 0) {
                newAnimation = "right";
            } else {
                newAnimation = "left";
            }
        } else {
            newAnimation = "down";
        }

        if (this.currentAnimation !== newAnimation) {
            this.gotoAndPlay(newAnimation)
            
        }
        velocityField.text = velocityField.text + "\nMoving: "+newAnimation;
    };

    window.Bird = Bird;
}(window));