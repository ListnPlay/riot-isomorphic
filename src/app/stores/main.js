'use strict'
import riot from 'riot';
import RiotControl from 'riotcontrol';

function MainStore() {
    console.log("Init MainStore");

    riot.observable(this);

    this.state="mall";

    this.on("main_state", function(state) {
        this.state = state;
    });

    this.on("fruit_swap", async function (fruit) { 
        RiotControl.trigger("main_state", "mall");
    });
};


let instance = new MainStore();
RiotControl.addStore(instance);
export default instance;
