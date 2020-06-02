const app = "app/";

/*
const JOIN_ROUTE = (routes: string[]) => {
    var total = "";
    routes.forEach((r, i) => {
        var slat = (i + 1) == routes.length ? "" : "/";
        total += r + slat;
    })
    return total;
}
*/

var users = app + "users";
var users_namesUser = users + "/namesUser";
var users_data = users + "/data";
var users_information = users + "/information";


var servidor = app + "servidor";
var servidor_blackjack = servidor + "/blackjack";
var servidor_blackjack_private = servidor_blackjack + "/private";
var servidor_blackjack_public = servidor_blackjack + "/public";


var simulations = app + "simulations";


const DB_ROUTES = {
    users: {
        _this: users,
        namesUser: {
            _this: users_namesUser
        },
        data: {
            _this: users_data
        },
        information: {
            _this: users_information
        }
    },
    servidor: {
        _this: servidor,
        blackjack: {
            _this: servidor_blackjack,
            private: {
                _this: servidor_blackjack_private

            },
            public: {
                _this: servidor_blackjack_public
            }
        }
    },
    simulations: {
        _this: simulations,
        blackjack: {
            _this: simulations + "/blackjack"
        }
    },

    // actividades: app + "actividades",
    //  desafios: app + "desafios",
    // salas: app + "salas",
}

export default DB_ROUTES;