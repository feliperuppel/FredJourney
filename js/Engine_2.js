
var canvas;
var stage;

var playing = false;
var bird;
var map;
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

function init() {
    
    // Configure frame rate
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(30);
    
    // Pega o canvas
    canvas = document.getElementById("gameCanvas");

    if (canvas == null) {
        alert("Falhou ao recuperar o elemento canvas!");
        return;
    }

    // Cria o palco
    stage = new createjs.Stage(canvas);

    stage.update();     //update the stage to show text
    //
    //prevent extra clicks and hide text

    //hide anything on stage and show the score
    stage.removeAllChildren();

    //create the player
    playing = true;
    bird = new Bird();
    bird.x = canvas.width / 2;
    bird.y = canvas.height / 2;


    // Criar container ao in�s de de MAP
    map = new Map();
    map.x = 0;
    map.y = 0;

    //creating persons
    persons = new Array();
    var max = 8;
    var min = 4;
    var randomicPerson = 3;

    person = new Person("assets/person-" + 4 + ".png");
    person.x = 290;
    person.y = 250;

    persons.push(person);

    map.addChild(person, ObjectMode.ELEMENT);
    
    person = new Person("assets/person-" + 4 + ".png");
    person.x = 380;
    person.y = 130;

    persons.push(person);

    map.addChild(person, ObjectMode.ELEMENT);


    //criar linha como algo abaixo
    //Trazer o new map l� de cima
    //map.addChild(container)


    stage.clear();

    velocityField = new createjs.Text("X:0 Y:0", "bold 14px Arial", "#000");
    velocityField.textAlign = "right";
    velocityField.x = canvas.width - 100;
    velocityField.y = 22;

    stage.addChild(map);
//    stage.addChild(bird);

    stage.addChild(velocityField);
    stage.update();


    //start game timer   
    if (!createjs.Ticker.hasEventListener("tick")) {
        createjs.Ticker.addEventListener("tick", tick);
    }

}

function tick() {
    checkBirdMovements();
//    movePersons();
//    checkFire();
    map.tick();
    stage.update();
}

function movePersons() {
    for (var p in persons) {
        persons[p].tick();
    }
}

function checkFire() {
    for (var i in bombs) {
        bombs[i].tick();
    }
}

function checkBirdMovements() {

    if (bird.isFlying) {
        if (movingUp) {
            if (map.velocityY < 0) {
                if ((map.velocityY * -1) > Map.MINIMUN_VELOCITY) {
                    map.velocityY++;
                } else if (map.velocityX >= Map.SWAP_VELOCITY || (map.velocityX * -1) >= Map.SWAP_VELOCITY) {
                    map.velocityY++;
                }
            } else if (map.velocityY < Map.MAX_VELOCITY) {
                map.velocityY++;
            }
        } else {
            if (map.velocityY > Map.NORMAL_VELOCITY) {
                map.velocityY--;
            }
        }

        if (movingDown) {
            if (map.velocityY > 0) {
                if (map.velocityY > Map.MINIMUN_VELOCITY) {
                    map.velocityY--;
                } else if (map.velocityX >= Map.SWAP_VELOCITY || (map.velocityX * -1) >= Map.SWAP_VELOCITY) {
                    map.velocityY--;
                }
            } else if ((map.velocityY * -1) < Map.MAX_VELOCITY) {
                map.velocityY--;
            }
        } else {
            if ((map.velocityY * -1) > Map.NORMAL_VELOCITY) {
                map.velocityY++;
            }
        }


        if (movingLeft) {
            if (map.velocityX < 0) {
                if ((map.velocityX * -1) > Map.MINIMUN_VELOCITY) {
                    map.velocityX++;
                } else if (map.velocityY >= Map.SWAP_VELOCITY || (map.velocityY * -1) >= Map.SWAP_VELOCITY) {
                    map.velocityX++;
                }
            } else if (map.velocityX < Map.MAX_VELOCITY) {
                map.velocityX++;
            }
        } else {
            if (map.velocityX > Map.NORMAL_VELOCITY) {
                map.velocityX--;
            }
        }

        if (movingRight) {
            if (map.velocityX > 0) {
                if (map.velocityX > Map.MINIMUN_VELOCITY) {
                    map.velocityX--;
                } else if (map.velocityY >= Map.SWAP_VELOCITY || (map.velocityY * -1) >= Map.SWAP_VELOCITY) {
                    map.velocityX--;
                }
            } else if ((map.velocityX * -1) < Map.MAX_VELOCITY) {
                map.velocityX = map.velocityX - 1;
            }
        }
        else {
            if ((map.velocityX * -1) > Map.NORMAL_VELOCITY) {
                map.velocityX++;
            }
        }
    }

    map.y = map.y + map.velocityY;
    map.x = map.x + map.velocityX;

    velocityField.text = "Bird: VX:" + (map.velocityX * -1) + "  VY:" + (map.velocityY * -1) + "\n";
    velocityField.text = velocityField.text + "Map: X:" + map.x + "  Y:" + map.y;
    bird.tick();

}

//allow for WASD and arrow control scheme
function handleKeyDown(e) {
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

//allow for WASD and arrow control scheme
function handleKeyUp(e) {
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
            if (bird.isFlying &&
                    ((map.velocityX > 0 && map.velocityX <= Map.MINIMUN_VELOCITY)
                            || (map.velocityX < 0 && (map.velocityX * -1) <= Map.MINIMUN_VELOCITY)) &&
                    ((map.velocityY > 0 && map.velocityY <= Map.MINIMUN_VELOCITY) ||
                            (map.velocityY < 0 && (map.velocityY * -1) <= Map.MINIMUN_VELOCITY))
                    ) {
                bird.isFlying = false;
                map.velocityX = 0;
                map.velocityY = 0;

            } else {
                bird.isFlying = true;
            }
            return false;
        case KEYCODE_SPACE:
            bird.fire();
            return false;
    }
}
