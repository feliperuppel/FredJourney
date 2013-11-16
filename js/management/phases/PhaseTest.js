
(function(window) {

    function PhaseTest() {

    }


    var p = PhaseTest.prototype = new Phase();
    /* @var p Phase */
    
    p.tick = function(event){
        // include new objects on demand.
    };
    
    p.assets = function() {
        return [
        {src: "assets/Bird.png", id: "bird"},
        {src: "assets/Bomb.png", id: "bomb"},
        {src: "assets/fase_1_inferior.png", id: "faseInferior"},
        {src: "assets/fase_1_superior.png", id: "faseSuperior"},
        {src: "assets/guia.jpg", id: "guia"},
        {src: "assets/person-1.png", id: "person1"},
        {src: "assets/person-2.png", id: "person2"},
        {src: "assets/person-4.png", id: "person4"},
        {src: "assets/person-5.png", id: "person5"},
        {src: "assets/person-6.png", id: "person6"},
        {src: "assets/person-7.png", id: "person7"},
        {src: "assets/person-8.png", id: "person8"},
        {src: "assets/person-moves3.png", id: "person3"}
    ];
    };
    
    // Override the original start method.
    p._start = p.start;
    
    p.start = function (){
        p._start();
    }
    
    p.tick = function(evt){
        
    };
    
    this.name = "Fase de Teste";
    
    window.PhaseTest = PhaseTest;
}(window));