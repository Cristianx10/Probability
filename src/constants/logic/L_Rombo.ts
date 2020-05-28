import L_Item from './L_Item';

class L_Rombo extends L_Item {

    argument = "false";

    fArgument: (props: any) => string;

    wantNotify = false;
    type = 1;

    fToDo?: () => void;
    toFinish?: () => void;

    constructor(id: string, fArgument: (props: any) => string, toDo?: () => void, toFinish?: () => void) {
        super(id);
        this.fArgument = fArgument;
        this.fToDo = toDo;
        this.toFinish = toFinish;
    }

    setargument(fArgument: () => string) {
        this.fArgument = fArgument;
    }


    createMount() {
        if (this.fToDo) {
            this.fToDo();
        }
    }

    didMount() {
        if (this.toFinish) {
            this.toFinish();
        }
    }

    ejecutar(props: any) {
        var ar = "";
        if (this.fArgument) {
            var argument = this.fArgument(props);
            ar = argument;
        }
        return ar;
    }

    getargument() {
        return this.fArgument;
    }

}

export default L_Rombo;