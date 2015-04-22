// Socket Util
// Users primus.js

import PrimusNode from 'primus';
import PrimusEmitter from 'primus-emitter';

class SocketUtil {
    constructor() {

    }
    initWithUrl(url) {
        this.url = url;
        this.client = null;

        if (typeof window != 'undefined') {
            // Client init
            console.log("Socket util - Client init with URL: ", url);
            this.client = Primus.connect('http://localhost:3000');
        } else {
            // Server init
            console.log("Socket util - Server init with URL: ", url);
            let Socket = PrimusNode.createSocket({
                transformer: 'websockets',
                parser: 'json',
                plugin: {
                    'emitter' : PrimusEmitter
                }
            });
            this.client = new Socket(url);
        }
        this.client.on('open', () => {
            console.log("Socket connection is open");
        });
        this.client.on('error', (error) => {
            console.log('Error connecting to socket', error);
        });
    }

    reconnect() {
        console.log("Socket Util - Reconnecting socket");
        this.initWithUrl(this.url);
    }

    rpc(service, args) {
        return new Promise((resolve, reject) => {
            console.log("Socket util sending ",args," to ", service);
            this.client.send(service,args, function(error, result) {
                if (error) { 
                    reject(error)
                } else {
                    resolve(result);
                }
            });
        });
    }
};

// Singleton
let instance = new SocketUtil();
export default instance;


