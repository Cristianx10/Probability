import MConteo_Favorable from './MConteo_Favorable';
import MConteo_Posible from './MConteo_Posible';
import MConteo_Caso from './MConteo_Caso';

class ManagerConteo {

    casos: MConteo_Caso[];

    constructor() {
        this.casos = [];
    }

    calcularProbabilidad() {
        return this.getFavorables() / this.getPosibles()
    }

    toPorcentaje(numero: number) {
        return (numero * 100);
    }

    addCaso(caso: MConteo_Caso) {
        this.casos.push(caso);
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




}

export default ManagerConteo;