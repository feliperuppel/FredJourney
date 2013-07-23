(function(window) {

    function Map() {
        this.initialize();
    }

    var p = Map.prototype = new createjs.Container();

    p.visbleWidht = 800;
    p.visbleHeight = 600;

    p.width = p.visbleWidht * 4;
    p.height = p.visbleHeight * 4;

    p.body;

    p.ContainerInitializer = p.initialize;
    p.parent_addChild = p.addChild;

    p.velocityX = 0;
    p.velocityY = 0;

    var childs = [];

    var modes = [];

    Map.MAX_VELOCITY = 15;

    Map.SWAP_VELOCITY = 10;

    Map.NORMAL_VELOCITY = 5;

    Map.MINIMUN_VELOCITY = 2;

    // public methods:
    p.initialize = function() {

        p.ContainerInitializer();

        //draw ship body
        this.body = new createjs.Shape();
        this.addChild(this.body, ObjectMode.TEXTURE);

        var g = this.body.graphics;
        g.beginStroke("#999");

        // Create vertical lines
        for (var i = 0; i < 60; i++) {

            var y = i * 40;
            g.moveTo(0, y); //nose
            g.lineTo(3200, y); //nose

            g.closePath(); // nose
        }

        // Create horizontal lines
        for (var i = 0; i < 80; i++) {

            var x = i * 40;
            g.moveTo(x, 0); //nose
            g.lineTo(x, 2400); //nose

            g.closePath(); // nose
        }

    };

    p.addChild = function(ob, mode) {

        if (typeof mode === 'undefined') {
            mode = ObjectMode.IGNORE;
            console.log("Object add without mode, it will logged in next line \\/");
            console.log(ob)
        }

        p.parent_addChild(ob);

        if (mode === ObjectMode.BLOCK || mode === ObjectMode.BOMB ||
                mode === ObjectMode.ELEMENT) {

            childs.push(ob);
            modes.push(mode);
        }
    }

    p.tick = function() {

        for (i in childs) {

            var curObject = childs[i];
            var mode = modes[i];

            for (y in childs) {
                // Checa apenas os blocos ( que bloqueiam as passagems das pessoas )
                if (modes[y] === ObjectMode.BLOCK) {
                    var c = childs[y];
                    if (!c.testHit) {
                        console.log("Can't check impact (found an object without testHit method)");
                        console.log(c);
                    } else if (Utils.testHit(curObject, c)) {
                        if (mode === ObjectMode.ELEMENT) {
                            if (!curObject.cantGoHere) {
                                console.log("Can't change direction of object (found an object without cantGoHere method)");
                                console.log(c);
                            } else {
                                curObject.cantGoHere();
                            }
                        } else if (mode === ObjectMode.BOMB) {
                            if (!curObject.cantGoHere) {
                                console.log("Can't change direction of object (found an object without cantGoHere method)");
                                console.log(c);
                            } else {
                                curObject.cantGoHere();
                            }
                        }
                    }
                }
            }
        }

    }

    p.getCenterPos = function() {

        var pos = {};

        pos.x = (this.x * -1) + canvas.width / 2;
        pos.y = (this.y * -1) + canvas.height / 2;

        return pos;

    }

    window.Map = Map;
}(window));

