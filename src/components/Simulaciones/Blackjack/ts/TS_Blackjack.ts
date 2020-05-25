
import createjsConfig from '../../../../constants/createjs/createjsConfig';
import juego from '../scene/juego';


class TS_Blackjack extends createjsConfig {



    constructor() {
        super();
        this.size(1280, 720);


        this.scene.addScene(new juego(this.scene))
      
        this.update()
    }





}


export default TS_Blackjack;