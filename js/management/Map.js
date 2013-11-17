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

    var persons = [];

    var bombs = [];

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
            } else if (mode === ObjectMode.ELEMENT) {
                persons.push(ob);
            } else if (mode === ObjectMode.BOMB) {
                bombs.push(ob);
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
        } else if (mode === ObjectMode.ELEMENT) {
            persons.slice(persons.indexOf(ob), 1);
        } else if (mode === ObjectMode.BOMB) {
            bombs.slice(bombs.indexOf(ob), 1);
        }

        childs.slice(i, 1);
        modes.slice(i, 1);

    };

    function tickObjects() {
        for (var c in childs) {
            if (childs[c].active && childs[c].tick) {
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

        for (i in persons) {

            // Executa um loop em todos os elementos
            var curObject = persons[i];

            if (curObject.impact) {

                var mode = modes[childs.indexOf(curObject)];

                // É um objeto que pode gerar impacto?
                if (mode !== ObjectMode.FLY && mode !== ObjectMode.IGNORE
                        && mode !== ObjectMode.TEXTURE && mode !== ObjectMode.BLOCK) {
                    // Sim...
                    // O Objeto é do tipo element ( teste de mapa é ignorado para bombas )
                    if (mode === ObjectMode.ELEMENT) {
                        // Objeto está no limite do mapa?
                        this.checkLimits(curObject);

                        // Cria a base das dimensões do objeto (apenas a primeira vez)
                        if (!curObject.blockArea) {
                            CollisionUtil.checkDimensions(curObject);
                        }

                        // Faz um update na posição do Objeto (apenas para objetos que se movimentam)
                        curObject.blockArea = CollisionUtil.buildBlockArea(curObject, true);

                        // Lopa nos elementos e checa impacto usando raio
                        for (y in persons) {

                            var c = persons[y];

                            // O objeto não é mesmo que está sendo testado no momento?
                            if (c !== curObject) {
                                // O objeto está preparado para receber impacto?

                                // Sim, testa o hit
                                if (CollisionUtil.checkRadiusCollision(curObject, c)) {


                                    // Foi hitado, notifica o objeto
                                    curObject.impact(c, mode);

                                }

                            }
                        }

                        // Lopa nas Bombas e checa impacto usando raio
                        for (y in bombs) {

                            var c = bombs[y];

                            // Sim, testa o hit
                            if (CollisionUtil.checkRadiusCollision(curObject, c)) {

                                // Foi hitado, notifica o objeto
                                curObject.impact(c, ObjectMode.BOMB);

                            }

                        }
                    }

                    // Lopa nos blocos e checa impacto usando raio
                    for (y in blocks) {

                        var c = blocks[y];

                        if (!c.blockArea) {
                            CollisionUtil.checkDimensions(c);
                            c.blockArea = CollisionUtil.buildBlockArea(c);
                        }

                        // Testa o hit
                        if (CollisionUtil.checkRectCollision(curObject, c)) {

                            // Foi hitado, notifica o objeto
                            curObject.impact(c, ObjectMode.BLOCK);

                        }
                    }
                }
            }
        }

        tickObjects();
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

    p.addElemntRandoLocation = function(obj) {
        var pos = {};

    };

    p.isBlockedPos = function(x, y, height, width, isCentralized) {

        var obj = {};

        obj.x = x;
        obj.y = y;
        obj.width = width;
        obj.height = height;

        CollisionUtil.checkDimensions(obj);

        obj.blockArea = CollisionUtil.buildBlockArea(obj, isCentralized);

        // Lopa nos blocos e checa impacto usando raio
        for (y in blocks) {

            var c = blocks[y];

            if (!c.blockArea) {
                CollisionUtil.checkDimensions(c);
                c.blockArea = CollisionUtil.buildBlockArea(c);
            }

            // Testa o hit
            if (CollisionUtil.checkRectCollision(obj, c)) {

                return true;

            }
        }
        return false;
    };

    window.Map = Map;
}(window));

