import { Router } from "express";
import Billet from "../models/Billet.js";
import Vol from "../models/Vol.js";
import Passager from "../models/Passager.js";

const router = Router();


router.post("/", async (req, res) => {
  const { vol: volId, passager: passagerId } = req.body;

  try {
    const vol = await Vol.findById(volId);
    if (!vol) return res.status(404).json({ error: "Vol introuvable" });

    const passager = await Passager.findById(passagerId);
    if (!passager) return res.status(404).json({ error: "Passager introuvable" });


    const volMaj = await Vol.findOneAndUpdate(
      { _id: volId, placesRestantes: { $gt: 0 } }, // empêche le < 0
      { $inc: { placesRestantes: -1 } },
      { new: true }
    );
    if (!volMaj) {
      return res.status(400).json({ error: "Plus de places disponibles sur ce vol." });
    }

    const billet = await Billet.create(req.body);
    return res.status(201).json(billet);
  } catch (err) {
    try {
      await Vol.findByIdAndUpdate(volId, { $inc: { placesRestantes: 1 } });
    } catch (_) {}
    return res.status(400).json({ error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const billet = await Billet.findById(req.params.id);
    if (!billet) return res.status(404).json({ error: "Billet introuvable" });

    await Billet.findByIdAndDelete(billet._id);
    await Vol.findByIdAndUpdate(billet.vol, { $inc: { placesRestantes: 1 } });

    res.json({ message: "Billet supprimé et place ré-attribuée au vol." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
