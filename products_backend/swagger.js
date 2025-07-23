const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Express API',
      version: '1.0.0',
      description: 'A simple Express API documented with Swagger',
    },
    components: {
      schemas: {
        Product: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Unique product ID' },
            name: { type: 'string', description: 'Name of the product' },
            price: { type: 'number', description: 'Product price' },
            description: { type: 'string', description: 'Product description' },
          },
          required: ['id', 'name', 'price'],
        },
        ProductInput: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Name of the product' },
            price: { type: 'number', description: 'Product price' },
            description: { type: 'string', description: 'Product description' },
          },
          required: ['name', 'price'],
        }
      }
    },
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
