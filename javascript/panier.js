let cameraEnregistrerDansLocalStorage = JSON.parse(localStorage.getItem("cameraPanier"));
// JSON.parse permets de convertir les données au format JSON en Objet JS dans le LS
console.log(cameraEnregistrerDansLocalStorage);

// ------ AFFICHAGE DES CAMERAS DANS LE PANIER ------
//Je sélectionne la classe où je veux injecte le code HTML
const affichageProduitPanier = document.querySelector("#container-produits-panier");
const affichagePanierVide = document.querySelector("#container-panier-vide")
// console.log(affichageProduitPanier);

//Si le panier est vide
if(cameraEnregistrerDansLocalStorage === null || cameraEnregistrerDansLocalStorage == 0 ){
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
                        <td class="text-right"><button class="btn btn-sm btn-danger btn-supprimer"><i class="fa fa-trash"></i> </button> </td>
                    </tr>    
        `;    
    }
    if (k == cameraEnregistrerDansLocalStorage.length) {
        //Injection html dans la page panier
        affichageProduitPanier.innerHTML = structureProduitPanier;
    }
}

// ------- Bouton supprimer un article -------

//Sélection des boutons supprimer

let btnSupprimer = document.querySelectorAll(".btn-supprimer");
console.log(btnSupprimer);

for (let l = 0; l < btnSupprimer.length; l++ ){
    btnSupprimer[l].addEventListener("click", (e) => {
        e.preventDefault();

        //Sélection de l'id du produit qui va être supprimer en cliquant sur le bouton
        let id_suppression = cameraEnregistrerDansLocalStorage[l].idCamera;
        console.log("id_suppression");
        console.log(id_suppression);

        //Utilisation de la méthode filter
        cameraEnregistrerDansLocalStorage = cameraEnregistrerDansLocalStorage.filter( el => el.idCamera !== id_suppression);
        console.log(cameraEnregistrerDansLocalStorage);

        //J'envoie la varaible dans le LS
        localStorage.setItem("cameraPanier", JSON.stringify(cameraEnregistrerDansLocalStorage));

        //Création alerte pour dire que le produit a été supprimer et recharger la page avec window.location
        alert("La caméra a été retiré du panier");
        window.location.href = "formulaire.html";

    })
}

//----- Le montant total du panier -----
let prixTotalCalcul = [];

//Récupération des prix dans panier
for (let m = 0; m < cameraEnregistrerDansLocalStorage.length; m++ ){
    //Je récupère les prix produits du panier
    let prixProduitDansPanier = cameraEnregistrerDansLocalStorage[m].prixCamera;

    //Insertion des prix paniers récupérer dans le tableau prixTotalCalcul
    prixTotalCalcul.push(prixProduitDansPanier);
    console.log(prixTotalCalcul);
}

//Addition des prix stockés du panier dans le prixTotalCalcul

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixTotalCalcul.reduce(reducer);
console.log(prixTotal);

//Injection du HTML pour prix total
const affichagePrixTotal = 
`
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td><strong>Total</strong></td>
        <td class="text-right" id="affichagePrixTotal"><strong>${prixTotal} €</strong></td>
    </tr>
`

affichageProduitPanier.insertAdjacentHTML("beforeend", affichagePrixTotal);