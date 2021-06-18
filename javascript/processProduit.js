// Rechercher l'adresse de la page actuelle
let Url = window.location.search
// Création variable
let urlSearch = new URLSearchParams(Url);
// Récupération de la valeur associé à l'ID
let id = urlSearch.get('id');
// création d'un tableau vide
let arrayCamera = [];
let arrayList = [];
//Sélection des éléments dans le DOM
let totalArticle = '';
let boutonArticle = '';
let ajouterArticle ='';

let prix = document.querySelector('prixProduit');
//Fonction pour ajouter caractéristiques du meubles
// A complêter

// Fonctio asynchrone fetch pour récupérer la page de la caméra avec son ID

// const getProduit = async function(){
//     try

//     let response = await fetch('http://localhost:3000/api/cameras'+ id);
//     if (response.ok) {
//         let cameras = await response.json() 
//     }
//     console.log(cameras instanceof Object)
//     prix.innerHTML = cameras.price;

// }

btnValid.addEventListener('click', function(e){
    //Si le nombre total d'article est différent de 0 et strictement inférieur à 2 
    // Alors arrayCamera.push, on ajoute (camera.name, camera.prix)
    //Dans le localStorage(panier, il faut ID, prix etc)
    // En cas d'erreur span erreur.innerHTML 
} ) 

console.log(object);