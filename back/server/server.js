// IMPORTS
import "dotenv/config";
import express from "express";
import cors from "cors";
import healthRoutes from "../routes/healthRoutes.js";
import { testConnexionDemarrage } from "../services/DbService.js";

// MIDDLEWARES
const app = express();
app.use(express.json());
app.use(cors());

// ROUTES
// GET /api/health/db => healthRoutes => controller => service => model
app.use("/api", healthRoutes);

// MIDDLEWARE ERREUR (après les routes)
app.use((err, req, res, next) => {
  console.error("[erreur]", err.message);
  return res.status(500).json({ erreur: "Une erreur est survenue" });
});

// DÉMARRAGE
app.listen(3000, () => {
  console.log("Serveur sur http://localhost:3000");
  // Test de connexion PostgreSQL au démarrage
  testConnexionDemarrage();
});