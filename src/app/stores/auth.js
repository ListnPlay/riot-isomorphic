'use strict'
import riot from 'riot';
import RiotControl from 'riotcontrol';

function AuthStore() {
    console.log("Init AuthStore");
    riot.observable(this);

    this.user = null;

    this.on("user_login", async function (loginData) { 
        try {
            console.log("User login: ", loginData);
        }
        catch (e) {
            console.log("Error logging in", e);                    
        }
    });
};


let instance = new AuthStore();
RiotControl.addStore(instance);
export default instance;
