import { model, Schema } from "mongoose";

const billetSchema = new Schema({
    tgvId:{type: Schema.Types.ObjectId, ref: "Tgv", require: true},
    passagerNom: {type: String, require: true},
    classe: {type: String, enum: ["seconde", "première"], default: "seconde",  require: true},
    prix: {type: Number, require: true, min: 0},
    place: {type: String,  require: true},  
    dateAchat: {type: Date, default: Date.now}
});

export default model("Billet", billetSchema);