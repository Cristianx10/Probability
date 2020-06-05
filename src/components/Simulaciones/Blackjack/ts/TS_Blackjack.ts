
import juego from '../scene/juego';
import Sofia from '../../../../constants/Sofia/Sofia';
import createjsConfig from '../../../../constants/createjs/createjsConfig';
import MultiplayerManager from '../../../../constants/multiplayer/MultiplayerManager';
import EventManager from '../../../../constants/helpers/EventsManager';


class TS_Blackjack extends createjsConfig {

    server?: MultiplayerManager;
    event = new EventManager<"loadServer">()

    constructor() {
        super();
        this.size(1280, 720);

        this.scene.addScene(new juego(this))
        this.update();
    }

    setServer(server: MultiplayerManager) {
        this.server = server;
        this.event.exeEvent("loadServer");
    }



}


export default TS_Blackjack;