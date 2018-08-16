var cosmo;
(function (cosmo) {
    var Actor = /** @class */ (function () {
        function Actor(set) {
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
        Actor.prototype.start = function () { };
        Actor.prototype.loop = function () { };
        Actor.prototype.over = function () { };
        Actor.prototype.update = function () {
            this.loop();
            this.sprite.update(this.x, this.y);
        };
        Actor.prototype.render = function () {
            this.sprite.render(this.x, this.y);
        };
        return Actor;
    }());
    cosmo.Actor = Actor;
})(cosmo || (cosmo = {}));
