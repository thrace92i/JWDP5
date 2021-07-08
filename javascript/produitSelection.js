//Déclaration de mes variables

const URLCamerasAPI = 'http://localhost:3000/api/cameras/';

// récupération de la chaîne de requête dans l'URL
const queryString_url_id = window.location.search;

//Extraction de l'ID
const urlSearchParams = new URLSearchParams(queryString_url_id);

//Récupération de l'ID avec la méthode get
const leId = urlSearchParams.get('_id');
// console.log(leId);

//Affichage du produit (de l'objet dans l'API) qui a été sélectionné par l'ID
let affichagePageProduit = document.querySelector('#affichagePageProduit');

// ******* PANIER ********
//GESTION DU PANIER
//Sélection de l'ID du formulaire
let idForm = document.querySelector('#lenses_cameras')
// console.log(idForm);

//Sélection du bouton Ajouter l'article au panier

// let btnPanier = document.querySelector('#btnPanier')
// console.log(btnPanier);



const recuperationCamerasAPI = async function (URLApi) {
    try{
        console.log("L'URL est :" + URLApi + leId);
        let response = await fetch(URLApi + leId)
        if (response.ok) {
            let dataCameraId = await response.json()
            console.log(dataCameraId);
            return dataCameraId;
        }else{
            console.error("Il y a une erreur dans l'URL");
        } 
    } catch (e){
        console.log(e);
    }
}

recuperationCamerasAPI(URLCamerasAPI)
    .then(function idProduitSelectionner(dataCameraId){
        affichagePageProduit.innerHTML = 
        ` <div class="row">
        <!-- Image -->
        <div class="col-12 col-lg-6">
            <div class="card bg-light mb-3">
                <div class="card-body">
                    <a href="" data-toggle="modal" data-target="#productModal">
                        <img class="img-fluid" src="${dataCameraId.imageUrl}" alt="${dataCameraId.name}" />
                        <p class="text-center">Zoom</p>
                    </a>
                </div>
            </div>
        </div>

        <!-- Add to cart -->
        <div class="col-12 col-lg-6 add_to_cart_block">
            <div class="card bg-light mb-3">
                <div class="card-body">
                    <h3 class="text-center my-2">${dataCameraId.name}</h3>
                    <p class="price my-2">${dataCameraId.price / 100} €</p>
                    <p class="text-center my-2">${dataCameraId.description}</p>
                    <form>
                        <div class="form-group my-2">
                            <label for="lenses_cameras"><strong>Objectif disponible :</strong></label>
                            <select class="custom-select my-2" name="lenses_cameras" id="lenses_cameras">
                                <option selected>Select</option>
                            </select>
                        </div>
                        <a id="btnPanier" type="submit" name="btn-panier" class="btn btn-success btn-lg btn-block text-uppercase w-100 my-2">
                            <i class="fa fa-shopping-cart"></i> Ajouté au panier
                        </a>
                    </form>
                    <div class="product_rassurance my-3">
                        <ul class="list-inline">
                            <li class="list-inline-item my-2"><i class="fa fa-truck fa-2x"></i><br/>Livraison rapide</li>
                            <li class="list-inline-item my-2"><i class="fa fa-credit-card fa-2x"></i><br/>Paiement Sécurisé</li>
                            <li class="list-inline-item my-2"><i class="fa fa-phone fa-2x"></i><br/>+33 1 22 54 65 60</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>`
                ;

                

        
        //***** GESTION DU PANIER ******
        //Sélection de l'ID du formulaire
        let idForm = document.querySelector('#lenses_cameras')
        

        //Sélection du bouton Ajouter l'article au panier
        let btnPanier = document.querySelector('#btnPanier')
        // console.log(btnPanier);

        //Ecouter le bouton et envoyer le panier
        btnPanier.addEventListener("click", (e) => {
            e.preventDefault;

            //Mettre le choix de l'utilisateur dans une variable

            let choixObjectif = idForm.value;

            //Récupération des valeurs du formulaire

            let optionsCameras = {
                imageCamera: dataCameraId.imageUrl,
                nomCamera: dataCameraId.name,
                idCamera: dataCameraId._id,
                lensesCamera: choixObjectif,
                quantite: 1,
                prixCamera: dataCameraId.price / 100,
            }
            console.log(optionsCameras);

            // ******* LE LOCAL STORAGE ******
            // Je stocke les données du formulaire dans le local storage

            //Je décalre une variable "cameraEnregistrerDansLocalStorage"

            let cameraEnregistrerDansLocalStorage = JSON.parse(localStorage.getItem("cameraPanier"));
            // JSON.parse permets de convertir les données au format JSON en Objet JS dans le LS
            // console.log(cameraEnregistrerDansLocalStorage);

            //Fonction fenêtre popup lorsqu'on ajoute une caméra au panier
            const popupConfirmation = () => { 
                if (window.confirm(`${dataCameraId.name} avec l'objectif ${choixObjectif} a bien été ajouté à votre panier ! Consultez le panier OK ou revenir à l'acceuil ANNULER `)) {
                    window.location.href = "formulaire.html";
                }else{
                    window.location.href = "index.html";
                }
            }

            //Fonction pour ajouter un produit sélectionner dans le localStorage
            const ajoutCameraLS = () => {
                //Ajout dans le tableau la caméra avec l'objectif choisi par l'utilisateur
                cameraEnregistrerDansLocalStorage.push(optionsCameras);
                //Je transforme en format JSON pour l'envoyer dans le LS dans la key cameraPanier
                localStorage.setItem("cameraPanier", JSON.stringify(cameraEnregistrerDansLocalStorage));
            }
            
            //ENREGISTREMENT DU PRODUIT DANS LOCALSTORAGE
            //Produit enregistré dans le LS ?
            if (cameraEnregistrerDansLocalStorage) {
                ajoutCameraLS();
                popupConfirmation();
            }
            //Pas de produit enregistré dans le LS ?
            else {
                cameraEnregistrerDansLocalStorage = []
                ajoutCameraLS();
                popupConfirmation();
            }
         })

         //Le formulaire s'adapte au nombres d'objectifs possible pour une caméra
        const quantiteObjectifs = dataCameraId.lenses;
        let recupObjectif = [];

        //Création boucle for pour afficher les objectifs possibles pour la caméra

        for (let j = 0; j < quantiteObjectifs.length; j++) {
            recupObjectif = recupObjectif +
                `
                    <option value="${quantiteObjectifs[j]}">${quantiteObjectifs[j]}</option>
                    `
            // console.log(recupObjectif);
        }

        //injection html des objectifs 
        const affichageObjectif = document.querySelector('#lenses_cameras');
        affichageObjectif.innerHTML = recupObjectif;
        // console.log(affichageObjectif);

})
