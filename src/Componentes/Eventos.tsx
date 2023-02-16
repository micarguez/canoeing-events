import React, { useEffect, useState } from 'react';
import './Eventos.css';
import Card from 'react-bootstrap/Card';
import { redirectToLugares } from '../utils';
import { fetchEventos } from '../api';

function Eventos() {
const [eventos, setEventos] = useState<any>();

useEffect(() => {
  fetchEventos().then((data: any) => setEventos(data));
}, []);

const token = localStorage.getItem('token');

if(!token){
  window.location.replace("/login");
  return null;
}

  return (
    <div className='App'>
      {eventos?.map((evento: any) => (
            <>
          <Card key={evento.attributes.nombre} style={{ width: '18rem', margin: '15px' }}>
          <Card.Body>
            <Card.Title>{evento?.attributes?.nombre}</Card.Title>
            <Card.Text>
              {evento?.attributes?.fecha}
            </Card.Text>
          </Card.Body>
        </Card><br />
        </>
      ))}
    </div>
  );
}

export default Eventos;