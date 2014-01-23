
Q.animations("belmontWalkL", {
    "walkL": { frames: [0, 1, 2], rate: 1/6, next: "standL" },
    "standL": { frames: [0]}
});

var kAngularTick = 0.075;

Q.Sprite.extend("Player", {
    init: function(p) {
        this._super(p, {
            sheet: "belmontWalkL",
            sprite: "belmontWalkL",
            frame: 0,
            x: 400,
            y: 300,
            w: 19,
            h: 31,
            _velocity_x : 0,
            _acceleration_x : 0,
            _crosshairRadius: 50,
            _crosshairCx: 0,
            _crosshairCy: 0,
            _crossHairAngle: 4.55,
            _eyeLevel: 0
        });
        this.p._eyeLevel = -this.p.cy + 3;
        this.p._crosshairCx = -this.p._crosshairRadius;
        this.p._crosshairCy = -this.p._eyeLevel;
        this.add("animation");
        /* Bind events */
        this.add("2d");
        Q.input.on("left", this, "moveLeft");
        Q.input.on("leftUp", this, "stopMoving");
        Q.input.on("right", this,"moveRight");
        Q.input.on("rightUp", this,"stopMoving");
        Q.input.on("fire", this,"shoot");
        Q.input.on("up", this,"aimUp");
        Q.input.on("down", this,"aimDown");
        Q.input.on("action", this,"slice");
    },
    draw: function(ctx) {
        this._super(ctx);
        this.drawCrossHairs(ctx);
        ctx.strokeRect(-this.p.cx, -this.p.cy, this.p.w, this.p.h);
    },

    drawCrossHairs: function(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.p._crosshairCx, this.p._crosshairCy);
        ctx.lineTo(this.p._crosshairCx + 10, this.p._crosshairCy + 10);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.p._crosshairCx, this.p._crosshairCy + 10);
        ctx.lineTo(this.p._crosshairCx + 10, this.p._crosshairCy);
        ctx.closePath();
        ctx.stroke();
        //Bounding box
    },

    step: function(deltaTime) {
        this.p._velocity_x += this.p._acceleration_x * deltaTime;
        if(this.p._acceleration_x > 0) {
            this.p._velocity_x = Math.min(this.p._velocity_x, _kVelocity_x_max);
            this.play("standL");
        } 
        else if (this.p._acceleration_x < 0) {
            this.p._velocity_x = Math.max(this.p._velocity_x, -_kVelocity_x_max);
            this.play("walkL");
        }
        else {
            /* Not moving, slow down! */
            this.p._velocity_x *= _kSlowdown;
        }
        this.p.x += this.p._velocity_x * deltaTime;

        this.p._crosshairCx = (this.p._crosshairRadius * Math.sin(this.p._crossHairAngle));
        this.p._crosshairCy = (this.p._crosshairRadius * Math.cos(this.p._crossHairAngle));
    },

    stopMoving: function () {
        this.p._acceleration_x = 0.0;
    },
    moveLeft: function () {
        this.p._acceleration_x = -_kAccelration_x;
        console.log("Move Left: " + this.p._velocity_x);
    },
    moveRight: function () {
        this.p._acceleration_x =  _kAccelration_x
            console.log("Move Right: " + this.p._velocity_x);
    },
    shoot: function () {},
    aimUp: function () {
        this.p._crossHairAngle += kAngularTick;
        console.log(this.p._crossHairAngle);
    },
    aimDown: function () {
        this.p._crossHairAngle -= kAngularTick;
    },
    slice: function () {},
});
