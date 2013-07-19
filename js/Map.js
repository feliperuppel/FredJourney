(function(window) {

    function Map() {
        this.initialize();
    }

    var p = Map.prototype = new createjs.Container();

    p.visbleWidht = 800;
    p.visbleHeight = 600;

    p.width = p.visbleWidht * 4;
    p.height = p.visbleHeight * 4;

    p.body;
    
    p.ContainerInitializer = p.initialize;

    // public methods:
    p.initialize = function() {
        
        //draw ship body
        this.body = new createjs.Shape();
        this.addChild(this.body);
        
        /**
         * @type Graphics
         */
        var g = this.body.graphics;

        // Create horizontal lines
        for (i = 0; i < 60; i++) {
            
            var y = i * 40;    
            g.beginStroke("#000");
            g.moveTo(0, y); //nose
            g.lineTo(3200, y); //nose
            
            g.closePath(); // nose
        }
        
        // Create horizontal lines
        for (i = 0; i < 80; i++) {
            
            var x = i * 40;    
            g.beginStroke("#000");
            g.moveTo(x, 0); //nose
            g.lineTo(x, 2400); //nose
            
            g.closePath(); // nose
        }
        
        console.log("Teste....");
    }
    window.Map = Map;
}(window));

