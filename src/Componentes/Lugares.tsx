import React, { useEffect, useState } from 'react';
import './Lugares.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { checkHasToken } from '../utils';
import { fetchLugares, fetchLugarPorNombreYDesc, fetchLugarPorTipoAguas, fetchLugarPorUsuario, fetchUsuarios, guardarLugar } from '../api';
import { Alert, Box, CardActions, Collapse, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

function Lugares() {
  
const [lugares, setLugares] = useState([])

const [usuarios, setUsuarios] = useState([])

useEffect(() => {
  fetchLugares().then((data: any) => setLugares(data));
  fetchUsuarios().then((data: any) => setUsuarios(data));
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

const handleSubmit = async (lugar: any) => {
  let user = localStorage.getItem('user_id');
  let token = localStorage.getItem('token');
  guardarLugar(lugar, user, token);
  alert('Se guardó el lugar correctamente!');
};


const redirectToLugar = (id: any) => {
  window.location.replace(`/lugar/${id}`);
}

const redirectToLugaresUsuario = (username: any) => {
  fetchLugarPorUsuario(username).then((data: any) => setLugares(data));
  
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
          <><Card style={{ width: '18rem', margin: '15px', cursor: 'pointer' }}>
            <Card.Img onClick={() => redirectToLugar(lugar?.id)} key={lugar?.attributes?.nombre} variant="top" src={lugar?.attributes?.imagen_url} />
            <Card.Body>
              <Card.Title>{lugar?.attributes?.nombre}</Card.Title>
              <Card.Text>
                {lugar?.attributes?.descripcion}
              </Card.Text>
              <div className="controlBtns">
                <Button id="btnMaps" href={lugar?.attributes?.ubicacion} variant="primary">
                  Ver en google maps
                </Button>
                  <Button id="btnSave" onClick={(e:any) => handleSubmit(lugar?.id)} variant="primary">
                    <SaveIcon />
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

export default Lugares;