let cameraEnregistrerDansLocalStorage = JSON.parse(localStorage.getItem("cameraPanier"));
// JSON.parse permets de convertir les données au format JSON en Objet JS dans le LS
console.log(cameraEnregistrerDansLocalStorage);

// ------ AFFICHAGE DES CAMERAS DANS LE PANIER ------
//Je sélectionne la classe où je veux injecte le code HTML
const affichageProduitPanier = document.querySelector("#container-produits-panier");
// console.log(affichageProduitPanier);

//Si le panier est vide
if(cameraEnregistrerDansLocalStorage === null){
    const panierVide = 
    `
    <div class="container-panier-vide py-4 "> 
        <div class="display-4 fst-italic">Votre panier est vide</div>
    </div>
    `
    affichageProduitPanier.innerHTML = panierVide;
//Si le panier n'est pas vide, j'affiche les produits de mon LS    
} else {
    let structureProduitPanier = [];
    
    for (k = 0; k < cameraEnregistrerDansLocalStorage.length; k++) {
        
        structureProduitPanier = structureProduitPanier + `
        <div class="container-récapitulatif col-sm">
            <div> Quantité 1 - ${cameraEnregistrerDansLocalStorage[k].nomCamera} avec l'objectif : ${cameraEnregistrerDansLocalStorage[k].lensesCamera}</div> 
            <div>${cameraEnregistrerDansLocalStorage[k].prixCamera} €- Supprimer article</div>
        </div>
        `;    
    }
    if (k == cameraEnregistrerDansLocalStorage.length) {
        //Injection html dans la page panier
        affichageProduitPanier.innerHTML = structureProduitPanier;
    }
    
    
}