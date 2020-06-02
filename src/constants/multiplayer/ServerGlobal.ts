import prop from './prop';

class ServerGlobal {

    UID = "";
    config: any;

    constructor() {
        this.config = {};
    }

    update() {

    }

    setUID(UID: string) {
        this.UID = UID;
    }

    state<T>(id: string) {
        var state = this.config[id] as prop<T>;
        return [state.get, state.set];
    }

    setProp<T>(id: string, value: T) {
        this.config[id] = new prop<T>(value)
        return this.config[id];
    }

    getProp<T>(id: string) {
        return this.config[id] as prop<T>;
    }

}

export default ServerGlobal;

