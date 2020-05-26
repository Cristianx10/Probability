import Asistente from '../Asistente/Asistente';
import { mente } from '../../../components/App/App';

import Decision from './Decision';

export interface IStructureDecision {
    id: string;
    propsGlobal?: any;
    props?: any;
    format?: any;
    procesar?: any;
    razon?: any;
    tareas?: IStructureTask[];
    condiciones?: any;
    acciones?: any;
}

export interface IStructureRazon {
    id: string;
    tareas: any;
    props: any;
    condiciones: { id: string, condicion: string }[];
    acciones: { id: string, accion: string }[];
    getProp: (id: string) => any;
}

export interface IStructureTask {
    id: string;
    respuesta: string;
    acciones: string[];
    condiciones: string[]
}

class DecisionManager {

    decisiones: Decision[];
    asistente?: Asistente;
    conocimiento: IStructureDecision[];

    acciones: IStructureRazon[];


    constructor(asistente?: Asistente) {
        this.decisiones = [];
        this.acciones = [];
        this.conocimiento = [];
        if (asistente) {
            this.asistente = asistente;
        }
    }

    procesar() {

        for (let i = 0; i < this.conocimiento.length; i++) {
            let c = this.conocimiento[i];

            var accion: IStructureRazon = {
                id: c.id,
                props: {},
                tareas: {},
                condiciones: [],
                acciones: [],
                getProp: (id: string) => {
                    return eval("accion.props." + id);
                }
            };


            if (c.props) {
                var propsArray = Object.entries(c.props);
                propsArray.forEach((prop) => {
                    var ac = prop[1] + "";
                    eval("accion.props." + prop[0] + "=" + ac);
                });
            }


            if (c.condiciones) {
                var condiArray = Object.entries(c.props);
                condiArray.forEach((c: any) => {
                    accion.condiciones.push({ id: c[0], condicion: c[1] });
                });
            }

            if (c.acciones) {
                var accionArray = Object.entries(c.acciones);
                accionArray.forEach((c: any) => {
                    accion.acciones.push({ id: c[0], accion: c[1] });
                });
            }


            if (c.tareas) {
                
                for (let j = 0; j < c.tareas.length; j++) {
                    var d = c.tareas[j]

                    let miId = d.id.trim()
                    var res: IStructureTask = {
                        id: miId,
                        respuesta: d.respuesta,
                        condiciones: [],
                        acciones: []
                    };

                    if (accion.tareas[d.id] == null) {
                        accion.tareas[d.id] = [];
                    }
                    
                    accion.tareas[d.id].push(res);
                    
                }
            }

       
            this.acciones.push(accion);

            console.log("MIS TAREAS", accion)
        }
    
       
    }

    ejecutarAccion(id: string, toDo: Function) {
        for (let i = 0; i < this.acciones.length; i++) {
            let accion = this.acciones[i];

        
            if (accion.id == id) {

                var { getProp, props } = accion;
                var propsG = mente.props;

                var tareas = Object.values(accion.tareas) as IStructureTask[][];

            

                tareas.forEach((tarea) => {

                    tarea.forEach((t, index: number) => {

                        console.log("MI TAREA", t)

                        var id = t.id;

                        var respuesta = eval(this.toJS(t.respuesta));

                        var condicionFinal = true;

                        var actionFinal = () => { };

                        for (let k = 0; k < t.condiciones.length; k++) {
                            let condicion = t.condiciones[k];
                            for (let m = 0; m < accion.condiciones.length; m++) {
                                let condicionLocal = accion.condiciones[m];

                                if (condicion == condicionLocal.id) {
                                  
                                    condicionFinal = eval(condicionLocal.condicion);
                                    m = accion.condiciones.length;
                                }
                            }
                        }

                        for (let k = 0; k < t.acciones.length; k++) {
                            let action = t.acciones[k];

                            for (let m = 0; m < accion.acciones.length; m++) {
                                let actionLocal = accion.acciones[m];


                                if (action == actionLocal.id) {

                                    actionFinal = eval(`()=>{${actionLocal.accion}}`);
                                    m = accion.acciones.length;
                                }

                            }
                        }

                        console.log("MIS ACCIOENS", accion.acciones)

                        if (condicionFinal) {
                            toDo(id, respuesta, actionFinal);
                        }


                    });

                });
            }
        }
    }

    getProp() {

    }

    toDialogo(accion: IStructureRazon, instruccion: string) {

        var getPropG = (id: string) => {
            return mente.getProp(id);
        }

        var r = eval(this.toJS(instruccion));

        return r;

    }

    addConocimiento(data: IStructureDecision[]) {
        this.conocimiento = data;
        this.procesar();
        console.log("Conocimiento cargado")
    }


    setAsistente(asistente: Asistente) {
        this.asistente = asistente;
    }

    addDecision(id: string, accion?: Function) {
        var d = new Decision(id, accion);
        this.decisiones.push(d);
    }

    toJS(value: string) {
        return "`" + value + "`";
    }
}

export default DecisionManager;