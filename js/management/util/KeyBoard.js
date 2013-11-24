

(function(window) {

    var KeyBoard = function() {
        this.initialize();
    };

    var p = KeyBoard.prototype = new createjs.Container();

    // Usefull keycode


    p.Container_Initializer = p.initialize;
    p.__tick = p.tick;

    p.initialize = function() {
        this.Container_Initializer();
        this.width = Game.canvas.width;
        this.height = 200;
        this.y = Game.canvas.height - 200;
        this.x = 0;
        this.makeButtons();
        this.addEventButtonsListeners();
    };

    p.makeButtons = function() {

        this.upButton = new KeyBoardButton("assets/shared/keyboard/button_dir_up.png");
        this.downButton = new KeyBoardButton('assets/shared/keyboard/button_dir_down.png');
        this.leftButton = new KeyBoardButton('assets/shared/keyboard/button_dir_left.png');
        this.rightButton = new KeyBoardButton('assets/shared/keyboard/button_dir_right.png');

//        
        this.downButton.x = 150;
        this.downButton.y = 150;
        this.upButton.y = 50;
        this.upButton.x = this.downButton.x;

        this.leftButton.y = 100;
        this.leftButton.x = 100;

        this.rightButton.y = this.leftButton.y;
        this.rightButton.x = 200;


        this.addChild(this.downButton);
        this.addChild(this.upButton);
        this.addChild(this.rightButton);
        this.addChild(this.leftButton);



    };

    p.addEventButtonsListeners = function() {
        
        this.rightButton.addEventListener("mousedown", function(e){
           movingRight = true; 
           console.log("Moving right");
        });
        this.leftButton.addEventListener("mousedown", function(e){
           movingLeft = true; 
           console.log("Moving left");
        });
        this.upButton.addEventListener("mousedown", function(e){
           movingUp = true; 
           console.log("Moving up");
        });
        this.downButton.addEventListener("mousedown", function(e){
           movingDown = true; 
           console.log("Moving down");
        });
        
        this.rightButton.addEventListener("pressup", function(e){
           movingRight = false; 
           console.log("Stopping right");
        });
        this.leftButton.addEventListener("pressup", function(e){
           movingLeft = false; 
           console.log("Stopping left");
        });
        this.upButton.addEventListener("pressup", function(e){
           movingUp = false; 
           console.log("Stopping up");
        });
        this.downButton.addEventListener("pressup", function(e){
           movingDown = false; 
           console.log("Stopping down");
        });
        
    };
    p.tick = function() {
        this.__tick();

    };


    window.KeyBoard = KeyBoard;
}(window));

var KeyBoardKeys = {};

KeyBoardKeys.ENTER = 13;
KeyBoardKeys.SPACE = 32;
KeyBoardKeys.UP = 38;
KeyBoardKeys.LEFT = 37;
KeyBoardKeys.RIGHT = 39;
KeyBoardKeys.DOWN = 40;
KeyBoardKeys.W = 87;
KeyBoardKeys.A = 65;
KeyBoardKeys.D = 68;
KeyBoardKeys.S = 83;
KeyBoardKeys.Q = 81;
