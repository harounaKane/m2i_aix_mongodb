import { Router } from "express";
import Passager from "../models/Passager.js";

const router = Router();


router.post("/", async (req, res) => {
  try {
    const passager = await Passager.create(req.body);
    res.status(201).json(passager);
  } catch (err) {

    if (err.code === 11000) {
      return res.status(400).json({ error: "Cet email est déjà utilisé." });
    }
    res.status(400).json({ error: err.message });
  }
});

export default router;
