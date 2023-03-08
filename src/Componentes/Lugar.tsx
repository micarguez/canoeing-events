import React, { useEffect, useState } from 'react';
import './Lugar.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { checkHasToken } from '../utils';
import { crearReviewLugar, fetchLugar, fetchReviewPorLugar } from '../api';
import { useParams } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import { TextField } from '@mui/material';

function Lugar() {
  const [lugar, setLugar] = useState<any>(null);
  const [rating, setRating] = useState("");
  const [comentario, setComentario] = useState("");
  const [reviews, setReviews] = useState([])


  let token = localStorage.getItem('token');
  let userId = lugar?.attributes?.user_creador.data.id;
  let { id } = useParams();

useEffect(() => {
  fetchLugar(id).then((data: any) => setLugar(data));
  fetchReviewPorLugar(id).then((data: any) => setReviews(data));
}, []);

const redirectToUser = (username: any) => {
  window.location.replace(`/users/${username}`);
}

const handleSubmit = async (e: any) => {
  e.preventDefault();
  crearReviewLugar(comentario, rating, id, userId, token);
  fetchReviewPorLugar(id).then((data: any) => setReviews(data));
  alert("Creado correctamente!")
  setRating("");
  setComentario("");
};

if(!checkHasToken()){
  window.location.replace("/login");
  return null;
}

  return (

    <>
    <div className="wrapper">
    <div className='App container'>

      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="lugar"
          height="240"
          image={lugar?.attributes?.imagen_url} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {lugar?.attributes?.nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {lugar?.attributes?.descripcion}
          </Typography>
        </CardContent>
        <CardActions>
          <Typography variant="body2" color="text.secondary">
            Usuario creador: {lugar?.attributes?.user_creador.data.attributes.username}
          </Typography>
          <Button size="small" onClick={() => redirectToUser(lugar?.attributes?.user_creador.data.attributes.username)}>
            <PersonIcon />
          </Button>
          <Button variant="contained" color="primary" href={lugar?.attributes?.ubicacion} size="small">Ver en google maps</Button>
        </CardActions>
      </Card>

        <form
          className="root"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >

          <div className="fields">
            <TextField
              label="Rating"
              type="string"
              autoComplete="false"
              multiline
              value={rating}
              onChange={(e: any) => setRating(e.target.value)} />
            <br />
            <br />
            <TextField
              label="Comentario"
              type="string"
              autoComplete="false"
              multiline
              rows={4}
              value={comentario}
              onChange={(e: any) => setComentario(e.target.value)} />
            <br />
            <br />
          </div>
          <br />
          <Button variant="contained" color="primary" type="submit">
            Crear reseña
          </Button>
        </form>
      </div>

      </div>
      <div className="reviews">
      {reviews?.map((review: any) => (
          <>
          <Card sx={{ maxWidth: 345 }} className="card">
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {review?.attributes?.rating}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {review?.attributes?.comentario}
          </Typography>
        </CardContent>
        <CardActions>
          <Typography variant="body2" color="text.secondary">
          Usuario creador: {review?.user?.data?.attributes?.username}
          </Typography>
          <Button size="small" onClick={() => redirectToUser(lugar?.attributes?.user_creador.data.attributes.username)}>
            <PersonIcon />
          </Button>
        </CardActions>
      </Card></>
      ))}
      </div>
      </>
  );
}

export default Lugar;
