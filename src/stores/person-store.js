'use strict'
import riot from 'riot';
import RiotControl from 'riotcontrol';

function PersonStore() {
    console.log("Init PersonStore");

    riot.observable(this);
    this.currentPerson = null;

    this.on("person_swap", (person) => {
        console.log("Person swap!", person)
        this.currentPerson = person;
    });
};


let instance = new PersonStore();
RiotControl.addStore(instance);
export default instance;
