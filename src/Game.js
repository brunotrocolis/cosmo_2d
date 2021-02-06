const Scene = requarid('./Scene');

class Game {

    constructor(set = {}) {
        this.screen = set.screen;
        this.scene = set.scene || new Scene();
    }

    loop() {

    }

    play() {
        
    }

    update () {
        this.loop();
        this.scene.update();
    }

    render () {
        this.scene.render();

        // O Ultimo a ser renderizado deve ser a tela
        this.screen.render();
    }

}

module.export = Game;