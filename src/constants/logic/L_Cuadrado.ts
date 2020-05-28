import L_Item from './L_Item';
import { INotify } from './L_Item';

class L_Cuadrado extends L_Item {

    fAccion?: (p: any) => void;

    constructor(id: string, fAccion: (p: any) => void) {
        super(id); 
        this.fAccion = fAccion;
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