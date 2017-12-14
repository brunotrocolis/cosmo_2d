window.onload = function () {
    //Configurar tela do jogo:
    // GameScreen.start(resolution, orientation, autoHeight, camera);
    // resolution -> Resoliução do jogo, padrão = QVGA (320 x 240).
    // orientation -> Orientação da tela do jogo, padrão = LANDSCAPE (paisagem).
    // autoHeight - > Ajustar altura da tela de acordo com o dispositivo, padrão = false.
    // camera - > Area da tela onde o protagonista se movimenta sem mover a camera, padrão = 70 (70% do tamanho da tela).
    GameScreen.start(QVGA, LANDSCAPE, false, 70);
    //Objetos do jogo:

    //Criando sprites:
    // new Sprite(src, animationFrames, animationSpeed, colisionRect, origin, scale, rotation);
    // src -> Id da imagem do esprite.
    // animationFrames -> Numero de frames em que a imagem se divide verticalmente.
    // animationSpeed -> Velocidade da animação do sprite, quantas vezes os frames se repetem pos segundo.
    // colisionRect -> Retangulo de colisão, resebe: {x, y, width, height}.
    // origin -> Origem do sprite, recebe: {x, y}.
    // scale -> Escala do sprite, recebe: {x, y}.
    // rotation -> Rotação do sprite em rad, 
    // obs: Escala e Rotação só afetam imagem e não o retangulo de colisão.
    var cosmo_sprite_down = new Sprite('cosmo_down', 4, 2);
    var cosmo_sprite_up = new Sprite('cosmo_up', 4, 2);
    var cosmo_sprite_left = new Sprite('cosmo_left', 4, 2);
    var cosmo_sprite_right = new Sprite('cosmo_right', 4, 2);

    //Criando um ator:
    var cosmo = new Actor(
        'Cosmo', //Nome do ator
        cosmo_sprite_down, //Sprite do ator
        true, //Se o ator é único
        true, //Se o ator continua funcionando quando esta fora da tela
        true, //Se o ator é sólido
        function () { //Função executatdo ao ator ser criado
            this.speed = 1;
        },
        function () { //Função executada a cada frame enquanto o ator estiver ativo
            if(key[KEY.UP]){
                this.y -= this.speed;
                this.sprite = cosmo_sprite_up;
                this.sprite.animation.fix = false;
            } else if(key[KEY.DOWN]){
                this.y += this.speed;
                this.sprite = cosmo_sprite_down;
                this.sprite.animation.fix = false;
            } else if(key[KEY.LEFT]){
                this.x -= this.speed;
                this.sprite = cosmo_sprite_left;
                this.sprite.animation.fix = false;
            } else if(key[KEY.RIGHT]){
                this.x += this.speed;
                this.sprite = cosmo_sprite_right;
                this.sprite.animation.fix = false;
            } else {
                this.sprite.animation.fix = 0;
            }
        },
        function () { //Função executada quando o ator é removido

        }
    );

    var cena = new Scene();
    cena.addActor(cosmo, 50, 50);
    //cena.backgroundColor = "rgb(220,070,120)";
    
    //Configurar game:
    mainStart = function () {
        mainActor = cosmo;
        mainScene = cena;
    }
    //Loop principal:
    mainLoop = function () {

    }
    //Inicia game:
    playGame();
}