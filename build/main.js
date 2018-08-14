var cosmo;
(function (cosmo) {
    cosmo.resource = function (id) {
        return document.getElementById(id);
    };
    var res = cosmo.resource;
    function loop() {
        window.requestAnimationFrame(loop);
        console.log("Ok");
    }
    cosmo.loop = loop;
    function play() {
        loop();
    }
    cosmo.play = play;
})(cosmo || (cosmo = {}));
