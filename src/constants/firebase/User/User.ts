import Firebase from '../firebase';
import DB_ROUTES from '../Database/Database_Routes';
import Database from '../Database/Database';

interface IFirebase_User {
    name: string
}


class user_firebase {

    user?: firebase.User;

    constructor() {


    }

    getUserChangeDataBase(load?: (login: boolean) => void) {
        if (this.user == null) {
            Firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
                if (user) {
                    // User is signed in.
                    this.user = user;
                    load && load(true);
                } else {
                    // No user is signed in.
                    load && load(false);
                }
            });
        }
    }

    writeUserData(user: IFirebase_User) {
        if (this.user) {
            let ruta = DB_ROUTES.users.information._this;

            let dataUser = JSON.parse(JSON.stringify(user));
            Database.writeDatabase(ruta, dataUser);
        }
    }
}

var UserFirebase = new user_firebase();


export default UserFirebase;