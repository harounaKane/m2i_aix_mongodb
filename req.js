db.commandes.aggregate([
  {$match: {statut: {$ne: "annulée"}}},
  {$unwind: "$items"},
  {$group: {
    _id: "$items.produitId",
    totalQte: {$sum: "$items.qte"}
    }
  },
  {$sort: {totalQte: -1}},
  {$limit: 5},
  {
    $lookup: {
      from: "produits",
      localField: "_id",
      foreignField: "_id",
      as: "prod"
    }
  },
  {$unwind: "$prod"},
  {$project: {
    _id: 0,
    libelle: "$prod.nom",
    totalQte: 1,
    idProd: "$prod._id"
  }}
])