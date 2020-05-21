import React, { useRef, useEffect } from "react";
import Asistente from '../../constants/convesacion/Asistente/Asistente';

import "./Chat.scss";

export interface IChat {
    asistente: Asistente;
}

const Chat = (props: IChat) => {

    const chatContainer = useRef<HTMLDivElement | any>();
    const inputContainer = useRef<HTMLDivElement | any>();

    useEffect(() => {
        props.asistente.setChatContainer(chatContainer.current)
        props.asistente.setChatInput(inputContainer.current)
    }, []);

    return <div className="Chat">
        <div className="Chat__dialogo" ref={chatContainer}></div>
        <div className="Chat__input" ref={inputContainer}></div>
    </div>
}

export default Chat;