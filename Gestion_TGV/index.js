import express from "express";
import { connect } from "mongoose";
import tgvRoute from "./routes/tgvRoute.js";
import billetRoute from "./routes/billetRoute.js";

const app = express();

app.use(express.json());

app.use("/api/tgv", tgvRoute);
app.use("/api/billet", billetRoute);

connect("mongodb://127.0.0.1:27017/TP_3")
    .then( () => console.log("connecté à mpongo"))
    .catch( (e) => console.log("connecté à mpongo failled",e));


app.listen(3000, () => console.log("port 3000"));