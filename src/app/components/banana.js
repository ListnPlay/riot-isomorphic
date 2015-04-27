import riot from 'riot';

riot.tag('banana', `

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
    let store = opts.store;
    this.data = store.fruitData;

    store.observer.on("fruit_data_updated", () => {
         this.data = store.fruitData;
         this.update();
    });
    store.observer.on("fruit_swap", () => {
        this.data = {types: []};
        this.update();
    });
});


