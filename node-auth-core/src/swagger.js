// swagger.js

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node Authentication API',
      version: '1.0.0',
      description: 'API documentation for the Node Authentication application',
    },
    components: {
      securitySchemes: {
        BearerAuth: { 
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
    },
  },
  apis: ['./routes/*.js'], // API yollarını buraya ekleyin
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
