import { Router } from "express";
import Vol from "../models/Vol.js";
import Avion from "../models/Avion.js";

const router = Router();

router.post("/", async (req, res) => {
    try{
        
        const {avion: avionId} = req.body;
        const avion = await Avion.findById(avionId);

        const volData = {
            ...req.body,
            placesRestantes: avion.capacite
        }

        await Vol.create(volData);
        res.redirect("/api/vol");
    }catch(err){
        res.status(404).json({"msg": err.message});
    }
});

router.get("/", async (req, res) => {
        console.log("vols");
    try{
        const vols = await Vol.find().populate("avion");        
        res.render("vol/index", {vols});
    }catch(err){
        res.status(404).json({"msg": err.message});
    }
});

router.get("/new", async (req, res) => {
    try{
        const avions = await Avion.find({enService: true}).sort({compagnie: 1});
        res.render("vol/new", {avions});
    }catch(err){
        res.status(404).json({"msg": err.message});
    }
});

export default router;