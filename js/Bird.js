(function (window) {

    function Bird() {
        this.initialize();
    }

    var p = Bird.prototype = new createjs.Container();

    // public properties:
    Bird.TOGGLE = 60;
    Bird.MAX_THRUST = 2;
    Bird.MAX_VELOCITY = 5;

    // public properties:
    p.shipFlame;
    p.shipBody;

    p.timeout;
    p.thrust;

    p.vX;
    p.vY;

    p.bounds;
    p.hit;

    var img = new Image();
    img.src = "assets/testSeq.png";
    

    var spriteSheet = new createjs.SpriteSheet({
        images: [img],
        frames: { width: 64, height: 68, regX: 32, regY: 34 },
        animations: {
            walkUpRt: [0, 19, "walkRt"],
            walkDnRt: [20, 39, "walkUpRt"],
            walkRt: [41, 59, "walkDnRt"]
        }
    });

    createjs.SpriteSheetUtils.addFlippedFrames(spriteSheet, true, false, false);
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
        this.timeout = 0;
        this.thrust = 0;
        this.vX = 0;
        this.vY = 0;
    }

    // public methods:
    p.makeShape = function () {
        //draw ship body // todo substituir por um pássaro
        var g = this.shipBody.graphics;
        g.clear();
        g.beginStroke("#000");

        g.moveTo(0, 10); //nose
        g.lineTo(5, -6); //rfin
        g.lineTo(0, -2); //notch
        g.lineTo(-5, -6); //lfin
        g.closePath(); // nose


        //draw ship flame
        var o = this.shipFlame;
        o.scaleX = 0.5;
        o.scaleY = 0.5;
        o.y = -5;

        g = o.graphics;
        g.clear();
        g.beginStroke("#FFFFFF");

        g.moveTo(2, 0); 	//ship
        g.lineTo(4, -3); //rpoint
        g.lineTo(2, -2); //rnotch
        g.lineTo(0, -5); //tip
        g.lineTo(-2, -2); //lnotch
        g.lineTo(-4, -3); //lpoint
        g.lineTo(-2, -0); //ship

        //furthest visual element
        this.bounds = 10;
        this.hit = this.bounds;
    }

    p.tick = function (event) {
        //move by velocity
        this.x += this.vX;
        this.y += this.vY;

        //with thrust flicker a flame every Ship.TOGGLE frames, attenuate thrust
        if (this.thrust > 0) {
            this.timeout++;
            this.shipFlame.alpha = 1;

            if (this.timeout > Bird.TOGGLE) {
                this.timeout = 0;
                if (this.shipFlame.scaleX == 1) {
                    this.shipFlame.scaleX = 0.5;
                    this.shipFlame.scaleY = 0.5;
                } else {
                    this.shipFlame.scaleX = 1;
                    this.shipFlame.scaleY = 1;
                }
            }
            this.thrust -= 0.5;
        } else {
            this.shipFlame.alpha = 0;
            this.thrust = 0;
        }
    }

    p.accelerate = function () {
        //increase push ammount for acceleration
        this.thrust += this.thrust + 0.6;
        if (this.thrust >= Bird.MAX_THRUST) {
            this.thrust = Bird.MAX_THRUST;
        }

        //accelerate
        this.vX += Math.sin(this.rotation * (Math.PI / -180)) * this.thrust;
        this.vY += Math.cos(this.rotation * (Math.PI / -180)) * this.thrust;

        //cap max speeds
        this.vX = Math.min(Bird.MAX_VELOCITY, Math.max(-Bird.MAX_VELOCITY, this.vX));
        this.vY = Math.min(Bird.MAX_VELOCITY, Math.max(-Bird.MAX_VELOCITY, this.vY));
    }

    window.Bird = Bird;
} (window));