//Je récupère l'adresse web de la page remerciement
let URLPageRermerciement = new URLSearchParams(window.location.search);
console.log(URLPageRermerciement);

//Je réinjecte les éléments idcommande et prixcommande dans le HTML
document.getElementById("remerciementOrderId").textContent += URLPageRermerciement.get("id_");
document.getElementById("remerciementPrix").textContent += URLPageRermerciement.get("price") + " €";
