import { Schema, Types, model } from "mongoose";

const prod = new Schema({
    libelle: {type: String, require: true},
    prix: {type: Number, require: true},
    provenance: {type: String, enum: ["France", "Canada"], default: "France"}
},{timestamps: true});

export default model("Produit", prod);


/**
 * Créer un etudiant : 
 *      prenom: string
 *      nom: string
 *      mail: string - unique
 *      note: []
 *      matieres: []
 */