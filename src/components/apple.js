'use strict'
import riot from 'riot';

riot.tag('apple', `

 <h1>We sell apples</h1>
 <a href="/banana">Visit banana store</a>
 <style>
     apple h1 {
         color: green;
     }
 </style>
 `,
 function(opts) {
     let store = opts.store;
});

