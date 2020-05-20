class ManagerConteo {

    casosFavorables = 0;
    casosPosibles = 0;

    constructor() {

    }

    calcularProbabilidad() {
        this.casosFavorables / this.casosPosibles;
    }

    toPorcentaje(numero: number) {
        return (numero * 100);
    }

    setFavorables(casos: number) {
        this.casosFavorables = casos;
    }

    setPosibles(casos: number) {
        this.casosPosibles = casos;
    }


}

export default ManagerConteo;