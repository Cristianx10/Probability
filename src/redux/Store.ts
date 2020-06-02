import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";

import sUser from "./user/sUser";
import sAsistente from "./asistente/sAsistente";

const reducer = combineReducers({
    sUser,
    sAsistente
});


const persisConfig = {
    key: "root",
    storage
}

const persistReducerConfig = persistReducer(persisConfig, reducer);

const Store = createStore(persistReducerConfig) ;
export const persistor = persistStore(Store as any);

export default Store;

export type IStore = ReturnType<typeof reducer>
export interface IStoreReducer {
    type: string;
    payload: Object;
}