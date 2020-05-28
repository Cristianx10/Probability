import L_Item from './L_Item';

class L_Cuadrado extends L_Item {

    fAccion?: (p: any) => void;
    fToDo?: () => void;
    toFinish?: () => void;

    constructor(id: string, fAccion: (p: any) => void, toDo?: () => void, toFinish?: () => void) {
        super(id);
        this.fAccion = fAccion;
        this.fToDo = toDo;
        this.toFinish = toFinish;
    }

    createMount(){
        if (this.fToDo) {
            this.fToDo();
        }
    }

    didMount() {
        if (this.toFinish) {
            this.toFinish();
        }
    }

    setAccion(fAccion: () => boolean) {
        this.fAccion = fAccion;
    }

    ejecutar(props: any) {
        if (this.fAccion) {
            this.fAccion(props);
        }
        return "#$all";
    }

    getAccion() {
        return this.fAccion;
    }


}

export default L_Cuadrado;