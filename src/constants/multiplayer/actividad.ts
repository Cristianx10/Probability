interface FActividad {
    UID: string;
    name: string;
    visible: boolean;
    date: {
        create: number;
        limite: number;
    };

}

export default FActividad;