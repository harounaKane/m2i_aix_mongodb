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


// Top 5 clients par CA total
db.commandes.aggregate([
  {$match: {statut: {$ne: "annulée"}}},
  {$group: {_id: "$clientId", CA: {$sum: "$totalTTC"}}},
  {$sort: {CA: -1}},
  {$limit: 5},
  {
    $lookup: {
      from: "clients",
      localField: "_id",
      foreignField: "_id",
      as: "client"
    }
  },
  {$unwind: "$client"},
  {$project: {
    _id: 0,
    prenom: "$client.prenom",
    nom: "$client.nom",
    email: "$client.email",
    ville: "$client.adresse.ville",
    CA: 1
  }}
]);


// Panier moyen global
db.commandes.aggregate([
  {$match: {statut: {$in: ["livrée", "expédiée", "payée"]}}},
  {$group: {_id: null, caTotal:{$sum: "$totalTTC"}, nbCmd: {$sum: 1}}},
  {$project: {_id: 0, panierMoyen: {$round: [{$divide: ["$caTotal", "$nbCmd"]}, 2]}}}
]);


// Taux d’annulation
db.commandes.aggregate([
  {$group: {
    _id: null, 
    nbCmd: {$sum: 1},
    totalAnnul: {
      $sum: {
        $cond: [
          {$eq: ["$statut", "annulée"]}, 1, 0
        ]
      }
    }
  }},
  {$project: {
    _id: 0, 
    totalAnnul: 1,
    nbCmd: 1,
    tauxAnnule: {
      $round: [
        {
          $multiply: [
            {$divide: ["$totalAnnul", "$nbCmd"]}, 100
          ]
        }, 2
      ]
    }
  }}
]);


// Réachat sur 90 jours
db.commandes.aggregate([
  {$match: {createdAt: {$gte: new Date(Date.now() - 90*24*60*60*1000)}}},
  {$group: {_id: "$clientId", nbCmd: {$sum: 1}}},
  {$match: {nbCmd: {$gte: 2}}},
  {$lookup: {from: "clients", localField: "_id", foreignField: "_id", as: "client"}},
  {$unwind: "$client"},
  {$project: {
    _id: 0,
    prenom: "$client.prenom",
    nom: "$client.nom",
    email: "$client.email",
    nbCmd: 1
  }}
]);


// Ville la plus rentable, puis top 3
db.commandes.aggregate([
  {$match: {statut: {$ne: "annulée"}}},
  {$lookup: {from: "clients", localField: "clientId", foreignField: "_id", as: "client"}},
  {$unwind: "$client"},
  {$group: {_id: "$client.adresse.ville", caTotal: {$sum: "$totalTTC"}}},
  {$sort: {caTotal: -1}},
  {$limit: 3},
  {$project: {
    _id: 0,
    ville: "$_id",
    caTotal: {$round:["$caTotal", 2]}
  }}
]);

// Statistiques par catégorie produit - CA et quantités vendues par categorie
db.commandes.aggregate([
  {$match: {statut: {$ne: "annulée"}}},
  {$unwind: "$items"},
  {$lookup: {from: "produits", localField: "items.produitId", foreignField: "_id", as: "prod"}},
  {$unwind: "$prod"},
  {$group: {
    _id: "$prod.categorie", 
    qtTotal: {$sum: "$items.qte" }, 
    caTotal: {$sum: {$multiply: ["$items.qte", "$items.prixUnitaire"]}}
  }},
  {$project: {_id: 0, categorie: "$_id", qtTotal: 1, caTotal: 1}}
]);


// Clients sans commande
db.clients.aggregate([
  {$lookup: {from: "commandes", localField: "_id", foreignField: "clientId", as: "cmd"}},
  {$match: {cmd: {$size: 0}}},
  {$project: {
    nom: 1, prenom: 1
  }}
]);
