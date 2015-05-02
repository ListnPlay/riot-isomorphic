import riot from 'riot';

class ComponentFactory {
    constructor() {
        console.log("Component Factory constructed");
    }
    createComponent(tag, style, logic) {
        riot.tag(tag, style, function(opts) {
            // Get the dispatcher from the parent
            if (this.parent && this.parent.dispatcher) {
                this.dispatcher = this.parent.dispatcher;
            }
            else if (this.parent && this.parent.parent && this.parent.parent.dispatcher) {
                    this.dispatcher = this.parent.parent.dispatcher;
            }
            else {
                this.dispatcher = opts.dispatcher;
            }
            this.stores = this.dispatcher.stores;
            logic.apply(this,[opts]);
        });
    }
}

const instance = new ComponentFactory();
export default instance;
