import ServerGlobal from './ServerGlobal';

class MultiplayerManager {

    servidores: ServerGlobal[];
    currentServidor?: ServerGlobal;
    servidor: ServerGlobal;

    constructor() {
        this.servidores = [];
        this.servidor = new ServerGlobal();
    }

    createServer(id_sever: string, name: string, publico: boolean) {
        
    }

    addServidor(servidor: ServerGlobal) {
        this.servidores.push(servidor);
    }

    updateServers() {
        this.servidores.forEach((servidor) => {
            //this.servidor
        });
    }


}

export default MultiplayerManager; 