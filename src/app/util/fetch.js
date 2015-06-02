// Fetch Util
import fetch_ from 'isomorphic-fetch';

class FetchUtil {
    constructor() {
        this.fetch = fetch_.bind(undefined); // this solves an invocation error problem in chrome, according to https://github.com/matthew-andrews/isomorphic-fetch/pull/20
    }

    postJSON(target, data) {
        return this.fetch(target, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
            }
        });
    }

    getJSON(target) {
        return this.fetch(target, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        });
    }

};

// Singleton
let instance = new FetchUtil();
export default instance;
