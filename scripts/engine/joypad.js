//--------------------------------------------------------------------------------------------------------------
//Joypad -------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
function Analog(x, y, r, strokeColor, fillColor) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.strokeColor = strokeColor || "#FFFFFF";
    this.fillColor = fillColor || "rgba(255,255,255,0.5)";
    this.output = { x: 0, y: 0 };
    this.hypotenuse = 0;
} Analog.prototype = {
    render: function () {
        gameScreen.bufferContext.strokeStyle = this.strokeColor;
        gameScreen.bufferContext.beginPath();
        gameScreen.bufferContext.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        gameScreen.bufferContext.closePath();
        gameScreen.bufferContext.stroke();
        gameScreen.bufferContext.strokeStyle = this.strokeColor;
        gameScreen.bufferContext.fillStyle = this.fillColor;
        gameScreen.bufferContext.beginPath();
        if (this.hypotenuse <= this.r || (this.output.x == 0 && this.output.y == 0))
            gameScreen.bufferContext.arc(this.output.x + this.x, this.output.y + this.y, Math.round(this.r / 2), 0, Math.PI * 2, true);
        else {
            var a = Math.atan2(this.output.y, this.output.x);
            gameScreen.bufferContext.arc(this.r * Math.cos(a) + this.x, this.r * Math.sin(a) + this.y, Math.round(this.r / 2), 0, Math.PI * 2, true);
        }
        gameScreen.bufferContext.closePath();
        gameScreen.bufferContext.stroke();
        gameScreen.bufferContext.fill();
    },
    update: function () {
        //Verifica se existe algum toque na tela.
        if (touch.length > 0) {
            //Fazendo varredura nos toques na tela.
            for (var i in touch) {
                //Calculando catetos entre o toque na tela e o centro do analógico.
                var legX = Math.abs(touch[i].x - this.x);
                var legY = Math.abs(touch[i].y - this.y);
                //Calculando distancia entre o toque e o centro do analógico.
                this.hypotenuse = Math.sqrt(Math.pow(legX, 2) + Math.pow(legY, 2));
                //Se a hipotenusa for menor que o raio de ação.
                if (this.hypotenuse < (3 * this.r)) {
                    //Definindo variável de saída.
                    this.output = { x: touch[i].x - this.x, y: touch[i].y - this.y };
                    break;
                } else
                    this.output = { x: 0, y: 0 };
            }
        } else
            this.output = { x: 0, y: 0 };
    }
}
//Botões do joystick virtual.
function Button(x, y, r, label, strokeColor, fillColor) {
    //Posição do botão na tela.
    this.x = x;
    this.y = y;
    //Tamanho do botão
    this.r = r || 20;
    //Raio de ação do botão.
    this.reach = 2 * this.r;
    //Letra mostrada no botão.
    this.label = label || '';
    //Cor das linhas.
    this.strokeColor = strokeColor || '#FFFFFF';
    //cor dos preenchimentos.
    this.fillColor = fillColor || "rgba(255,255,255,0.5)";
    //Estado de saída do botão.
    this.pressed = false;
} Button.prototype = {
    render: function () {
        gameScreen.bufferContext.strokeStyle = this.strokeColor;
        gameScreen.bufferContext.fillStyle = this.fillColor;
        gameScreen.bufferContext.beginPath();
        gameScreen.bufferContext.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        gameScreen.bufferContext.closePath();
        gameScreen.bufferContext.stroke();
        if (this.pressed) gameScreen.bufferContext.fill();
        gameScreen.bufferContext.font = 'bold ' + 2 * this.r + 'px courier';
        gameScreen.bufferContext.strokeText(this.label, this.x - this.r / 1.7, this.y + this.r / 1.7);
        gameScreen.bufferContext.fillText(this.label, this.x - this.r / 1.7, this.y + this.r / 1.7);
        gameScreen.bufferContext.font = '12px courier';
    },
    update: function () {
        if (touch.length > 0) {
            for (var i in touch) {
                var legX = Math.abs(touch[i].x - this.x);
                var legY = Math.abs(touch[i].y - this.y);
                var hypotenuse = Math.sqrt(legX * legX + legY * legY);
                if (hypotenuse < this.reach) {
                    this.pressed = true;
                    break;
                } else
                    this.pressed = false;
            }
        } else
            this.pressed = false;
    }
}
//Joystick virtual
function VirtualGamepad() {
    this.analog = new Array();
    this.button = new Array();
} VirtualGamepad.prototype = {
    addAnalog: function (x, y, r, strokeColor, fillColor) {
        this.analog.push(new Analog(x, y, r, strokeColor || "#FFFFFF", fillColor || "rgba(255,255,255,0.5)"));
    },
    addButton: function (x, y, r, label, strokeColor, fillColor) {
        this.button.push(new Button(x, y, r || 20, label || '', strokeColor || '#FFFFFF', fillColor || 'rgba(255,255,255,0.5)'));
    },
    render: function () {
        for (var i in this.analog) {
            this.analog[i].render();
        }
        for (var i in this.button) {
            this.button[i].render();
        }
    },
    update: function () {
        for (var i in this.analog) {
            this.analog[i].update();
        }
        for (var i in this.button) {
            this.button[i].update();
        }
    }
}