import React, { useEffect, useState } from 'react';
import './Lugares.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
function Lugares() {
const [Lugares, setLugares] = useState<any>();

useEffect(() => {
    fetch("http://localhost:1337/api/lugares?populate=deep")
      .then(response => response.json())
      .then(
        (resultadoApi) => {
          console.log('RESULTADO', resultadoApi);
          setLugares(resultadoApi.data);
        }
      )
}, []);

  return (
    <div className='container'>
      {Lugares?.map((lugar: any) => (
          <><Card key={lugar?.attributes?.id} style={{ width: '18rem' }}>
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
    </div>
  );
}

export default Lugares;
