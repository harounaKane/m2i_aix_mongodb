import express from "express";
import { connect } from "mongoose";
import produitRoute from "./routes/ProduitRoute.js"
import etudiantRoute from "./routes/EtudiantRoute.js";

const app = express();
app.use(express.json());

app.use("/produits", produitRoute);
app.use("/etudiants", etudiantRoute);

// connexion à mongoDB
connect("mongodb://localhost:27017/TP_2")
.then(() => console.log("connecté à mongoDB OK"))
.catch(() => console.log("connecté à mongoDB KO"));


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => console.log(`serveur lancé sur le port http://localhost:3000`) );