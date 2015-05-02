import riot from 'riot';
import componentFactory from '../component-factory';

componentFactory.createComponent('banana', `

 <h1>-=We sell bananas=- :</h1>
 <ul>
    <li each="{ name, i in data.types  }">
        <div>{name}</div>
    </li>
 </ul>
 <style>
     banana h1 {
         color: yellow;
     }
     banana li {
         color: #eeff00;
     }
 </style>
 `,
 function(opts) {
    this.data = this.stores.fruit.fruitData;

    this.dispatcher.on("fruit_data_updated", () => {
         this.data = this.stores.fruit.fruitData;
         this.update();
    });
    this.dispatcher.on("fruit_updated", () => {
        this.data = {types: []};
        this.update();
    });
});


