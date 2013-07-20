(function (window) {

    function Person() {
        this.initialize();
        this.currentAnimation = "down";
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

    // constructor:
    p.Container_initialize = p.initialize; //unique to avoid overiding base class

    var img = new Image();
    img.src = "assets/Bird.png";

    p.initialize = function () {
       
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
        
        this.setRandomSpeed(3,1);
        this.setRandomDirection();
        this.setRandomTime(50);
        
        this.gotoAndPlay("down");
        
    };
        
    p.setRandomSpeed = function (max, min){
    	this.randomSpeedForWalk = Math.floor(Math.random() * (max - min + 1)) + min; //(maxSpeed - minSpeed + 1) + minSpeed //cheat to return a randomic value in a range
    };
    
    p.setRandomDirection = function (){
    	this.randomDirection = parseInt(Math.random()*10);
    };
    
    p.setRandomTime = function (averageTime){
    	this.randomTimeForWalk = parseInt(Math.random()*10+averageTime);
    };
    
    p.tick = function(event) {
    	
    	if(this.randomTimeForWalk <= this.countTimeForWalk){
			this.setRandomDirection();
			this.setRandomSpeed(3,1);
			this.setRandomTime(50);
			this.countTimeForWalk = 0;
		}
    	
    	if(this.randomDirection < 8){
	    	if(this.randomDirection <= 1){
	    		this.x += this.randomSpeedForWalk;
	    		this.gotoAndPlay("down_r");
			}else if(this.randomDirection <= 3){
				this.y += this.randomSpeedForWalk;
				this.gotoAndPlay("down");
			}else if(this.randomDirection <= 5){
				this.x -= this.randomSpeedForWalk;
				this.gotoAndPlay("down_l");
			}else if(this.randomDirection <= 7){
				this.y -= this.randomSpeedForWalk;
				this.gotoAndPlay("down");
			}
    	}
    	
    	this.countTimeForWalk++;
    	
    };


    window.Person = Person;
} (window));