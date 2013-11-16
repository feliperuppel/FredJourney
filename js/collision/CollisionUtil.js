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

            console.log("A.y: " + a.centerY + ", A.x: " + a.centerX + ", name: " + a.name + ", radius:" + a.radius);
            console.log("B.y: " + b.centerY + ", B.x: " + b.centerX + ", name: " + b.name + ", radius:" + b.radius);
            console.log("Hit!-------------------------------------------------------");
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

    a.centerX = a.x + (a.hitAreaX / 2);

    a.centerY = a.y + (a.hitAreaY / 2);

    if (!a.radius) {
        console.log("Hit!-------------------------------------------------------");
        console.warn("Object: {" + a + "} without radius");
        a.radius = a.width / 2;
    }
};

CollisionUtil.checkRectCollision = function(a, b) {

    var h;
    var w;

    h = b.centerY - a.centerY;

    w = b.centerX - a.centerX;

    var d = Math.sqrt((h * h) + (w * w));
    var hit = (d <= (a.radius + b.radius));
    if (hit) {
        console.log("h: " + h + ", w: " + w + ", d:" + d);
    }
    return hit;
};
