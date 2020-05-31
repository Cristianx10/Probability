import Firebase from "../firebase";

class database__Object {

    db: firebase.database.Database;

    constructor() {
        this.db = Firebase.database();
    }

    inicializate() {

    }

    writeDatabase(url: string, objeto: Object) {
        Firebase.database().ref(url).set(objeto);
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
