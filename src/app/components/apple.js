'use strict'
import riot from 'riot';
import RiotControl from 'riotcontrol';

riot.tag('apple', `

 <h1>We sell apples:</h1>
 <ul>
     <li each="{ name, i in data.types  }">
         <div>{name}</div>
     </li>
 </ul>
 <div show='{ data.types.length > 0 }'>
     <button onclick={try} type="button">Try one</button> 
 </div>
 <div show='{ tasteResult }'>
     <p> Tried a {tasteResult.type} and it was {tasteResult.result} </p>
 </div>
 <div show='{ tasteError }'>
    <p>{tasteError}</p>
 </div>
 
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
        this.tasteError = null;
        this.tasteResult = null;
        this.update();
    });

    this.try = () => {
        let typeToTry = this.data.types[Math.floor((Math.random() * this.data.types.length))]; 
        console.log("Trying ", typeToTry);
        RiotControl.trigger("taste_fruit", typeToTry);
    }

    store.on('taste_result', (data) => {
      console.log("Taste result!", data);  
      this.tasteResult = data;
      this.update();
    });

    store.on('taste_error', (error) => {
      console.log("Taste error!", error.message);  
      this.tasteError = error.message;
      this.update();
    });
});

