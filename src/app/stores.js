import FruitStore from './stores/fruit';
import ServerStore from './stores/server';
import AuthStore from './stores/auth';
import MainStore from './stores/main';

export default class Stores {
    constructor(dispatcher) {
        this.fruit = new FruitStore(dispatcher);
        this.server = new ServerStore(dispatcher);
        this.auth = new AuthStore(dispatcher);
        this.main = new MainStore(dispatcher);
    }
};
