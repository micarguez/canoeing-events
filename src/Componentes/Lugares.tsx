import React, { useEffect, useState } from 'react';
import './Lugares.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { checkHasToken } from '../utils';
import { fetchLugares, fetchLugarPorNombreYDesc, fetchLugarPorTipoAguas, fetchLugarPorUsuario } from '../api';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

function Lugares() {
  
const [lugares, setLugares] = useState([])

useEffect(() => {
  fetchLugares().then((data: any) => setLugares(data));
}, []);

const handleChange = (event: { target: { value: any; }; }) => {
  fetchLugarPorNombreYDesc(event.target.value).then((data: any) => setLugares(data));
};

const handleChangeRadioButton = (event: { target: { value: any; }; }) => {

  let subs = event.target.value.split(' ')

  fetchLugarPorTipoAguas(subs[1]).then((data: any) => setLugares(data));
};

const handleResetearFiltro = () => {

  fetchLugares().then((data: any) => setLugares(data));
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
      <div className="filters">
        <div className="searchInput_Container">
          <input
          className="search"
          placeholder="Busca un lugar..." 
          onChange={handleChange}
          />
        </div>
        <div className="filtro_aguas">
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Tipo de aguas</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Aguas tranquilas"
              name="radio-buttons-group"
              onChange={handleChangeRadioButton}
            >
              <FormControlLabel value="Aguas tranquilas" control={<Radio />} label="Aguas tranquilas"/>
              <FormControlLabel value="Aguas bravas" control={<Radio />} label="Aguas bravas"/>
            </RadioGroup>
          </FormControl>
        </div>

        <Button className="btn-filtro" onClick={handleResetearFiltro} variant="primary">
                Resetear filtros
        </Button>
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
      </div>
      </div>
      </>
  );
}

export default Lugares;