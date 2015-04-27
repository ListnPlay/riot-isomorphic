'use strict'
import riot from 'riot';
import Store from './store';

export default class ServerStore extends Store {
    constructor(dispatcher) {
        super(dispatcher);
        console.log("Init server store");
    }     
};
