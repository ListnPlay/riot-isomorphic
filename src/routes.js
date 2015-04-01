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
            RiotControl.trigger("person_swap", null);
        });

        app.route('/avner').get((req, res) => {
            console.log("Triggering avner person_swap")
            RiotControl.trigger("person_swap", "avner");
        });

        app.route('/amit').get((req, res) => {
            console.log("Triggering amit person_swap")
            RiotControl.trigger("person_swap", "amit");
        });
    }
};

// Singleton
let instance = new Routes();
export default instance;


