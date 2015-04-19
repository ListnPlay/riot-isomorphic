import riot from 'riot';

import apple from './apple';
import banana from './banana';

riot.tag('mall', `
 <h1>Welcome to the fruit shopping mall</h1>
 <a href="/banana">Visit banana store</a>
 <a href="/apple">Visit apple store</a>
 <apple if={opts.store.currentFruit=='apple'} store={opts.store}></apple>
 <banana if={opts.store.currentFruit=='banana'} store={opts.store}></banana>
 <style>
     mall {
        a {
            display: flex;
        }
     }
 </style>
 `,
 function(opts) {
    let store = opts.store;
    store.on('fruit_swap', (fruit) => {
        console.log("Mall - fruit swap!! " + fruit);
        this.update();
    });
});
