const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Mural de Eventos',
    version: '1.0.0',
    description: 'API para gerenciamento de eventos e comentários no mural universitário',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor Local'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [{
    bearerAuth: []
  }]
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'], // Caminho para os arquivos de rotas onde serão definidos os comentários de documentação
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerSpec)
};
