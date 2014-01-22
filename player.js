
Q.animations("belmontWalkL", {
    "walkL": { frames: [0, 1, 2], rate: 1/6, next: "standL" },
    "standL": { frames: [0]}
});

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
            _crosshairRadius: 50
        });
        this.add("animation");
        /* Bind events */
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
        ctx.beginPath();
        ctx.moveTo(-this.p._crosshairRadius, 0);
        ctx.lineTo(-this.p._crosshairRadius + 10, 10);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-this.p._crosshairRadius, 10);
        ctx.lineTo(-this.p._crosshairRadius + 10, 0);
        ctx.closePath();
        ctx.stroke();
        //Bounding box
        ctx.strokeRect(-this.p.cx, -this.p.cy, this.p.w, this.p.h);
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
    aimUp: function () {},
    aimDown: function () {},
    slice: function () {},
});
