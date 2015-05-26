import riot from 'riot';
import componentFactory from '../component-factory';

componentFactory.createComponent('test', `

 <p>{opts.message}</p>
 <p>{JSON.stringify(opts)}</p>
 <style>
     test h1 {
         color: black;
     }
     test p {
         color: black;
     }
 </style>
 `,
 function(opts) {
     console.log("Init test tag with opts ", opts);
     this.on('mount', () => {
        console.log("Test tag mounted with opts", opts);
     });
});



