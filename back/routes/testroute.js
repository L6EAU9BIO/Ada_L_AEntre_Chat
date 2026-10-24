

// Role : mapper l'URL vers le controller (+ middleware auth si besoins)
const express = ('express')
const router = express.Router()
const DBController = require('')

// Get /db-test => DBController.testConnexion
router.get('/db-test', DBController.testconnexion)

module.export = router;