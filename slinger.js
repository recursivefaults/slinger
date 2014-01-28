    "use strict"
    var _kAccelration_x = 250.0
    var _kSlowdown = 0.05
    var _kVelocity_x_max = 300.0
    var Q = Quintus({development: true});
    Q=Q.include("Sprites, Input, Scenes, Anim, 2D");
    Q=Q.setup("slinger-canvas");
    Q=Q.controls();



    Q.scene("InitialScene", function(stage) {
        var level = new Q.TileLayer({dataAsset:"levels.json", sheet: "tiles"});
        stage.collisionLayer(level);
        var player = new Q.Player({x: 400, y: 300});
        var crossHair = new Q.Crosshair();
        stage.insert(crossHair);
        stage.insert(player);
        stage.insert(crossHair, player);
        stage.insert(level);
    });

    Q.load(["Simon.png", "simon.json", "tiles.png", "levels.json"], function() {
        Q.compileSheets("Simon.png", "simon.json");
        Q.sheet("tiles", "tiles.png", {tileW: 32, tileH: 32, type:Q.SPRITE_DEFAULT});
        Q.stageScene("InitialScene");
    });
    


