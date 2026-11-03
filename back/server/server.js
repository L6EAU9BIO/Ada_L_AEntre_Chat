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
import routerLogin from "../routes/login.js"
import { errorHandler } from "../middlewares/errorHandler.js";

// MIDDLEWARES
const app = express();
app.use(express.json());
app.use(cors());
app.use(errorHandler);
app.use((req, res, next) => {
  console.log("REQUÊTE :", req.method, req.originalUrl); // test de routes a enlever 
  next();
});
// ROUTES

app.use("/api/inscription", routerLogin)
app.use("/api/admin", routerAdmin);
app.use("/api/chat", routerChat);
app.use("/api/client", routerClient);
app.use("/api/reservation", routerReservation);
app.use("/api/staff", routerStaff);
app.use("/api/task", routerTask);
// GET /api/health/db => healthRoutes => controller => service => model
app.use("/api", healthRoutes);

app.get("/", async (req, res) => {
  res.send("Connexion établie !")
})

// MIDDLEWARE ERREUR (après les routes)
app.use((err, req, res, next) => {
  console.error("[erreur]", err.stack || err.message);
  res.status(err.status || 500).json({ erreur: "Une erreur est survenue" });
});

// DÉMARRAGE
app.listen(3000, () => {
  console.log("Serveur sur http://localhost:3000");
  // Test de connexion PostgreSQL au démarrage
  testConnexionDemarrage();
});