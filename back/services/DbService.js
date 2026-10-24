// Role : toute la logique metier 
//  Regle : "la connextion est ok si la base répond avec un horaire"
const DbModel = require()

async function verifierConnexion() {
    const connect = await DbModel.getHeureServeur()

    // Regle : si l abase ne répond rien , on considere la connextion comme null
    if (!connect) {
        throw new Error('La base de donnée ne répond pas..')
    }
    // ...connect" copie le contenue de connect dans l'objet 
    return {connect: true, ...connect }
}

// Test au démarrage du serveur : meme logique , mais avec des des console.log
async function testConnexionDemarrage() {
    // try / catch , si une erreur survint , on la recupere dans le catch (sans tous faire planté..)
    try{
        const resultat = await DbModel.getOkHeure()
        console.log('Connexion PostgreSQL OK :', resultat)
    } catch (err) {
        console.error('Erreur de connexion PostgreSQL :', err.message)
    }
};

module.exports = { verifierConnexion, testConnexionDemarrage }