import L_Hilo from './L_Hilo';


export interface INotify {
    notify: (id: string) => void;
    exe: () => void;
}

class L_Item implements INotify {

    id: string;
    orden = 0;

    observers: any = {};
    type = 0;
    props = {
        disable: false
    };

    hilo?: L_Hilo;

    constructor(id: string) {
        this.id = id;

    }

    setOrden(orden: number) {
        this.orden = orden;
    }

    initHilo() {
        this.hilo = new L_Hilo();
    }

    createHilo() {
        return new L_Hilo();
    }

    destroyHilo() {
        this.hilo = undefined;
    }

    getHilo() {
        var hilo = this.hilo;
        this.hilo = undefined;
        return hilo;
    }

    conect(...observer: L_Item[]) {

        observer.forEach(f => {
            if (this.observers[f.id] == null) {
                this.observers[f.id] = [];
            }
            this.observers[f.id].push(f);
        })
    }

    setId(id: string) {
        this.id = id;
    }

    ejecutar(props: any) {
        return "";
    }

    exe() {
        if (this.hilo) {
            var id = this.ejecutar(this);
            this.notify(id);
        }
    }

    setProps(props: any) {
        this.props = Object.assign(this.props, props);
    }


    notify(id: string) {
        var arrayNotyfy: L_Item[] = [];
        var array = Object.values(this.observers) as L_Item[][];

        if (id === "#$all") {
            array.forEach((ar) => {
                ar.forEach((observer) => {
                    this.destroyHilo();
                    observer.initHilo()
                    if (observer.type == 0) {
                        observer.exe();
                    }
                })
            });
        } else if (this.observers[id] != null) {
            arrayNotyfy = this.observers[id] as L_Item[];
            arrayNotyfy.forEach((observer) => {
                this.destroyHilo();
                observer.initHilo()
                if (observer.type == 0) {
                    observer.exe();
                }
            })
        }

    }
}

export default L_Item;
