import DecisionManager from '../Decision/DecisionManager';
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

    animo: number = 5;

    decidir: DecisionManager;

    constructor() {
        this.mensajes = [];

        this.dEvent = {
            event: "",
            time: 4000
        };

        this.decidir = new DecisionManager(this);
    }


    addMensajeD(mensaje: any, config?: configMensaje, accion?: Function) {
        var temS = Object.assign({}, this.dEvent);
        var c = config ? Object.assign(temS, config) : this.dEvent;
        var m = new Mensaje(mensaje.result, c, accion);
        mensaje.dialogo.countSay++;
        this.mensajes.push(m);
        this.start();
    }


    addMensaje(mensaje: string, config?: configMensaje, accion?: Function) {
        var temS = Object.assign({}, this.dEvent);
        var c = config ? Object.assign(temS, config) : this.dEvent;
        var m = new Mensaje(mensaje, c, accion);
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
                    console.log("hgjgjhgjgjhg")
                    this.showTextScriptTime(m)
                    this.showInput();
                    break;
            }
        }
    }

    siguiente() {
        if (this.currentMensajeIndex + 1 < this.mensajes.length) {
            var m = this.mensajes[this.currentMensajeIndex];
            m.finish();
            this.currentMensajeIndex++;
            this.start();
        }
    }

    showInput() {
        if (this.chatInput) {
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
            }, 50);
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
    fFinal?: Function;


    constructor(mensaje: string, config: configMensaje, fFinal?: Function) {
        this.mensaje = mensaje;
        this.config = config;
        this.fFinal = fFinal;
    }

    finish() {
        if (this.fFinal) {
            this.fFinal();
        }
    }




}
export default Asistente;