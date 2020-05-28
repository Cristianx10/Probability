import L_Item from './L_Item';

class L_Rombo extends L_Item {

    argument = "false";

    fArgument: (props: any) => string;
    wantNotify = false;
    type = 1;

    constructor(id: string, fArgument: (props: any) => string) {
        super(id);
        this.fArgument = fArgument;
    }

    setargument(fArgument: () => string) {
        this.fArgument = fArgument;
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