(function(window) {

    function Bird() {
        this.initialize();
        this.currentAnimation = "down";
    }

    var p = Bird.prototype = new createjs.Sprite();

    Bird.UP = 0;
    Bird.UP_RIGHT = 1;
    Bird.RIGHT = 2;
    Bird.DOWN_RIGHT = 3;
    Bird.DOWN = 4;
    Bird.DOWN_LEFT = 5;
    Bird.LEFT = 6;
    Bird.UP_LEFT = 7;

    Bird.currentDirection = 4;

    p.isFlying = false;

    // constructor:
    p.Container_initialize = p.initialize; //unique to avoid overiding base class


    /**
     * Only used to impact test (w and h)
     */
    p.width = 0;
    p.height = 0;

    p.hitAreaX = 0;
    p.hitAreaY = 0;
    

    var img = new Image();
    img.src = "assets/Bird.png";

    p.initialize = function() {
        
        this.name = "Bird";
        
        this.height = 60;
        this.width = 60;

        this.hitAreaX = 40;
        this.hitAreaY = 40;

        var localSpriteSheet = new createjs.SpriteSheet({
            images: [img], //image to use
            frames: {width: this.width, height: this.height, regX: 30, regY: 30},
            animations: {
                down: [0, 3, "down"],
                down_l: [4, 7, "down_l"],
                down_r: [8, 11, "down_r"],
                up: [12, 15, "up"],
                up_l: [4, 7, "up_l"],
                up_r: [8, 11, "up_r"],
                left: [4, 7, "left"],
                right: [8, 11, "right"]
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

    p.fire = function() {

        if (this.isFlying) {
            
            var bomb = new Bomb();
            
            Game.map.addChild(bomb, ObjectMode.BOMB);
            
            bomb.setup();
        }
    }


    p.tick = function(event) {
        var newAnimation;

        //Going up?
        if (Game.map.velocityY > 0) {
            // Yes
            // Going left?
            if (Game.map.velocityX > 0) {
                // Yes
                // Check diagonal
                if (this.isApproximate(Game.map.velocityX, Game.map.velocityY)) {
                    // In diagonal
                    newAnimation = "up_l";
                    Game.bird.currentDirection = Bird.UP_LEFT;
                } else if (Game.map.velocityY > Game.map.velocityX) {
                    // Not in diagonal
                    newAnimation = "up";
                    Game.bird.currentDirection = Bird.UP;
                } else {
                    // Not in diagonal
                    newAnimation = "left";
                    Game.bird.currentDirection = Bird.LEFT;
                }
            } else {// Not going left
                if (this.isApproximate(Game.map.velocityX, Game.map.velocityY)) {
                    // In diagonal
                    newAnimation = "up_r";
                    Game.bird.currentDirection = Bird.UP_RIGHT;
                } else if (Game.map.velocityY > (Game.map.velocityX * -1)) {
                    // Not in diagonal  
                    newAnimation = "up";
                    Game.bird.currentDirection = Bird.UP;
                } else {
                    // Not in diagonal
                    newAnimation = "right";
                    Game.bird.currentDirection = Bird.RIGHT;
                }
            }
        } else { // Not going up
            // Going left?
            if (Game.map.velocityX > 0) {
                // Yes
                // Check diagonal
                if (this.isApproximate(Game.map.velocityX, Game.map.velocityY)) {
                    // In diagonal
                    newAnimation = "down_l";
                    Game.bird.currentDirection = Bird.DOWN_LEFT;
                } else if (Game.map.velocityY * -1 > Game.map.velocityX) {
                    // Not in diagonal
                    newAnimation = "down";
                    Game.bird.currentDirection = Bird.DOWN;
                } else {
                    // Not in diagonal
                    newAnimation = "left";
                    Game.bird.currentDirection = Bird.LEFT;
                }
            } else {// Not going left
                if (this.isApproximate(Game.map.velocityX, Game.map.velocityY)) {
                    // In diagonal
                    newAnimation = "down_r";
                    Game.bird.currentDirection = Bird.DOWN_RIGHT;
                } else if (Game.map.velocityY < Game.map.velocityX) {
                    // Not in diagonal
                    newAnimation = "down";
                    Game.bird.currentDirection = Bird.DOWN;
                } else {
                    // Not in diagonal
                    newAnimation = "right";
                    Game.bird.currentDirection = Bird.RIGHT;
                }
            }
        }

        if (this.currentAnimation !== newAnimation) {
            this.gotoAndPlay(newAnimation);

        }

    };
    window.Bird = Bird;
}(window));