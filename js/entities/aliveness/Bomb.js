(function(window) {

    function Bomb() {
        this.initialize();
    }

    var p = Bomb.prototype = new createjs.Sprite();

    // constructor:
    p.Container_initialize = p.initialize; //unique to avoid overiding base class

    p.vX = 0;
    p.vY = 0;
    p.timeout = 2;

    p.decX;
    p.decY;
    
    /**
     * Only used to impact test (w and h)
     */
    p.width = 0;
    p.height = 0;

    p.hitAreaX = 0;
    p.hitAreaY = 0;

    var img = new Image();
    img.src = "assets/Bomb.png";

    p.initialize = function() {
        
        this.active = true;
        this.name = "Bomb";

        this.height = 15;
        this.width = 15;

        this.hitAreaX = 12;
        this.hitAreaY = 12;
        this.radius = 7.5;

        var localSpriteSheet = new createjs.SpriteSheet({
            images: [img], //image to use
            frames: {width: this.width, height: this.width, regX: 7.5, regY: 7.5},
            animations:
                    {
                        right: [0, 3, "right", 4],
                        up_r: [8, 11, "up_r", 4],
                        down_r: [12, 15, "down_r", 4]
                    }
        });

        // to save file size, the loaded sprite sheet only includes right facing animations
        // we could flip the display objects with scaleX=-1, but this is expensive in some browsers
        // instead, we append flipped versions of the frames to our sprite sheet
        // this adds only horizontally flipped frames:
        createjs.SpriteSheetUtils.addFlippedFrames(localSpriteSheet, true, true, true);

        this.Container_initialize(localSpriteSheet);

        this.timeout = 0;
        this.thrust = 0;
    };

    p.tick = function() {

        if (this.active) {

            if (this.timeout === 0) {

                this.vX = this.vX - this.decX;
                this.vY = this.vY - this.decY;
                this.timeout = 2;

            } else {
                this.timeout--;
            }

            this.x = this.x + this.vX;
            this.y = this.y + this.vY;

            if ((this.decX < 0 && this.vX >= 0) || (this.decX > 0 && this.vX <= 0)) {
                this.decX = 0;
            }

            if ((this.decY < 0 && this.vY >= 0) || (this.decY > 0 && this.vY <= 0)) {
                this.decY = 0;
            }

            if (this.decX === 0 && this.decY === 0) {
                this.active = false;
                Game.ignoreBomb();
            }
        }
    };

    p.setup = function() {
        // Pega a velocidade do mapa,  incrementa 15 %
        // adiciona ao mapa
        this.vX = (Game.map.velocityX + Game.map.velocityX * .30) * -1;
        this.vY = (Game.map.velocityY + Game.map.velocityY * .30) * -1;


        this.decX = this.vX * .1;
        this.decY = this.vY * .1;

        var pos = Game.map.getCenterPos();

        this.x = pos.x;
        this.y = pos.y;

        switch (Game.bird.currentDirection) {

            default :
                this.gotoAndPlay("right");
        }

    }

    window.Bomb = Bomb;
}(window));