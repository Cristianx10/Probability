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

export interface IFirebase_User_Information {

    nick: string;
    age: number;
    genre: string;

}

class User implements IFirebase_User {

    UID = "";
    name = "";
    email = "";
    account = "";
    registerComplete = true;
    date = { creation: 0 }
    information: IFirebase_User_Information = {
        nick: "",
        age: 0,
        genre: ""
    };

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
        }
    }

    getPropInfomation(info?: IFirebase_User_Information) {
        if (info) {
            this.information.age = info.age;
            this.information.genre = info.genre;
            this.information.nick = info.nick;
        }
    }


}

export default User;