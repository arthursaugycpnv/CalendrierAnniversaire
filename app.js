// Import librairie express
import express from 'express';

// Création du serveur web en utilisant express
const app = express();
const port = 3000;

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Lancement serveur + Ouverture d'écoute sur le port (3000)
app.listen(port, () => {
  console.log(`CalendrierAnniversaire listening on port ${port}`);
});