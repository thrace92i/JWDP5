// Création de la fonction pour ajouter les produits au panier

function ajouterPanier(produitsId) {
    let listPanier = getPanier();
    listPanier.push(produitsId);
    saveProduitsPanier(listPanier);
}

function getPanier() {
    let listPanier = localStorage.getItem("listPanier");
    if (listPanier == null) {
        return [];
    } else {
        return JSON.parse(listPanier);
    }
}

function saveProduitsPanier(listPanier) {
    localStorage.setItem("listPanier", JSON.stringify(listPanier));
}