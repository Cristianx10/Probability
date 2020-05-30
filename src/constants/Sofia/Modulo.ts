import { type } from '../../redux/user/actions/updateUser';

import Flujo from './Flujo';
import Sofia from './Sofia';


export class Observable {

    id: string;
    observers: any;

    initArray: Function[] = [];
    finalizarArray: Function[] = [];
    condicionArray: (() => string[] | string)[] = [];

    type: "activador" | "proceso" | "entrada" | "salida" | "coneccion" | "desicion" = "activador";

    flujo?: Flujo;

    constructor(id: string) {
        this.id = id;
        this.observers = [];
    }

    protected ejecutar() {
        if (this.type === "activador") {
            this.flujo = new Flujo();
            this.iniciarExe();
        }

        if (this.flujo) {
            this.condicionExe();
        }
    }

    conect(...observer: Observable[]) {

        observer.forEach(f => {
            if (this.observers[f.id] == null) {
                this.observers[f.id] = [];
            }
            this.observers[f.id].push(f);
        })

    }

    iniciar(acciones: Function) {
        this.initArray.push(acciones);
    }

    codicion(acciones: () => string | string[]) {
        this.condicionArray.push(acciones);
    }

    finalizar(acciones: () => void | void[]) {
        this.finalizarArray.push(acciones);
    }

    private notify(observer: Observable) {

        this.finalizarExe();

        console.log(this.id, " |||| ", this.flujo)


        if (observer.type == "entrada") {
            if (this.flujo) {
                observer.iniciarExe();
            }

        } else {
            observer.exeMachine();
        }


    }

    private notifyArray(ids: string[]) {

        var notificarA: Observable[] = [];

        ids.forEach((id) => {
            if (this.observers[id] != null) {
                var arrayNotyfy = this.observers[id] as Observable[];
                arrayNotyfy.forEach((observer) => {
                    if (this.flujo) {
                        observer.getFlujo(this.flujo)
                    }
                    notificarA.push(observer);

                })
            }
        });

        if(notificarA.length > 0){
            this.destroyFlujo();
        }
    
        notificarA.forEach((observer) => {
            this.notify(observer)
        });


    }

    private notifyAll() {
        var notificarA: Observable[] = [];
        var arrays = Object.values(this.observers) as Observable[][]
        arrays.forEach((array) => {
            array.forEach((observer) => {
                if (this.flujo) {
                    observer.getFlujo(this.flujo)
                }
                notificarA.push(observer);
            })
        });
        if(notificarA.length > 0){
            this.destroyFlujo();
        }
        

        notificarA.forEach((observer) => {
            this.notify(observer)
        });
    }



    private iniciarExe() {
        this.initArray.forEach((f) => {
            f();
        })
    }

    private finalizarExe() {
        this.finalizarArray.forEach((f) => {
            f();
        });

    }

    private condicionExe() {

        if (this.type === "activador") {
            this.notifyAll();
        }

        if (this.type === "proceso") {
            this.notifyAll();
        }

        if (this.type === "desicion") {

            this.condicionArray.forEach((f) => {
                var id = f();
                if (Array.isArray(id)) {
                    this.notifyArray(id)
                } else {
                    this.notifyArray([id]);
                }
            });

        }


        if (this.type === "entrada") {
            this.notifyAll();
        }
    }

    private exeMachine() {

        if (this.flujo) {
            this.iniciarExe();
            this.condicionExe();
        }
    }

    setType(type: "activador" | "proceso" | "entrada" | "salida" | "coneccion" | "desicion") {
        this.type = type;
    }

    private getFlujo(flujo: Flujo) {
        console.log("FLUJO A || ", this.id)
        this.flujo = flujo;
    }

    private destroyFlujo() {
        this.flujo = undefined;
        console.log("DESTRI A |||   ", this.id, this.flujo)
    }

}

export class Modulo extends Observable {

    logica: Sofia;
    props = new Flujo();


    constructor(logica: Sofia, id: string) {
        super(id);
        this.logica = logica
    }



    exe() {
        switch (this.type) {
            case "activador":
                this.ejecutar();
                break;
            case "proceso":
                this.ejecutar();
                break;
            case "entrada":
                this.ejecutar();
                break;
            case "salida":

                break;
            case "coneccion":

                break;
            case "desicion":
                console.log("SE EJECUTA ", this.id)
                this.ejecutar();
                break;
        }
    }

}