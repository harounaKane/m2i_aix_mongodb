import mongoose from "mongoose";

const billetSchema = new mongoose.Schema(
  {
    vol: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vol",
      required: true, 
    },
    passager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Passager",
      required: true, 
    },
    numeroSiege: { type: String, required: true}, 
    classe: {
      type: String,
      enum: ["Economie", "Affaires", "Première"],
      default: "Economie",
    },
    prix: {
      type: Number,
      required: true,
      min: [50, "Le prix doit être > 0"],
    },
    dateReservation: { type: Date, default: Date.now },
    modePaiement: {
      type: String,
      enum: ["CB", "PayPal", "Espèces"],
      required: true,
    },
    statut: {
      type: String,
      enum: ["confirmé", "annulé"],
      default: "confirmé",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Billet", billetSchema);
