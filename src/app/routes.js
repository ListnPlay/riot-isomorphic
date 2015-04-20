// Application routes - shared by client and server
import RiotControl from 'riotcontrol';
import riot from 'riot';

class Routes {
    constructor() {
        console.log("Routes class constructed!");
        // Load Page.js on the client side
        if (typeof window != 'undefined') {
            this.page = require('page');
        }
    }

    waitBeforeRendering(req, list) {
        req.waitBeforeRendering = list;
        if (this.context) {
            this.context.waitBeforeRendering = list;
        }
    }

    go(next) {
        if (next) {
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
            RiotControl.trigger("fruit_swap", null);

            this.go(next);
        });

        app.route('/apple').get((req, res, next) => {

            this.waitBeforeRendering(req, ["fruit_data_updated"]);
            RiotControl.trigger("fruit_swap", "apple");

            this.go(next);

        });

        app.route('/banana').get((req, res, next) => {
            this.waitBeforeRendering(req, ["fruit_data_updated"]);
            console.log("Triggering banana fruit_swap")
            RiotControl.trigger("fruit_swap", "banana");

            this.go(next);
        });

        app.route('/login').get((req, res, next) => {
            RiotControl.trigger("main_state", "login");

            this.go(next);
        })
    }
};

// Singleton
let instance = new Routes();
export default instance;


