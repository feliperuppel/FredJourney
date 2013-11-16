
var messageField;       //Message display field
var velocityField;
var scoreField;         //score Field
var canvas;




var Game = {};
Game.playing = false;
Game.bird = new Bird();
Game.stage = null;
/**
 * @type PhaseManager
 */
Game.phaseManager;

var person;
var persons;

var bombs = [];



var KEYCODE_ENTER = 13;		//usefull keycode
var KEYCODE_SPACE = 32;		//usefull keycode
var KEYCODE_UP = 38;		//usefull keycode
var KEYCODE_LEFT = 37;		//usefull keycode
var KEYCODE_RIGHT = 39;		//usefull keycode
var KEYCODE_DOWN = 40;		//usefull keycode
var KEYCODE_W = 87;			//usefull keycode
var KEYCODE_A = 65;			//usefull keycode
var KEYCODE_D = 68;
var KEYCODE_S = 83;
var KEYCODE_Q = 81;
var KEYCODE_SPACE = 32;

// vars to control move of Bird ( the thurst is the move of Map)
var movingUp = false;
var movingDown = false;
var movingLeft = false;
var movingRight = false;

document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;

// Ensure log is avaliable
if (!console || !console.log) {
    var console = {}
    console.log = function(a) {
    }
}

function init() {
    // Configure frame rate
//    createjs.Ticker.useRAF = true;
//    createjs.Ticker.setFPS(60);
    try {
        // Checa se há plugin de som disponível
        if (!createjs.Sound.initializeDefaultPlugins()) {
            alert("Falha ao iniciar o som");
            document.getElementById("content").style.display = "none";
            return;
        }
    } catch (e) {
        console.log(e);
    }

    // Checa o borwser.
    //if (createjs.Sound.BrowserDetect.isIOS || createjs.Sound.BrowserDetect.isAndroid) {  // || createjs.Sound.BrowserDetect.isBlackberry  OJR blackberry has not been tested yet
    //document.getElementById("mobile").style.display = "block";
    //document.getElementById("content").style.display = "none";
    //return;
    //}

    // Pega o canvas
    canvas = document.getElementById("gameCanvas");

    if (canvas === null) {
        alert("Falhou ao recuperar o elemento canvas!");
        return;
    }

    // Cria o palco
    Game.stage = new createjs.Stage(canvas);

    messageField = new createjs.Text("Welcome: Click to play");

    messageField.maxWidth = 1000;
    messageField.textAlign = "center";
    messageField.x = canvas.width / 2;
    messageField.y = canvas.height / 2;
    //watch for clicks
    Game.stage.addChild(messageField);

    canvas.onclick = handleClick;
    Game.stage.update();

}

function handleClick(event) {
    // Prevent extra clicks and hide text
    canvas.onclick = null;
    Game.stage.removeChild(messageField);

    // Hide anything on stage and show the score
    Game.stage.removeAllChildren();

    //create the player
    // Criar Map
    Game.map = new Map();

    // Cria o gerenciador de fases
    Game.phaseManager = new PhaseManager(Game.map);

    Game.phaseManager.load(new PhaseTest(), new PhaseObjective());

    //start game timer   
    if (!createjs.Ticker.hasEventListener("tick")) {
        createjs.Ticker.addEventListener("tick", tick);
    }

}

