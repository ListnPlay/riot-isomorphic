// Fetch Util
import fetch from 'isomorphic-fetch';

class FetchUtil {
    constructor() {
    }

    postJSON(target, data) {
        return fetch(target, {
            method: 'POST', 
            body: JSON.stringify(data),
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
            }
        });
    }
};

// Singleton
let instance = new FetchUtil();
export default instance;


