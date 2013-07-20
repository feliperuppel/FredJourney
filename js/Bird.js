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
                down_r: [8, 11, "down_r", 4]
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
        if (map.velocityY < 0) {
            
            var d2 = map.velocityY / 2 ;
            
            if(((map.velocityX > 0 && (d2*-1) < map.velocityX) 
                    || (map.velocityX < 0 && d2 < map.velocityX)) 
                    && (map.velocityY < map.velocityX || map.velocityX > 0 && map.velocityY * -1 > map.velocityX )) {
                    
                if(map.velocityX>0){
                    this.gotoAndPlay("down_l");
                }else{
                    this.gotoAndPlay("down_l");    
                }
            } else if( map.velocityX < 0 && map.velocityY < map.velocityX ){
                this.gotoAndPlay("down");
            } else {
                this.gotoAndPlay("down");
            }
        }
    };

    window.Bird = Bird;
}(window));