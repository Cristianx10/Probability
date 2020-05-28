import React, { useEffect } from "react";

import L_Cuadrado from '../../../constants/logic/L_Cuadrado';
import L_Rombo from '../../../constants/logic/L_Rombo';
import Logic from '../../../constants/logic/Logic';


const Logica = () => {

    var logi = new Logic();

    var saludar = new L_Rombo("saludar", () => {
        console.log("Te saludo")

        return "saludo";
    }, () => { saludo.exe() });

    saludar.initHilo();

    var saludo = new L_Rombo("saludo", (p: any) => {
        console.log("Saludando")
      
        return "si";
    },()=>{  si.exe();});

    var si = new L_Rombo("si", () => {
        console.log("Bueno dias");

        return "seguir";
    });

    var no = new L_Rombo("no", () => {
        console.log("Fue grosero");
        return "";
    });

    var seguir = new L_Rombo("seguir", () => {
        console.log("Continuo");
        return "";
    });


    saludar.conect(saludo);

    saludo.conect(si, no);

    si.conect(seguir)
    no.conect(saludar)


    const btnsaludo = () => {
        saludo.exe();
    }
    const siiiii = () => {
        si.exe();
    }


    useEffect(() => {

        console.log("La escena esta montada");

        saludar.exe();


    }, [])
    return <div>
        <div onClick={btnsaludo}>Logica</div>
        <div onClick={siiiii}>claro</div>
    </div>
}


export default Logica;