// IMPORTS
import "dotenv/config";
import express from "express";
import cors from "cors";
import healthRoutes from "../routes/healthRoutes.js";
import { testConnexionDemarrage } from "../services/DbService.js";
import routerAdmin from "../routes/admin.js"
import routerChat from "../routes/chat.js"
import routerClient from "../routes/client.js"
import routerReservation from "../routes/reservation.js"
import routerStaff from "../routes/staff.js"
import routerTask from "../routes/task.js"

// MIDDLEWARES
const app = express();
app.use(express.json());
app.use(cors());

// ROUTES

app.use("/api/admin", routerAdmin);
app.use("/api/chat", routerChat);
app.use("/api/client", routerClient);
app.use("/api/reservation", routerReservation);
app.use("/api/staff", routerStaff);
app.use("/api/task", routerTask);

app.get("/", async (req, res) => {
  res.send("Connexion établie !")
})

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