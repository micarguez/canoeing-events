import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./CrearLugar.css";
import { crearLugar } from "../api";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

const CrearLugar = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("1");
  const [ubicacion, setUbicacion] = useState("");
  const [imagen_url, setImagen_url] = useState("");

  let token = localStorage.getItem('token');
  let user = localStorage.getItem('user_id');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    crearLugar(nombre, descripcion, tipo, ubicacion, imagen_url, user, token);
    
    setNombre("");
    setDescripcion("");
    setTipo("1");
    setUbicacion("");
    setImagen_url("");
   };

   const handleChangeRadioButton = (event: { target: { value: any; }; }) => {
    let subs = event.target.value.split(' ')
    if(subs[1] == "bravas"){
        setTipo("1");
    }else if(subs[1] == "tranquilas"){
        setTipo("2");
    }
    
  };

  return (
    <><h1 id="form-title">Crear un nuevo lugar</h1>
    
    <form
          className="root"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
      >

          <div className="fields">
              <TextField
                  label="Nombre"
                  type="string"
                  autoComplete="false"
                  helperText="El nombre debe ser único"
                  value={nombre}
                  onChange={(e: any) => setNombre(e.target.value)} />
              <br />
              <br />
              <TextField
                  label="Descripcion"
                  type="string"
                  autoComplete="false"
                  multiline
                  value={descripcion}
                  onChange={(e: any) => setDescripcion(e.target.value)} />
              <br />
              <br />
              <div className="radio_aguas">
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Tipo de aguas</FormLabel>
                    <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Aguas bravas"
                    name="radio-buttons-group"
                    onChange={handleChangeRadioButton}
                    >
                    <FormControlLabel value="Aguas bravas" control={<Radio />} label="Aguas bravas"/>
                    <FormControlLabel value="Aguas tranquilas" control={<Radio />} label="Aguas tranquilas"/>
                    </RadioGroup>
                </FormControl>
            </div>
              <TextField
                  label="Ubicacion"
                  type="string"
                  autoComplete="false"
                  value={ubicacion}
                  onChange={(e: any) => setUbicacion(e.target.value)} />
              <br />
              <br />
              <TextField
                  label="URL de la imagen"
                  type="string"
                  autoComplete="false"
                  value={imagen_url}
                  onChange={(e: any) => setImagen_url(e.target.value)} />
              <br />
              <br />
              
          </div>
          <br />
          <Button variant="contained" color="primary" type="submit">
              Crear lugar
          </Button>
      </form></>
  );
};

export default CrearLugar;