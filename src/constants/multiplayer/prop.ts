import { database } from "firebase";
import Database from '../firebase/Database/Database';

class prop<T> {

    UID: string = "";
    private value: T;
    private listen = false;

    constructor(value: T) {
        this.value = value;
    }

    setUID(UID: string) {
        this.UID = UID;
        this.updateDatabase();
    }

    private updateDatabase() {
        if (this.UID != "") {
            Database.writeDatabase(this.UID, this.value);
            if (this.listen == false) {
                this.listen = true;
                Database.readBrachDatabase(this.UID, (snaps) => {
                    var val = snaps.val();
                    this.value = val;
                })
            }
        }
    }

    get() {
        return this.value;
    }

    set(value: T) {
        this.value = value;
        this.updateDatabase();
    }
}

export default prop;