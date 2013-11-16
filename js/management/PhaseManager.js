
function PhaseManager() {

    var loader;

    var superior;// Bg img to map;
    var inferior;// Bg img to map;

    // All resources of we need load;
    var manifest;
    var assets = [];
    /**
     * 
     * @type Phase
     */
    var curPhase;
    /**
     * 
     * @type PhaseObjective
     */
    var curObjective;
    /**
     * 
     * @param {boolean} activeOnly
     * @returns Phase[]
     */
    this.getAvaliablePhases = function(activeOnly) {

        var phaseTest = new Phase_1();
        var arr = new Array();

        arr.push(phaseTest);

        return arr;
    };

    /**
     * 
     * @param {Phase} phase
     * @param {type} objective
     * @returns {undefined}
     */
    this.load = function(phase, objective) {

        curPhase = phase;
        curObjective = objective;
        manifest = phase.assets();

        Game.stage.clear();

        messageField = new createjs.Text("Loading 0/" + manifest.length, "bold 24px Arial", "#000");

        messageField.maxWidth = 1000;
        messageField.textAlign = "right";
        messageField.x = canvas.width - 100;
        messageField.y = canvas.height - 40;

        loader = new createjs.LoadQueue(false);
        loader.onFileLoad = handleFileLoad;
        loader.onComplete = handleComplete;
        loader.loadManifest(manifest);

        Game.stage.addChild(messageField);
        Game.stage.update();

    };

    function handleFileLoad(event) {
        assets.push(event.item);
        messageField.text = "Loading " + assets.length + "/" + manifest.length;
        Game.stage.update();
    }

    function handleComplete() {
        for (i in assets) {

            var item = assets[i];
            var id = item.id;
            var result = loader.getResult(id);

            switch (id) {
                case "faseInferior":
                    inferior = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0, 0, 3600, 2400));
                    break;
                case "faseSuperior":
                    superior = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0, 0, 3600, 2400));
                    break;
            }
        }

        canvas.onclick = handleClick;
        messageField.text = "> Play";
        Game.stage.update();
    }

    function handleClick() {

        canvas.onclick = null;

        Game.stage.clear();

        velocityField = new createjs.Text("X:0 Y:0", "bold 14px Arial", "#000");
        velocityField.textAlign = "right";
        velocityField.x = canvas.width - 100;
        velocityField.y = 22;

        Game.map.addChild(inferior, ObjectMode.IGNORE, 0);

        Game.stage.addChild(Game.map);

        Game.playing = true;
        Game.bird.x = canvas.width / 2;
        Game.bird.y = canvas.height / 2;

        Game.stage.addChild(Game.bird);

        Game.stage.addChild(velocityField);

        Game.map.addChild(superior, ObjectMode.IGNORE, Game.map.getChilds().lenght);

        curPhase.setObjective(curObjective);
        curPhase.start();
        Game.stage.update();
    }

    this.tick = function() {
        if (Game.playing) {

            velocityField.text = "Bird: VX:" + (Game.map.velocityX * -1) + "  VY:" + (Game.map.velocityY * -1) + "\n";
            velocityField.text = velocityField.text + "Map: X:" + Game.map.x + "  Y:" + Game.map.y;

            Game.bird.tick();
            Game.map.tick();
        }
    };

    this.closePhase = function() {
        Game.playing = false;
    }
}