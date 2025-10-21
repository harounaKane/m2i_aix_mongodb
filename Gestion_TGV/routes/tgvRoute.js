import { Router } from "express";
import Tgv from "../models/Tgv.js";
import Billet from "../models/Billet.js";

const router = Router();

router.post('/', async (req, res) => {
    try{
        const tgv = await Tgv.create(req.body);
        res.status(201).json(tgv);
    }catch(err){
        res.status(404).json({erreur: err.message});
    }
});

router.put('/:id', async (req, res) => {
    try{
        const tgv = await Tgv.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).json(tgv);
    }catch(err){
        res.status(404).json({erreur: err.message});
    }
});

router.get("/", async (req, res) => {
    try{
        const tgv = await Tgv.find();
        res.status(201).json(tgv);
    }catch(err){
        res.status(404).json({erreur: err.message});
    }
});


router.get("/:id", async (req, res) => {
    try{
        const tgv = await Tgv.findById(req.params.id);
        if( !tgv ) return res.status(400).json({"error": "Aucun TGV par cet ID"});
        res.status(201).json(tgv);
    }catch(err){
        res.status(404).json({erreur: err.message});
    }
});

router.delete("/:id", async (req, res) => {
    const billeExist = await Billet.exists({tgvId: req.params.id});

    if( billeExist ) return res.status(201).json({"msg": "Suppresion pas possible. Il y a des billets sur ce train"});

    const deletedTgv = await Tgv.findByIdAndDelete(req.params.id);

    if( !deletedTgv ) return res.status(404).json({"msg": "Ce train n'existe pas"});

    res.status(201).json({"msg": "Train supprimé"});
});

export default router;