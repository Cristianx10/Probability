import React, { useEffect } from "react";
import Logic from '../../../constants/logic/Logic';
import L_Rombo from '../../../constants/logic/L_Rombo';
import L_Cuadrado from '../../../constants/logic/L_Cuadrado';


const Logica = () => {

    var logi = new Logic();

    var saludar = new L_Cuadrado("saludar", () => {
        console.log("Te saludo")
    });

    saludar.initHilo();

    var t = false;
    var saludo = new L_Rombo("saludo", (p: any) => {
        t = !t;
        var msg = "no";

        return msg;
    });

    var si = new L_Cuadrado("si", () => {
        console.log("Bueno dias");
    });

    var no = new L_Cuadrado("no", () => {
        console.log("Fue grosero");
    });

    var seguir = new L_Cuadrado("seguir", () => {
        console.log("Continuo");
    });


    saludar.conect(saludo);

    saludo.conect(si, no);

    no.conect(saludar)


    const btnsaludo = () => {
        saludo.exe();
    }


    useEffect(() => {

        console.log("La escena esta montada");

        saludar.exe();


    }, [])
    return <div onClick={btnsaludo}>Logica</div>
}


export default Logica;