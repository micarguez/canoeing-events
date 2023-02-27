import React, { useEffect, useState } from 'react';
import './Lugares.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { checkHasToken } from '../utils';
import { fetchLugares, fetchLugarPorNombre, fetchLugarPorNombreYDesc } from '../api';
function Lugares() {
  const [lugares, setLugares] = useState([])

useEffect(() => {
  fetchLugares().then((data: any) => setLugares(data));
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
      <div className="searchInput_Container">
        <input
        className="search"
        placeholder="Busca un lugar..." 
        onChange={handleChange}
        />
      </div>
      
      <div className='App container'>
        {lugares?.map((lugar: any) => (
          <><Card onClick={() => redirectToLugar(lugar?.id)} key={lugar?.attributes?.nombre} style={{ width: '18rem', margin: '15px', cursor: 'pointer' }}>
            <Card.Img variant="top" src={lugar?.attributes?.imagen_url} />
            <Card.Body>
              <Card.Title>{lugar?.attributes?.nombre}</Card.Title>
              <Card.Text>
                {lugar?.attributes?.descripcion}
              </Card.Text>
              <Button href={lugar?.attributes?.ubicacion} variant="primary">
                Ver en google maps
              </Button>
            </Card.Body>
          </Card><br /></>
        ))}
      </div></>
  );
}

export default Lugares;