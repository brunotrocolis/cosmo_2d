var cosmo;
(function (cosmo) {
    class Tiles {
        constructor(set) {
            var set = set || {};
            this.image = new HTMLImageElement();
            this.image.src = set.image;
            this.size = {};
            this.size.rows = set.rows || 1;
            this.size.columns = set.columns || 1;
            this.size.width = Math.round(this.image.width / this.size.columns) || this.image.width;
            this.size.height = Math.round(this.image.height / this.size.rows) || this.image.height;
        }
    }
    cosmo.Tiles = Tiles;
})(cosmo || (cosmo = {}));
