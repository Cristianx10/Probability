import { mente } from '../../../components/App/App';
class Mente {

    props: any;

    constructor() {
        this.props = {};
    }

    addProp(id: string, value: any, index?: number) {
        if (this.props[id] == null) {
            this.props[id] = [];
        }
        
        if (index != null) {
            this.props[id][index] = value;
            console.log("Modificado", this.props[id])
        } else {
            this.props[id].push(value);
            console.log("A;adido", this.props[id])
        }
     
    }

    getProp(id: string) {
        return this.props[id];
    }
}

export default Mente;