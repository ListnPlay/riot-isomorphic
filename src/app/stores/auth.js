'use strict'
import riot from 'riot';
import RiotControl from 'riotcontrol';
import fetchUtil from '../util/fetch';

function AuthStore() {
    console.log("Init AuthStore");
    riot.observable(this);

    this.user = null;

    this.on("user_login", async function (loginData) { 
        try {
            console.log("User login: ", loginData);
            let post = await fetchUtil.postJSON("http://localhost:3000/login", loginData);
            let response = await post.json();
            console.log("Login reply: ", response);
            if (response.status == "error") {
                RiotControl.trigger("login_error", response.message);
            } else if (response.status == "success") {
                this.user = response.data.user;
                RiotControl.trigger("login_success", response.data.user);
            }
        }
        catch (e) {
            console.log("Error logging in", e);                    
        }
    });
};


let instance = new AuthStore();
RiotControl.addStore(instance);
export default instance;
