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
    this.data = {types: []};
    if (opts.store.fruitData) {
        this.data.types = opts.store.fruitData.types;
    }
    console.log("Apple Tag: ", this.data);
    store.on("fruit_data_updated", () => {
         this.data.types = store.fruitData.types;
         console.log("Apple Data update: ", this.data);
         this.update();
    });
    store.on("fruit_swap", () => {
        this.data.types = [];
        console.log("Apple fruit swap");
        this.update();
    });
});

