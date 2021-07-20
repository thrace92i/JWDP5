//Je récupère l'adresse web de la page remerciement
let URLPageRermerciement = new URLSearchParams(window.location.search);
let pageRemerciement = window.location.href;
console.log(pageRemerciement);
console.log(URLPageRermerciement);

//Je réinjecte les éléments idcommande et prixcommande dans le HTML
document.getElementById("remerciementOrderId").textContent += URLPageRermerciement.get("id_");
document.getElementById("remerciementPrix").textContent += URLPageRermerciement.get("price") + " €";


//Lorsque l'utilisateur revient en arrière, retourne au menu, ferme la page ou change de page le LS est vidé

window.onbeforeunload = function() {
    localStorage.clear();
};

//Suppression de l'alerte window beforeunload

window.removeEventListener("beforeunload");
