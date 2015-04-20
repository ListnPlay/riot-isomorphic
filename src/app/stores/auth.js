'use strict'
import riot from 'riot';
import RiotControl from 'riotcontrol';
import fetch from 'isomorphic-fetch';

function AuthStore() {
    console.log("Init AuthStore");
    riot.observable(this);

    this.user = null;

    this.on("user_login", async function (loginData) { 
        try {
            console.log("User login: ", loginData);
            let post = await fetch(
                'http://localhost:3000/login', {
                    method: 'POST', 
                    body: JSON.stringify(loginData),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
            let response = await post.json();
            console.log("Login reply: ", response);
        }
        catch (e) {
            console.log("Error logging in", e);                    
        }
    });
};


let instance = new AuthStore();
RiotControl.addStore(instance);
export default instance;
