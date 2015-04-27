import riot from 'riot';

export default class Store {
    constructor(dispatcher) {
        console.log("Store base class constructor");
        this.dispatcher = dispatcher;
        this.observer = {};
        riot.observable(this.observer);
    }
}
