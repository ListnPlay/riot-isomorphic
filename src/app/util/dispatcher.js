import Stores from '../stores'

export default class Dispatcher {
    constructor() {
        this.stores = new Stores(this);
        this._stores = [];
        Object.keys(this.stores).forEach((key) => {
            this._stores.push(this.stores[key]);
        });
        console.log("Dispatcher initialized. ", this._stores.length, " stores");
    }

    on() {
        let args = [].slice.call(arguments);
        this._stores.forEach(function(el) {
            el.obvserver.on.apply(null, args);
        });
    }

    one() {
        let args = [].slice.call(arguments);
        this._stores.forEach(function(el) {
            el.observer.one.apply(null, args);
        });
    }

    off() {
        let args = [].slice.call(arguments);
        this._stores.forEach(function(el) {
            el.observer.off.apply(null, args);
        });
    }

    trigger() {
        let args = [].slice.call(arguments);
        this._stores.forEach(function(el) {
            el.observer.trigger.apply(null, args);
        });
    }
};
