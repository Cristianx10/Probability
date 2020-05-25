import { IStoreReducer } from '../Store';

import { type as updateUser } from './actions/updateUser';
import { mente } from '../../components/App/App';

var userDefaultState = {
    name: "Cristian",
};



const reducer = (_this = userDefaultState, { type, payload }: IStoreReducer) => {

    switch (type) {
        case updateUser:
            _this.name = payload as string;
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