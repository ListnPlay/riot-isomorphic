'use strict'
import riot from 'riot';
import RiotControl from 'riotcontrol';

function ServerStore() {
    console.log("Init ServerStore");

    riot.observable(this);
};


let instance = new ServerStore();
RiotControl.addStore(instance);
export default instance;
