import { model, Schema } from "mongoose";

const volSchema = new Schema(
  {
    numeroVol: { type: String, required: true },
    origine: { type: String, required: true },
    destination: { type: String, required: true },
    dateDepart: { type: Date, required: true },
    dateArrivee: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return this.dateDepart && v > this.dateDepart; 
        },
        message: "dateArrivee doit être strictement supérieure à dateDepart",
      },
    },
    avion: {
      type: Schema.Types.ObjectId,
      ref: "Avion",
      required: true,
    },
   
    placesRestantes: {
      type: Number,
      required: true, 
      min: [0, "placesRestantes ne peut pas être négatif"],
    },

    statut: {
      type: String,
      enum: ["prévu", "retardé", "terminé", "annulé"],
      default: "prévu",
    },
  },
  { timestamps: true }
);

export default model("Vol", volSchema);
