import L_Cuadrado from '../../../../constants/logic/L_Cuadrado';
import L_Rombo from '../../../../constants/logic/L_Rombo';
import { type } from '../../../../redux/user/actions/updateUser';

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
    }, () => { explica1.exe(); });

    var explica1 = new L_Rombo("explica1", () => {

        return "correcto";
    }, () => {
        if (i.montyHall.asistente) {
            i.montyHall.asistente.setDefaulEvent({ event: "script", time: 2000 })
            i.montyHall.asistente.addMensaje("Tienes que escoger alguna de estas puestas ");
            i.montyHall.asistente.addMensaje("Buena suerte en tu elección ", {}, () => {
                explica1.exe();
            });
        }
    });

    var correcto = new L_Rombo("correcto", () => {
        console.log("CORRECTO")
        var variacion = correcto.props.type;
        var respuesta = "";

        if (variacion == 0) {
            respuesta = "revelo";
        } else if (variacion == 1) {
            respuesta = "ayuda";
        }

        return respuesta;
    }, () => {

        i.setAcciones((id: string, config: any) => {
            if (id == "abrir") {
                i.setAcciones(() => { })
                correcto.setProps(config);
                correcto.exe();
            }
        });
    });

    var revelo = new L_Rombo("revelo", () => {
        console.log("QUIERO REVELARLO")

        var respuesta = "";

        console.log("Correcto", correcto.props, "Revelo", revelo.props)

        if (revelo.props.orden == correcto.props.orden || revelo.props.continua != null) {
            respuesta = "finGano";

        } else {
            respuesta = "correcto";
        }

        return respuesta;
    }, () => {

        if (i.montyHall.asistente) {
            i.montyHall.asistente.addMensaje("Estas seguro de tu elección, piensa bien en las probabilidades que tienes de ganar",
                {
                    event: "qInputSi",
                    si: () => {
                        alert("Abriendo")
                        correcto.props.abrir();
                        revelo.setProps({ continua: true });

                        revelo.exe();
                    }, no: () => {
                        if (i.montyHall.asistente) {
                            i.montyHall.asistente.addMensaje("Haz de nuevo tu eleccion");
                        }
                        revelo.exe();
                    }
                }, () => {
                })
        }

        i.setAcciones((id: string, config: any) => {
            console.log("REVELACION DE OTORTIORSI", config)
            if (id == "abrir") {
                i.setAcciones(() => { })
                revelo.setProps(config);
                revelo.setProps({ seguro: true })
                revelo.exe();

            }
        });
    });

    revelo.setProps({ seguro: false });

    var ayuda = new L_Rombo("ayuda", () => {
        var respuesta = "";
        if (ayuda.props.ayuda) {
            respuesta = "revelarPuerta"
        } else {
            respuesta = "revelo2"

        }
        return respuesta;
    }, () => {

        if (i.montyHall.asistente) {
            i.montyHall.asistente.addMensaje("Te puedo ofrecer un trato,  te propongo revelar te una de las puestas te gustaria hacerlo o mantienes tu apuesta?",
                {
                    event: "qInputSi",
                    si: () => {
                        ayuda.setProps({ ayuda: true })

                        ayuda.exe();
                    }, no: () => {
                        ayuda.setProps({ ayuda: false })
                        ayuda.exe();
                    }
                }, () => {
                })
        }
    });

    var revelo2 = new L_Rombo("revelo2", () => {
        console.log("QUIERES REVELARLA?????")
        return "";
    }, () => {

    });

    var revelarPuerta = new L_Cuadrado("revelarPuerta", () => {
        i.montyHall.inicio.revelarIncorrecta(correcto.props.orden);
    });

    var cambiasDesicion = new L_Rombo("cambiasDesicion", () => {

        var respuesta = "";
        if (cambiasDesicion.props.cambiasDesicion) {

            respuesta = "finGano";

        } else {
            respuesta = "finPerdio";
        }
        return respuesta;

    }, () => {
        if (i.montyHall.asistente) {
            i.montyHall.asistente.addMensaje("Te gustaria cambiar tu desicion??",
                {
                    event: "qInputSi",
                    si: () => {
                        cambiasDesicion.setProps({ cambiasDesicion: true })
                        cambiasDesicion.exe();
                    }, no: () => {
                        cambiasDesicion.setProps({ cambiasDesicion: false })
                        cambiasDesicion.exe();
                    }
                }, () => {
                })
        }
    });


    var aumentarDificulad = new L_Rombo("aumentarDificulad", () => {
        console.log("GANE")
        return "";
    });

    var adios = new L_Cuadrado("adios", () => {

    });

    var finGano = new L_Cuadrado("finGano", () => {
        alert("GANASTE FELICITACIONES")
    });


    var finPerdio = new L_Cuadrado("finPerdio", () => {
        alert("MEJOR SUERTE LA PROXIMA")
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

    cambiasDesicion.conect(finGano);
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