
// Création de mes variables
const affichageProduitIndex = document.getElementById("affichageProduit");

const URLCamerasAPI = 'http://localhost:3000/api/cameras';


//fonction asynchrone pour contacter l'API et recevoir l'ensemble des caméras

const recuperationCamerasAPI = async function (URLApi) {
    try{
        console.log("L'URL est :" + URLApi);
        let response = await fetch(URLApi)
        if (response.ok) {
            let dataCameras = await response.json()
            console.log(dataCameras);
            return dataCameras;
        }else{
            console.error("Il y a une erreur dans l'URL");
        } 
    } catch (e){
        console.log(e);
    }
}

// Création de la fonction pour afficher les produits sur la Page d'acceuil

recuperationCamerasAPI(URLCamerasAPI)
    .then(function (cameras){
        for (let index = 0; index < cameras.length; index++ ){
            affichageProduitIndex.innerHTML += 
            `
            
                <div class="col-lg-6 mt-2 mb-2">
                    <div class="card">
                        <img class="card-img-top imageProduit bg-image hover-overlay ripple shadow-1-strong rounded" src="${cameras[index].imageUrl}" alt="${cameras[index].name}">
                            <div class="card-body">
                                 <h4 class="card-title d-flex justify-content-center mx-auto my-2">${cameras[index].name} - ${cameras[index].price / 100} €</h4>
                            <div class="row">
                                <div class="col d-flex justify-content-center">
                                    <a href="page.html?_id=${cameras[index]._id}"  class="btn button-info-orange-color btn-block fw-800 text-uppercase pageCamera">En savoir plus</a>	
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    });



