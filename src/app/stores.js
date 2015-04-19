import fruitStore from './stores/fruit';
import serverStore from './stores/server';
import authStore from './stores/auth';
import mainStore from './stores/main';

const stores = {
    fruit: fruitStore,
    server: serverStore,
    auth: authStore,
    main: mainStore
};

export default stores;
