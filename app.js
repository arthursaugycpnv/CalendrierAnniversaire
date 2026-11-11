// Import librairie express
import express from 'express';

import swaggerUi from 'swagger-ui-express';
import {openApiSpecification} from './swagger.js'

import birthdaysRouter from './routes/birthdays.js';

// Création du serveur web en utilisant express
const app = express();
const port = 3000;

app.use(express.json())

// doc swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpecification, {explorer :true}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/birthdays', birthdaysRouter)

export default app
