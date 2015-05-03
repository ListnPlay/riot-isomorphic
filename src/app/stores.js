import FruitStore from './stores/fruit';
import AuthStore from './stores/auth';
import MainStore from './stores/main';

export default class Stores {
    constructor() {
        this.fruit = new FruitStore();
        this.auth = new AuthStore();
        this.main = new MainStore();
    }
};
