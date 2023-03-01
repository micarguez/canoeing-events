import React, { useEffect, useState } from 'react';
import './Lugares.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { checkHasToken } from '../utils';
import { fetchLugares, fetchLugarPorNombreYDesc, fetchLugarPorTipoAguas, fetchLugarPorUsuario, fetchUsuarios } from '../api';
import { CardActions, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';

function Lugares() {
  
const [lugares, setLugares] = useState([])

const [usuarios, setUsuarios] = useState([])

useEffect(() => {
  fetchLugares().then((data: any) => setLugares(data));
  fetchUsuarios().then((data: any) => setUsuarios(data));
  console.log(usuarios)
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

const redirectToLugaresUsuario = (user_creador: any) => {
  fetchLugarPorUsuario(user_creador).then((data: any) => setLugares(data));
  
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

        <div className="filtro_usuario">
        {usuarios?.map((user: any) => (
          <><Card>
          <CardActions className="text-container">
                <Typography fontWeight={600} fontSize={17} gutterBottom variant="h6" component="div">
                Nombre de usuario:
                </Typography>
                <Typography fontSize={16} gutterBottom variant="h6" component="div">
                {user?.username}
                </Typography>
                <Typography fontWeight={600} fontSize={17} gutterBottom variant="h6" component="div">
                Email de usuario:
                </Typography>
                <Typography fontSize={16} gutterBottom variant="h6" component="div">
                {user?.email}
                </Typography>
                <Button onClick={() => redirectToLugaresUsuario(user?.username)}>
                  Ver lugares creados por este usuario
                </Button>
            </CardActions>
          </Card><br /></>
          ))}
        </div>
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