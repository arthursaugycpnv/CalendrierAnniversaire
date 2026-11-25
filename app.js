// Import librairie express
import express from 'express';

import swaggerUi from 'swagger-ui-express';
import { openApiSpecification } from './swagger.js'
import auth from "./middlewares/auth.js";

import birthdaysRouter from './routes/birthdays.js';
import usersRouter from './routes/users.js'

// Création du serveur web en utilisant express
const app = express();
const port = 3000;

app.use(express.json())

// doc swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpecification, { explorer: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// TODO : A décider si tout le monde peut avoir accés a une liste universelle
app.use('/api/birthdays', auth, birthdaysRouter)

app.use('/api/users', usersRouter)

export default app
