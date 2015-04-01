import riot from 'riot';

console.log("AMIT TAG");

riot.tag('amit', `

 <h1>And Amit is here</h1>
 <a href="/avner">Call Avner Back</a>
 <style>
     amit h1 {
         color: yellow;
     }
 </style>
 `,
 function(opts) {
    let store = opts.store;
    console.log("Amit tag with store: ", store);
    store.on('person_swap', (person) => {
        console.log("Amit is being swapped! with " + person);
        this.update();
    });
});


