import { random } from '../../helpers/helpers';
import DecisionManager from '../../convesacion/Decision/DecisionManager';

import MConteo_Caso from './MConteo_Caso';
import { typeProps, typePropsValue } from './MConteo_Caso';
import MConteo_Controller from './ManagerConteoController';

class ManagerConteo {

    controller: MConteo_Controller;
    casos: MConteo_Caso[];
    mDecision: DecisionManager;


    constructor(controller: MConteo_Controller) {
        this.controller = controller;
        this.casos = [];
        this.mDecision = new DecisionManager();
       // this.mDecision.addConocimiento();
    }

    execute() {
        this.masivo(4, { variacion: 0 }, { variacion: 1 })
        this.controller.generarScena();
    }

    masivo(cantidad: number, config: typeProps, cofig2: typeProps) {
        var iCom = random(0, cantidad - 1);
        for (let index = 0; index < cantidad; index++) {
            if (index == iCom) {
                this.controller.agregarCaso(config);
            } else {
                this.controller.agregarCaso(cofig2);
            }
        }
    }

    updateAction(accion: string) {

    }

    calcularProbabilidad() {
        return this.getFavorables() / this.getPosibles()
    }

    toPorcentaje(numero: number) {
        return (numero * 100);
    }

    addCaso(caso: MConteo_Caso) {
        caso.mConteo = this;
        this.casos.push(caso);
    }

    limpiarCasos() {
        this.casos = [];
    }

    getFavorables() {
        var nFavorables = 0;
        this.casos.forEach((c) => {
            if (c.favorable) { nFavorables++ }
        })
        return nFavorables;
    }

    getPosibles() {
        var nPosibles = 0;
        nPosibles = this.casos.length;
        return nPosibles;
    }

    getCasosPropsNoRepeat<K extends keyof typeProps>(id: K, filter?: any): { result: typePropsValue, count: number }[] {
        var arrayO: any = {};

        var mapFilter = filter ? Object.entries(filter) : [];

        this.casos.forEach((c) => {
            var incluir = true;

            if (filter) {
                var temp: any = c;

                mapFilter.forEach((mf) => {
                    let v = temp[mf[0]];
                    if (v != mf[1]) {
                        incluir = false;
                        return;
                    }
                });
            }

            if (incluir) {
                var p = c.getProp(id)
                if (arrayO[id]) {
                    if (p != arrayO[id].result) {
                        arrayO[id].count++;
                    }
                } else {
                    arrayO[id] = { result: p, count: 1 };
                }
            }


        });
        return Object.values(arrayO);
    }

    toTextComas(array: { result: typePropsValue, count: number }[], format?: "Mayus" | "Minus") {
        var t = "";
        var divisor = array.length > 1 ? ", " : "";
        var plural = false;
        array.forEach((p) => {
            if (p.result.value) {
                t += p.result.value + divisor;
            }
            if (p.result.valueSpecific) {
                if (p.count > 1) {
                    t += p.result.valueSpecific.plural + divisor;
                    plural = true;
                } else {
                    t += p.result.valueSpecific.singular + divisor;
                }
            }

        });
        if (format) {
            if (format == "Mayus") {
                t = t.toUpperCase();
            } else if (format == "Minus") {
                t = t.toLowerCase();
            }
        }
        return { result: t, plural };
    }

    getCasos() {
        return this.casos;
    }


    getThis() {
        return this;
    }




}

export default ManagerConteo;