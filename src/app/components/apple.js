'use strict'
import riot from 'riot';

riot.tag('apple', `

 <h1>We sell apples:</h1>
 <ul>
     <li each="{ name, i in opts.store.fruitData.types  }">
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
     store.on("fruit_data_updated", () => {
         console.log("Fruit data updated!");
         this.update();
     });
});

