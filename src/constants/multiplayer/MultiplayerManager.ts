import Database from '../firebase/Database/Database';
import DB_ROUTES from '../firebase/Database/Database_Routes';

import ServerGlobal from './ServerGlobal';
import FActividad from './actividad';

class MultiplayerManager {

    servidores: ServerGlobal[];
    currentServidor?: ServerGlobal;
    servidor: ServerGlobal;

    constructor() {
        this.servidores = [];
        this.servidor = new ServerGlobal();
    }

    createServer(id_sever: string, name: string, publico: boolean) {
        var actividad: FActividad = {
            UID: "",
            name,
            visible: publico,
            date: {
                create: (new Date()).getTime(),
                limite: 5
            }
        }
        Database.writeDatabasePush(id_sever, actividad);
        Database.writeDatabase(DB_ROUTES.users.namesUser._this + "/" + name,  actividad.UID);
    }

    addServidor(servidor: ServerGlobal) {
        this.servidores.push(servidor);
    }

    updateServers() {
        this.servidores.forEach((servidor) => {
            //this.servidor
        });
    }


}

export default MultiplayerManager; 