
var messageField;       //Message display field
var velocityField;
var scoreField;         //score Field
// vars to control move of Bird ( the thurst is the move of Map)
var movingUp = false;
var movingDown = false;
var movingLeft = false;
var movingRight = false;

document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;

// Ensure log is avaliable
if (!console || !console.log) {
    var console = {};
    console.log = function(a) {
    };
}

function init() {
    // Configure frame rate
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

    // Inicializa controles do Jogo
    Game.setup();

    messageField = new createjs.Text("Welcome: Click to play");

    messageField.maxWidth = 1000;
    messageField.textAlign = "center";
    messageField.x = Game.canvas.width / 2;
    messageField.y = Game.canvas.height / 2;
    //watch for clicks
    Game.container.addChild(messageField);

    Game.canvas.onclick = handleClick;
    Game.update();

}

function handleClick(event) {
    // Prevent extra clicks and hide text
    Game.canvas.onclick = null;
    Game.container.removeChild(messageField);

    // Hide anything on stage and show the score
    Game.container.removeAllChildren();

    Game.enableMouseOver(10);
    
    Game.phaseManager.load(new PhaseTest(), new PhaseObjective());

    //start game timer   
    if (!createjs.Ticker.hasEventListener("tick")) {
        createjs.Ticker.addEventListener("tick", tick);
    }

}

function tick() {
    checkBirdMovements();
    Game.phaseManager.tick();
    Game.update();
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
            case KeyBoardKeys.A:
            case KeyBoardKeys.LEFT:
                movingLeft = true;
                return false;

            case KeyBoardKeys.D:
            case KeyBoardKeys.RIGHT:
                movingRight = true;
                return false;

            case KeyBoardKeys.W:
            case KeyBoardKeys.UP:
                movingUp = true;
                return false;

            case KeyBoardKeys.S:
            case KeyBoardKeys.DOWN:
                movingDown = true;
                return false;

            case KeyBoardKeys.ENTER:

                if (Game.canvas.onclick !== handleClick) {
                    Game.canvas.click();
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

            case KeyBoardKeys.A:
            case KeyBoardKeys.LEFT:
                movingLeft = false;
                return false;

            case KeyBoardKeys.D:
            case KeyBoardKeys.RIGHT:
                movingRight = false;
                return false;

            case KeyBoardKeys.W:
            case KeyBoardKeys.UP:
                movingUp = false;
                return false;

            case KeyBoardKeys.S:
            case KeyBoardKeys.DOWN:
                movingDown = false;
                return false;

            case KeyBoardKeys.ENTER:

                if (Game.canvas.onclick === handleClick) {
                    handleClick();
                }

                return false;

            case KeyBoardKeys.Q:
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
            case KeyBoardKeys.SPACE:
                Game.bird.fire();
                return false;
        }
    }
}