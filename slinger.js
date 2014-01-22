    "use strict"
    var _kAccelration_x = 250.0
    var _kSlowdown = 0.05
    var _kVelocity_x_max = 300.0
    var Q = Quintus({development: true});
    Q=Q.include("Sprites, Input, Scenes, Anim");
    Q=Q.setup("slinger-canvas");
    Q=Q.controls();



    Q.scene("InitialScene", function(stage) {
        var player = new Q.Player({x: 400, y: 300});
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
    


