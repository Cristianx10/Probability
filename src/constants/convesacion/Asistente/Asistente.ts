export interface IIsAsistente {
    asistente?: Asistente;
    setAsistente(asistente: Asistente): void;
}

interface eventMensaje {
    event?: "script" | "qInput" | "";
}

interface configMensaje extends eventMensaje {
    time?: number;
}

class Asistente {


    chatContainer?: HTMLDivElement;
    chatInput?: HTMLDivElement;
    mensajes: Mensaje[];
    currentMensajeIndex = 0;
    dEvent: configMensaje;

    constructor() {
        this.mensajes = [];
        this.dEvent = {
            event: "",
            time: 4000
        };
    }



    addMensaje(mensaje: string, config?: configMensaje) {
        var c = config ? Object.assign(this.dEvent, config) : this.dEvent;
        var m = new Mensaje(mensaje, c);
        this.mensajes.push(m);
        this.start();
    }

    start() {
        var m = this.mensajes[this.currentMensajeIndex];
        if (!m.ejecutando) {
            var { config } = m;
            var { event } = config;
            m.ejecutando = true;
            switch (event) {
                case "":
                    this.showTextTime(m);
                    break;
                case "script":
                    this.showTextScriptTime(m)
                    break;
                case "qInput":
                    this.showTextScriptTime(m)
                    this.showInput();
                    break;
            }
        }
    }

    siguiente() {
        if (this.currentMensajeIndex + 1 < this.mensajes.length) {
            this.currentMensajeIndex++;
            this.start();
        }
    }

    showInput(){
        if(this.chatInput){
            this.chatInput.innerHTML = `
            <input type="text" />
            <button>Responder</button>`
        }
    }



    private showText(m: string) {
        if (this.chatContainer) {
            this.chatContainer.innerText = m;
        }
    }

    private showTextTime(m: Mensaje) {
        var { time } = m.config;
        this.showText(m.mensaje);
        setTimeout(() => {
            this.siguiente();
        }, time)
    }

    private showTextScriptTime(m: Mensaje) {
        if (this.chatContainer) {
            var { time } = m.config;

            let tam = m.mensaje.length;
            let men = m.mensaje + "";
            let mensa = "";
            let index = 0;
            let inteval = setInterval(() => {
                if (index < tam) {
                    mensa += men.charAt(index)
                    index++;
                    this.showText(mensa);
                } else {
                    clearInterval(inteval);
                    setTimeout(() => {
                        this.siguiente();
                    }, time)
                }
            }, 100);
        }
    }

    setChatContainer(chatContainer: HTMLDivElement) {
        this.chatContainer = chatContainer;
    }

    setChatInput(chatInput: HTMLDivElement) {
        this.chatInput = chatInput;
    }

    setDefaulEvent(event: configMensaje) {
        this.dEvent = Object.assign(this.dEvent, event);

    }

}


class Mensaje {

    mensaje: string;
    config: configMensaje;
    ejecutando = false;

    constructor(mensaje: string, config: configMensaje) {
        this.mensaje = mensaje;
        this.config = config;
    }





}
export default Asistente;