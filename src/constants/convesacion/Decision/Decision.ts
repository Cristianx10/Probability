class Decision {

    id: string;
    faccion?: Function;

    constructor(id: string, faccion?: Function) {
        this.id = id;
        this.faccion = faccion;
    }

    comentar(){
        
    }

    accion() {
        if (this.faccion) {
            this.faccion()
        }
    }



}

export default Decision; 