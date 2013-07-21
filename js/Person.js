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
    var max = 1;
    var min = 1;
    var randomicPerson = (Math.floor(Math.random() * (max - min + 1)) + min);
    img.src = "assets/person-"+randomicPerson+".png";

    p.initialize = function () {
       
    	var localSpriteSheet = new createjs.SpriteSheet({
            images: [img], //image to use
            frames: {width: 60, height: 120, regX: 30, regY: 60},
            animations: {
//                down: [0, 7, "down", 4],
//                up: [23, 30, "up", 4],
//                left: [8, 15, "left", 4],
//	            right: [16, 22, "right", 4],
//	            stoped_down: [0, 1, "stopped_down", 4],
//	            stoped_up: [23, 24, "stopped_up", 4],
//	            stoped_left: [8, 9, "stopped_left", 4],
//	            stoped_right: [16, 17, "stopped_right", 4],
            	
                down: [23, 30, "down", 4],
                up: [0, 7, "up", 4],
                left: [16, 22, "left", 4],
	            right: [8, 15, "right", 4],
	            stoped_down: [31, 33, "stopped_down", 4],
	            stoped_up: [40, 42, "stopped_up", 4],
	            stoped_left: [34, 36, "stopped_left", 4],
	            stoped_right: [37, 39, "stopped_right", 4],

            	
            	
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
    		//Incrementa X : Está indo para a ESQUERDA
    		this.x += this.randomSpeedForWalk;
    		if(this.lastDirection != "left"){
    			this.gotoAndPlay("left");
    		}
    		this.lastDirection = "left";
		}else if(this.randomDirection <= 3){
			//Incrementa Y : Está indo para CIMA
			this.y += this.randomSpeedForWalk;
			if(this.lastDirection != "up"){
    			this.gotoAndPlay("up");
    		}
			this.lastDirection = "up";
		}else if(this.randomDirection <= 5){
			//Decrementa X : Está indo para DIREITA
			this.x -= this.randomSpeedForWalk;
			if(this.lastDirection != "right"){
    			this.gotoAndPlay("right");
    		}
			this.lastDirection = "right";
		}else if(this.randomDirection <= 7){
			//Decrementa Y : Está indo para BAIXO
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