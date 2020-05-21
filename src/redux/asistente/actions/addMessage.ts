export const type = "addMessage";

const updateUser = function (mensaje: string) {
    return {
        type,
        payload: mensaje
    }
}

export default updateUser;