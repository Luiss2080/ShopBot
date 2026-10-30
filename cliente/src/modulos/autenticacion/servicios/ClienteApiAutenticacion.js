import InstanciaClienteHttpAxios from '../../../compartido/cliente-http/InstanciaClienteHttpAxios';

class ClienteApiAutenticacion {
  static async registrar({ nombre, email, password }) {
    const respuesta = await InstanciaClienteHttpAxios.post('/autenticacion/registro', {
      nombre,
      email,
      password
    });
    return respuesta.data;
  }

  static async iniciarSesion({ email, password }) {
    const respuesta = await InstanciaClienteHttpAxios.post('/autenticacion/iniciar-sesion', {
      email,
      password
    });
    return respuesta.data;
  }

  static async obtenerPerfil(idUsuario) {
    const respuesta = await InstanciaClienteHttpAxios.get(`/autenticacion/perfil/${idUsuario}`);
    return respuesta.data;
  }
}

export default ClienteApiAutenticacion;
