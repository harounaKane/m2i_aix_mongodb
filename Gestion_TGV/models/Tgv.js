import { model, Schema } from "mongoose";

export default model("Tgv", new Schema({
    numero: {type: String, require: true, unique: true},
    origine: {type: String, require: true},
    destination: {type: String, require: true},
    heureDepart: {type: Date, require: true},
    placesTotales:{type: Number, require: true, default: 100, min: 0},
    placesRestantes:{type: Number, require: true, default: 100, min: 0},
}));