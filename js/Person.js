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
    
    p.lastDirection;

    // constructor:
    p.Container_initialize = p.initialize; //unique to avoid overiding base class

    var img = new Image();
    img.src = "assets/person-moves.png";

    p.initialize = function () {
       
    	var localSpriteSheet = new createjs.SpriteSheet({
            images: [img], //image to use
            frames: {width: 60, height: 120, regX: 30, regY: 60},
            animations: {
                down: [0, 11, "down", 4],
                up: [0, 11, "up", 4],
                left: [0, 11, "left", 4],
	            right: [0, 11, "right", 4],
	            stoped_down: [0, 11, "stopped_down", 4],
	            stoped_up: [0, 11, "stopped_up", 4],
	            stoped_left: [0, 11, "stopped_left", 4],
	            stoped_right: [0, 11, "stopped_right", 4],
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
    	
    	if(this.randomDirection <= 1){
    		this.x += this.randomSpeedForWalk;
    		
    		if(this.lastDirection != "right"){
    			this.gotoAndPlay("right");
    		}
    		
    		this.lastDirection = "right";
    		
		}else if(this.randomDirection <= 3){
			this.y += this.randomSpeedForWalk;
			
			if(this.lastDirection != "up"){
    			this.gotoAndPlay("up");
    		}
			this.lastDirection = "up";
			
		}else if(this.randomDirection <= 5){
			this.x -= this.randomSpeedForWalk;
			if(this.lastDirection != "left"){
    			this.gotoAndPlay("left");
    		}
			this.lastDirection = "left";
		}else if(this.randomDirection <= 7){
			this.y -= this.randomSpeedForWalk;
			if(this.lastDirection != "down"){
    			this.gotoAndPlay("down");
    		}
			this.lastDirection = "down";
		}else{
			switch(this.lastDirection){
			case "right":
				this.gotoAndPlay("stopped_right");
				break;
			case "left":
				this.gotoAndPlay("stopped_left");
				break;
			case "up":
				this.gotoAndPlay("stopped_up");
				break;
			case "down":
				this.gotoAndPlay("stopped_down");
				break;
			}
			
			this.lastDirection = "stopped";
		}
    	
    	this.countTimeForWalk++;
    	
    };


    window.Person = Person;
} (window));