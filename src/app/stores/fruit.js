'use strict'
import riot from 'riot';
import fetch from 'isomorphic-fetch';
import socketUtil from '../util/socket'

import Store from './store';

export default class FruitStore extends Store {

    constructor(dispatcher) {
        super(dispatcher);
        console.log("Init FruitStore");

        this.state="mall";
        this.currentFruit = null;

        this.observer.on("fruit_swap", async (fruit) => { 
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
                    dispatcher.trigger("fruit_data_updated");
                }
            }
            catch (e) {
                console.log("Error getting fruit data ", e);                    
            }
        });

        this.observer.on("taste_fruit", async (type) => {
            try {
                let result = await socketUtil.rpc('taste::get', type);
                this.dispatcher.trigger('taste_result', {'type': type, 'result': result.result});
            }
            catch (error) {
                console.log("Taste fruit error ", error);
                this.dispatcher.trigger('taste_error', {message: error});
            }
        });
    }     
};
