let cameraEnregistrerDansLocalStorage = JSON.parse(localStorage.getItem("cameraPanier"));
// JSON.parse permets de convertir les données au format JSON en Objet JS dans le LS
console.log(cameraEnregistrerDansLocalStorage);

// ------ AFFICHAGE DES CAMERAS DANS LE PANIER ------
//Je sélectionne la classe où je veux injecte le code HTML
const affichageProduitPanier = document.querySelector("#container-produits-panier");
const affichagePanierVide = document.querySelector("#container-panier-vide")
// console.log(affichageProduitPanier);

//Si le panier est vide
if(cameraEnregistrerDansLocalStorage === null){
    const panierVide = 
    `
    <div class="container-panier-vide py-4 ">
        <div class="display-4 fst-italic text-center">Votre panier est vide</div>
    </div>
    `
    affichagePanierVide.innerHTML = panierVide;
//Si le panier n'est pas vide, j'affiche les produits de mon LS    
} else {
    let structureProduitPanier = [];
    
    for (k = 0; k < cameraEnregistrerDansLocalStorage.length; k++) {
        
        structureProduitPanier = structureProduitPanier + `
                    <tr>
                        <td class="text-center"><img src="${cameraEnregistrerDansLocalStorage[k].imageCamera}" class="" style="height: 100px;"/></td>
                        <td> ${cameraEnregistrerDansLocalStorage[k].nomCamera}</td>
                        <td>1</td>
                        <td>${cameraEnregistrerDansLocalStorage[k].lensesCamera}</td>
                        <td class="text-right">${cameraEnregistrerDansLocalStorage[k].prixCamera} €</td>
                        <td class="text-right"><button class="btn btn-sm btn-danger"><i class="fa fa-trash"></i> </button> </td>
                    </tr>    
        `;    
    }
    if (k == cameraEnregistrerDansLocalStorage.length) {
        //Injection html dans la page panier
        affichageProduitPanier.innerHTML = structureProduitPanier;
    }
    
    
}