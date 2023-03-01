import React, { useEffect, useState } from 'react';
import './Lugares.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { checkHasToken } from '../utils';
import { fetchLugaresGuardados, fetchLugarPorNombreYDesc } from '../api';

function LugaresGuardados() {
  
const [lugares, setLugares] = useState([])
let user = localStorage.getItem('user_id');
let token = localStorage.getItem('token');

useEffect(() => {
  fetchLugaresGuardados(user, token).then((data: any) => setLugares(data));
}, []);

const handleChange = (event: { target: { value: any; }; }) => {
  fetchLugarPorNombreYDesc(event.target.value).then((data: any) => setLugares(data));
};

const redirectToLugar = (id: any) => {
  window.location.replace(`/lugar/${id}`);
}

if(!checkHasToken()){
  window.location.replace("/login");
  return null;
}

  return (
    <>
    <div className="wrapper">
        <div className="searchInput_Container">
          <input
          className="search"
          placeholder="Busca un lugar..." 
          onChange={handleChange}
          />
        </div>  
      
      <div className='App container'>
        {lugares?.map((lugar: any) => (
          <><Card style={{ width: '18rem', margin: '15px', cursor: 'pointer' }}>
            <Card.Img onClick={() => redirectToLugar(lugar?.attributes?.lugar?.data?.id)} key={lugar?.attributes?.lugar?.data?.attributes?.nombre} variant="top" src={lugar?.attributes?.lugar?.data?.attributes?.imagen_url} />
            <Card.Body>
              <Card.Title>{lugar?.attributes?.lugar?.data?.attributes?.nombre}</Card.Title>
              <Card.Text>
                
                {lugar?.attributes?.lugar?.data?.attributes?.descripcion}
              </Card.Text>
              <div className="controlBtns">
                <Button id="btnMaps" href={lugar?.attributes?.lugar?.data?.attributes?.ubicacion} variant="primary">
                  Ver en google maps
                </Button>
              </div>
            </Card.Body>
          </Card><br /></>
        ))}
      </div>
      </div>
      </>
  );
}

export default LugaresGuardados;