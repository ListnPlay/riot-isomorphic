'use strict'
import riot from 'riot';
import RiotControl from 'riotcontrol';

function FruitStore() {
    console.log("Init FruitStore");

    riot.observable(this);
    this.currentFruit = null;

    this.on("fruit_swap", (fruit) => {
        this.currentFruit = fruit;
    });
};


let instance = new FruitStore();
RiotControl.addStore(instance);
export default instance;
