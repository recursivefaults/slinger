
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
            _rope: null
        });
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
        Q.input.on("upUp", this,"aimStop");
        Q.input.on("downUp", this,"aimStop");
        Q.input.on("action", this,"slice");
    },
    /**
    draw: function(ctx) {
        this._super(ctx);
        ctx.strokeRect(-this.p.cx, -this.p.cy, this.p.w, this.p.h);
    },
    **/


    step: function(deltaTime) {
        this.p._velocity_x += this.p._acceleration_x * deltaTime;
        if(this.p._acceleration_x > 0) {
            this.p._velocity_x = Math.min(this.p._velocity_x, _kVelocity_x_max);
            this.play("walkL");
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
        this.p.flip = false;
        console.log("Move Left: " + this.p._velocity_x);
    },
    moveRight: function () {
        this.p._acceleration_x =  _kAccelration_x;
        this.p.flip = "x";
        console.log("Move Right: " + this.p._velocity_x);
    },

    aimUp: function() {
        Q("Crosshair").invoke("moveUp");
    },

    aimDown: function() {
        Q("Crosshair").invoke("moveDown");
    },

    aimStop: function() {
        console.log("Stop moving");
        Q("Crosshair").invoke("stopMoving");
    },

    shoot: function () {
        console.log("SHOOT");
        if(this.p._rope == null) {
            var rise =  this.p.y - Q("Crosshair").first().c.y;
            var run =  this.p.x - Q("Crosshair").first().c.x;
            this.p._rope = new Q.Rope({_rise: -rise, _run: -run, x: this.p.x, y: this.p.y});
            this.stage.insert(this.p._rope);
        }
        else {

            this.p._rope.destroy();
            this.p._rope = null;
        }
    },
    slice: function () {},
});
