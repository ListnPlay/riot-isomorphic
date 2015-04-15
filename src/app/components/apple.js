'use strict'
import riot from 'riot';

riot.tag('apple', `

 <h1>We sell apples:</h1>
 <ul>
     <li each="{ name, i in data.types  }">
         <div>{name}</div>
     </li>
 </ul>
 <a href="/banana">Visit banana store</a>
 <style>
     apple h1 {
         color: green;
     }
     apple li {
         color: #aaffaa;
     }
 </style>
 `,
 function(opts) {
    let store = opts.store;
    this.data = store.fruitData;

    store.on("fruit_data_updated", () => {
         this.data = store.fruitData;
         this.update();
    });
    store.on("fruit_swap", () => {
        this.data = {types: []};
        this.update();
    });
});

