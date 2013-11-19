

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
        this.width = Game.map.width;
        this.height = 200;
        this.y = 500;
        this.x = 0;
        this.makeButtons();
    };

    p.makeButtons = function() {
        
        this.upButton = new KeyBoardButton("assets/shared/keyboard/button_dir_up.png");
        this.downButton = new KeyBoardButton('assets/shared/keyboard/button_dir_down.png');
        this.leftButton = new KeyBoardButton('assets/shared/keyboard/button_dir_left.png');
        this.rightButton = new KeyBoardButton('assets/shared/keyboard/button_dir_right.png');

//        
        this.downButton.x = 150;
        this.downButton.y = 150;
        this.upButton.y = 50 
        this.upButton.x = this.downButton.x;
        
        this.leftButton.y = 100;
        this.leftButton.x = 100;
        
        this.rightButton.y = this.leftButton.y;
        this.rightButton.x = 200;
        

        this.addChild(this.downButton);
        this.addChild(this.upButton);
        this.addChild(this.rightButton);
        this.addChild(this.leftButton);
//        this.addChild(upButton);
//        this.addChild(leftButton);
//        this.addChild(rightButton);
//        
//        this.ob = new Circle();
//        this.addChild(this.ob);
//
//        this.ob.x = 150;
//        this.ob.y = 150;
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
