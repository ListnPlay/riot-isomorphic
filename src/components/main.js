import riot from 'riot';
import from './avner';
import from './amit';

console.log("RIOT MAIN TAG");
riot.tag('main', `

 <h1>Hello World</h1>
 <a href="/amit">Call Amit</a>
 <a href="/avner">Call Avner</a>
 <avner if={opts.personStore.currentPerson=='avner'} store={opts.personStore}></avner>
 <amit if={opts.personStore.currentPerson=='amit'} store={opts.personStore}></amit>
 <style>
     main {
         display: block;
         background-color: red;
     }
 </style>
 `,
 function(opts) {
    let store = opts.personStore;
    store.on('person_swap', (person) => {
        console.log("Main person swap!! " + person);
        this.update();
    });
    this.on('mount', () => {
        console.log("Main mounted");
        //         this.routes.start();
    });

    this.on('premount', () => {
        // For isomorphic rendering
        console.log("PREMOUNT MAIN");
        if (typeof window != "undefined") {
            var serverNode = document.querySelector("main");
            console.log("Server tag", serverNode);
            while (serverNode.hasChildNodes()) {
                serverNode.removeChild(serverNode.lastChild);
            }
        }
    });
});
