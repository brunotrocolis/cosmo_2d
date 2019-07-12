var game = {};

(function () {
    cosmo.test.active = false;

    var screen = new cosmo.Screen({
        auto_height: true
    });

    game = new cosmo.Game();
    game.screen = screen;

    var hero = new cosmo.Actor({
        name: "Herói",
        x: 50, y: 50,
        unique: true,
        start: function () {
            this.speed = 2;
            this.custonSprites = {
                up: new cosmo.Sprite({
                    image: '../resources/sprites/up.png',
                    collision_x: 2,
                    collision_y: 14,
                    collision_width: 11,
                    collision_height: 11,
                    animation_frames: 4
                }),
                down: new cosmo.Sprite({
                    image: '../resources/sprites/down.png',
                    collision_x: 2,
                    collision_y: 14,
                    collision_width: 11,
                    collision_height: 11,
                    animation_frames: 4
                }),
                left: new cosmo.Sprite({
                    image: '../resources/sprites/left.png',
                    collision_x: 2,
                    collision_y: 14,
                    collision_width: 11,
                    collision_height: 11,
                    animation_frames: 4
                }),
                right: new cosmo.Sprite({
                    image: '../resources/sprites/right.png',
                    collision_x: 2,
                    collision_y: 14,
                    collision_width: 11,
                    collision_height: 11,
                    animation_frames: 4
                })
            }

            this.sprite = this.custonSprites.down;
        },
        loop: function () {
            if (cosmo.key[65]) {
                this.sprite = this.custonSprites.left;
                this.x -= this.speed;
            } else if (cosmo.key[68]) {
                this.sprite = this.custonSprites.right;
                this.x += this.speed;
            }
            if (cosmo.key[87]) {
                this.sprite = this.custonSprites.up;
                this.y -= this.speed;
            } else if (cosmo.key[83]) {
                this.sprite = this.custonSprites.down;
                this.y += this.speed;
            }
        }
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
            [0, 0, 45, 130],
            [0, 0, 150, 50],
            [2, 1, 200, 50]

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