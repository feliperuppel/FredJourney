var Utils = {};
Utils.testHit = function(a, b) {

    if (!a.hitAreaX) {
        a.hitAreaX = a.width;
    }

    if (!a.hitAreaY) {
        a.hitAreaY = a.height;
    }

    if (!b.hitAreaX) {
        b.hitAreaX = b.width;
    }

    if (!b.hitAreaY) {
        b.hitAreaY = b.height;
    }

    if (!a.blockAreaX) {
        a.blockAreaX = a.hitAreaX;
    }

    if (!a.blockAreaY) {
        a.blockAreaY = a.hitAreaY;
    }

    if (!b.blockAreaX) {
        b.blockAreaX = b.hitAreaX;
    }

    if (!b.blockAreaY) {
        b.blockAreaY = b.hitAreaY;
    }
    
    if (!b.centerX) {
        b.centerX = b.width / 2;
    }

    if (!b.centerY) {
        b.centerY = b.height / 2;
    }

    var hitAreaA = Utils.buildHitArea(a);
    var hitAreaB = Utils.buildHitArea(b);
    
    if(!a.blockArea){
        a.blockArea = Utils.buildBlockArea(a);
    }
    
    if(!b.blockArea){
        b.blockArea = Utils.buildBlockArea(b);
    }
    
    var r = {};
    
    r.hited = false;
    
    r.blocked = false;
    
    // Check hit
    // Check c point
    if (hitAreaA.c.x >= hitAreaB.a.x && hitAreaA.c.x <= hitAreaB.b.x
            && hitAreaA.c.y >= hitAreaB.a.y && hitAreaA.c.y <= hitAreaB.d.y) {
        r.hited = true;
        // Check b point
    } else if (hitAreaA.b.x >= hitAreaB.a.x && hitAreaA.b.x <= hitAreaB.b.x
            && hitAreaA.b.y >= hitAreaA.a.y) {
        r.hited = true;
        // Check d point
    } else if (hitAreaA.d.x >= hitAreaB.a.x && hitAreaA.d.x <= hitAreaB.b.x
            && hitAreaA.d.y >= hitAreaB.b.y && hitAreaA.d.y <= hitAreaB.d.y) {
        r.hited = true;
        // Check a point
    } else if (hitAreaA.a.x >= hitAreaB.a.x && hitAreaA.a.x <= hitAreaB.b.x
            && hitAreaA.a.y >= hitAreaB.a.y && hitAreaA.a.y <= hitAreaB.d.y) {
        r.hited = true;
    }
    
    // Check block
    // Check c point
    if (a.blockArea.c.x >= b.blockArea.a.x && a.blockArea.c.x <= b.blockArea.b.x
            && a.blockArea.c.y >= b.blockArea.a.y && a.blockArea.c.y <= b.blockArea.d.y) {
        r.blocked = true;
        // Check b point
    } else if (a.blockArea.b.x >= b.blockArea.a.x && a.blockArea.b.x <= b.blockArea.b.x
            && a.blockArea.b.y >= a.blockArea.a.y) {
        r.blocked = true;
        // Check d point
    } else if (a.blockArea.d.x >= b.blockArea.a.x && a.blockArea.d.x <= b.blockArea.b.x
            && a.blockArea.d.y >= b.blockArea.b.y && a.blockArea.d.y <= b.blockArea.d.y) {
        r.blocked = true;
        // Check a point
    } else if (a.blockArea.a.x >= b.blockArea.a.x && a.blockArea.a.x <= b.blockArea.b.x
            && a.blockArea.a.y >= b.blockArea.a.y && a.blockArea.a.y <= b.blockArea.d.y) {
        r.blocked = true;
    }
    
    if(!r.hited && !r.blocked){
        return false;
    }

    return r;
}


Utils.buildHitArea = function(a) {

    var obj = {};

    obj.a = {};
    obj.a.x = a.x + (a.width / 2) - (a.hitAreaX / 2);
    obj.a.y = a.x + (a.height / 2) - (a.hitAreaX / 2);
    
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
}

Utils.buildBlockArea = function(a) {

    var obj = {};

    obj.a = {}
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
}