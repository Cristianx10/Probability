import { IStoreReducer } from '../Store';

import { type as updateUser } from './actions/updateUser';
import { type as changeSessionActive } from './actions/changeSessionActive';
import { mente } from '../../components/App/App';

var userDefaultState = {
    name: "Cristian",
    session_Active: "undefined"
};



const reducer = (_this = userDefaultState, { type, payload }: IStoreReducer) => {

    switch (type) {
        case updateUser:
            _this.name = payload as string;
            break;
        case changeSessionActive:
            _this.session_Active = payload as string;
            break;

        default:
            break;
    }

    mente.addProp("userName", _this.name, 0);

    userDefaultState = _this;

    return { ..._this };
}

export type IUser = ReturnType<typeof reducer>;

export default reducer;