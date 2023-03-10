import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./CrearEvento.css";
import { crearEvento, crearLugar, fetchLugares, fetchLugarGuardadoPorNombreYDesc, fetchLugarPorNombre } from "../api";
import { FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";

const CrearEvento = () => {
  const [lugares, setLugares] = useState<any>(null);
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("2020-10-09");
  const [lugar, setLugar] = useState<any>(null);

  let token = localStorage.getItem('token');
  let user = localStorage.getItem('user_id');

  useEffect(() => {
    fetchLugares().then((data: any) => setLugares(data));
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    crearEvento(nombre, fecha, lugar, user, token);
    
   };

   const handleChangeSelect = (e: any) =>{
    fetchLugarPorNombre(e.target.value).then((data: any) => setLugar(data[0].id));
   }

  return (
    <><h1 id="form-title">Crear un nuevo evento</h1>
    
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


            <select name="cars" id="lugares" onClick={handleChangeSelect}>
                {lugares?.map((lugar: any) => (
                    <option value={lugar?.attributes?.id}>{lugar?.attributes?.nombre}</option>
                ))}
            </select>
          </div>
          <br />
          <Button variant="contained" color="primary" type="submit">
              Crear evento
          </Button>
      </form></>
  );
};

export default CrearEvento;