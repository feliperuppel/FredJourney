(function(window) {

    function Map() {
        this.initialize();

        this.x = 0;
        this.y = 0;
    }

    var p = Map.prototype = new createjs.Container();

    Map.WIDTH = 3600;
    Map.HEIGHT = 2400;

    p.visbleWidht = 800;
    p.visbleHeight = 600;

    p.width = Map.WIDTH;
    p.height = Map.HEIGHT;

    // Some methods of Container will be changed
    p.ContainerInitializer = p.initialize;
    p.parent_addChild = p.addChild;
    p.parent_removeChild = p.removeChild;

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
        this.ContainerInitializer();
    };

    p.addChild = function(ob, mode, zOrder) {

        if (typeof mode === 'undefined') {
            mode = ObjectMode.IGNORE;
            console.log("Object add without mode, it will logged in next line \\/");
            console.log(ob)
        }

        if (typeof zOrder !== 'undefined') {
            this.addChildAt(ob, zOrder);
        } else {
            this.parent_addChild(ob);
        }

        if (mode === ObjectMode.BLOCK || mode === ObjectMode.BOMB ||
                mode === ObjectMode.ELEMENT) {

            childs.push(ob);
            modes.push(mode);
        }
    };

    p.removeChild = function(ob) {
        this.parent_removeChild(ob);
        var i = childs.indexOf(ob);
        childs.slice(i, 1);
        modes.slice(i, 1);
    };
    function tickObjects() {
        for (var c in childs) {
            if (childs[c].active) {
                childs[c].tick();
            }
        }
    }

    p.checkLimits = function(b) {
        if (b.notifyMapLimit) {
            if (b.y < b.radius) {
                b.notifyMapLimit(Directions.UP);
            } else if (b.y + b.radius >= Map.HEIGHT) {
                b.notifyMapLimit(Directions.DOWN);
            } else if (b.x < b.radius) {
                b.notifyMapLimit(Directions.LEFT);
            } else if (b.x + b.radius >= Map.WIDTH) {
                b.notifyMapLimit(Directions.RIGHT);
            }
        } else {
            console.log("ERROR: object (name:" + b.name + ") does not implement #notifyMapLimit");
        }
    };

    p.tick = function() {

        tickObjects();

        for (i in childs) {

            // Executa um loop em todos os elementos
            var curObject = childs[i];
            var mode = modes[i];

            // É um objeto que pode gerar impacto?
            if (mode !== ObjectMode.FLY && mode !== ObjectMode.IGNORE && mode !== ObjectMode.TEXTURE && mode !== ObjectMode.BLOCK) {

                // Objecto está no limite?
                this.checkLimits(curObject);

                // Sim, loopa novamente todos os objetos
                for (y in childs) {

                    var c = childs[y];

                    // O object é do tipo Element (Pessoa)? 
                    if (modes[y] === ObjectMode.ELEMENT && c !== curObject) {

                        // O objeto está preparado para receber impacto?
                        if (!c.impact) {

                            // Não ignora, mas gera o erro
                            console.log("Object not suport impact " + (curObject.name || typeof curObject) + " (found an object without impact method)");

                        } else {
                            // Sim, testa o hit
                            if (CollisionUtil.testHit(curObject, c)) {

                                // Foi hitado, notifica o objeto
                                c.impact(curObject, mode);

                            }
                        }
                    }
                }
            }
        }
    };

    p.getCenterPos = function() {

        var pos = {};

        pos.x = (this.x * -1) + Game.canvas.width / 2;
        pos.y = (this.y * -1) + Game.canvas.height / 2;

        return pos;

    };

    p.getChilds = function() {
        return childs;
    };

    window.Map = Map;
}(window));

