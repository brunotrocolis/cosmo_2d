//--------------------------------------------------------------------------------------------------------------
//System -------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//Função para clonar objetos
cosmo.clone = function(from) {
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
        copy[prop] = cosmo.clone(from[prop]);
    }
    return copy;
}

//Buscar recursos, imagens e sons
cosmo.resources = cosmo.res = function (id) {
    return document.getElementById(id);
}

//Leitura do teclado
cosmo.key = new Array();

cosmo.keysPressed = function (event) {
    //console.log(event.keyCode);
    cosmo.key[event.keyCode] = true;
}
cosmo.keysReleased = function (event) {
    cosmo.key[event.keyCode] = false;
}
window.addEventListener("keydown", cosmo.keysPressed, false);
window.addEventListener("keyup", cosmo.keysReleased, false);

//Leitura dos toques na tela
cosmo.touch = new Array();
document.addEventListener("touchstart", cosmo.touchAction);
document.addEventListener("touchmove", cosmo.touchAction);
document.addEventListener("touchend", function (e) {
    cosmo.touch = new Array();
    touchAction(e)
});
cosmo.touchAction = function (e) {
    for (var i = 0; i < e.touches.length; i++) {
        cosmo.touch[i] = {
            x: Math.round(e.touches[i].clientX * (cosmo.gameScreen.size.width / cosmo.gameScreen.size.deviceWidth)),
            y: Math.round(e.touches[i].clientY * (cosmo.gameScreen.size.height / cosmo.gameScreen.size.deviceHeight))
        };
    }
}