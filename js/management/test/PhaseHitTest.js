
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

        Game.circle.x = 500;
        Game.circle.y = 500;
    }

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

    this.name = "__Phase";

    p.tick = function(evt) {

    };

    this.name = "Fase de Teste";

    window.PhaseTest = PhaseTest;
}(window));