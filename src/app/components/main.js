import riot from 'riot';

import accountStatus from './account-status';
import mall from './mall';
import login from './login';

riot.tag('main', `

<account-status store={opts.stores.auth}></account-status>
<mall if={opts.stores.main.state=='mall'} store={opts.stores.fruit}></mall>
<login if={opts.stores.main.state=='login'} store={opts.stores.auth}></login>

<style>
    main {
        display: block;
        background-color: pink;
    }
</style>
 
 `,
 function(opts) {
    let store = opts.stores.main;

    this.on('mount', () => {
        console.log("Main mounted");
    });

    store.on('main_state', () => {
        this.update();
    });

    this.on('premount', () => {
        // For isomorphic rendering
        if (typeof window != "undefined") {
            var serverNode = document.querySelector("main");
               while (serverNode.hasChildNodes()) {
                serverNode.removeChild(serverNode.lastChild);
            }
        }
    });
});
