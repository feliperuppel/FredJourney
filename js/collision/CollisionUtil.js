var CollisionUtil = {};

/**
 * @param easeljs.Bitmap a
 * @param easeljs.Bitmap b
 * @returns boolean 
 */

CollisionUtil.testHit = function(a, b) {

    if (a.active && b.active) {
        CollisionUtil.checkArea(a);
        CollisionUtil.checkArea(b);

        var hited = CollisionUtil.checkRectCollision(a, b);
        
        if (hited) {
            console.log("-----------> Hited!");
        }

        return hited;
    }
    return false;
};

/**
 * 
 * @param {} a
 * @returns Object
 */
CollisionUtil.checkArea = function(a) {
    if (!a.hitAreaX) {
        a.hitAreaX = a.width;
    }

    if (!a.hitAreaY) {
        a.hitAreaY = a.height;
    }

    if (!a.centerX) {
        a.centerX = a.x + (a.width / 2);

    }

    if (!a.centerY) {
        a.centerY = a.y + (a.height / 2);
    }

    if (!a.radius) {
        console.warn("Object: {" + a + "} without radius");
        a.radius = a.width / 2;
    }
};

CollisionUtil.checkRectCollision = function(a, b) {

    var h;
    var w;

    if (b.centerY > a.centerY) {
        h = b.centerY - a.centerY;
    } else {
        h = a.centerY - b.centerY;
    }

    if (b.centerX > a.centerX) {
        w = b.centerX - a.centerX;
    } else {
        w = a.centerX - b.centerX;
    }

    var d = Math.sqrt((h * h) + (w * w));

    return (d <= (a.radius + b.radius));
};
