import riot from 'riot';

riot.tag('account-status', `

 <p>Account status:
     <span if="{opts.store.user == null}">
         <a href="/login">Please Login</a>
     </span>
 </p>
 <style>
     account-status p {
         color:red;
         font-size:20px;
     }
     account-status a {
         font-size:16px;
     }
 </style>
 `,
 function(opts) {
    let store = opts.store;
});


