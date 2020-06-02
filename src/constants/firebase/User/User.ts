import { IFirebase_User } from './UserFirebase';
class User {

    UID = "";
    name = "";
    genero = "";
    edad = "";
    email = "";
    account = "";
    registerComplete = true;
    date = { creation: 0 }

    constructor() {



    }

    getUserProps(user?: IFirebase_User) {
        if (user) {
            var { UID, email, account, registerComplete, date, name } = user;
            this.name = name;
            this.UID = UID;
            this.account = account;
            this.email = email;
            this.registerComplete = registerComplete;
            this.date = date;

            console.log("SOY UN USUARIO", this)
        }

    }


}

export default User;