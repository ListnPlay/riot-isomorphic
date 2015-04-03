import riot from 'riot';

riot.tag('banana', `

 <h1>We sell bananas</h1>
 <a href="/apple">Visit apple store</a>
 <style>
     banana h1 {
         color: yellow;
     }
 </style>
 `,
 function(opts) {
    let store = opts.store;
});


