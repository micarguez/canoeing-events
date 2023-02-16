import React from 'react';

function Home(){
    
    const token = localStorage.getItem('token');

    if(!token){
    window.location.replace("/login");
    return null;
    }

    return(
        <h2>Hi</h2>
    )
};
export default Home;