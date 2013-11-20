var Game = {};

// Declare public variables.

Game.playing = null;
/**
 * @type Bird
 */
Game.bird = null;

/**
 * @type document
 */
Game.canvas = null;

/**
 * @type createjs.Stage
 */
Game.stage = null;

/**
 * @type createjs.Stage
 */
Game.container = null;


/**
 * @type PhaseManager
 */
Game.phaseManager = null;

/**
 * 
 * @type KeyBoard
 */
Game.keyboard = null;

Game.setup = function() {

    Game.canvas = document.getElementById("gameCanvas");

    // Pega o canvas
    if (Game.canvas === null) {
        alert("Falhou ao recuperar o elemento canvas! ('#gameCanvas')");
        return;
    }

    // Cria o palco
    Game.stage = new createjs.Stage(Game.canvas);

    // Cria o Pombo
    Game.bird = new Bird();

    // Cria o Mapa
    Game.map = new Map();

    // Seta como não jogando
    Game.playing = false;

    // Cria o gerenciador de fases
    Game.phaseManager = new PhaseManager();

    // Cria o container global
    Game.container = new createjs.Container();


    Game.stage.addChild(Game.container);
    
    // Vamos exibir o teclado?
    if(Game.config.SHOW_KEYBOARD){
        
        // Cria o teclado
        Game.keyboard = new KeyBoard();
        
        // Adiciona o teclado ao palco
        Game.stage.addChild(Game.keyboard);
        
    }
    
    Game.stage.enableMouseOver(10);
    Game.stage.mouseMoveOutside = true;
    
    createjs.Touch.enable(Game.stage);
};

Game.onStageSelected = function(a, b) {

};


Game.update = function() {
    Game.stage.update();
};

Game.enableMouseOver = function(a){
    Game.stage.enableMouseOver(a);
};

Game.showMenu = function() {
    if (Game.stage !== null) {
        Game.stage.clear();
    }

};

Game.ignoreBomb = function(a) {

};
