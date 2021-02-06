class Scene extends GameElement{
    constructor (set = {}) {
        this.name = set.name;
        this.x = set.x || 0;
        this.y = set.y || 0;
        this.width = set.width;
        this.height =  set.height;

        this.actor = set.actor || [];
        this.title  = set.title || [[], []];
        this.background = set.background || [];
    }

    add(element, set = {}) {

    }

    update() {
        this.actor.array.forEach(actor => actor.update());
        this.title[0].array.forEach(title => title.update());
        this.title[1].array.forEach(title => title.update());
    }

    render () {
        this.title[0].array.forEach(title => title.render());
        this.actor.array.forEach(actor => actor.render());
        this.title[1].array.forEach(title => title.render());
    }
}

module.export = Scene;