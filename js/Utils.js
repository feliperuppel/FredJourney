function Utils() {
}

Utils.testHit = function(a, b) {

    // check default values
    if (!a.hit) {
        a.hit = a.regY;
    }

    if (!b.hit) {
        b.hit = b.regX;
    }
    
    if (b.x - b.hit > a.x + a.hit) {
        return;
    }
    if (b.x - b.hit > a.x - a.hit) {
        return;
    }
    if (b.y - b.hit > a.y + a.hit) {
        return;
    }
    if (b.y - b.hit > a.y - a.hit) {
        return;
    }
    
    return this.hit + tHit > Math.sqrt(Math.pow(Math.abs(this.x - tX), 2) + Math.pow(Math.abs(this.y - tY), 2));
    
}

