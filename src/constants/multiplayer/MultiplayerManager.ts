import Database from '../firebase/Database/Database';
import DB_ROUTES from '../firebase/Database/Database_Routes';
import UserFirebase from '../firebase/User/UserFirebase';

import ServerGlobal from './ServerGlobal';
import FActividad from './actividad';

class MultiplayerManager {


    servidores: ServerGlobal[];
    currentServidor?: ServerGlobal;
    servidor: ServerGlobal;

    fUpdate: (() => void)[] = [];

    constructor() {
        this.servidores = [];
        this.servidor = new ServerGlobal(this);
        this.servidores.push(this.servidor);
    }

    inicializate() {
        /*
        var routeserver = DB_ROUTES.servidor.blackjack._this + "/" + this.UID + "/servidor";
        var route = DB_ROUTES.servidor.blackjack._this + "/" + this.UID + "/data";
        Database.readBrachOnlyDatabase(route, (snapshopt) => {
            var UIDServerAdmin = snapshopt.val();
            if (UIDServerAdmin == UserFirebase.user.UID) {
                this.currentServidor = this.servidor;
            }
        })
        */
    }

    createServer(id_server: string, name: string, publico: boolean, load?: () => void) {

        var id_server_type = DB_ROUTES.servidor._this + "/" + id_server;
        var UID = Database.generateUID(id_server_type);

        var actividad: FActividad = {
            UID,
            name,
            visible: publico,
            date: {
                create: (new Date()).getTime(),
                limite: 200
            }
        }

        var routeServer = DB_ROUTES.simulations._this + "/" + id_server;
        var routeServersName = routeServer + "/namesUsers/" + name;
        var routeServerInfo = routeServer + "/" + UID;

        Database.writeDatabase(id_server_type + "/" + UID, actividad, () => {

            Database.writeDatabase(routeServersName, {
                UID,
                visible: publico
            }, () => {
                this.joinServer(id_server, name, () => {
                    load && load();
                });
            });

        });
    }

    joinServer(id_server: string, name: string, load?: () => void) {

        var id_server_type = DB_ROUTES.simulations._this + "/" + id_server;
        var route = id_server_type + "/namesUsers/" + name;

        Database.evalueteRouteExist(route, (exist, obj) => {
            if (exist) {

                var UID = obj && obj.val().UID || "";

                var routeServer = DB_ROUTES.simulations._this + "/" + id_server;
                var routeServerInfo = routeServer + "/" + UID;


                Database.writeDatabase(routeServerInfo + "/serversPlayer/" + UserFirebase.user.UID,
                    UserFirebase.user.UID, () => {
                        Database.writeDatabase(routeServerInfo + "/serversPlayerLife/" + UserFirebase.user.UID,
                            0
                            , () => {

                                this.servidor.linkRoute = routeServerInfo;
                                this.servidor.UID = UID;
                                this.servidor.UserID = UserFirebase.user.UID;
                                this.servidor.update(() => {
                                    load && load();
                                });
                            });
                    });

            }
        })


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

    destroyCurrentServer() {
        if (this.currentServidor) {
            var index = this.servidores.indexOf(this.currentServidor)
            if (index != -1) {
                this.servidores.splice(index, 1);
            }
        }
        this.currentServidor = undefined;
    }

    setCurrentServer(server: ServerGlobal) {
        this.currentServidor = server;
        this.updateTime();
    }

    updateTime() {
        setTimeout(() => {
            if (this.currentServidor) {
                var routeTime = this.currentServidor.linkRoute + "/timeListen";
                if (this.currentServidor.linkRoute != "") {
                    this.currentServidor.timeListen++;
                    Database.writeDatabase(routeTime, this.currentServidor.timeListen, () => {
                        this.updateTime();
                    })
                }

            }
        }, 2000);
    }




}

export default MultiplayerManager; 