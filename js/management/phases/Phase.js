
function Phase() {
    
    /**
     * 
     * @type PhaseObjective
     */
    var objective;
    
    this.persons = new Array();
    
    /**
     * 
     * @returns String[]
     */
    this.assets = function() {
        return [];
    };

    this.tick = function(evt) {

    };

    /**
     * @returns PhaseObjective[]
     */
    this.objectives = function() {
        return [];
    };

    this.start = function() {
        loadPersons(objective.level * 5);
    };

    this.close = function() {

    };

    this.setObjective = function(obj) {
        objective = obj;
    };


    function loadPersons(qtd) {
        var max = 8;
        var min = 1;
        this.persons = new Array();
        for (i = 0; i < qtd; i++) {
            randomicPerson = (Math.floor(Math.random() * (max - min + 1)) + min);
            person = new Person("assets/person-" + randomicPerson + ".png");
            person.x = 0 + (i * Math.floor(Math.random() * canvas.width));
            person.y = 0 + (i * Math.floor(Math.random() * canvas.height))

            this.persons.push(person);
            
            //Adicionar person ao container ao invés de map
            Game.map.addChild(person, ObjectMode.ELEMENT);
        }
    }

    this.name = "__Phase";

    /**
     * @returns {PhaseObjective}
     */
    this.getObjective = function() {
        return objective;
    };
}

Phase.Level = {};

Phase.Level.ONE = 1;
Phase.Level.TWO = 2;
Phase.Level.THREE = 3;
Phase.Level.FOUR = 4;
Phase.Level.FIVE = 5;
Phase.Level.SIX = 6;
Phase.Level.SEVEN = 7;
Phase.Level.EIGHT = 8;
Phase.Level.NINE = 9;
Phase.Level.TEN = 10;