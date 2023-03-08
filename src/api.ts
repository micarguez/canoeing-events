const URL = "http://localhost:1337/api";

export const fetchUsuario = (username?: string) => {
  return fetch(`${URL}/users/?filters[username][$eq]=${username}`)
    .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi[0];
      }
    )
};

export const fetchUsuarios = () => {
  return fetch(`${URL}/users`)
    .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi;
      }
    )
};

export const fetchLugares = () => {
    return fetch(`${URL}/lugares?populate=deep`)
      .then(response => response.json())
      .then(
        (resultadoApi) => {
          return resultadoApi.data;
        }
      )
};

export const fetchLugar = (id?: string) => {
  return fetch(`${URL}/lugares/${id}?populate=deep`)
    .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi.data;
      }
    )
};

export const fetchLugarPorNombre = (nombre?: string) => {
  return fetch(`${URL}/lugares?populate=deep&filters[nombre][$contains]=${nombre}`)
    .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi.data;
      }
    )
};

export const fetchLugarPorUsuario = (user_creador?: string) => {
  return fetch(`${URL}/lugares?populate=deep&filters[user_creador][username][$eq]=${user_creador}`)
    .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi.data;
      }
    )
};

export const fetchLugarPorNombreYDesc = (texto?: string) => {
  return fetch(`${URL}/lugares?populate=deep&filters[$or][0][nombre][$contains]=${texto}&filters[$or][1][descripcion][$contains]=${texto}`)
    .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi.data;
      }
    )
};

export const fetchLugarGuardadoPorNombreYDesc = (texto?: string, userId?: string, token?: any) => {
  return fetch(`${URL}/lugares-guardados?populate=deep&filters[user][id][$eq]=${userId}&filters[$or][0][lugar][nombre][$contains]=${texto}&filters[$or][1][lugar][descripcion][$contains]=${texto}`, {
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
};

export const fetchLugarPorTipoAguas = (tipo?: string) => {
  return fetch(`${URL}/lugares?populate=deep&filters[tipo][nombre][$contains]=${tipo}`)
    .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi.data;
      }
    )
};

export const fetchLugaresGuardados = (userId?: string, token?: any) => {
  return fetch(`${URL}/lugares-guardados?populate=deep&filters[user][id][$eq]=${userId}`, {
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
    return fetch(`${URL}/eventos?populate=deep`)
      .then(response => response.json())
      .then(
        (resultadoApi) => {
          return resultadoApi.data;
        }
      )
};

export const fetchEventoEntreFechas = (fechaDesde?: string, fechaHasta?: string) => {
  return fetch(`${URL}/eventos?populate=deep&filters[fecha][$gte]=${fechaDesde}&filters[fecha][$lte]=${fechaHasta}`)
    .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi.data;
      }
    )
};

export const login = (user: string, password: string) => {
    fetch(`${URL}/auth/local`, {
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

export const crearLugar = (nombre: string, descripcion: string, tipo: string, ubicacion: string, imagen_url: string, user_creador: string, token: any) => {
  fetch(`${URL}/lugares?populate=deep`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      "data": {
        "nombre": nombre,
        "descripcion": descripcion,
        "tipo": tipo,
        "ubicacion": ubicacion,
        "imagen_url": imagen_url,
        "user_creador": user_creador
    }
})
  }).then((respo) => respo.json())
  .then((res) => {
        if(res?.jwt){
          localStorage.setItem("token", res?.jwt);
          localStorage.setItem("user_id", res?.user?.id);
          window.location.reload();
        }else{
          alert("Error al crear lugar - revise los campos");
        }
  });
}

export const guardarLugar = (lugar: string, user: any, token: any) => {
    fetch(`${URL}/lugares-guardados?populate=deep`, {
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
    return fetch(`${URL}/lugares-guardados/${idLugar}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }})
    .then(response => response.json())
}

export const crearReviewLugar = (comentario: string, rating: string, lugar: any, user: number, token: any) => {
  fetch(`${URL}/review-lugares?populate=deep`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      "data": {
        "comentario": comentario,
        "rating": rating,
        "lugar": lugar,
        "user": user,
    }
})
  }).then((respo) => respo.json())
}

export const fetchReviewPorLugar = (idLugar?: string) => {
  return fetch(`${URL}/review-lugares?populate=deep&filters[lugar][id][$eq]=${idLugar}`)
    .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi.data;
      }
    )
};

export const registro = (user: string, email: string, password: string) => {
  fetch(`${URL}/auth/local/register`, {
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