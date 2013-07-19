
var messageField;       //Message display field
var velocityField;
var scoreField;         //score Field
var canvas;
var stage;

var playing = false;
var bird;
var map;

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

// vars to control move of Bird ( the thurst is the move of Map)
var movingUp = false;
var movingDown = false;
var movingLeft = false;
var movingRight = false;

document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;

function init() {

    // Checa se há plugin de som disponível
    if (!createjs.Sound.initializeDefaultPlugins()) {
        alert("Falha ao iniciar o som");
        document.getElementById("content").style.display = "none";
        return;
    }

    // Checa o borwser.
    //if (createjs.Sound.BrowserDetect.isIOS || createjs.Sound.BrowserDetect.isAndroid) {  // || createjs.Sound.BrowserDetect.isBlackberry  OJR blackberry has not been tested yet
    //document.getElementById("mobile").style.display = "block";
    //document.getElementById("content").style.display = "none";
    //return;
    //}

    // Pega o canvas
    canvas = document.getElementById("gameCanvas");

    if (canvas == null) {
        alert("Falhou ao recuperar o elemento canvas!")
        return;
    }

    // Cria o palco
    stage = new createjs.Stage(canvas);

    messageField = new createjs.Text("Loading", "bold 24px Arial", "#000");

    messageField.maxWidth = 1000;
    messageField.textAlign = "center";
    messageField.x = canvas.width / 2;
    messageField.y = canvas.height / 2;
    stage.addChild(messageField);
    stage.update();     //update the stage to show text

    scoreField = new createjs.Text("0", "bold 12px Arial", "#FFFFFF");
    scoreField.textAlign = "right";
    scoreField.x = canvas.width - 10;
    scoreField.y = 22;
    scoreField.maxWidth = 1000;

    messageField.text = "Welcome: Click to play";

    //watch for clicks
    stage.addChild(messageField);
    stage.update();     //update the stage to show text
    canvas.onclick = handleClick;

}

function handleClick(event) {
    //prevent extra clicks and hide text
    canvas.onclick = null;
    stage.removeChild(messageField);

    //hide anything on stage and show the score
    stage.removeAllChildren();
    scoreField.text = (0).toString();
    stage.addChild(scoreField);

    //create the player
    playing = true;
    bird = new Bird();
    bird.x = canvas.width / 2;
    bird.y = canvas.height / 2;

    map = new Map();
    map.x = -200;
    map.y = -150;

    stage.clear();

    velocityField = new createjs.Text("X:0 Y:0", "bold 14px Arial", "#000");
    velocityField.textAlign = "right";
    velocityField.x = canvas.width - 100;
    velocityField.y = 22;

    stage.addChild(map);
    stage.addChild(bird);
    stage.addChild(velocityField);
    stage.update();


    //start game timer   
    if (!createjs.Ticker.hasEventListener("tick")) {
        createjs.Ticker.addEventListener("tick", tick);
    }

}



function tick() {
    checkBirdMovements();
    stage.update();
}

function checkBirdMovements() {

    if (bird.isFlying) {
        if (movingUp) {
            if (map.velocityY < 0) {
                if ((map.velocityY * -1) > map.MINIMUN_VELOCITY) {
                    map.velocityY++;
                } else if (map.velocityX > map.NORMAL_VELOCITY || (map.velocityX * -1) > map.NORMAL_VELOCITY) {
                    map.velocityY++;
                }
            } else if (map.velocityY < map.MAX_VELOCITY) {
                map.velocityY++;
            }
        } else {
            if (map.velocityY > map.NORMAL_VELOCITY) {
                map.velocityY--;
            }
        }

        if (movingDown) {
            if (map.velocityY > 0) {
                if (map.velocityY > map.MINIMUN_VELOCITY) {
                    map.velocityY--;
                } else if (map.velocityX > map.NORMAL_VELOCITY || (map.velocityX * -1) > map.NORMAL_VELOCITY) {
                    map.velocityY--;
                }
            } else if ((map.velocityY * -1) < map.MAX_VELOCITY) {
                map.velocityY--;
            }
        } else {
            if ((map.velocityY * -1) > map.NORMAL_VELOCITY) {
                map.velocityY++;
            }
        }


        if (movingLeft) {
            if (map.velocityX < 0) {
                if ((map.velocityX * -1) > map.MINIMUN_VELOCITY) {
                    map.velocityX++;
                } else if (map.velocityY > map.NORMAL_VELOCITY || (map.velocityY * -1) > map.NORMAL_VELOCITY) {
                    map.velocityX++;
                }
            } else if (map.velocityX < map.MAX_VELOCITY) {
                map.velocityX++;
            }
        } else {
            if (map.velocityX > map.NORMAL_VELOCITY) {
                map.velocityX--;
            }
        }

        if (movingRight) {
            if (map.velocityX > 0) {
                if (map.velocityX > map.MINIMUN_VELOCITY) {
                    map.velocityX--;
                } else if (map.velocityY > map.NORMAL_VELOCITY || (map.velocityY * -1) > map.NORMAL_VELOCITY) {
                    map.velocityX--;
                }
            } else if ((map.velocityX * -1) < map.MAX_VELOCITY) {
                map.velocityX = map.velocityX - 1;
            }
        }
        else {
            if ((map.velocityX * -1) > map.NORMAL_VELOCITY) {
                map.velocityX++;
            }
        }
    }

    map.y = map.y + map.velocityY;
    map.x = map.x + map.velocityX;
    velocityField.text = "X:" + map.velocityX + "  Y:" + map.velocityY;

}

//allow for WASD and arrow control scheme
function handleKeyDown(e) {
    //cross browser issues exist
    if (!e) {
        var e = window.event;
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

//allow for WASD and arrow control scheme
function handleKeyUp(e) {
    //cross browser issues exist
    if (!e) {
        var e = window.event;
    }

    switch (e.keyCode) {

        case KEYCODE_A:
        case KEYCODE_LEFT:
            movingLeft = false;
            return false;

        case KEYCODE_D:
        case KEYCODE_RIGHT:
            movingRight = false
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

            if (canvas.onclick == handleClick) {
                handleClick();
            }

            return false;

        case KEYCODE_Q:
            if (bird.isFlying &&
                    (map.velocityX === map.MINIMUN_VELOCITY
                            || (map.velocityX * -1) <= map.MINIMUN_VELOCITY) &&
                    (map.velocityX === map.MINIMUN_VELOCITY ||
                            (map.velocityX * -1) <= map.MINIMUN_VELOCITY)) {
                bird.isFlying = false;
                map.velocityX = 0;
                map.velocityY = 0;

            } else {
                bird.isFlying = true;
            }
            return false;
    }
}