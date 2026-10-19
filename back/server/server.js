// IMPORTS

import express from "express";
import cors from 'cors';

// MIDLLEWARE

const app = express();
app.use(express.json());
app.use(cors());

// ROUTES

// MIDDLEWARE ERREUR

app.use((err, req, res) => {   //  <-- suppresion du next 
    console.error('[erreur]', err.message);
    return res.status(500).json({erreur : "Une erreur est survenue"});
});

// DEMARRAGE SERVEUR 


app.listen(3000, () => {
    console.log("Connecté sur le PORT 3000");
});