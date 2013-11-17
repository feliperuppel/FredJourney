/*
 * Used only to debug collisions
 */
(function(window) {

    function Block(w, h) {
        this.initialize(w, h);
        this.currentAnimation = "s_down";
    }

    var p = Block.prototype = new createjs.Shape();

    p.bounds;
    p.hit;
    p.direction;

    // constructor:
    p.Container_initialize = p.initialize; //unique to avoid overiding base class

    p.active;

    p.initialize = function(w, h) {
        
        this.Container_initialize();
        
        this.name = "BlockTest";

        this.active = true;

        this.width = w;
        this.height = h;

        this.makeShape();

    };

    p.makeShape = function() {
        
        var g = this.graphics;
        
        g.beginStroke("#F00").beginFill("#00F").drawRect(0, 0, this.width, this.height).draw(Game.canvas.getContext('2d'));
        //furthest visual element
        this.bounds = 10;
        this.hit = this.bounds;
    };


    window.Block = Block;
}(window));