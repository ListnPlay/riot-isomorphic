// Application routes - shared by client and server
import RiotControl from 'riotcontrol';
import riot from 'riot';

class Routes {
    constructor() {
        console.log("Routes class constructed!");
    }

    
    waitBeforeRendering(req, list) {
        req.waitBeforeRendering = list;
        if (this.context) {
            this.context.waitBeforeRendering = list;
        }
    }


    runRoutingTable(app, context) {
        this.context = context;

        console.log("running routingTable!");

        //============Routing Table============//
        //                                     //
        app.route('/').get((req, res) => {
            console.log("Default route!")
            RiotControl.trigger("fruit_swap", null);
        });

        app.route('/apple').get((req, res) => {

            this.waitBeforeRendering(req, ["fruit_data_updated"]);

            RiotControl.trigger("fruit_swap", "apple");
        });

        app.route('/banana').get((req, res) => {
            this.waitBeforeRendering(req, ["fruit_data_updated"]);
            console.log("Triggering banana fruit_swap")
            RiotControl.trigger("fruit_swap", "banana");
        });
    }
};

// Singleton
let instance = new Routes();
export default instance;


