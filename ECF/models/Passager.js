import  { model, Schema } from "mongoose";

const passagerSchema = new Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: {
      type: String,
      required: true
    },
    pays: { type: String, required: true },
    dateInscription: {
      type: Date,
      default: Date.now, 
    },
  },
  { timestamps: true }
);


export default model("Passager", passagerSchema);
