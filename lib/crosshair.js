var kAngularTick = 0.065;
var kAngularVel = 6;
var kCrossHairRaidus = 50;

var radToDegrees = function(radians) {
    return radians * (180/3.14159);
}
var degToRadians = function(degrees) {
    return degrees * (3.14159/180);
}

Q.Sprite.extend("Crosshair", {
    init: function(p) {
        this._super(p, {
            _angle: 4.75,
            _vel_angle: 0,
            _color: 0,
            w: 10,
            h: 10
        });
    },

    moveUp: function() {
        this.p._vel_angle = -kAngularVel;
    },

    moveDown: function() {
        this.p._vel_angle = kAngularVel;
    },

    stopMoving: function() {
        this.p._vel_angle = 0;
    },

    step: function(dt) {
        this.p._angle += this.p._vel_angle * dt
        this.p.x = (kCrossHairRaidus * Math.sin(this.p._angle));
        this.p.y = (kCrossHairRaidus * Math.cos(this.p._angle));
    },

    draw: function(ctx) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(10, 10);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, 10);
        ctx.lineTo(10, 0);
        ctx.closePath();
        ctx.stroke();
    }

});
