
import juego from '../scene/juego';
import Sofia from '../../../../constants/Sofia/Sofia';
import createjsConfig from '../../../../constants/createjs/createjsConfig';


class TS_Blackjack extends createjsConfig {



    constructor() {
        super();
        this.size(1280, 720);


        this.scene.addScene(new juego(this.scene))

        this.update();


    }





}


export default TS_Blackjack;