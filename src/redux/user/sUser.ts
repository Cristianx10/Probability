import { IStoreReducer } from '../Store';

import { type as updateUser } from './actions/updateUser';

var userDefaultState = {
    name: "Nombre de usuario",
};

const reducer = (_this = userDefaultState, { type, payload }: IStoreReducer) => {

    switch (type) {
        case updateUser:
            _this.name = payload as string;
            break;

        default:
            break;
    }

    userDefaultState = _this;

    return { ..._this };
}

export type IUser = ReturnType<typeof reducer>;

export default reducer;