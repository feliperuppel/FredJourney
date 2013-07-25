var Utils = {};
Utils.testHit = function(a, b) {
    returnValue = false;
    if (!a.hitAreaX) {
        a.hitAreaX = a.width;
    }

    if (!a.hitAreaY) {
        a.hitAreaY = a.height;
    }

    if (!b.hitAreaX) {
        b.hitAreaX = a.width;
    }

    if (!b.hitAreaY) {
        b.hitAreaY = b.height;
    }

    var oba = Utils.buildHitArea(a);
    var obb = Utils.buildHitArea(b);
    // Check impact
    // Check c point
    if (oba.c.x >= obb.a.x && oba.c.x <= obb.b.x
            && oba.c.y >= obb.a.y && oba.c.y <= obb.d.y) {
        returnValue = true;
        // Check b point
    } else if (oba.b.x >= obb.a.x && oba.b.x <= obb.b.x
            && oba.b.y >= oba.a.y) {
        returnValue = true;
        // Check d point
    } else if (oba.d.x >= obb.a.x && oba.d.x <= obb.b.x
            && oba.d.y >= obb.b.y && oba.d.y <= obb.d.y) {
        returnValue = true;
        // Check a point
    } else if (oba.a.x >= obb.a.x && oba.a.x <= obb.b.x
            && oba.a.y >= obb.a.y && oba.a.y <= obb.d.y) {
        returnValue = true;
    }
    
    return returnValue;
}


Utils.buildHitArea = function(a) {

    var obj = {};
    obj.a = {}
    obj.a.x = a.x + (a.width / 2) - (a.hitAreaX / 2);
    obj.a.y = a.x + (a.height / 2) - (a.hitAreaX / 2);
    obj.b = {}
    obj.b.x = obj.a.x + a.hitAreaX;
    obj.b.y = obj.a.y;
    obj.c = {}
    obj.c.x = obj.b.x;
    obj.c.y = obj.b.x + a.hitAreaY;
    obj.d = {}
    obj.d.x = obj.a.x;
    obj.d.y = obj.c.y;
    return obj;
}