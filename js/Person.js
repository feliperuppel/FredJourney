(function (window) {

    function Person() {
        this.initialize();
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

    // constructor:
    p.Container_initialize = p.initialize; //unique to avoid overiding base class

    

    p.initialize = function () {
        this.Container_initialize();

        // cria o espaço do objeto
        this.shipFlame = new createjs.Shape();

        // cria o corpo do objeto
        this.shipBody = new createjs.Shape();

        // adiciona ao objeto principal
        this.addChild(this.shipFlame);
        this.addChild(this.shipBody);

        this.makeShape();
        
        this.setRandomSpeed(3,1);
        this.setRandomDirection();
        this.setRandomTime(50);
        
    };
    
    // public methods:
    p.makeShape = function () {
        //draw ship body // todo substituir por uma pessoa
        var g = this.shipBody.graphics;
        g.clear();
        g.beginStroke("#333333");
        
        g.moveTo(0, 0); //Initial point
        g.lineTo(0, 120); //left line
        g.lineTo(60, 120); //upper line
        g.lineTo(60, 0); //right line
        g.lineTo(0, 0); //botton line
        g.closePath(); // nose


        //draw ship flame
        var o = this.shipFlame;
        o.scaleX = 0.5;
        o.scaleY = 0.5;
        o.y = -5;

        g = this.shipBody.graphics;
        g.clear();
        g.beginStroke("#000000");

        g.moveTo(0, 0); //Initial point
        g.lineTo(0, 120); //left line
        g.lineTo(60, 120); //upper line
        g.lineTo(60, 0); //right line
        g.lineTo(0, 0); //botton line
        g.closePath(); // ?
        
        

        //furthest visual element
        this.bounds = 10;
        this.hit = this.bounds;
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


    window.Person = Person;
} (window));