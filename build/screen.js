var cosmo;
(function (cosmo) {
    var Screen = /** @class */ (function () {
        function Screen(set) {
            this.main_canvas = document.createElement('canvas');
        }
        return Screen;
    }());
    cosmo.Screen = Screen;
})(cosmo || (cosmo = {}));
