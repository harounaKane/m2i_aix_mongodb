// Top 5 produit 
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
]);

// CA mensuel
db.commandes.aggregate([
  {$match: {statut: {$ne: "annulée"}}},
  {
    $group: {
      _id: {
        $dateToString: {format: "%Y-%m", date: "$createdAt"}
      },
      CA: {$sum: "$totalTTC"}
    }
  },
  {
    $project: {_id: 0, periode: "$_id", CA: 1}
  },
  {$sort: {periode: -1}}
]);