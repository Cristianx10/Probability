import firebase from "firebase";

import Firebase from '../firebase';
import Database from '../Database/Database';
import DB_ROUTES from '../Database/Database_Routes';

import User from './User';

export interface IFirebase_User {
    UID: string;
    email: string;
    account: string;
    name: string;
    registerComplete: boolean;
    date: {
        creation: number;
    }
}

interface IFirebase_User_Information {
    information: {
        name: string;
        age: number;
        genre: string;
    }
}

class user_firebase {

    private userFirebase?: firebase.User;
    private auth: firebase.auth.Auth;
    user: User;

    constructor() {
        this.auth = Firebase.auth();
        this.user = new User();
        this.getUserChangeLocal();
        this.loginGoogle(() => { });
    }


    login(user: string, password: string) {
        this.auth.signInWithEmailAndPassword(user, password);
    }

    register(user: string, password: string) {
        this.auth.createUserWithEmailAndPassword(user, password).then((result) => {
            if (result.user) {
                var uid = result.user.uid;
            }
        }).catch((error) => {
            throw new Error(error.message);
        })
    }

    redirectGoogleLogin() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    }

    registerGoogle(load: (register: boolean) => void) {

        if (this.userFirebase) {

            //var name = user.displayName;
            var email = this.userFirebase.email;
            var UID = this.userFirebase.uid;


            var route = DB_ROUTES.users.data._this + "/" + UID;
            var localRoute = route;

            Database.readBrachOnlyDatabase(localRoute, (user) => {
                var usuario: IFirebase_User = user.val();
                this.user.getUserProps(usuario);
                load(usuario.registerComplete);
            })
        }
    }

    loginGoogle(load: (user: firebase.User, exist: boolean) => void) {
        this.auth.getRedirectResult().then(({ user }) => {

            if (user) {
                this.userFirebase = user;
                var name = user.displayName || "";
                var email = user.email;
                var UID = user.uid;

                var route = DB_ROUTES.users.data._this + "/" + UID;

                Database.evalueteRouteExist(route, (exist) => {
                    //  UserFirebase.createUser()
                    if (exist) {

                    } else {
                        UserFirebase.createUser(UID, email, "google", name);
                    }

                    load(user, exist);

                });

            }

        });
    }

    logout() {
        this.auth.signOut().then(function () {
            // Sign-out successful.
            alert("Seccion cerrada")
        }).catch(function (error) {
            // An error happened.
        });
    }

    getUserChangeLocal(load?: (login: boolean) => void) {
        if (this.userFirebase == null) {
            Firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
                if (user) {
                    // User is signed in.
                    this.userFirebase = user;
                    load && load(true);
                } else {
                    // No user is signed in.
                    load && load(false);
                }
            });
        }
    }

    getUserChangeDatabase(load: () => void) {
        if (this.userFirebase) {
            var route = DB_ROUTES.users.data._this + "/" + this.userFirebase.uid;
            Database.readBrachOnlyDatabase(route, (data) => {
                var u = data.val() as User;
                this.user.getUserProps(u);
                load();
            });
        } else {
            this.getUserChangeLocal((login) => {
                if (login) {
                    this.getUserChangeDatabase(load);
                }
            })
            //. throw new Error("ES NECESARIO OBTENER UN USUARIO PARA CARGAR")
        }

    }

    writeUserData(user: IFirebase_User) {
        if (this.userFirebase) {
            let ruta = DB_ROUTES.users.information._this;

            let dataUser = JSON.parse(JSON.stringify(user));
            Database.writeDatabase(ruta, dataUser);
        }
    }

    createUser(uid: string, email: string | null, account: "local" | "google", name: string) {

        var correo = email == null ? "required" : email;

        var userFirebaseDatabse: IFirebase_User = {
            UID: uid,
            registerComplete: false,
            email: correo,
            name,
            account,
            date: {
                creation: (new Date()).getTime()
            }
        }

        var temUID = account == "google" ? `/${userFirebaseDatabse.UID}` : "";

        var route = DB_ROUTES.users.data._this + temUID;

        Database.writeDatabase(route, userFirebaseDatabse);

        //TENER EN CUENTA MAYUSCULAS
        /*    Database.writeDatabase(DB_ROUTES.users.namesUser._this + "/" + 
                , )*/
    }
}

var UserFirebase = new user_firebase();


export default UserFirebase;