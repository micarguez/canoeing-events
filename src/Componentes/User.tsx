import React, { useEffect, useState } from 'react';
import './User.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { checkHasToken } from '../utils';
import { fetchUsuario } from '../api';
import { useParams } from 'react-router-dom';
import ImageOne from './../img/user.jpg';

function User() {
  const [user, setUser] = useState<any>(null);
  let { username } = useParams();

useEffect(() => {
    fetchUsuario(username).then((data: any) => setUser(data));
}, []);


if(!checkHasToken()){
  window.location.replace("/login");
  return null;
}

  return (
    <div className='App container'>
         <Card sx={{ maxWidth: 345 }} key={user?.attributes?.username}>
            <CardMedia
              component="img"
              alt="lugar"
              height="240"
              image={ImageOne}
            />
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
  );
}

export default User;