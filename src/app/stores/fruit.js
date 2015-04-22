'use strict'
import riot from 'riot';
import RiotControl from 'riotcontrol';
import fetch from 'isomorphic-fetch';

import socketUtil from '../util/socket'

function FruitStore() {
    console.log("Init FruitStore");

    riot.observable(this);
    this.currentFruit = null;

    this.on("fruit_swap", async function (fruit) { 
        try {
            this.currentFruit = fruit;
            this.fruitData = null;

            if (fruit) {
                // Get fruit types
                console.log("Getting info for ", fruit);
                /* let response = await fetch('http://localhost:3000/fruit/' + fruit);
                   this.fruitData = await response.json();*/
                this.fruitData = await socketUtil.rpc('fruit::get', fruit);
                console.log("Fruit data: ",this.fruitData);
                RiotControl.trigger("fruit_data_updated");
            }
        }
        catch (e) {
            console.log("Error getting fruit data ", e);                    
        }
    });

    this.on("taste_fruit", async function(type) {
        try {
            let result = await socketUtil.rpc('taste::get', type);
            RiotControl.trigger('taste_result', {'type': type, 'result': result.result});
        }
        catch (error) {
            console.log("Taste fruit error ", error);
            RiotControl.trigger('taste_error', {message: error});
        }
    });
};


let instance = new FruitStore();
RiotControl.addStore(instance);
export default instance;
