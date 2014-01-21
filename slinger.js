(function() {
    "use strict"
    var _kAccelration_x = 250.0
    var _kSlowdown = 0.05
    var _kVelocity_x_max = 300.0
    var Q = Quintus({development: true});
    Q.include("Sprites, Input, Scenes, Anim");
    Q.setup("slinger-canvas", {
        width: 800,
        height: 600
    });
    Q.controls();

    Q.animations("belmontWalkL", {
        "walkL": { frames: [2, 1, 0], rate: 1/12, loop: false}
    });

    Q.Sprite.extend("Player", {
        init: function(p) {
                  this._super(p, {
                      sheet: "belmontWalkL",
                      sprite: "belmontWalkL",
                      frame: 0,
                      x: 400,
                      y: 300,
                      _velocity_x : 0,
                      _acceleration_x : 0
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
                      this.play("walkL");
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

    Q.scene("InitialScene", function(stage) {
        var player = new Q.Player({x: 320, y: 240});
        stage.insert(player);
    });

    Q.load(["Simon.png", "simon.json"], function() {
        Q.compileSheets("Simon.png", "simon.json");
        Q.stageScene("InitialScene");
        Q.gameLoop(function(deltaTime) {
            Q.clear();
            var player = Q("Player").first();
            player.update(deltaTime);
            player.render(Q.ctx);

        });
    });
})();
    


