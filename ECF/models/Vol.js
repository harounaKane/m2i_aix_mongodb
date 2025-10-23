import { model, Schema } from "mongoose";

const VolSchema = new Schema({
    numeroVol: {type: String, required: true, unique: true}, // ex: "AF742"
    origine: {type: String, required: true}, // ex: "Paris"
    destination: {type: String, required: true}, // ex: "Dakar"
    dateDepart: {type: Date, required: true},
    dateArrivee: {
        type: Date, 
        required: true,
        validate: {
            validator: function(v){
                return this.dateDepart && v > this.dateDepart;
            },
            message: "La date d'arrivée doit être plus grande ...."
        }
    },
    avion: {type: Schema.Types.ObjectId, ref: "Avion", required: true}, // référence vers un avion
    statut: {type: String, enum: ["prévu", "retardé", "terminé", "annulé"], default: "prévu"},
    placesRestantes: {type: Number, required: true}
});

export default model("Vol", VolSchema);