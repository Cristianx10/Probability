const app = "app/";

const JOIN_ROUTE = (routes: string[]) => {
    var total = "";
    routes.forEach((r, i) => {
        var slat = (i + 1) == routes.length ? "" : "/";
        total += r + slat;
    })
    return total;
}

const DB_ROUTES = {
    usuario: app + "usuario",
    actividades: app + "actividades",
    desafios: app + "desafios",
    salas: app + "salas"
}

export default DB_ROUTES;