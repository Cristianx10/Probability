export interface IIsAsistente {
    asistente?: Asistente;
    setAsistente(asistente: Asistente): void;
}

class Asistente {

    chatContainer?: HTMLDivElement;
    mensajes: Mensaje[];
    currentMensajeIndex = 0;

    constructor() {
        this.mensajes = [];
    }

    addMensaje(mensaje: string, event?: string, time?: number) {
        var m = new Mensaje(mensaje, event, time)
        this.mensajes.push(m);
        this.start();
    }

    start() {
        var m = this.mensajes[this.currentMensajeIndex];
        if (!m.ejecutando) {
            m.ejecutando = true;
            switch (m.event) {
                case "":
                    this.showText(m.mensaje);
                    setTimeout(() => {
                        this.siguiente();
                    }, m.tiempo)
                    break;
                case "script":
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
                            }, m.tiempo)
                        }
                    }, 100);
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

    showText(m: string) {
        if (this.chatContainer) {
            this.chatContainer.innerText = m;
        }
    }

    setChatContainer(chatContainer: HTMLDivElement) {
        this.chatContainer = chatContainer;
    }

}


class Mensaje {

    mensaje: string;
    event: string;
    ejecutando = false;
    tiempo: number;

    constructor(mensaje: string, event?: string, time?: number) {
        this.mensaje = mensaje;
        this.tiempo = time ? time : 5000;
        this.event = event ? event : "";
    }

}
export default Asistente;