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

    var elements = [];

    var blocks = [];

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
            console.log("Object (name: " + ob.name + ") added without mode");
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

            if (mode === ObjectMode.BLOCK) {
                blocks.push(ob);
            } else if (mode === ObjectMode.ELEMENT || mode === ObjectMode.BOMB) {
                elements.push(ob);
            }
        }
    };

    p.removeChild = function(ob) {
        this.parent_removeChild(ob);
        var i = childs.indexOf(ob);

        // Get mode of element
        var mode = modes[i];

        if (mode === ObjectMode.BLOCK) {
            blocks.slice(blocks.indexOf(ob), 1);
        } else if (mode === ObjectMode.ELEMENT || mode === ObjectMode.BOMB) {
            elements.slice(elements.indexOf(ob), 1);
        }

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
        }
    };

    p.tick = function() {

        tickObjects();

        for (i in elements) {

            // Executa um loop em todos os elementos
            var curObject = elements[i];

            var mode = modes[childs.indexOf(curObject)];

            // É um objeto que pode gerar impacto?
            if (mode !== ObjectMode.FLY && mode !== ObjectMode.IGNORE && mode !== ObjectMode.TEXTURE && mode !== ObjectMode.BLOCK) {
                // Sim...
                // O Objeto é do tipo element ( teste de mapa é ignorado para bombas )
                if (mode === ObjectMode.ELEMENT) {
                    // Objeto está no limite do mapa?
                    this.checkLimits(curObject);
                }

                // Lopa nos elementos e checa impacto usando raio
                for (y in elements) {

                    var c = elements[y];

                    // O objeto não é mesmo que está sendo testado no momento?
                    if (c !== curObject) {
                        // O objeto está preparado para receber impacto?
                        if (c.impact) {
                            // Sim, testa o hit
                            if (CollisionUtil.checkRadiusCollision(curObject, c)) {

                                // Foi hitado, notifica o objeto
                                c.impact(curObject, mode);

                            }
                        }
                    }
                }

                // Lopa nos blocos e checa impacto usando raio
                for (y in blocks) {

                    var c = blocks[y];

                    // O objeto não é mesmo que está sendo testado no momento?
                    if (c !== curObject) {

                        // O objeto está preparado para receber impacto?
                        if (c.impact) {
                            // Sim, testa o hit
                            if (CollisionUtil.checkRectCollision(curObject, c)) {

                                // Foi hitado, notifica o objeto
                                c.impact(curObject, ObjectMode.BLOCK);

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

