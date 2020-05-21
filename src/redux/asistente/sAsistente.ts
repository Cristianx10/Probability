import Store from '../Store';
import { IStoreReducer } from '../Store';

import { type as addMessage } from "./actions/addMessage";

interface mensaje {
    mensaje: string;
    event: string;
}

var userDefaultState = {
    name: "Jorge",
    mensajes: [] as mensaje[],
    ejecutando: false

};



const reducer = (_this = userDefaultState, { type, payload }: IStoreReducer) => {



    switch (type) {
        case addMessage:
            var mensaje = payload as string;
            

            break;

        /* case addMessage:
             var mensaje = payload as mensaje;
             _this.mensajes.push(mensaje);
 
             break;*/

        default:
            break;
    }

    userDefaultState = _this;

    return { ..._this };
}

export type IUser = ReturnType<typeof reducer>;

export default reducer;