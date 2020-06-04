class EventManager<T> {
    fLoaf: any = {};

    getEvent(id: T, load: () => void) {
        console.log("EL EVENTO:>>  ", this.fLoaf)
        if (this.fLoaf[id] == null) {
            this.fLoaf[id] = {
                accion: [],
                load: false
            }
        }

        if (this.fLoaf[id].load) {
            load();
        } else {
            this.fLoaf[id].accion.push(
                {
                    load,
                    exe: false
                }
            );
        }
    }

    exeEvent(id: T) {
        if (this.fLoaf[id]) {
            this.fLoaf[id].load = true;
            this.fLoaf[id].accion.forEach((action: any) => {
                if (action.exe == false) {
                    action.exe = true;
                    action.load();
                }
            });
        } else {

            this.fLoaf[id] = {
                accion: [],
                load: true
            }

        }
    }
}

export default EventManager;