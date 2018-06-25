//--------------------------------------------------------------------------------------------------------------
//Sound---------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//Sons do jogo.
cosmo.Sound = function (src, volume, loop) {
    //Arquivo de som.
    this.audio = new Audio(src);
    //Volume de reprodução.
    this.audio.volume = volume || 1;

    this.audio.loop = loop || false;
    //Ler arquivo de som.
    this.audio.load();
} 
cosmo.Sound.prototype = {
    //Função para tocar.
    play: function () {
        this.audio.play();
    },
    //Função para tocar do inicio.
    rePlay: function () {
        this.audio.currentTime = 0;
        this.audio.play();
    },
    //Função para pausar
    pause: function () {
        this.audio.pause();
    },
    //Função para configurar volume.
    setVolume: function (volume) {
        this.audio.volume = volume;
        this.audio.load();
    }
};