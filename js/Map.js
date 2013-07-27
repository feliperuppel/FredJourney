(function(window) {

    function Map() {
        this.initialize();
    }

    var p = Map.prototype = new createjs.Container();

    p.visbleWidht = 800;
    p.visbleHeight = 600;

    p.width = 3600;
    p.height = 2400;

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
        
        if (typeof zOrder != 'undefined') {
            this.addChildAt(ob, zOrder);
        } else {
            this.parent_addChild(ob);
        }

        if (mode === ObjectMode.BLOCK || mode === ObjectMode.BOMB ||
                mode === ObjectMode.ELEMENT) {

            childs.push(ob);
            modes.push(mode);
        }
    }

    p.removeChild = function(ob) {
        this.parent_removeChild(ob)
        var i = childs.indexOf(ob);
        childs.slice(i, 1);
        modes.slice(i, 1);
    }

    p.tick = function() {

        for (i in childs) {

            // Executa um loop em todos os elementos

            var curObject = childs[i];
            var mode = modes[i];

            // É um objeto que pode gerar impacto?
            if (mode !== ObjectMode.FLY && mode !== ObjectMode.IGNORE && mode !== ObjectMode.TEXTURE) {

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
                            if (Utils.testHit(curObject, c)) {

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

        pos.x = (this.x * -1) + canvas.width / 2;
        pos.y = (this.y * -1) + canvas.height / 2;

        return pos;

    };

    window.Map = Map;
}(window));

