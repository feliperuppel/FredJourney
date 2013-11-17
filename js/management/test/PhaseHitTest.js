
(function(window) {

    function PhaseTest() {

    }


    var p = PhaseTest.prototype = new Phase();
    /* @var p Phase */

    p.tick = function(event) {
        // include new objects on demand.
    };

    p.assets = function() {
        return [
            {src: "assets/Bird.png", id: "bird"},
            {src: "assets/Bomb.png", id: "bomb"},
            {src: "assets/fase_1_inferior.png", id: "faseInferior"},
            {src: "assets/fase_1_superior.png", id: "faseSuperior"}
        ];
    };

    // Override the original start method.
    p._start = p.start;

    p.start = function() {
        loadCircles(1);

        Game.circle.x = 600;
        Game.circle.y = 600;
        
        addBlocks();
    };

    function loadCircles(qtd) {
        var max = 8;
        var min = 1;
        
        this.circles = new Array();
        
        for (i = 0; i < qtd; i++) {
            randomicPerson = (Math.floor(Math.random() * (max - min + 1)) + min);
            circle = new CircleMovTest();
            Game.circle = circle;
            this.circles.push(circle);
            
            //Adicionar person ao container ao invés de map
            Game.map.addChild(circle, ObjectMode.ELEMENT);
        }
    }
    
    function addBlocks(){
        var b1 = new Block(100, 400);
        b1.x = 400;
        b1.y = 400;
        Game.map.addChild(b1, ObjectMode.BLOCK);
        
        var b2 = new Block(400, 100);
        b2.x = 500;
        b2.y = 400;
        Game.map.addChild(b2, ObjectMode.BLOCK);
        
        var b3 = new Block(100, 300);
        b3.x = 800;
        b3.y = 500;
        Game.map.addChild(b3, ObjectMode.BLOCK);
        
        var b4 = new Block(300, 100);
        b4.x = 500;
        b4.y = 700;
        Game.map.addChild(b4, ObjectMode.BLOCK);
    };

    this.name = "__Phase";

    p.tick = function(evt) {

    };

    this.name = "Fase de Teste";

    window.PhaseTest = PhaseTest;
}(window));