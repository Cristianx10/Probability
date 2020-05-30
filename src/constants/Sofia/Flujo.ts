class Flujo {

    private props: any;

    constructor() {
        this.props = {};
    }

    get(id: string) {
        return this.props[id];
    }

    addProp(id: string, value: Object) {
        this.props[id] = value;
    }

    setProps(props: any) {
        this.props = props;
    }


}

export default Flujo;