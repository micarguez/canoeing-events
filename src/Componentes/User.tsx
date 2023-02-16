import React, { useEffect, useState } from 'react';
import './Lugar.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { checkHasToken } from '../utils';
import { fetchUsuarioPorUsername } from '../api';
import { useParams } from 'react-router-dom';
function User() {
  const [user, setUser] = useState<any>(null);
  let { username } = useParams();

useEffect(() => {
    fetchUsuarioPorUsername(username).then((data: any) => setUser(data));
}, []);


if(!checkHasToken()){
  window.location.replace("/login");
  return null;
}

  return (
    <div className='App container'>
         <Card sx={{ maxWidth: 345 }} key={user?.attributes?.username}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Hola {user?.attributes?.username}</Button>
                
                <Button size="small">{user?.attributes?.email}</Button>
            </CardActions>
        </Card>
    </div>
  );
}

export default User;