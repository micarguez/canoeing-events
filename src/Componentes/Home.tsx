import { CCarousel, CCarouselItem, CImage } from '@coreui/react';
import React from 'react';
import { checkHasToken } from '../utils';
import "./Home.css";
import ImageOne from './../img/c1.jpg';
import ImageTwo from './../img/c2.jpg';
import ImageThree from './../img/c3.jpg';

function Home(){

    if(!checkHasToken()){
    window.location.replace("/login");
    return null;
    }

    return(
        <>
        <h2 className='title'>Bienvenidos a la pagina!</h2>
        <p>Aqui encontraran informacion sobre los diferentes lugares y eventos de canotaje que se llevan a cabo.</p>
        <div className='carousel-sample'>
        <CCarousel controls indicators>
            <CCarouselItem className='item'>
                <CImage className="d-block w-100" src={ImageOne} alt="slide 1" />
            </CCarouselItem>
            <CCarouselItem className='item'>
                <CImage className="d-block w-100" src={ImageTwo} alt="slide 2" />
            </CCarouselItem>
            <CCarouselItem className='item'>
                <CImage className="d-block w-100" src={ImageThree} alt="slide 3" />
            </CCarouselItem>
        </CCarousel>
        </div>
        
        </>
    )
};
export default Home;