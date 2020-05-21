export const type = "updateUser";

const updateUser = function (name: string) {
    return {
        type,
        payload: name
    }
}

export default updateUser;