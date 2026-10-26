
// routes/healthRoutes.js
import { Router } from 'express'
import { testConnexion } from '../controllers/DbController.js'

const router = Router()
router.get('/health/db', testConnexion)   // GET, pas POST : on ne fait que lire

export default router