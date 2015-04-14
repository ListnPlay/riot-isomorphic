import riot from 'riot';

riot.tag('banana', `

 <h1>-=We sell bananas=- :</h1>
 <ul>
    <li each="{ name, i in opts.store.fruitData.types  }">
        <div>{name}</div>
    </li>
 </ul>
 <a href="/apple">Visit apple store</a>
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
    store.on("fruit_data_updated", () => {
        this.update();
    });
});


