// Application routes - shared by client and server
import riot from 'riot';
import miscUtil from './util/misc'

import Dispatcher from './util/dispatcher';

class Routes {
    constructor() {
        console.log("Routes class constructed!");
        // Load Page.js on the client side
        if (miscUtil.isBrowser()) {
            this.page = require('page');
            console.log("Initalizing browser dispatcher");
            // On the browser - we generate one global dispatcher and stores instance
            this.browserDispather = new Dispatcher();
        } 
    }

    waitBeforeRendering(req, list) {
        req.waitBeforeRendering = list;
        if (this.context) {
            this.context.waitBeforeRendering = list;
        }
    }

    getDispatcher(req) {
        if (this.browserDispather) {
            // Browser dispatcher (per browsin session)
            return this.browserDispather;
        } else {
            // Server dispatcher (per request)
            req.dispatcher = new Dispatcher();
            return req.dispatcher;
        }
    }

    go(next, req) {
        if (next) {
            req.handledRoute = true;
            next();
        }
    }


    runRoutingTable(app, context) {
        this.context = context;

        console.log("running routingTable!");

        //============Routing Table============//
        //                                     //
        app.route('/').get((req, res, next) => {
            console.log("Default route!")
            let dispatcher = this.getDispatcher(req);
            dispatcher.trigger("fruit_swap", null);

            this.go(next, req);
        });

        app.route('/apple').get((req, res, next) => {
            this.waitBeforeRendering(req, ["fruit_data_updated"]);

            let dispatcher = this.getDispatcher(req);
            dispatcher.trigger("fruit_swap", "apple");

            this.go(next, req);

        });

        app.route('/banana').get((req, res, next) => {
            this.waitBeforeRendering(req, ["fruit_data_updated"]);

            console.log("Triggering banana fruit_swap")
            let dispatcher = this.getDispatcher(req);
            dispatcher.trigger("fruit_swap", "banana");

            this.go(next, req);
        });

        app.route('/login').get((req, res, next) => {
            let dispatcher = this.getDispatcher(req);
            dispatcher.trigger("login_pressed");

            this.go(next, req);
        });

        app.route('*').get((req, res, next) => {
            if (!req.handledRoute) {
                res.status(404).send('Nothing to see here!');
            } else {
                this.go(next, req);
            }
        })
    }
};

// Singleton
let instance = new Routes();
export default instance;


