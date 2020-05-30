import prop from './prop';

class ServerGlobal {

    config: any;

    constructor() {
        this.config = {};
    }

    state<T>(value: T) {
        return new prop<T>(value);
    }

    setProp(id: string, value: Object) {
        return this.config[id];
    }
    getProp(id: string) {
        return this.config[id];
    }

}

export default ServerGlobal;

