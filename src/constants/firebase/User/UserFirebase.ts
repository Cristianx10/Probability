import firebase from "firebase";

import Firebase from '../firebase';
import Database from '../Database/Database';
import DB_ROUTES from '../Database/Database_Routes';
import EventManager from '../../helpers/EventsManager';
import Store from "../../../redux/Store";
import { type as changeSessionActive } from "../../../redux/user/actions/changeSessionActive";

import User from './User';
import { IFirebase_User, IFirebase_User_Information } from './User';





class user_firebase {

    private userFirebase?: firebase.User;
    private auth: firebase.auth.Auth;
    user: User;
    event: EventManager<"redirectGoogle" | "loadUserDatabase" | "loadUserFirebase">;


    constructor() {
        this.auth = Firebase.auth();
        this.user = new User();
        this.event = new EventManager();
        this.getUserChangeLocal();
        this.getUserChangeDatabase(() => {
            if (this.user.registerComplete == false) {
                Store.dispatch({ type: changeSessionActive, payload: "goToSign" });
            }
        });
        this.loginGoogle(() => { });
    }

    login(user: string, password: string, load: () => void) {
        this.auth.signInWithEmailAndPassword(user, password).then(() => {
            load();
        });
    }

    register(user: string, password: string, load: (value: firebase.auth.UserCredential) => void) {
        this.auth.createUserWithEmailAndPassword(user, password).then((result) => {
            if (result.user) {
                //  var uid = result.user.uid;
                load(result);
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
            // var email = this.userFirebase.email;
            var UID = this.userFirebase.uid;

            var route = DB_ROUTES.users.data._this + "/" + UID;

            Database.readBrachOnlyDatabase(route, (user) => {
                var usuario: IFirebase_User = user.val();
                if (usuario) {
                    this.user.getUserProps(usuario);
                    load(usuario.registerComplete);
                }
            })
        }
    }

    loginGoogle(load: (user: firebase.User, exist: boolean) => void) {
        this.auth.getRedirectResult().then(({ user }) => {

            if (user) {
                this.userFirebase = user;
                var name = user.displayName || "";
                var email = user.email || "";
                var UID = user.uid;

                var route = DB_ROUTES.users.data._this + "/" + UID;

                Database.evalueteRouteExist(route, (exist) => {
                    if (exist) {

                    } else {
                        UserFirebase.createUser(UID, email, "google", name);
                    }
                    load(user, exist);
                });

            }

        });
    }

    logout(load: (exit: boolean) => void) {
        this.auth.signOut().then(() => {
            this.userFirebase = undefined;
            this.user = new User();
            load(true);
        }).catch(function (error) {
            load(false)
        });
    }

    getUserChangeLocal(load?: (login: boolean) => void) {
        if (this.userFirebase == null) {
            Firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
                if (user) {
                    // User is signed in.
                    this.userFirebase = user;
                    Store.dispatch({ type: changeSessionActive, payload: "active" });
                    load && load(true);
                    this.event.exeEvent("loadUserFirebase");
                } else {
                    // No user is signed in.
                    load && load(false);
                }
            });
        }
    }

    getUserChangeDatabase(load: () => void) {
        this.event.getEvent("loadUserFirebase", () => {
            if (this.userFirebase) {

                var route = DB_ROUTES.users.data._this + "/" + this.userFirebase.uid;

                Database.readBrachOnlyDatabase(route, (data) => {
                    var u = data.val() as User | undefined;
                    if (u) {

                        this.user.getUserProps(u);
                        if (u.information) {
                            this.user.getPropInfomation(u.information);
                        }
                    }

                    this.event.exeEvent("loadUserDatabase");
                    load();
                });
            }
        });

    }

    writeUserData(user: IFirebase_User) {
        if (this.userFirebase) {
            let ruta = DB_ROUTES.users.information._this;

            let dataUser = JSON.parse(JSON.stringify(user));
            Database.writeDatabase(ruta, dataUser);
        }
    }

    createUserLocal() {

    }

    createUser(uid: string | null, email: string, account: "local" | "google", name: string, pass?: string) {

        const registerDatabase = (uidServer?: string) => {
            //Genera un UID random
            var routeDatabe = DB_ROUTES.users.data._this;

            //Seleccion de UID segun el metodo de inicio de sessión
            var temUID = account == "google" ?
                uid || ""
                : uidServer || "";

            var userFirebaseDatabse: IFirebase_User = {
                UID: temUID,
                registerComplete: false,
                email,
                name,
                account,
                date: {
                    creation: (new Date()).getTime()
                }
            }

            var route = routeDatabe + "/" + temUID;

            Database.writeDatabase(route, userFirebaseDatabse, () => {
                this.user.getUserProps(userFirebaseDatabse);
                this.event.exeEvent("loadUserDatabase");
                if (account == "google") {
                    this.event.exeEvent("redirectGoogle");
                }
            });

            //TENER EN CUENTA MAYUSCULAS
            /*    Database.writeDatabase(DB_ROUTES.users.namesUser._this + "/" + 
                    , )*/
        }

        if (pass) {
            this.register(email, pass, (result) => {
                if (result && result.user) {
                    var uid = result.user.uid;
                    registerDatabase(uid);
                }
            });
        } else {
            registerDatabase();
        }

    }


    createUserInformation(age: number, genre: string, nick: string, load?: () => void) {
        this.event.getEvent("loadUserDatabase", () => {

            //Genera un UID random
            var routeDatabe = DB_ROUTES.users.data._this;
            var routeNick = DB_ROUTES.users.namesUser._this;

            var information = {
                age,
                genre,
                nick
            }

            var route = routeDatabe + "/" + this.user.UID;

            Database.updateDatabase(route,
                {
                    registerComplete: true,
                    information
                }
                , () => {
                    this.user.registerComplete = true;
                    this.user.getPropInfomation(information);
                    Database.writeDatabase(routeNick + "/" + nick, this.user.UID);
                    Database.writeDatabase(routeNick + "/" + (nick.toLowerCase()), this.user.UID);
                    load && load()
                });
        })

    }


}

var UserFirebase = new user_firebase();


export default UserFirebase;