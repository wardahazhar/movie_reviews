const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const movieReviewRoutes = require('./routes/movieReviewRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerSpec = require('./docs/swagger');

const app = express();

app.use(express.json());
app.use('/api/movies', movieReviewRoutes);     
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerSpec)));

const PORT = process.env.PORT;
const DB_URL = process.env.mongodburl;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB Sucessfully');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.log(err));

app.get("/insert")