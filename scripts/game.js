(function () {
    //--- Game ----------------------------------------------------------
    cosmo.game = function ($) {
        $.cosmo = new $.Actor({
            name: 'Cosmo',
            x: 10,
            y: 30,
            sprite: null,
            start: function () {
                this.sp_up = new $.Sprite({
                    image: 'cosmo_up',
                    animation_frames: 4
                });
                this.sp_down = new $.Sprite({
                    image: 'cosmo_down',
                    animation_frames: 4
                });
                this.sp_left = new $.Sprite({
                    image: 'cosmo_left',
                    animation_frames: 4
                });
                this.sp_right = new $.Sprite({
                    image: 'cosmo_right',
                    animation_frames: 4
                });
                this.sprite = this.sp_down;
            },
            loop: function () {
                if ($.key[$.KEY.UP]) {
                    this.sprite.animation.fix = false;
                    this.sprite = this.sp_up;
                    this.y--;
                } else if ($.key[$.KEY.DOWN]) {
                    this.sprite.animation.fix = false;
                    this.sprite = this.sp_down;
                    this.y++;
                } else if ($.key[$.KEY.LEFT]) {
                    this.sprite.animation.fix = false;
                    this.sprite = this.sp_left;
                    this.x--;
                } else if ($.key[$.KEY.RIGHT]) {
                    this.sprite.animation.fix = false;
                    this.sprite = this.sp_right;
                    this.x++;
                } else {
                    this.sprite.animation.fix = 0;
                }
                //this.push();
            },
            unique: true,
            persistent: true,
            solid: true
        });
        $.teste = new $.Actor({
            sprite: new $.Sprite({
                image: 'cosmo_left',
                animation_frames: 4
            }),
            loop: function () {
                if (this.colliding($.cosmo)) {
                    console.log("Colidindo");
                }
                this.push();
            }
        });
        $.tela = new $.Scene();
        $.tela.add($.cosmo, [100, 100]);
        $.tela.add($.teste, [200, 20]);
        $.tela.add(new $.BlockRect({
            x: 0,
            y: 0,
            width: 20,
            height: 20
        }));
        cosmo.start = function () {
            $.scene = $.tela;
        }
        cosmo.loop = function () {
        }
    }
    cosmo.play();
})();