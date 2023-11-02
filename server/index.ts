// Importation de Express
import {randomUUID} from "crypto";

const express = require('express');
const cors = require("cors");

// Création d'une instance d'Express
const app = express();

// Autorise les requêtes en provenance de n'importe quelle origine
app.options("*", cors())

app.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.json());

// Définition d'une route pour l'URL racine
app.get('/', (req: any, res: any) => {
    res.send('Hello World!');
});

// Retourne la liste de tous les modèles 3D
app.get('/api/models', (req: any, res: any) => {
    const data = require('./data/models.json');

    res.send(data);
});

// Retourne un modèle par son ID
app.get('/api/models/:id', (req, res) => {
    const data = require('./data/models.json');
    const model = data.find((m: any) => m.id === req.params.id);

    if (!model) {
        res.status(404).send('Le modèle n\'a pas été trouvé.');
    } else {
        res.send(model);
    }
});

// Création d'un nouveau modèle 3D
app.post('/api/models', (req, res) => {
    const data = require('./data/models.json');
    const model = {
        id: randomUUID(),
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        author: req.body.author,
        polygons: req.body.polygons,
        modelName: req.body.modelName
    };

    data.push(model);

    res.send(model);
});

// Mise à jour d'un modèle 3D
app.put('/api/models/:id', (req, res) => {
    const data = require('./data/models.json');
    const model = data.find((m: any) => m.id === req.params.id);

    if (!model) {
        res.status(404).send('Le modèle n\'a pas été trouvé.');
    } else {
        model.name = req.body.name;
        model.description = req.body.description;
        model.date = req.body.date;
        model.author = req.body.author;
        model.polygons = req.body.polygons;
        model.modelName = req.body.modelName;

        res.send(model);
    }
});

// Suppression d'un modèle 3D
app.delete('/api/models/:id', (req, res) => {
    const data = require('./data/models.json');
    const model = data.find((m: any) => m.id === req.params.id);

    if (!model) {
        res.status(404).send('Le modèle n\'a pas été trouvé.');
    } else {
        const index = data.indexOf(model);
        data.splice(index, 1);

        res.send(model);
    }
});

// Démarrage du serveur
app.listen(3333, () => {
    console.log('Le serveur est en écoute sur le port 3333...');
});
