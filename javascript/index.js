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
        // console.log(dataCameras);
        for (let cameras of dataCameras){
            affichageProduitIndex.innerHTML += 
            `
            
                <div class="col-lg-6 mt-2 mb-2">
                    <div class="card">
                        <img class="card-img-top imageProduit bg-image hover-overlay ripple shadow-1-strong rounded" src="${cameras.imageUrl}" alt="${cameras.name}">
                            <div class="card-body">
                                 <h4 class="card-title d-flex justify-content-center">${cameras.name}</h4>
                            <div class="row">
                                <div class="col d-flex justify-content-center">
                                    <p class="btn btn-danger btn-block"><strong>${cameras.price / 100} € </strong></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col d-flex justify-content-center">
                                    <a href="page.html?_id=${cameras._id}"  class="btn button-info-orange-color btn-block pageCamera">En savoir plus</a>	
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }     
});



