// Application routes - shared by client and server
import RiotControl from 'riotcontrol';
import riot from 'riot';

class Routes {
    constructor() {
        console.log("Routes class constructed!");
    }

    runRoutingTable(app) {
        console.log("running routingTable!");

        //============Routing Table============//
        //                                     //
        app.route('/').get((req, res) => {
            console.log("Handling route!")
            RiotControl.trigger("fruit_swap", null);
        });

        app.route('/apple').get((req, res) => {
            console.log("Triggering apple fruit_swap")
            RiotControl.trigger("fruit_swap", "apple");
        });

        app.route('/banana').get((req, res) => {
            console.log("Triggering banana fruit_swap")
            RiotControl.trigger("fruit_swap", "banana");
        });
    }
};

// Singleton
let instance = new Routes();
export default instance;


