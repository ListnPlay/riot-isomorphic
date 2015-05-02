import riot from 'riot';

export default class Store {
    constructor() {
        console.log("Store base class constructor");
        this.control = {};
        riot.observable(this.control);
    }
    on() {
        let args = [].slice.call(arguments);
        this.control.on.apply(this, args);
    }

    one() {
        let args = [].slice.call(arguments);
        this.control.one.apply(this, args);
    }

    off() {
        let args = [].slice.call(arguments);
        this.control.off.apply(this, args);
    }

    trigger() {
        let args = [].slice.call(arguments);
        this.control.trigger.apply(this, args);
    }
}
