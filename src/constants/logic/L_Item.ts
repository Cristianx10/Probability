import { type } from '../../redux/user/actions/updateUser';

import L_Hilo from './L_Hilo';

class L_Item {

    id: string;
    orden = 0;

    observers: any = {};
    type = 0;
    props: any = {
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
        console.log("murio", this.id)
        this.hilo = undefined;
    }

    transferHilo(hilo?: L_Hilo) {
        if (hilo) {
            this.hilo = hilo;
        }
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

    createMount() { }

    didMount() { }


    exe() {
        console.log(this.id, "   INTENTA EJECUTAR A  ", this.hilo)
        if (this.hilo) {
            var id = this.ejecutar(this);
            this.notify(id);
        }
    }

    exeMachine() {
        this.createMount();
        if (this.hilo) {
            var id = this.ejecutar(this);
            if (this.type == 0) {
                this.notify(id);
            }
        }
        this.didMount();
    }

    exeAll(executable?: boolean) {
        var init = executable != null ? executable : false;
        var id = this.ejecutar(this);
        console.log("Estoy notificando a los >> ", id)
        this.notifyAll(id, init);
        //  this.didMount();
    }

    setProps(props: any) {
        this.props = Object.assign(this.props, props);
    }


    notify(id: string) {

        if (id === "#$all") {
            var array = Object.values(this.observers) as L_Item[][]
            array.forEach((ar) => {
                ar.forEach((observer) => {
                    observer.transferHilo(this.hilo)
                    this.destroyHilo();
                    observer.exeMachine();
                })
            });
        } else if (this.observers[id] != null) {
            var arrayNotyfy = this.observers[id] as L_Item[];
            arrayNotyfy.forEach((observer) => {
                observer.transferHilo(this.hilo)
                this.destroyHilo();
                observer.exeMachine();
            })
        }

    }

    notifyAll(id: string, init: boolean) {
        var arrayNotyfy: L_Item[] = [];

        if (this.observers[id] != null) {
            arrayNotyfy = this.observers[id] as L_Item[];
            arrayNotyfy.forEach((observer) => {
                observer.initHilo();
                if (observer.type == 0 || init) {
                    observer.exe();
                }

            })
        }
    }


}

export default L_Item;
