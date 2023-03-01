export const fetchUsuario = (username?: string) => {
  return fetch(`http://localhost:1337/api/users/?filters[username][$eq]=${username}`)
    .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi[0];
      }
    )
};

export const fetchUsuarios = () => {
  return fetch("http://localhost:1337/api/users")
    .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi;
      }
    )
};

export const fetchLugares = () => {
    return fetch("http://localhost:1337/api/lugares?populate=deep")
      .then(response => response.json())
      .then(
        (resultadoApi) => {
          return resultadoApi.data;
        }
      )
};

export const fetchLugar = (id?: string) => {
  return fetch(`http://localhost:1337/api/lugares/${id}?populate=deep`)
    .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi.data;
      }
    )
};

export const fetchLugarPorNombre = (nombre?: string) => {
  return fetch(`http://localhost:1337/api/lugares?populate=deep&filters[nombre][$contains]=${nombre}`)
    .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi.data;
      }
    )
};

export const fetchLugarPorUsuario = (user_creador?: string) => {
  return fetch(`http://localhost:1337/api/lugares?populate=deep&filters[user_creador][username][$eq]=${user_creador}`)
    .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi.data;
      }
    )
};

export const fetchLugarPorNombreYDesc = (texto?: string) => {
  return fetch(`http://localhost:1337/api/lugares?populate=deep&filters[$or][0][nombre][$contains]=${texto}&filters[$or][1][descripcion][$contains]=${texto}`)
    .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi.data;
      }
    )
};

export const fetchLugarPorTipoAguas = (tipo?: string) => {
  return fetch(`http://localhost:1337/api/lugares?populate=deep&filters[tipo][nombre][$contains]=${tipo}`)
    .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi.data;
      }
    )
};

export const fetchLugaresGuardados = (userId?: string, token?: any) => {
  return fetch(`http://localhost:1337/api/lugares-guardados?populate=deep&filters[user][id][$eq]=${userId}`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
  })
    .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi.data;
      }
    )
}

export const fetchEventos = () => {
    return fetch("http://localhost:1337/api/eventos?populate=deep")
      .then(response => response.json())
      .then(
        (resultadoApi) => {
          return resultadoApi.data;
        }
      )
};

export const fetchEventoEntreFechas = (fechaDesde?: string, fechaHasta?: string) => {
  return fetch(`http://localhost:1337/api/eventos?populate=deep&filters[fecha][$gte]=${fechaDesde}&filters[fecha][$lte]=${fechaHasta}`)
    .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi.data;
      }
    )
};

export const login = (user: string, password: string) => {
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
      }).then((respo) => respo.json())
      .then((res) => {
            if(res?.jwt){
              localStorage.setItem("token", res?.jwt);
              localStorage.setItem("user_id", res?.user?.id);
              window.location.reload();
            }else{
              alert("Usuario invalido, revise sus credenciales");
            }
      });
}

export const guardarLugar = (lugar: string, user: any, token: any) => {
    fetch("http://localhost:1337/api/lugares-guardados?populate=deep", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        "data": {
            "lugar": lugar,
            "user": user
        }
    })
    })
    .then((respo) => respo.json())
}

export const eliminarLugar = (idLugar: string, token: any) => {
    return fetch(`http://localhost:1337/api/lugares-guardados/${idLugar}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }})
    .then(response => response.json())
}

export const registro = (user: string, email: string, password: string) => {
  fetch("http://localhost:1337/api/auth/local/register", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    username: user,
    email: email,
    password: password
})
  }).then((respo) => respo.json())
  .then((res) => {
        if(res?.jwt){
          localStorage.setItem("token", res?.jwt);
          localStorage.setItem("user_id", res?.user?.id);
          window.location.reload();
        }else{
          alert("Datos invalidos");
        }
  });
}