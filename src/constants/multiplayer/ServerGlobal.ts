import prop from './prop';
import MultiplayerManager from './MultiplayerManager';
import Database from '../firebase/Database/Database';
import UserFirebase from '../firebase/User/UserFirebase';

class ServerGlobal {


    manager: MultiplayerManager;
    UserID = "";
    UID = "";
    linkRoute = "";

    waitUpdate = 5000;
    waitMyUpdate = this.waitUpdate / 2;

    timeListen = -1;
    timeLife = -1;
    destruido = false;
    fListen: any = () => { };

    config: any;

    constructor(manager: MultiplayerManager) {
        this.manager = manager;
        this.config = {};

        this.updateMyTime();
    }

    updateMyTime() {
        if (!this.destruido) {
            var waitTime = UserFirebase.user.UID == this.UserID ? this.waitMyUpdate : this.waitUpdate;
            setTimeout(() => {
                if (UserFirebase.user.UID == this.UserID) {
                    var routeTime = this.linkRoute + "/serversPlayerLife/" + UserFirebase.user.UID;
                    this.timeLife++;
                    Database.writeDatabase(routeTime, this.timeLife, () => {
                        this.updateMyTime();
                    })
                } else if (UserFirebase.user.UID != this.UserID && this.UserID != "") {
                    var routeTime = this.linkRoute + "/serversPlayerLife/" + this.UserID;
                    Database.readBrachOnlyDatabase(routeTime, (snaps) => {
                        var time = snaps.val();
                        if (this.timeLife == -1) {
                            this.timeLife = time;
                            this.updateMyTime();
                        } else if (this.timeLife == time) {
                            this.destroyMy();
                        } else if (this.timeLife != time) {
                            this.timeLife = time;
                            this.updateMyTime();
                        }
                    });
                } else {
                    this.updateMyTime();
                }
            }, waitTime);
        }
    }

    private runListenWait() {
        clearTimeout(this.fListen)
        this.fListen = setTimeout(() => {
            this.updateTime();
        }, this.waitUpdate);
    }

    updateTime() {
        var routeTime = this.linkRoute + "/timeListen";
        Database.readBrachOnlyDatabase(routeTime, (snaps) => {
            var time = snaps.val();

            if (this.timeListen == -1) {
                this.timeListen = time;
                this.runListenWait();
            } else if (this.timeListen == time) {
                //El servidor no actualizo el numero por lo que esta inactivo

                if (this.manager.currentServidor) {
                    var uid = this.manager.currentServidor.UserID;
                    var routeServer = this.linkRoute + "/serversPlayer/" + uid;
                    var routeServerLife = this.linkRoute + "/serversPlayerLife/" + uid;
                    this.manager.destroyCurrentServer();
                    Database.writeDatabase(routeServer, {});
                    Database.writeDatabase(routeServerLife, {});
                }

            } else if (this.timeListen != time) {
                this.timeListen = time;
                this.runListenWait();
            }
        })
    }

    findServerPrimary() {
        var routeServer = this.linkRoute + "/serversPlayer";
        Database.readBrachDatabaseLimitChildNOnly(routeServer, 1, (snaps) => {
            snaps.forEach((snap) => {
                var val = snap.val();
                if (val.UserID === UserFirebase.user.UID) {
                    this.manager.setCurrentServer(this);
                }
            })

        })
    }

    findServers() {
        var routeServer = this.linkRoute + "/serversPlayer";
        Database.readBrachDatabase(routeServer, (snaps) => {
            snaps.forEach((snap) => {
                var key = snap.val();
                var userId = key;

                if (userId === UserFirebase.user.UID) {
                    /*
                    if (this.manager.currentServidor != this) {
                        this.manager.setCurrentServer(this);
                    }
                    */
                } else {
                    var encontrado = false;


                    for (let i = 0; i < this.manager.servidores.length; i++) {
                        let s = this.manager.servidores[i];
                        if (s.UserID == userId) {
                            encontrado = true;
                        }
                    }

                    if (!encontrado) {
                        var serve = new ServerGlobal(this.manager);
                        serve.UserID = userId;
                        serve.timeLife = 0;
                        serve.linkRoute = this.linkRoute;
                        serve.UID = this.UID;
        
                        this.manager.addServidor(serve);

                        // this.manager.setCurrentServer(serve);
                        //this.runListenWait();
                    }
                }
            })

        })
    }

    update(load?: () => void) {

        //this.findServerPrimary();
        this.findServers();
        var route = this.linkRoute + "/config";
        Database.readBrachOnlyDatabase(route, (snaps) => {
            var map = snaps.val();
            this.mapProps(map);
            load && load();
        });
    }

    mapProps(map?: Object) {
        if (map) {
            var props = Object.entries(map);
            props.forEach((prop) => {
                this.setProp(prop[0], prop[1]);
            })
        }
    }

    setUID(UID: string) {
        this.UID = UID;
    }

    state<T>(id: string) {
        var state = this.config[id] as prop<T>;
        return [state.get, state.set];
    }

    setProp<T>(id: string, value: T) {
        if (this.config[id] == null) {
            var p = new prop<T>(value);
            if (this.UID && this.linkRoute) {
                var route = this.linkRoute + "/config/" + id;
                p.setUID(route);
            }
            this.config[id] = p;
        }
        return this.config[id];
    }

    getProp<T>(id: string) {
        return this.config[id] as prop<T>;
    }

    destroyMy() {
        this.destruido = true;
        var routeServer = this.linkRoute + "/serversPlayer/" + this.UserID;
        var routeServerLife = this.linkRoute + "/serversPlayerLife/" + this.UserID;

        var index = this.manager.servidores.indexOf(this)
        this.manager.servidores.splice(index, 1);
        if (this === this.manager.currentServidor) {
            this.manager.destroyCurrentServer();
        }

        Database.writeDatabase(routeServer, {});
        Database.writeDatabase(routeServerLife, {});
        console.log("SE DESTRUYO A> ", this.UserID, "")
    }

}

export default ServerGlobal;

