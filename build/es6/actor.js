var cosmo;
(function (cosmo) {
    class Actor {
        constructor(set) {
            var set = set || {};
            this.name = set.name || 'Actor';
            this.x = set.x || 0;
            this.y = set.y || 0;
            this.sprite = set.sprite || null;
            this.unique = set.unique === undefined ? false : set.unique;
            this.persistent = set.persistent === undefined ? false : set.persistent;
            this.solid = set.solid === undefined ? false : set.solid;
            this.start = set.start || function () { };
            this.loop = set.loop || function () { };
            this.over = set.over || function () { };
        }
        start() { }
        loop() { }
        over() { }
    }
    cosmo.Actor = Actor;
})(cosmo || (cosmo = {}));
