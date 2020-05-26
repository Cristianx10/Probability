import React, { useState } from 'react';
import MontyHall from '../Simulaciones/MontyHall/MontyHall';
import "./App.scss";
import Mente from '../../constants/convesacion/Mente/Mente';
import Blackjack from '../Simulaciones/Blackjack/Blackjack';

export var mente = new Mente();

const App = () => {

  return (
    <div className="App">

      {/** <Blackjack /> */}

      <MontyHall />

    </div>
  );
}

export default App;
