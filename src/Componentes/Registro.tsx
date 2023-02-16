import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Registro.css";
import { registro } from "../api";

const Registro = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleSubmit = async (e: any) => {
  e.preventDefault();
  registro(user, email, password);
};

const hasLoginToken = localStorage.getItem("token");

  if(hasLoginToken){
    window.location.replace("/");
  }

  return (
    <form
      className="root"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
        <TextField
          label="Usuario"
          type="user"
          autoComplete="false"
          value={user}
          onChange={(e: any) => setUser(e.target.value)}
        />
         <br />
         <br />
         <TextField
          label="Email"
          type="email"
          autoComplete="false"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />
         <br />
         <br />
        <TextField
          label="Password"
          type="password"
          autoComplete="false"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <Button variant="contained" color="primary" type="submit">
        Registrarse
      </Button>
    </form>
  );
};

export default Registro;