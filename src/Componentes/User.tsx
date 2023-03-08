import React, { useEffect, useState } from 'react';
import './User.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { checkHasToken } from '../utils';
import { fetchLugarPorUsuario, fetchUsuario } from '../api';
import { useParams } from 'react-router-dom';
import ImageOne from './../img/user.jpg';
import { Button } from '@mui/material';

function User() {
  const [lugares, setLugares] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  let { username } = useParams();

useEffect(() => {
    fetchLugarPorUsuario(username).then((data: any) => setLugares(data));
    fetchUsuario(username).then((data: any) => setUser(data));
}, []);

const redirectToLugar = (id: any) => {
  window.location.replace(`/lugar/${id}`);
}

if(!checkHasToken()){
  window.location.replace("/login");
  return null;
}

  return (
    <>
    <div className="wrapper-users">
      <div className='App container'>
        <Card sx={{ maxWidth: 345 }} key={user?.attributes?.username}>
          <CardMedia
            component="img"
            alt="lugar"
            height="260"
            image={ImageOne} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {user?.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">

            </Typography>
          </CardContent>
          <CardActions className="text-container">
            <Typography fontSize={17} gutterBottom variant="h6" component="div">
              Nombre de usuario: {user?.username}
            </Typography>
            <Typography fontSize={17} gutterBottom variant="h6" component="div">
              Email de usuario: {user?.email}
            </Typography>
          </CardActions>
        </Card>
      </div>
      <h1 id="lugares-title">Lugares creados por el usuario:</h1>
      <div className='lugares'>
      {lugares?.map((lugar: any) => (
          <><Card style={{ width: '18rem', margin: '15px', cursor: 'pointer' }}>
              <Typography onClick={() => redirectToLugar(lugar?.id)} fontWeight={600}>{lugar?.attributes?.nombre}</Typography>
              <div className="controlBtns">
                <Button id="btnMaps" href={lugar?.attributes?.ubicacion}>
                  Ver en google maps
                </Button>
              </div>
          </Card><br /></>
        ))}
      </div>
      </div>
      
      </>
  );
}

export default User;