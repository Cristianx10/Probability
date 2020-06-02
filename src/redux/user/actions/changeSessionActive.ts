export const type = "changeSessionActive";

const changeSessionActive = function (name: string) {
    return {
        type,
        payload: name
    }
}

export default changeSessionActive;