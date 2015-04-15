import riot from 'riot';
import apple from './apple';
import banana from './banana';

riot.tag('main', `

 <h1>Welcome to the fruit shopping mall</h1>
 <a href="/banana">Visit banana store</a>
 <a href="/apple">Visit apple store</a>
 <apple if={opts.stores.fruit.currentFruit=='apple'} store={opts.stores.fruit}></apple>
 <banana if={opts.stores.fruit.currentFruit=='banana'} store={opts.stores.fruit}></banana>
 <style>
     main {
         display: block;
         background-color: pink;
     }
     a {
         display: flex;
     }
 </style>
 `,
 function(opts) {
    console.log("Main tag opts: ", opts);
    let store = opts.stores.fruit;
    store.on('fruit_swap', (fruit) => {
        console.log("Main - fruit swap!! " + fruit);
        this.update();
    });
    this.on('mount', () => {
        console.log("Main mounted");
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
