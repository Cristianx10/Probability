import ManagerConteo from './ManagerConteo';

export interface typeProps {
    "nombre"?: string;
    "contiene": string
}

export interface typePropsValue {
    value?: string;
    valueSpecific?: { singular?: string, plural?: string }
}

type Optional<typePropsValue> = { [K in keyof typePropsValue]?: typePropsValue[K] };

class MConteo_Caso {

    mConteo?: ManagerConteo;
    favorable: boolean = false;
    private props: any;

    constructor() {
        this.props = {};
    }



    addProp<K extends keyof typeProps, M>(id: K, value: typePropsValue) {
        var i = id as any;
        this.props[i] = value;
    }

    getProp<K extends keyof typeProps>(id: K) {
        return this.props[id];
    }

    setContador(mConteo: ManagerConteo) {
        this.mConteo = mConteo;
    }

}

export default MConteo_Caso;