import FruitStore from './stores/fruit';
import ServerStore from './stores/server';
import AuthStore from './stores/auth';
import MainStore from './stores/main';

export default class Stores {
    constructor() {
        this.fruit = new FruitStore();
        this.server = new ServerStore();
        this.auth = new AuthStore();
        this.main = new MainStore();
    }
};
