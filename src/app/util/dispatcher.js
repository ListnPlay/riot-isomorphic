import Stores from '../stores'

export default class Dispatcher {
    constructor() {
        this.stores = new Stores();
        this._stores = [];
        Object.keys(this.stores).forEach((key) => {
            this._stores.push(this.stores[key]);
        });
        console.log("Dispatcher initialized. ", this._stores.length, " stores");
    }

    on() {
        let args = [].slice.call(arguments);
        this._stores.forEach(function(el) {
            el.control.on.apply(null, args);
        });
    }

    one() {
        let args = [].slice.call(arguments);
        this._stores.forEach(function(el) {
            el.control.one.apply(null, args);
        });
    }

    off() {
        let args = [].slice.call(arguments);
        this._stores.forEach(function(el) {
            el.control.off.apply(null, args);
        });
    }

    trigger() {
        let args = [].slice.call(arguments);
        this._stores.forEach(function(el) {
            el.control.trigger.apply(null, args);
        });
    }
};
