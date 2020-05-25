import ManagerConteo from './ManagerConteo';

export interface typeProps {
    "nombre"?: string;
    "contiene"?: string
    "variacion"?: number
}


export interface typePropsResult {
    "string"?: string;
}

export interface typePropsValue {
    value?: string;
    valueSpecific?: { singular?: string, plural?: string }
}



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

    getProp<T, K extends keyof typeProps, P extends keyof typePropsResult>(id: K, type?: P): T | typePropsValue {
        var prop = this.props[id] as typePropsValue;
        var result = prop as any;

        if (type == "string" && prop) {
            if (prop.valueSpecific) {
                result = prop.valueSpecific.singular;
            } else {
                result = prop.value;
            }
        }
        return result;
    }

    combineProps(obj: typeProps) {
        this.props = Object.assign(this.props, obj);
    }

    setContador(mConteo: ManagerConteo) {
        this.mConteo = mConteo;
    }

}

export default MConteo_Caso;