function tick() {
    checkBirdMovements();
    Game.phaseManager.tick()
    Game.stage.update();
}
function checkBirdMovements() {

    if (Game.bird.isFlying) {
        if (movingUp) {
            if (Game.map.velocityY < 0) {
                if ((Game.map.velocityY * -1) > Map.MINIMUN_VELOCITY) {
                    Game.map.velocityY++;
                } else if (Game.map.velocityX >= Map.SWAP_VELOCITY || (Game.map.velocityX * -1) >= Map.SWAP_VELOCITY) {
                    Game.map.velocityY++;
                }
            } else if (Game.map.velocityY < Map.MAX_VELOCITY) {
                Game.map.velocityY++;
            }
        } else {
            if (Game.map.velocityY > Map.NORMAL_VELOCITY) {
                Game.map.velocityY--;
            }
        }

        if (movingDown) {
            if (Game.map.velocityY > 0) {
                if (Game.map.velocityY > Map.MINIMUN_VELOCITY) {
                    Game.map.velocityY--;
                } else if (Game.map.velocityX >= Map.SWAP_VELOCITY || (Game.map.velocityX * -1) >= Map.SWAP_VELOCITY) {
                    Game.map.velocityY--;
                }
            } else if ((Game.map.velocityY * -1) < Map.MAX_VELOCITY) {
                Game.map.velocityY--;
            }
        } else {
            if ((Game.map.velocityY * -1) > Map.NORMAL_VELOCITY) {
                Game.map.velocityY++;
            }
        }

        if (movingLeft) {
            if (Game.map.velocityX < 0) {
                if ((Game.map.velocityX * -1) > Map.MINIMUN_VELOCITY) {
                    Game.map.velocityX++;
                } else if (Game.map.velocityY >= Map.SWAP_VELOCITY || (Game.map.velocityY * -1) >= Map.SWAP_VELOCITY) {
                    Game.map.velocityX++;
                }
            } else if (Game.map.velocityX < Map.MAX_VELOCITY) {
                Game.map.velocityX++;
            }
        } else {
            if (Game.map.velocityX > Map.NORMAL_VELOCITY) {
                Game.map.velocityX--;
            }
        }

        if (movingRight) {
            if (Game.map.velocityX > 0) {
                if (Game.map.velocityX > Map.MINIMUN_VELOCITY) {
                    Game.map.velocityX--;
                } else if (Game.map.velocityY >= Map.SWAP_VELOCITY || (Game.map.velocityY * -1) >= Map.SWAP_VELOCITY) {
                    Game.map.velocityX--;
                }
            } else if ((Game.map.velocityX * -1) < Map.MAX_VELOCITY) {
                Game.map.velocityX = Game.map.velocityX - 1;
            }
        }
        else {
            if ((Game.map.velocityX * -1) > Map.NORMAL_VELOCITY) {
                Game.map.velocityX++;
            }
        }
    }

    Game.map.y = Game.map.y + Game.map.velocityY;
    Game.map.x = Game.map.x + Game.map.velocityX;

}

//allow for WASD and arrow control scheme
function handleKeyDown(e) {
    if (Game.playing) {
        //cross browser issues exist
        if (!e) {
//        var e = window.event;
            e = window.event;
        }

        switch (e.keyCode) {
            case KEYCODE_A:
            case KEYCODE_LEFT:
                movingLeft = true;
                return false;

            case KEYCODE_D:
            case KEYCODE_RIGHT:
                movingRight = true;
                return false;

            case KEYCODE_W:
            case KEYCODE_UP:
                movingUp = true;
                return false;

            case KEYCODE_S:
            case KEYCODE_DOWN:
                movingDown = true;
                return false;

            case KEYCODE_ENTER:
                if (canvas.onclick == handleClick) {
                    handleClick();
                }
                return false;
        }
    }
}

//allow for WASD and arrow control scheme
function handleKeyUp(e) {
    if (Game.playing) {
        //cross browser issues exist
        if (!e) {
//        var e = window.event;
            e = window.event;
        }

        switch (e.keyCode) {

            case KEYCODE_A:
            case KEYCODE_LEFT:
                movingLeft = false;
                return false;

            case KEYCODE_D:
            case KEYCODE_RIGHT:
                movingRight = false;
                return false;

            case KEYCODE_W:
            case KEYCODE_UP:
                movingUp = false;
                return false;

            case KEYCODE_S:
            case KEYCODE_DOWN:
                movingDown = false;
                return false;

            case KEYCODE_ENTER:

                if (canvas.onclick === handleClick) {
                    handleClick();
                }

                return false;

            case KEYCODE_Q:
                if (Game.bird.isFlying &&
                        ((Game.map.velocityX >= 0 && Game.map.velocityX <= Map.MINIMUN_VELOCITY)
                                || (Game.map.velocityX <= 0 && (Game.map.velocityX * -1) <= Map.MINIMUN_VELOCITY)) &&
                        ((Game.map.velocityY >= 0 && Game.map.velocityY <= Map.MINIMUN_VELOCITY) ||
                                (Game.map.velocityY <= 0 && (Game.map.velocityY * -1) <= Map.MINIMUN_VELOCITY))
                        ) {
                    Game.bird.isFlying = false;
                    Game.map.velocityX = 0;
                    Game.map.velocityY = 0;

                } else {
                    Game.bird.isFlying = true;
                }
                return false;
            case KEYCODE_SPACE:
                Game.bird.fire();
                return false;
        }
    }
}