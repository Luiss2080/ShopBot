'use strict';

module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'servidor/**/*.js',
    '!servidor/configuracion/EspecificacionDocumentacionSwagger.js',
    '!servidor/dominios/asistente-chat/motor-nlp/EntrenadorCorpusConversacional.js'
  ],
  coverageThreshold: {
    global: {
      statements: 70,
      lines: 70
    }
  },
  testTimeout: 20000
};
