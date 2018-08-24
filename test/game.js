(function () {
    cosmo.test.active = true;

    var screen = new cosmo.Screen({
        auto_height: true
    });

    var game = new cosmo.Game();
    game.screen = screen;

    var hero = new cosmo.Actor({
        name: "Herói",
        x: 50, y: 50,
        unique: true,
        start: function () {
            this.speed = 2;
        },
        loop: function () {
            if (cosmo.key[65]) {
                this.x -= this.speed;
            } else if (cosmo.key[68]) {
                this.x += this.speed;
            }
            if (cosmo.key[87]) {
                this.y -= this.speed;
            } else if (cosmo.key[83]) {
                this.y += this.speed;
            }
        }
    });
    hero.sprite = new cosmo.Sprite({
        image: '../resources/sprites/down.png',
        collision_x: 2,
        collision_y: 14,
        collision_width: 11,
        collision_height: 11,
        animation_frames: 4
    });

    tiles = new cosmo.Tiles({
        image: "../resources/tiles/tiles.png",
        rows: 2,
        columns: 3,
        block: [
            [true, true, true],
            [true, true, false]
        ],
        matrix: [
            [0, 0, 0, 100],
            [0, 0, 15, 100],
            [2, 0, 30, 100],
            [0, 1, 0, 115],
            [0, 1, 15, 115],
            [0, 1, 30, 115],
            [0, 1, 0, 130],
            [0, 1, 15, 130],
            [0, 1, 30, 130],
            [0, 0, 45, 130]
        ]
    });
    //320, 240
    var button = new cosmo.Button({
        image: "../resources/buttons/button_play_1.png",
        x: 200,
        y: 100,
        scale_x: .5,
        scale_y: .5,
        press: function (){
            console.log("Pressionado!");
        },
        hold: function () {
            console.log("Segurando!");
        }
    });

    game.screen.add(button);
    game.scene = new cosmo.Scene({
        width: 640,
        height: 480,
        actor: [
            hero
        ],
        tiles: [
            [tiles],
            []
        ]
    });


    game.screen.camera.actor = hero;

    game.play();
})();