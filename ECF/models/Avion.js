import { model, Schema } from "mongoose";

const AvionSchema = new Schema({
    model: {type: String, required: true},
    compagnie: {type: String, required: true},
    capacite: {type: Number, required: true, max: 10},
    enService: {type: Boolean, default: true}
});


export default model("Avion", AvionSchema);