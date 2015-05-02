// Fetch Util
import fetch from 'isomorphic-fetch';

class MiscUtil {
    constructor() {
    }

    isBrowser() {
        return (typeof window != 'undefined');
    }
    nextTick(callback) {
        setTimeout(callback
        , 0);
    }
    generateUUID(){
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    }
};

// Singleton
let instance = new MiscUtil();
export default instance;

