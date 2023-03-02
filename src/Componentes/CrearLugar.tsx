import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./CrearLugar.css";
import { crearLugar } from "../api";

const CrearLugar = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [imagen_url, setImagen_url] = useState("");
  const [user_creador, setUser_creador] = useState("");

  let token = localStorage.getItem('token');

 const handleSubmit = async (e: any) => {
  e.preventDefault();
  crearLugar(nombre, descripcion, tipo, ubicacion, imagen_url, user_creador, token);
  
  setNombre("");
  setDescripcion("");
  setTipo("");
  setUbicacion("");
  setImagen_url("");
  setUser_creador("");
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
              <TextField
                  label="Tipo"
                  type="string"
                  autoComplete="false"
                  value={tipo}
                  onChange={(e: any) => setTipo(e.target.value)} />
              <br />
              <br />
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
              <TextField
                  label="Usuario creador"
                  type="string"
                  autoComplete="false"
                  value={user_creador}
                  onChange={(e: any) => setUser_creador(e.target.value)} />
          </div>
          <br />
          <Button variant="contained" color="primary" type="submit">
              Crear lugar
          </Button>
      </form></>
  );
};

export default CrearLugar;