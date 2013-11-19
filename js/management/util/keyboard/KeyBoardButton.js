(function(window) {

    function KeyBoardButton(imgSrc) {
        this.initialize(imgSrc);
    }

    var p = KeyBoardButton.prototype = new createjs.Bitmap();

    // constructor:
    p.BitmapInitializer = p.initialize; //unique to avoid overiding base class

    p.imgSrc;

    p.width = 30;
    p.height = 30;

    p.initialize = function(imgSrc) {

        this.name = "KeyBoardButton [" + imgSrc + "]";
        
        this.BitmapInitializer(imgSrc);
    };

    window.KeyBoardButton = KeyBoardButton;
}(window));