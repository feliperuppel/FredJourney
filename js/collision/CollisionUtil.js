var CollisionUtil = {};

/**
 * @param easeljs.Bitmap a
 * @param easeljs.Bitmap b
 * @returns boolean 
 */

CollisionUtil.checkRadiusCollision = function(a, b) {

    if (a.active && b.active) {
        CollisionUtil.checkArea(a);
        CollisionUtil.checkArea(b);

        var hited = CollisionUtil.checkCircleCollision(a, b);

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

    if (!a.radius) {
        console.log("Hit!-------------------------------------------------------");
        console.warn("Object: {" + a + "} without radius");
        a.radius = a.width / 2;
    }
};

CollisionUtil.checkCircleCollision = function(a, b) {

    var h;
    var w;

    h = b.y - a.y;

    w = b.x - a.x;

    var d = Math.sqrt((h * h) + (w * w));
    var hit = (d <= (a.radius + b.radius));
    if (hit) {
        console.log("h: " + h + ", w: " + w + ", d:" + d);
    }
    return hit;
};

CollisionUtil.checkRectCollision = function(a, b) {


    if (!a.blockArea) {
        a.blockArea = CollisionUtil.buildBlockArea(a);
    }

    if (!b.blockArea) {
        b.blockArea = CollisionUtil.buildBlockArea(b);
    }

    var blocked = false;

    // Check block
    // Check c point
    if (a.blockArea.c.x >= b.blockArea.a.x && a.blockArea.c.x <= b.blockArea.b.x
            && a.blockArea.c.y >= b.blockArea.a.y && a.blockArea.c.y <= b.blockArea.d.y) {
        blocked = true;
        // Check b point
    } else if (a.blockArea.b.x >= b.blockArea.a.x && a.blockArea.b.x <= b.blockArea.b.x
            && a.blockArea.b.y >= a.blockArea.a.y) {
        blocked = true;
        // Check d point
    } else if (a.blockArea.d.x >= b.blockArea.a.x && a.blockArea.d.x <= b.blockArea.b.x
            && a.blockArea.d.y >= b.blockArea.b.y && a.blockArea.d.y <= b.blockArea.d.y) {
        blocked = true;
        // Check a point
    } else if (a.blockArea.a.x >= b.blockArea.a.x && a.blockArea.a.x <= b.blockArea.b.x
            && a.blockArea.a.y >= b.blockArea.a.y && a.blockArea.a.y <= b.blockArea.d.y) {
        blocked = true;
    }

    return blocked;
};

CollisionUtil.buildBlockArea = function(a) {

    if (!a.hitAreaX) {
        a.hitAreaX = a.width;
    }

    if (!a.centerX) {
        a.centerX = a.width / 2;
    }

    if (!a.centerY) {
        a.centerY = a.height / 2;
    }

    var obj = {};

    obj.a = {};
    obj.a.x = a.x + (a.centerX / 2) - (a.hitAreaX / 2);
    obj.a.y = a.x + (a.centerY / 2) - (a.hitAreaX / 2);

    obj.b = {};
    obj.b.x = obj.a.x + a.hitAreaX;
    obj.b.y = obj.a.y;

    obj.c = {};
    obj.c.x = obj.b.x;
    obj.c.y = obj.b.x + a.hitAreaY;

    obj.d = {};
    obj.d.x = obj.a.x;
    obj.d.y = obj.c.y;

    return obj;
};