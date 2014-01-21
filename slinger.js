(function() {
    "use strict"
    var _kAccelration_x = 100.0
    var _kSlowdown = 0.05
    var _kVelocity_x_max = 300.0
    var Q = Quintus({development: true});
    Q.include("Sprites, Input, Scenes");
    Q.setup("slinger-canvas", {
        width: 640,
        height: 480
    });
    Q.controls();

    Q.Sprite.extend("Player", {
        init: function(p) {
                  this._super(p, {
                      color: "red",
                      w: 50,
                      h: 70,
                      _velocity_x : 0,
                      _acceleration_x : 0
                  });
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
                  ctx.fillStyle = this.p.color;
                  ctx.fillRect(-this.p.cx,
                      -this.p.cy,
                      this.p.w,
                      this.p.h);
              },

        step: function(deltaTime) {
                  /* Not moving, slow down! */
                  this.p._velocity_x += this.p._acceleration_x * deltaTime;
                  if(this.p._acceleration_x > 0) {
                      this.p._velocity_x = Math.min(this.p._velocity_x, _kVelocity_x_max);
                  } 
                  else if (this.p._acceleration_x < 0) {
                      this.p._velocity_x = Math.max(this.p._velocity_x, -_kVelocity_x_max);
                  }
                  else {
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

    var player = new Q.Player();
    Q.gameLoop(function(deltaTime) {
        player.update(deltaTime);
        Q.clear();
        player.render(Q.ctx);

    });
})();
    


