import Database from '../firebase/Database/Database';
import DB_ROUTES from '../firebase/Database/Database_Routes';
import UserFirebase from '../firebase/User/UserFirebase';

import ServerGlobal from './ServerGlobal';
import FActividad from './actividad';

class MultiplayerManager {

    UID = "";
    servidores: ServerGlobal[];
    currentServidor?: ServerGlobal;
    servidor: ServerGlobal;
    fUpdate: (() => void)[] = [];

    constructor() {
        this.servidores = [];
        this.servidor = new ServerGlobal();
    }

    inicializate() {
        var routeserver = DB_ROUTES.servidor.blackjack._this + "/" + this.UID + "/servidor";
        var route = DB_ROUTES.servidor.blackjack._this + "/" + this.UID + "/data";
        Database.readBrachOnlyDatabase(route, (snapshopt) => {
            var UIDServerAdmin = snapshopt.val();
            if (UIDServerAdmin == UserFirebase.user.UID) {
                this.currentServidor = this.servidor;
            }
        })
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
        Database.writeDatabase(DB_ROUTES.users.namesUser._this + "/" + name, actividad.UID);
    }

    addServidor(servidor: ServerGlobal) {
        this.servidores.push(servidor);
    }

    updateServers() {

        /*
        this.servidores.forEach((servidor) => {
            this.servidor.update();
        });
        */
    }




}

export default MultiplayerManager; 