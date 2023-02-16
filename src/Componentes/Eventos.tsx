import React, { useEffect, useState } from 'react';
import './Eventos.css';
import Card from 'react-bootstrap/Card';
function Eventos() {
const [eventos, setEventos] = useState<any>();

useEffect(() => {
    fetch("http://localhost:1337/api/eventos?populate=deep")
      .then(response => response.json())
      .then(
        (resultadoApi) => {
          console.log('RESULTADO', resultadoApi);
          setEventos(resultadoApi.data);
        }
      )
}, []);

  return (
    <div className='container'>
      {eventos?.map((evento: any) => (
          <><Card key={evento?.attributes?.id} style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{evento?.attributes?.nombre}</Card.Title>
            <Card.Text>
              {evento?.attributes?.fecha}
            </Card.Text>
          </Card.Body>
        </Card><br /></>
      ))}
    </div>
  );
}

export default Eventos;
