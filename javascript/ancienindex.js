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

// Connexion à l'API via la méthode fetch pour les données au format JSON
fetch("http://localhost:3000/api/cameras")
  .then((data) => data.json()) /* Récupérération des données au format JSON */
  .then(jsonListProduits => { /* Inscription des données dans jsonlistProduits */
    for (const jsonProduits of jsonListProduits) { /* Transfert des données JSON dans class Produit avec le constructeur et this avec Boucle for of */
        let produit = new Produit(jsonProduits) /* Création variable de la classe Produit récupérant les données */
        /* Affichage des produits sur l'index HTML avec template */
        document.querySelector("#affichageProduit").innerHTML += `<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 m-3">
                                                                        <div class="col-sm-12 col-md-12 col-lg-12">
                                                                        <div class="card shadow-sm">
                                                                            <!-- Insérer l'image du produit ZURSS 50S http://localhost:3000/images/vcam_1.jpg  -->
                                                                            <img src="${produit.imageUrl}" alt="" class="imgProduit">

                                                                            <div class="card-body">
                                                                            <!-- Afficher le nom du produit ZURSS 50S "name" -->
                                                                            <h2 class="text-center nomProduit">${produit.name}</h2>
                                                                            <!-- Afficher l'ID du produit ZURSS 50S "_id" -->
                                                                            <h3 class="idProduit">${produit._id}</h3>
                                                                            <!-- Afficher la description du produit ZURSS 50S "description" -->
                                                                            <p class="card-text descriptionProduit">${produit.description}</p>
                                                                            <!-- Afficher le prix du produit ZURSS 50S en euros "price" -->
                                                                            <p class="prixProduit">${produit.price}</p>
                                                                            <div class="d-flex justify-content-center align-items-center">
                                                                                <div class="btn-group">
                                                                                <!-- Afficher la page du produit ZURSS 50S au clique sur le bouton -->
                                                                                <button type="button" class="btn btn-sm btn-outline-primary">En savoir plus</button>
                                                                                <!-- Ajouter au panier le produit ZURSS 50S au clique sur le bouton -->
                                                                                <button type="button" class="btn btn-sm btn-outline-success ajoutPanier"data-id ="${produit._id}">Ajouter au panier</button>
                                                                                </div>
                                                                            </div>
                                                                            </div>
                                                                        </div>
                                                                        </div>
                                                                    </div> `;
    }
    /* Sélection des boutons pour ajouter au panier et mise en place d'une boucle qui ajoute au LocalStorage les produits selon leur ID */ 
    document.querySelectorAll(".ajoutPanier").forEach(panier => { /* boucle forEach */
         panier.addEventListener("click", function() { /* ajout de l'évènement click sur les boutons Ajouter au panier */
            ajouterPanier(this.dataset.id);
         })
     })   
    });

/* Création d'une Classe Produit pour y associer chaque élément de l'API JSON  */
  class Produit {
      constructor(jsonProduits){
          jsonProduits && Object.assign(this, jsonProduits);
          
      }
  }

/* Création d'une Class RecuperationProduits  */
  class RecuperationProduits {
      constructor(listeProduits) {
          this.listeProduits = listeProduits;
      }
  }
  
  fetch("http://localhost:3000/api/camera/}")