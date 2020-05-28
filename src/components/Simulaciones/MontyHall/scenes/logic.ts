import L_Cuadrado from '../../../../constants/logic/L_Cuadrado';
import L_Rombo from '../../../../constants/logic/L_Rombo';
import inicio from './inicio';

var L_MontyHall: Function = (i: inicio): any => {


    var init = new L_Cuadrado("inicio", () => {
        if (i.montyHall.asistente) {
            i.montyHall.asistente.setDefaulEvent({ event: "script", time: 1000 })
            i.montyHall.asistente.addMensaje("Hola, bienvenido a probability aqui aprenderas los fundamentos de probabilidad")
            i.montyHall.asistente.addMensaje("Mi nombre es Jorge. Y te estare acompañando a traves de esta interacción");
            i.montyHall.asistente.addMensaje("Bien, comencemos");

            i.montyHall.asistente.addMensaje("Ahora que hemos empezado, te contare de que se trata, habran 3 puestas")
            i.montyHall.asistente.addMensaje("Detras de una de las puestas encontraras 1 carro ultimo modelo, tendras que usar la logica para hallar la respuesta correcta", {}, () => {
                console.log("Termino dialogo")
                psaludo.exe();
            });
            i.montyHall.asistente.addMensaje("");
        }
    });

    init.initHilo();


    var psaludo = new L_Rombo("saludo", () => {
        return "generarPuertas";
    });

    var generarPuertas = new L_Cuadrado("generarPuertas", () => {
        i.agregarCaso({ variacion: 1 });
        i.agregarCaso({ variacion: 0 });
        i.agregarCaso({ variacion: 1 });
        i.generarScena();
        i.update();

        if (i.montyHall.asistente) {
            i.montyHall.asistente.setDefaulEvent({ event: "script", time: 2000 })
            i.montyHall.asistente.addMensaje("Tienes que escoger alguna de estas puestas ", {}, () => {
                i.setAcciones((id: string) => {
                    if (id == "abrir") {
                        explica1.exe();
                    }
                });
            })
            i.montyHall.asistente.addMensaje("Buena suerte en tu elección ");
        }
    });

    var explica1 = new L_Rombo("explica1", () => {
        correcto.exe();
        return "correcto";
    });

    var correcto = new L_Rombo("correcto", () => {
        alert();
        return "";
    });

    var revelo = new L_Rombo("revelo", () => {
        return "";
    });

    var ayuda = new L_Rombo("ayuda", () => {
        return "";
    });

    var revelo2 = new L_Rombo("revelo2", () => {
        return "";
    });

    var revelarPuerta = new L_Cuadrado("revelarPuerta", () => {

    });

    var cambiasDesicion = new L_Rombo("cambiasDesicion", () => {
        return "";
    });


    var aumentarDificulad = new L_Rombo("finGano", () => {
        return "";
    });

    var adios = new L_Cuadrado("adios", () => {

    });

    var finGano = new L_Cuadrado("finGano", () => {

    });


    var finPerdio = new L_Cuadrado("finPerdio", () => {

    });


    var sabiasQue = new L_Cuadrado("sabiasQue", () => {

    });

    //inicio,;
    //psaludo,;
    //generarPuertas,;
    //explica1,;
    //correcto,;
    //revelo,;
    //ayuda,;
    //revelo2,;
    //revelarPuerta,;
    //cambiasDesicion,;
    //aumentarDificulad,;
    //adios,;
    //finGano,;
    //finPerdio,;
    //sabiasQue,;


    init.conect(psaludo);
    psaludo.conect(generarPuertas)
    generarPuertas.conect(explica1);
    explica1.conect(correcto);

    correcto.conect(revelo);
    correcto.conect(ayuda);

    revelo.conect(finGano);
    revelo.conect(correcto);

    finGano.conect(aumentarDificulad);

    aumentarDificulad.conect(adios);
    aumentarDificulad.conect(generarPuertas);

    ayuda.conect(revelo2);
    ayuda.conect(revelarPuerta);

    revelo2.conect(finPerdio);
    revelo2.conect(cambiasDesicion)

    finPerdio.conect(sabiasQue);

    revelarPuerta.conect(cambiasDesicion);

    cambiasDesicion.conect(correcto);
    cambiasDesicion.conect(finPerdio);



    return {
        init,
        psaludo,
        generarPuertas,
        explica1,
        correcto,
        revelo,
        ayuda,
        revelo2,
        revelarPuerta,
        cambiasDesicion,
        aumentarDificulad,
        adios,
        finGano,
        finPerdio,
        sabiasQue,
    }

}

export default L_MontyHall;