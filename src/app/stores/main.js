'use strict'
import riot from 'riot';

import Store from './store';

export default class MainStore extends Store {
    constructor(dispatcher) {
        super(dispatcher);
        console.log("Init MainStore");
        this.state="mall";

        this.observer.on("main_state", (state) => {
            this.state = state;
        });

        this.observer.on("fruit_swap", async (fruit) => { 
            this.dispatcher.trigger("main_state", "mall");
        });
    }     

};

