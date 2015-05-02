import riot from 'riot';
import componentFactory from '../component-factory';

import accountStatus from './account-status';
import mall from './mall';
import login from './login';

componentFactory.createComponent('main', `

<account-status></account-status>
<mall if={stores.main.state=='mall'}></mall>
<login if={stores.main.state=='login'}></login>

<style>
    main {
        display: block;
        background-color: pink;
    }
</style>
 
 `,
 function(opts) {
    this.on('mount', () => {
        console.log("Main mounted");
    });

    this.dispatcher.on('main_state_updated', () => {
        this.update();
    });
});
