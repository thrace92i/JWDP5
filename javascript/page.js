// 1° lien A vers B
// 2° ID 
// 3° URL -> doit se terminer par l'ID du produit
// j'ai une URL de base qui doit s'incrémenter avec l'ID du produit que je récupère


  
// 4° étudier la fonction window.location et j'y incrémente l'ID (voir Cahier des charges)

// 5° fonction onclick

// **** CONNEXION API ****

let urlApiPage = 'http://localhost:3000/api/cameras';
let urlProduit = window.location.search;
let searchUrl = new URLSearchParams(urlProduit);
let ID = searchUrl.get('id');



fetch(urlApiPage)
    .then(response => response.json())
    .then(dataCamerasPage => {
        console.log(dataCamerasPage._id);
        console.log(dataCamerasPage);
        for(let cameras of dataCamerasPage){
            let recuperationIdCamera = [cameras._id];
            console.log(recuperationIdCamera);
            
            console.log(window.location);

            for (let i = 0; i < recuperationIdCamera.length; i++ ){
                adressePage = 'http://localhost:3000/api/cameras/:'+recuperationIdCamera;
                console.log(adressePage);
            }
        }
    });
