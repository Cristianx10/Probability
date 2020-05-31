import React, { useState, useEffect } from 'react';
import MontyHall from '../Simulaciones/MontyHall/MontyHall';
import "./App.scss";
import Mente from '../../constants/convesacion/Mente/Mente';
import Blackjack from '../Simulaciones/Blackjack/Blackjack';
import Logica from '../Simulaciones/Logica/Logica';
import Sofia from '../../constants/Sofia/Sofia';

export var mente = new Mente();

const App = () => {

  useEffect(() => {


    /*

    var logica = new Sofia("SALUDA");

    var progreso = new Sofia("ESCUCHA");
    var progreso2 = new Sofia("ESCUCHA");




    var inicio = logica.create("activador", "inicio");

    inicio.iniciar(() => {
      console.log("VOY A SALUDAR");

      logica.getLogicas("ESCUCHA").forEach((l) => {
        l.getModules("inicio").forEach(m => {
          m.exe();
        })
      })

    })



    var respuestas = logica.create("desicion", "respuesta");

    respuestas.props.addProp("respuestas", 0);
    respuestas.codicion(() => {

      var total = logica.getLogicas("ESCUCHA").length;

      console.log(total, respuestas.props)
      if (total == respuestas.props.get("respuestas")) {
        return "start";
      } else {
        return "esperar";
      }


    })

    var comenzar = logica.create("proceso", "start");
    comenzar.iniciar(() => {
      console.log("TODOS RESPONDIERON");
    })
 
    var esperar = logica.create("proceso", "esperar");
    esperar.iniciar(() => {
      console.log("Faltan RESPUESTAS");
    })


    respuestas.conect(comenzar, esperar);

    var inicio2 = progreso.create("activador", "inicio");

    inicio2.iniciar(() => {
      console.log("RECIBI LA OTRA LOGICA");
      var res = progreso2.getLogicas("SALUDA")[0].getModules("respuesta")[0];
      var tres = res.props.get("respuestas");
      res.props.addProp("respuestas", tres + 1);
      console.log("PUse mi RESPUESTA")
    })

    var inicio3 = progreso2.create("activador", "inicio");

    inicio3.iniciar(() => {
      console.log("RECIBI un AMIGO")
      var res = progreso2.getLogicas("SALUDA")[0].getModules("respuesta")[0];
      var tres = res.props.get("respuestas");
     // res.props.addProp("respuestas", tres + 1);
      console.log("PUse mi RESPUESTA")
    })


    logica.conect(progreso, progreso2);

    progreso.conect(logica)
    progreso2.conect(logica)


    logica.getLogicas("ESCUCHA").forEach((l) => {
      l.getModules("inicio").forEach((m) => {
        m.conect(respuestas)
      });
    });





    inicio.exe();




    var res = document.querySelector("#res");

    if (res)
      res.addEventListener("click", () => {

      })


      */





  }, []);

  return (
    <div className="App">


      <Blackjack />
      {/** 

<MontyHall />

     
<Logica /> 

*/}
    </div>
  );
}

export default App;
