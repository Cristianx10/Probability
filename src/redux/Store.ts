import { createStore, combineReducers } from "redux";

import sUser from "./user/sUser";
import sAsistente from "./asistente/sAsistente";

const reducer = combineReducers({
    sUser,
    sAsistente
});

export var Store = createStore(reducer);


export default Store;

export type IStore = ReturnType<typeof reducer>
export interface IStoreReducer {
    type: string;
    payload: Object;
}