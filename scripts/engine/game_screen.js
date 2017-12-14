//--------------------------------------------------------------------------------------------------------------
//Screen -------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
var GameScreen = {
    //Canvas onde a tela do jogo vai ser renderizada.
    canvas: document.createElement('canvas'),
    //Contexto do canvas.
    context: null,
    //canvas que buffer
    buffer: document.createElement('canvas'),
    //contexto do canvas buffer;
    bufferContext: null,
    //Resolução do canvas.
    size: {
        width: null,
        height: null,
        deviceWidth: document.documentElement.clientWidth,
        deviceHeight: document.documentElement.clientHeight
    },
    //Valor em % para definir limite da camera.
    camera: {width: 0, height: 0},
    //Intervalos dos limites
    cameraInterval: { x1: 0, x2: 0, y1: 0, y2: 0 },
    //Função para inicialisar a tela do jogo.
    start: function (resolution, orientation, autoHeight, camera){
        var resolution = resolution || QVGA;
        var orientation = orientation || LANDSCAPE;
        var autoHeight = autoHeight || false;
        var camera = camera / 100 || 0.7;

        if(autoHeight){
            if(orientation) {
                this.size.width = resolution[0];
                this.size.height = this.size.width * (this.size.deviceHeight / this.size.deviceWidth);
            } else {
                this.size.width = resolution[1];
                this.size.height = this.size.width * (this.size.deviceWidth / this.size.deviceHeight);
            }
        } else {
            if(orientation) {
                this.size.width = resolution[0];
                this.size.height = resolution[1];
            } else {
                this.size.width = resolution[1];
                this.size.height = resolution[0];
            }
        }
        //Calculando tamanho da camera.
        this.camera.width = camera * this.size.width;
        this.camera.height = camera * this.size.height;
        //Calcular os intervalos da camera.
        this.cameraInterval.x1 = Math.round(((1 - camera) * this.size.width) / 2);
        this.cameraInterval.x2 = (camera * this.size.width) + this.cameraInterval.x1;
        this.cameraInterval.y1 = Math.round(((1 - camera) * this.size.height) / 2);
        this.cameraInterval.y2 = (camera * this.size.height) + this.cameraInterval.y1;
        //Configurando o tamanho dos canvas;
        this.canvas.width = this.size.width;
        this.canvas.height = this.size.height;
        this.buffer.width = this.size.width;
        this.buffer.height = this.size.height;
        //Pegando contexto do canvas.
        this.context = this.canvas.getContext('2d');
        this.bufferContext = this.buffer.getContext('2d');
        //Adicionando canvas no HTML.
        document.body.appendChild(this.canvas);
    },
    //Função pata atualizar estados da tela.
    update: function () {
        //Camera segue o protagonista:
        if (mainActor.x + mainScene.x < this.cameraInterval.x1 && mainScene.x < 0)
            mainScene.x = Math.round(- (mainActor.x - this.cameraInterval.x1));
        if (mainActor.x + mainScene.x > this.cameraInterval.x2 && mainScene.x + mainScene.size.width > this.size.width)
            mainScene.x = Math.round(-(mainActor.x - this.cameraInterval.x2));
        if (mainActor.y + mainScene.y < this.cameraInterval.y1 && mainScene.y < 0)
            mainScene.y = Math.round(- (mainActor.y - this.cameraInterval.y1));
        if (mainActor.y + mainScene.y > this.cameraInterval.y2 && mainScene.y + mainScene.size.height > this.size.height)
            mainScene.y = Math.round(-(mainActor.y - this.cameraInterval.y2));

        if (mainScene.x > 0) mainScene.x = 0;
        if (mainScene.x < -(mainScene.size.width - this.size.width)) mainScene.x = -(mainScene.size.width - this.size.width);
        if (mainScene.y > 0) mainScene.y = 0;
        if (mainScene.y < -(mainScene.size.height - this.size.height)) mainScene.y = -(mainScene.size.height - this.size.height);
    },
    render: function () {
        this.context.drawImage(this.buffer, 0, 0);
    }
}