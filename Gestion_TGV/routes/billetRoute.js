import { Router } from "express";
import Tgv from "../models/Tgv.js";
import Billet from "../models/Billet.js";
import mongoose from "mongoose";

const router = Router();

// router.post("/", async (req, res) => {

//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try{
//         const { tgvId } = req.body;
//         const tgv = await Tgv.findById(tgvId).session(session);

//         if( !tgv ) return res.status(404).json({"msg": "Ce TGV n'existe pas !"});

//         if(tgv.placesRestantes <= 0) 
//             return res.status(404).json({"msg": "Ce TGV n'a plus de place!"});
        
//         tgv.placesRestantes -= 1;
        
//         const billet = await Billet.create(req.body, {session});
        
//         await tgv.save();
        
//         return res.status(201).json(billet);

//     }catch (err){
//         return res.status(404).json({"erreur": err.message});
//     }
// });

router.post("/", async (req, res) => {
    try{
        const { tgvId } = req.body;
        const tgv = await Tgv.findById(tgvId);

        if( !tgv ) return res.status(404).json({"msg": "Ce TGV n'existe pas !"});

        if(tgv.placesRestantes <= 0) return res.status(404).json({"msg": "Ce TGV n'a plus de place!"});
        
        tgv.placesRestantes -= 1;
        
        const billet = await Billet.create(req.body);
        
        await tgv.save();

        return res.status(201).json(billet);

    }catch (err){
        return res.status(404).json({"erreur": err.message});
    }
});


router.get("/:origin/:dest", async (req, res) => {
    const billets = await Tgv.aggregate([
        {$match: {origine: req.params.origin, destination: req.params.dest}},
        {$lookup: {from: "billets", localField: "_id", foreignField: "tgvId", as: "billets"}},
      //  {$unwind: "$billets"},
        {$project: {
            _id: 0, origine: 1, destination: 1, placesRestantes: 1, 
      //      client: "$billets.passagerNom",
            passagers: {
                $map: {input: "$billets", as: "billet", in: "$$billet.passagerNom"}
            }
        }}
    ]); 

    console.log(req.params.dest);

    res.status(201).json(billets);
});

export default router;