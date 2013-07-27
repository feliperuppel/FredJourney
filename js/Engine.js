
var messageField;       //Message display field
var velocityField;
var scoreField;         //score Field
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

// All resources of we need load;
var manifest;
var assets = [];

var superior;// Bg img to map;
var inferior;// Bg img to map;


function init() {

    // Configure frame rate
//    createjs.Ticker.useRAF = true;
//    createjs.Ticker.setFPS(60);

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
        alert("Falhou ao recuperar o elemento canvas!");
        return;
    }

    // Cria o palco
    stage = new createjs.Stage(canvas);


    manifest = [
        {src: "assets/Bird.png", id: "bird"},
        {src: "assets/Bomb.png", id: "bomb"},
        {src: "assets/fase_1_inferior.png", id: "faseSuperior"},
        {src: "assets/fase_1_superior.png", id: "faseInferior"},
        {src: "assets/guia.png", id: "guia"},
        {src: "assets/person-1.png", id: "person1"},
        {src: "assets/person-2.png", id: "person2"},
        {src: "assets/person-4.png", id: "person4"},
        {src: "assets/person-5.png", id: "person5"},
        {src: "assets/person-6.png", id: "person6"},
        {src: "assets/person-7.png", id: "person7"},
        {src: "assets/person-8.png", id: "person8"},
        {src: "assets/person-moves3.png", id: "person3"}
    ];

    messageField = new createjs.Text("Loading 0/"+manifest.length, "bold 24px Arial", "#000");

    messageField.maxWidth = 1000;
    messageField.textAlign = "center";
    messageField.x = canvas.width / 2;
    messageField.y = canvas.height / 2;
    stage.addChild(messageField);

    stage.update();     //update the stage to show text
    
    loader = new createjs.LoadQueue(false);
    loader.onFileLoad = handleFileLoad;
    loader.onComplete = handleComplete;
    loader.loadManifest(manifest);
    
    //watch for clicks
    stage.addChild(messageField);

    stage.update();     //update the stage to show text
}

function handleFileLoad(event) {
    assets.push(event.item);
    messageField.text = "Loading "+assets.length+"/"+manifest.length;
    stage.update();
}

function handleComplete() {
    
    for (i in assets) {
        
        var item = assets[i];
        var id = item.id;
        var result = loader.getResult(id);
        
        if (item.type == createjs.LoadQueue.IMAGE) {
            var bmp = new createjs.Bitmap(result);
        }
        
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
    messageField.text = "Welcome: Click to play";
    stage.update();
}

function handleClick(event) {
    //prevent extra clicks and hide text
    canvas.onclick = null;
    stage.removeChild(messageField);

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
    map.addChild(inferior)

    //creating persons
    persons = new Array();
    var max = 8;
    var min = 4;
    var randomicPerson;
    for (var i = 0; i < 5; i++) {
        randomicPerson = (Math.floor(Math.random() * (max - min + 1)) + min);
        person = new Person("assets/person-" + randomicPerson + ".png");
        person.x = (canvas.width / 2) + (i * 95);
        person.y = (canvas.height / 2) + (i * 125);

        persons.push(person);

        //Adicionar person ao container ao inv�s de map
        map.addChild(person, ObjectMode.ELEMENT);
    }
    
    stage.clear();

    velocityField = new createjs.Text("X:0 Y:0", "bold 14px Arial", "#000");
    velocityField.textAlign = "right";
    velocityField.x = canvas.width - 100;
    velocityField.y = 22;

    stage.addChild(map);
    stage.addChild(bird);

    stage.addChild(velocityField);

    map.addChild(superior)

    stage.update();


    //start game timer   
    if (!createjs.Ticker.hasEventListener("tick")) {
        createjs.Ticker.addEventListener("tick", tick);
    }

}

function tick() {
    checkBirdMovements();
    movePersons();
    checkFire();
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
                    ((map.velocityX >= 0 && map.velocityX <= Map.MINIMUN_VELOCITY)
                            || (map.velocityX <= 0 && (map.velocityX * -1) <= Map.MINIMUN_VELOCITY)) &&
                    ((map.velocityY >= 0 && map.velocityY <= Map.MINIMUN_VELOCITY) ||
                            (map.velocityY <= 0 && (map.velocityY * -1) <= Map.MINIMUN_VELOCITY))
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
