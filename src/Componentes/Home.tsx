import React from 'react';
import { checkHasToken } from '../utils';
import "./Home.css";

function Home(){

    if(!checkHasToken()){
    window.location.replace("/login");
    return null;
    }

    return(
        <>
        <h2 className='title'>Bienvenidos a la pagina!</h2>
        <p>Aqui encontraran informacion sobre los diferentes lugares y eventos de canotaje que se llevan a cabo.</p>
        </>
    )
};
export default Home;