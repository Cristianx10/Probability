import Asistente from '../Asistente/Asistente';

import Decision from './Decision';
import { mente } from '../../../components/App/App';

export interface IStructureDecision {
    id: string;
    propsGlobal?: any;
    props?: any;
    format?: any;
    procesar?: any;
    razon?: any;
    dialogo?: { respuesta: string, concurrencia: number, id: string }[];
}

export interface IStructureRazon {
    id: string;
    dialogos: any;
    razon: { id: string, accion: string }[]
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
                dialogos: {},
                razon: []
            };

            if (c.props) {
                /**
                 * 
                 * var propsGlobalArray = Object.entries(c.propsGlobal);
                                    propsGlobalArray.forEach((datoPropGlobal) => {
                                        let id = datoPropGlobal[0];
                                        let exe = () => {
                                            return mente.getProp(id);
                                        }
                                        accion.propsGlobal[id] = exe;
                                    });
                                    
                 */
            }

            if (c.razon) {
                var o: any[] = Object.values(c.razon);
                o.forEach((f: string) => {
                    var r = f.split("##")
                    let miId = r[0].trim()
                    accion.razon.push({
                        id: miId,
                        accion: r[1]
                    });
                })
            }

            if (c.dialogo) {
                for (let j = 0; j < c.dialogo.length; j++) {
                    var d = c.dialogo[j]

                    let miId = d.id.trim()
                    var res = {
                        id: miId,
                        respuesta: d.respuesta
                    };

                    if (accion.dialogos[d.id] == null) {
                        accion.dialogos[d.id] = {
                            countSay: 0,
                            respuestas: []
                        };
                    }

                    accion.dialogos[d.id].respuestas.push(res);

                }
            }

            this.acciones.push(accion);
        }

    }

    ejecutarAccion(id: string, toDo: (s: { dialogo: any, result: string }, index: number) => void) {
        this.acciones.forEach((accion) => {
            if (accion.id == id) {

                var dialogos = Object.values(accion.dialogos);

                dialogos.forEach((dialogo: any) => {
                    dialogo.respuestas.forEach((d: any, index: number) => {
                        var decir = this.toDialogo(accion, d.respuesta);
                        var verdad = true;
                        console.log("Mi razonamiento", accion.razon)
                        accion.razon.forEach((r) => {
                            if (r.id == d.id) {
                                var countSay = dialogo.countSay;
                                if (eval(r.accion)) {
                                    verdad = false;
                                }
                            }
                        })
                        if (verdad) {
                            toDo({ dialogo, result: decir }, index);
                        }
                    });
                });
            }
        });
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