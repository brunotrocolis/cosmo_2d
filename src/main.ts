module cosmo {
    export var resource = function (id: string): HTMLElement {
        return document.getElementById(id);
    }
    var res = resource;


    export function loop(): void {
        window.requestAnimationFrame(loop);
        console.log("Ok");
    }
    export function play(): void {
        loop();
    }
}