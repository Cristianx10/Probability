class Objetivo {

    id: string;
    mensaje: string;
    level: number;

    constructor(id: string, mensaje: string, level: number) {
        this.id = id;
        this.mensaje = mensaje;
        this.level = level;
    }

}

export interface IObjetivos {
    getObjetivos: (() => Objetivo[]);
}

export default Objetivo;