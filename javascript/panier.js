// Création de la fonction pour ajouter les produits au panier

// function ajouterPanier(produitsId) {
//     let listPanier = getPanier();
//     listPanier.push(produitsId);
//     saveProduitsPanier(listPanier);
// }

// function getPanier() {
//     let listPanier = localStorage.getItem("listPanier");
//     if (listPanier == null) {
//         return [];
//     } else {
//         return JSON.parse(listPanier);
//     }
// }

// function saveProduitsPanier(listPanier) {
//     localStorage.setItem("listPanier", JSON.stringify(listPanier));
// }

// * @description Récupère l'id du produit dans du query string de l'URL et fait une requête a l'API par ID.
//  * @returns l'objet du produit en JSON
//  */
// const getProduct = async () => {
//   const params = new URLSearchParams(window.location.search);
//   const idProduct = params.get("id");
//   let response = await fetch(apiGetUrl + idProduct).catch((err) => {
//     console.log("error", err);
//   });
//   let data = await response.json();
//   productObject = data;
//   return data;
// };


    
