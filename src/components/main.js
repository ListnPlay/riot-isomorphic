import riot from 'riot';
import from './apple';
import from './banana';

riot.tag('main', `

 <h1>Welcome to the fruit shopping mall</h1>
 <a href="/banana">Visit banana store</a>
 <a href="/apple">Visit apple store</a>
 <apple if={opts.fruitStore.currentFruit=='apple'} store={opts.fruitStore}></apple>
 <banana if={opts.fruitStore.currentFruit=='banana'} store={opts.fruitStore}></banana>
 <style>
     main {
         display: block;
         background-color: pink;
     }
 </style>
 `,
 function(opts) {
    let store = opts.fruitStore;
    store.on('fruit_swap', (fruit) => {
        console.log("Main - fruit swap!! " + fruit);
        this.update();
    });
    this.on('mount', () => {
        console.log("Main mounted");
        //         this.routes.start();
    });

    this.on('premount', () => {
        // For isomorphic rendering
        if (typeof window != "undefined") {
            var serverNode = document.querySelector("main");
            while (serverNode.hasChildNodes()) {
                serverNode.removeChild(serverNode.lastChild);
            }
        }
    });
});
