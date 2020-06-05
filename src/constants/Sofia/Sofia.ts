import { Modulo } from './Modulo';
class Sofia {

    id: string;
    modulos: any;
    logicas: any;

    constructor(id: string) {
        this.id = id;
        this.logicas = {};
        this.modulos = {};
    }

    conect(...observer: Sofia[]) {

        observer.forEach(f => {
            if (this.logicas[f.id] == null) {
                this.logicas[f.id] = [];
            }
            this.logicas[f.id].push(f);
        });

    }

    getLogicas(id: string): Sofia[] {
        var respuesta: Sofia[] = [];
        if (this.logicas[id]) {
            respuesta = this.logicas[id]
        }
        return respuesta;
    }

    getModules(id: string): Modulo[] {
        var respuesta: Modulo[] = [];
        if (this.modulos[id]) {
            respuesta = this.modulos[id]
        }
        return respuesta;
    }


    create(type: "activador" | "proceso" | "entrada" | "salida" | "coneccion" | "desicion", id: string) {

        var modulo = new Modulo(this, id);
        modulo.setType(type);

        if (this.modulos[id] == null) {
            this.modulos[id] = [];
        }

        this.modulos[id].push(modulo);



        return modulo;

    }

}


export default Sofia;