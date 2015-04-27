// Fetch Util
import fetch from 'isomorphic-fetch';

class MiscUtil {
    constructor() {
    }

    isBrowser() {
        return (typeof window != 'undefined');
    }
};

// Singleton
let instance = new MiscUtil();
export default instance;

