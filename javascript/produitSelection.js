// récupération de la chaîne de requête dans l'URL
const queryString_url_id = window.location.search;

//Extraction de l'ID
const urlSearchParams = new URLSearchParams(queryString_url_id);

//Récupération de l'ID avec la méthode get
const leId = urlSearchParams.get('_id');
// console.log(leId);

const erreur = "Il y a une erreur dans l'URL de l'API";

//Affichage du produit (de l'objet dans l'API) qui a été sélectionné par l'ID

let affichagePageProduit = document.querySelector('#affichagePageProduit');
// console.log(affichagePageProduit);

//Avec fetch et en mettant la valeur de l'ID à la fin de l'URL

// Fonction asynchrone fetch pour récupérer la page de la caméra avec son ID

async function idProduitSelectionner() {
    //Appel de l'API avec ID
    //Utilisation d'un Try & Catch pour capturer les erreurs
    try {
        let data = await fetch('http://localhost:3000/api/cameras/' + leId);
        const idCameras = await data.json();
        // console.log(idCameras);
        if (data.ok)
            affichagePageProduit.innerHTML += `<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 m-3">
            <div class="col-sm-12 col-md-12 col-lg-12">
            <div class="card shadow-sm">
                <!-- Insérer l'image de la caméra "imageUrl"  -->
                <img src="${idCameras.imageUrl}" alt="${idCameras.name}" class="imgProduit">

                <div class="card-body">
                <!-- Afficher le nom de la caméra "name" -->
                <h2 class="text-center nomProduit">${idCameras.name}</h2>
                <!-- Afficher la description du produit ZURSS 50S "description" -->
                <p class="card-text descriptionProduit">Description de la caméra ${idCameras.name} : ${idCameras.description}</p>
                <!-- Afficher la description du produit ZURSS 50S "description" -->
                <p class="card-text descriptionProduit">Les différents objectifs : ${idCameras.lenses}</p>
                <div class="test"></div>
                <!-- Afficher le prix du produit ZURSS 50S en euros "price" -->
                <p class="prixProduit"><strong>${idCameras.price / 100} € </strong></p>
                <div class="d-flex justify-content-center align-items-center">
                    <div class="btn-group">
                    <!-- Afficher la page du produit ZURSS 50S au clique sur le bouton -->
                    <a href="page.html?_id=${idCameras._id}"  class="btn btn-sm btn-outline-primary pageCamera">En savoir plus</a>
                    <!-- Ajouter au panier le produit ZURSS 50S au clique sur le bouton -->
                    <button type="button" class="btn btn-sm btn-outline-success ajoutPanier"data-id ="${idCameras._id}">Ajouter au panier</button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>; `;
    } catch (erreur) {
        console.log(erreur);
    }

}

// this async function awaits for weather() to return
async function run() {
    await idProduitSelectionner()
}

// this runs first
run();