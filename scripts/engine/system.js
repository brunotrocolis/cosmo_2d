//--------------------------------------------------------------------------------------------------------------
//System -------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//Função para clonar objetos
function clone(from) {
    var prop;
    var copy;
    if (from == null || typeof from != "object") {
        return from;
    }
    if (from.constructor == Date || from.constructor == RegExp || from.constructor == Function || from.constructor == String || from.constructor == Number || from.constructor == Boolean) {
        return new from.constructor(from);
    }
    if (from.constructor != Object && from.constructor != Array) {
        return from;
    }
    copy = new from.constructor();
    for (prop in from) {
        copy[prop] = clone(from[prop]);
    }
    return copy;
}

//Buscar recursos, imagens e sons
function file(id) {
    return document.getElementById(id);
}

//Leitura do teclado
var key = new Array();

function keysPressed(event) {
    //console.log(event.keyCode);
    key[event.keyCode] = true;
}
function keysReleased(event) {
    key[event.keyCode] = false;
}
window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);

//Leitura dos toques na tela
var touch = new Array();
document.addEventListener("touchstart", touchAction);
document.addEventListener("touchmove", touchAction);
document.addEventListener("touchend", function (e) {
    touch = new Array();
    touchAction(e)
});
function touchAction(e) {
    for (var i = 0; i < e.touches.length; i++) {
        touch[i] = {
            x: Math.round(e.touches[i].clientX * (GameScreen.size.width / GameScreen.size.deviceWidth)),
            y: Math.round(e.touches[i].clientY * (GameScreen.size.height / GameScreen.size.deviceHeight))
        };
    }
}