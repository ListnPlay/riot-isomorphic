import riot from 'riot';
import componentFactory from '../component-factory';

import apple from './apple';
import banana from './banana';

componentFactory.createComponent('mall', `
 <h1>Welcome to the fruit shopping mall</h1>
 <a href="/banana">Visit banana store</a>
 <a href="/apple">Visit apple store</a>
 <apple if={stores.fruit.currentFruit=='apple'}></apple>
 <banana if={stores.fruit.currentFruit=='banana'}></banana>
 <style>
     mall {
        a {
            display: flex;
        }
     }
 </style>
 `,
 function(opts) {
    this.dispatcher.on('fruit_updated', (fruit) => {
        console.log("Mall - fruit updated!!");
        this.update();
    });
});
