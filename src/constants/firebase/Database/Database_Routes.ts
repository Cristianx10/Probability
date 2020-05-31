const app = "app/";

const JOIN_ROUTE = (routes: string[]) => {
    var total = "";
    routes.forEach((r, i) => {
        var slat = (i + 1) == routes.length ? "" : "/";
        total += r + slat;
    })
    return total;
}

var users = app + "users";
var users_information = users + "/information";


var servidor = app + "servidor";
var blackjack = servidor + "/blackjack";


var simulations = app + "simulations";


const DB_ROUTES = {
    users: {
        _this: users,
        information: {
            _this: users_information
        }
    },
    servidor: {
        _this: servidor,
        blackjack: {
            _this: blackjack,
            private: {
                _this: blackjack + "/private"
            },
            public: {
                _this: blackjack + "/public"
            }
        }
    },
    simulations: {
        _this: simulations,
        blackjack: simulations + "/blackjack"
    },

    // actividades: app + "actividades",
    //  desafios: app + "desafios",
    // salas: app + "salas",
}

export default DB_ROUTES;