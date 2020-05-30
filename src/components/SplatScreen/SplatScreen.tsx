import React, { useEffect, useState } from 'react';
import "./SplatScreen.scss";
import { Link, Redirect } from 'react-router-dom';



const SplatScreen = () => {

    var [gotoIndex, setGotoIndex] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setGotoIndex(true);
        }, 3000)
    }, [])

    return <div className="SplatScreen">
        {gotoIndex ? <Redirect to="/index"></Redirect> : <></>}

        <img src="/img/assets/splatscreen.png" alt="" />
    </div>

}


export default SplatScreen;