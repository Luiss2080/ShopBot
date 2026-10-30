'use strict';

const ServicioGestionAutenticacion = require('../../servidor/dominios/autenticacion/servicios/ServicioGestionAutenticacion');
const ServicioCriptografiaContrasenas = require('../../servidor/dominios/autenticacion/servicios/ServicioCriptografiaContrasenas');

describe('ServicioGestionAutenticacion - Pruebas Unitarias Aisladas', () => {
    it('debe registrar un nuevo usuario con sal y hash criptográfico', async () => {
        const mockRepoUsuarios = {
            buscarPorEmail: jest.fn().mockResolvedValue(null),
            crearUsuario: jest.fn().mockImplementation((datos) => ({
                ...datos,
                id: 1,
                obtenerPerfilPublico: () => ({ id: 1, nombre: datos.nombre, email: datos.email, rol: datos.rol })
            }))
        };

        const servicio = new ServicioGestionAutenticacion(mockRepoUsuarios, ServicioCriptografiaContrasenas);
        const perfil = await servicio.registrarNuevoUsuario({
            nombre: 'Lucía Torres',
            email: 'lucia@example.com',
            password: 'PasswordSeguro123'
        });

        expect(perfil).toHaveProperty('id', 1);
        expect(perfil.email).toBe('lucia@example.com');
        expect(mockRepoUsuarios.crearUsuario).toHaveBeenCalled();
        expect(mockRepoUsuarios.crearUsuario.mock.calls[0][0]).toHaveProperty('passwordHash');
        expect(mockRepoUsuarios.crearUsuario.mock.calls[0][0]).toHaveProperty('salt');
    });

    it('debe rechazar registro con error 409 si el correo ya existe', async () => {
        const mockRepoUsuarios = {
            buscarPorEmail: jest.fn().mockResolvedValue({ id: 1, email: 'existente@example.com' })
        };

        const servicio = new ServicioGestionAutenticacion(mockRepoUsuarios);

        await expect(servicio.registrarNuevoUsuario({
            nombre: 'Usuario Duplicado',
            email: 'existente@example.com',
            password: 'Password123'
        })).rejects.toThrow('Ya existe una cuenta registrada');
    });

    it('debe autenticar exitosamente cuando la contraseña coincide', async () => {
        const sal = ServicioCriptografiaContrasenas.generarSalAleatoria();
        const hash = ServicioCriptografiaContrasenas.hashearContrasena('MiPasswordCorrecto', sal);

        const mockRepoUsuarios = {
            buscarPorEmail: jest.fn().mockResolvedValue({
                id: 5,
                email: 'usuario@valido.com',
                passwordHash: hash,
                salt: sal,
                obtenerPerfilPublico: () => ({ id: 5, email: 'usuario@valido.com', nombre: 'Test' })
            })
        };

        const servicio = new ServicioGestionAutenticacion(mockRepoUsuarios, ServicioCriptografiaContrasenas);
        const resultado = await servicio.autenticarUsuario({
            email: 'usuario@valido.com',
            password: 'MiPasswordCorrecto'
        });

        expect(resultado).toHaveProperty('id', 5);
    });

    it('debe rechazar login con error 401 si la contraseña es incorrecta', async () => {
        const sal = ServicioCriptografiaContrasenas.generarSalAleatoria();
        const hash = ServicioCriptografiaContrasenas.hashearContrasena('Correcto', sal);

        const mockRepoUsuarios = {
            buscarPorEmail: jest.fn().mockResolvedValue({
                id: 5,
                email: 'usuario@valido.com',
                passwordHash: hash,
                salt: sal
            })
        };

        const servicio = new ServicioGestionAutenticacion(mockRepoUsuarios, ServicioCriptografiaContrasenas);

        await expect(servicio.autenticarUsuario({
            email: 'usuario@valido.com',
            password: 'PasswordIncorrecto'
        })).rejects.toThrow('Credenciales incorrectas');
    });
});

