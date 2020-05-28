import React, { useState } from 'react';
import MontyHall from '../Simulaciones/MontyHall/MontyHall';
import "./App.scss";
import Mente from '../../constants/convesacion/Mente/Mente';
import Blackjack from '../Simulaciones/Blackjack/Blackjack';
import Logica from '../Simulaciones/Logica/Logica';

export var mente = new Mente();

const App = () => {

  return (
    <div className="App">
      <MontyHall />

      {/** <Blackjack /> 


     
<Logica /> 

*/}
    </div>
  );
}

export default App;
