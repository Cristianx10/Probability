import Firebase from "../firebase";
import FActividad from '../../multiplayer/actividad';

import DB_ROUTES from './Database_Routes';


class database__Object {

    db: firebase.database.Database;

    constructor() {
        this.db = Firebase.database();




    }

    inicializate() {

        this.readBrachOnlyDatabase(DB_ROUTES.servidor.blackjack._this, (snapshots) => {
            var getDate = (new Date()).getTime();
            snapshots.forEach((snapshot) => {
                var snapValue: { create: number, limite: number } = snapshots.child(snapshot.key || "").child("date").val();

                var timePass = (getDate - snapValue.create) / 60000;

                if (timePass > snapValue.limite) {
                    this.writeDatabase(DB_ROUTES.servidor.blackjack._this + "/" + snapshot.key, {})
                }
            });
        })

    }

    evalueteRouteExist(id: string, load: (exit: boolean, obj: firebase.database.DataSnapshot | undefined) => void) {
        this.db.ref(id).once("value", snapshot => {
            var value: firebase.database.DataSnapshot | undefined = undefined;
            var exist = false;
            if (snapshot.exists()) {
                value = snapshot;
                exist = true;
            }
            load(exist, value);
        });
    }

    evalueteRouteExistMin(id: string, val: string, load: (exit: boolean, obj: firebase.database.DataSnapshot | undefined) => void) {
        this.db.ref(id).once("value", snapshot => {
            var value: firebase.database.DataSnapshot | undefined = undefined;
            var exist = false;
            var key = snapshot.key || "";

    

            console.log(key, val, id)
            if (snapshot.exists()) {

                if (key == "") {
                    value = snapshot;
                    exist = true;
                } else if (key != "") {
                    if (key.toLowerCase() == val.toLowerCase()) {
                        value = snapshot;
                        exist = true;
                    }
                }
            } else {

            }
            load(exist, value);
        });
    }

    readBrachOnlyDatabase(ruta: string, load: (snapshots: firebase.database.DataSnapshot) => void) {
        var refDataBase = this.db.ref(ruta);
        refDataBase.once('value', (snapshots: firebase.database.DataSnapshot) => {
            load(snapshots);
        });
    }

    writeDatabase(url: string, objeto: Object) {
        Firebase.database().ref(url).set(objeto);
    }

    writeDatabasePush(url: string, objeto: any) {
        let UID: string = Firebase.database().ref(url).push().key || "";
        objeto.UID = UID;
        var resultObject = JSON.parse(JSON.stringify(objeto));

        if (UID !== "") {
            this.writeDatabase(`${url}/${UID}`, resultObject);
        }
    }

    writeDatabasePushWithOutUID(url: string, objeto: any) {
        var resultObject = JSON.parse(JSON.stringify(objeto));
        Firebase.database().ref(url).push(resultObject);
    }

    /*
       
        readBrachOnlyDatabase(ruta: string, load: Function) {
            var refDataBase = this.database.ref(ruta);
    
            refDataBase.once('value', (snapshots: firebase.database.DataSnapshot) => {
                let objetos: { result: any, url: string }[] | any = [];
                let nChilds: number = 0;
                snapshots.forEach(snapshot => {
                    objetos.push(snapshot.val());
                    nChilds++;
                });
    
                load(objetos, nChilds);
            });
        }
    
        readBrachDatabase(ruta: string, load: Function) {
            var refDataBase = Firebase.database().ref(ruta);
    
            refDataBase.on('value', (snapshots: firebase.database.DataSnapshot) => {
                let objetos: { result: any, url: string }[] | any = [];
                let nChilds: number = 0;
                snapshots.forEach(snapshot => {
                    objetos.push(snapshot.val());
                    nChilds++;
                });
    
                load(objetos, nChilds);
            });
        }
    
    
    
        getUserChangeDataBase(load?: Function) {
            if (this.user == null) {
                Firebase.auth().onAuthStateChanged((user: any) => {
                    this.getUserFirebase(user, load);
                });
            } else {
                if (load) {
                    load();
                }
            }
        }
    
        getCurrentUserUID(load: Function) {
            this.getUserChangeDataBase(() => {
                if (this.user) {
                    load(this.user.uid);
                }
            });
        }
    
      
    
        writeDatabasePush(url: string, objeto: IObjectDatabase) {
            let UID: string = Firebase.database().ref(url).push().key || "";
            objeto.UID = UID;
            var resultObject = JSON.parse(JSON.stringify(objeto));
    
            if (UID !== "") {
                Firebase.database().ref(`${url}/${UID}`).set(resultObject);
            }
    
            // this.updateBrach(`${url}/${UID}`, objeto); /**Algo pasa */
    /*
}
updateBrach(url: string, object: IObjectDatabase) {
    let updates: any = {};
    updates[url] = object;
    console.log(updates)
    this.getDatabase().ref().set(updates);
}
 
getDatabase() {
    return Firebase.database();
}
*/
}


var Database = new database__Object();

export default Database;
