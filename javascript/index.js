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
                <p class="card-text descriptionProduit">Description de la caméra ${cameras.name} : ${cameras.description}</p>
                <!-- Afficher la description du produit ZURSS 50S "description" -->
                <p class="card-text descriptionProduit">Les différents objectifs : ${cameras.lenses[0]}</p>
                <div class="test"></div>
                <!-- Afficher le prix du produit ZURSS 50S en euros "price" -->
                <p class="prixProduit"><strong>${cameras.price / 100} € </strong></p>
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
        </div>; `;

        // console.log(cameras.lenses[i]);
        
        const choixLentilles = (lenses) => {
            let option = document.createElement('option');
            let test = document.querySelector('.test')
            option.setAttribute('value', choixLentilles);
            option.innerHTML = choixLentilles;
            option.appenChild(test);
        }


        
        }
        

    
});


