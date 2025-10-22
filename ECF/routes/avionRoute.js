import { Router } from "express";
import Avion from "../models/Avion.js";

const router = Router();

router.post("/", async (req, res) => {
    try{
        
        const avion = await Avion.create(req.body);
        res.redirect("/api/avion");
    }catch(err){

    }
});

router.put("/", async (req, res) => {
    try{
        console.log("put");
        
        const avion = await Avion.create(req.body);
        res.redirect("/api/avion");
    }catch(err){

    }
});

router.get("/", async (req, res) => {
    try{
        const avions = await Avion.find();
        // console.log(avions);
        res.render("avion/index", {avions});
    }catch(err){

    }
});

router.get("/new", async (req, res) => {
    try{
        res.render("avion/new");
    }catch(err){

    }
});

router.delete("/:id", async (req, res) => {
    await Avion.findByIdAndDelete(req.params.id);
    res.redirect("/api/avion");
});

export default router;