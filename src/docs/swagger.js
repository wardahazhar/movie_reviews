const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Movie Review API',
        version: '1.0.0',
        description: 'API for managing movie reviews',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: ['./src/routes/*.js'], // Path to the API docs
  };
  
  module.exports = options;
