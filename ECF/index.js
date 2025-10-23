import express from "express";
import { connect } from "mongoose";
import cors from "cors";
import methodeoverride from "method-override";

import avionRouter from "./routes/avionRoute.js";
import volRoute from "./routes/volRoute.js";
import passagerRoute from "./routes/passagerRoute.js";
import billetRoute from "./routes/billetRoute.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(methodeoverride("_method"));
app.use(express.urlencoded({ extended: true }));

connect("mongodb://127.0.0.1:27017/ecf")
    .then( () => console.log("connecté à mongo"))
    .catch( (e) => console.log("connecté à mongo failled",e));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/api/avion", avionRouter);
app.use("/api/vol", volRoute);
app.use("/api/pssager", passagerRoute);
app.use("/api/billet", billetRoute);

app.listen(3000, () => console.log("serveur sur le prot 3000"));
