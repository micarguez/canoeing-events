import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "./Menu";
import "./Login.css";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";

const Login = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try{
            fetch("http://localhost:1337/api/auth/local", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    identifier: user,
                    password: password
                })

            }).then((res) => res.json())
                .then((res) => {
                    if(res?.jwt){
                        localStorage.setItem("token", res?.jwt);
                        alert(`Bienvenido ${res?.user?.username}`);
                        window.location.reload();
                    }
                    else{
                        alert("Usuario invalido, revise sus credenciales");
                    }
                });
        } catch (error){
            console.log(error);
        }
    };

    const hasLoginToken = localStorage.getItem("token");

return(
    hasLoginToken ? <Menu /> :

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
            value={user}
            onChange={(e: any) => setUser(e.target.value)}
            />
            <br />
            <br />
            <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            />
        </div>
        <br />
        <Button variant="contained" color="primary" type="submit">
            Iniciar sesion
        </Button>
    </form>

);
};

export default Login;