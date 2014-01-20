(function() {
    "use strict"
    var Q = Quintus({development: true});
    Q.include("Sprites, Input, Scenes");
    Q.setup("slinger-canvas", {
        width: 640,
        height: 480
    });


    Q.Sprite.extend("Player", {
        init: function(p) {
                  this._super(p, {
                      color: "red",
                      w: 50,
                      h: 70
                  });
              },
        draw: function(ctx) {
                  ctx.fillStyle = this.p.color;
                  ctx.fillRect(-this.p.cx,
                      -this.p.cy,
                      this.p.w,
                      this.p.h);
              }

    });

    var player = new Q.Player();
    Q.gameLoop(function(deltaTime) {
        Q.clear();
        player.render(Q.ctx);

    });
})();
    


