
import mongoose from "mongoose";

const avionSchema = new mongoose.Schema(
  {
    modele: { type: String, required: true, trim: true },
    compagnie: { type: String, required: true, trim: true },
    capacite: {
      type: Number,
      required: true,
      min: [1, "La capacité doit être ≥ 1"],
      max: [10, "La capacité ne doit pas dépasser 10"],
    },
    enService: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Avion", avionSchema);
