// Création de la fonction pour afficher les produits sur la Page d'acceuil

// Création de mes variables
const affichageProduitIndex = document.getElementById("affichageProduit");
const image = document.querySelector(".imgProduit");
const nom = document.querySelector(".nomProduit");
const id = document.querySelector(".idProduit");
const description = document.querySelector(".descriptionProduit");
const prix = document.querySelector(".prixProduit");

// Test de mes variables
console.log(affichageProduitIndex);

// Création variable url API
let urlApi = 'http://localhost:3000/api/cameras';



// Connexion à l'API via la méthode fetch pour les données au format JSON
fetch(urlApi)
    .then(response => response.json())
    .then(dataCameras => {
        console.log(dataCameras);
        for (let cameras of dataCameras){
            affichageProduitIndex.innerHTML += `<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 m-3">
            <div class="col-sm-12 col-md-12 col-lg-12">
            <div class="card shadow-sm">
                <!-- Insérer l'image de la caméra "imageUrl"  -->
                <img src="${cameras.imageUrl}" alt="${cameras.name}" class="imgProduit">

                <div class="card-body">
                <!-- Afficher le nom de la caméra "name" -->
                <h2 class="text-center nomProduit">${cameras.name}</h2>
                <!-- Afficher la description du produit ZURSS 50S "description" -->
                <p class="card-text descriptionProduit">${cameras.description}</p>
                <!-- Afficher les options de la caméra "lenses" -->
                <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                <label class="form-check-label" for="flexRadioDefault1">
                    ${cameras.lenses[0]}
                </label>
                </div>
                <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                <label class="form-check-label" for="flexRadioDefault1">
                    ${cameras.lenses[1]}
                </label>
                </div>
                <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                <label class="form-check-label" for="flexRadioDefault1">
                     ${cameras.lenses[2]}
                </label>
                </div>
                <!-- Afficher le prix du produit ZURSS 50S en euros "price" -->
                <p class="prixProduit">${cameras.price}</p>
                <div class="d-flex justify-content-center align-items-center">
                    <div class="btn-group">
                    <!-- Afficher la page du produit ZURSS 50S au clique sur le bouton -->
                    <button type="button" class="btn btn-sm btn-outline-primary">En savoir plus</button>
                    <!-- Ajouter au panier le produit ZURSS 50S au clique sur le bouton -->
                    <button type="button" class="btn btn-sm btn-outline-success ajoutPanier"data-id ="${cameras._id}">Ajouter au panier</button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>; `
        }
    
    });
    

