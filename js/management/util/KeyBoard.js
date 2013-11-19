

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
        this.height = Game.map.height;
        this.y = 0;
        this.x = 0;
        this.makeButtons();
    };

    p.makeButtons = function() {

        var imgDown = new Image();
        imgDown.src = "assets/shared/keyboard/button_dir_down.png";

        this.downButton = new KeyBoardButton("assets/person-1.png");
        //shared/keyboard/button_dir_down.png
//        var upButton = new createjs.BitmapAnimation(localSpriteSheet);
//        var leftButton = new createjs.BitmapAnimation(imgLeft);
//        var rightButton = new createjs.BitmapAnimation(imgRight);
//        
        this.downButton.x = 300;
        this.downButton.y = 300;
//        upButton.y = 100;
//        upButton.x = 150;
//        upButton.width = 30;
//        upButton.height = 26;
//        
//        leftButton.y = 150;
//        leftButton.x = 100;
//        leftButton.width = 26;
//        leftButton.height = 30;
//        
//        rightButton.y = 150;
//        rightButton.x = 200;
//        rightButton.width = 26;
//        rightButton.height = 30;

        Game.stage.addChild(this.downButton);
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
