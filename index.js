'use strict';

const instanciarServidorHttp = require('./servidor/InicializadorServidorHttp');
const VariablesEntornoServidor = require('./servidor/configuracion/VariablesEntornoServidor');

const aplicacion = instanciarServidorHttp();
const puerto = VariablesEntornoServidor.puertoServidor;
const host = VariablesEntornoServidor.hostServidor;

if (require.main === module) {
    aplicacion.listen(puerto, host, () => {
        console.log('='.repeat(55));
        console.log('🤖 ShopBot API - Servidor Inicializado Exitosamente');
        console.log('='.repeat(55));
        console.log(`🌐 Acceso HTTP: http://${host}:${puerto}`);
        console.log(`📡 Entorno: ${VariablesEntornoServidor.entornoEjecucion}`);
        console.log('='.repeat(55));
    });
}

process.on('unhandledRejection', (errorCritico) => {
    console.error('❌ Error no controlado detectado:', errorCritico);
    process.exit(1);
});

module.exports = aplicacion;
