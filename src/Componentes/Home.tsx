import React from 'react';
import { checkHasToken } from '../utils';

function Home(){

    if(!checkHasToken()){
    window.location.replace("/login");
    return null;
    }

    return(
        <h2>Hi</h2>
    )
};
export default Home;