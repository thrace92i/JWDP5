let cameraEnregistrerDansLocalStorage = JSON.parse(localStorage.getItem("cameraPanier"));
// JSON.parse permets de convertir les données au format JSON en Objet JS dans le LS
console.log(cameraEnregistrerDansLocalStorage);

// ------ AFFICHAGE DES CAMERAS DANS LE PANIER ------
//Je sélectionne la classe où je veux injecte le code HTML
const affichageProduitPanier = document.querySelector("#container-produits-panier");
const affichagePanierVide = document.querySelector("#container-panier-vide")
// console.log(affichageProduitPanier);

//Si le panier est vide
if (cameraEnregistrerDansLocalStorage === null || cameraEnregistrerDansLocalStorage == 0) {
    const panierVide =
        `
    <div class="container-panier-vide py-4 ">
        <div class="display-4 fst-italic text-center">Votre panier est vide</div>
    </div>
    `
    affichagePanierVide.innerHTML = panierVide;
    //Si le panier n'est pas vide, j'affiche les produits de mon LS    
} else {
    let structureProduitPanier = [];

    for (k = 0; k < cameraEnregistrerDansLocalStorage.length; k++) {

        structureProduitPanier = structureProduitPanier + `
                    <tr>
                        <td class="text-center"><img src="${cameraEnregistrerDansLocalStorage[k].imageCamera}" class="" style="height: 100px;"/></td>
                        <td> ${cameraEnregistrerDansLocalStorage[k].nomCamera}</td>
                        <td>1</td>
                        <td>${cameraEnregistrerDansLocalStorage[k].lensesCamera}</td>
                        <td class="text-right">${cameraEnregistrerDansLocalStorage[k].prixCamera} €</td>
                        <td class="text-right"><button class="btn btn-sm btn-danger btn-supprimer"><i class="fa fa-trash"></i> </button> </td>
                    </tr>    
        `;
    }
    if (k == cameraEnregistrerDansLocalStorage.length) {
        //Injection html dans la page panier
        affichageProduitPanier.innerHTML = structureProduitPanier;
    }
}

// ------- Bouton supprimer un article -------

//Sélection des boutons supprimer

let btnSupprimer = document.querySelectorAll(".btn-supprimer");
// console.log(btnSupprimer);

for (let l = 0; l < btnSupprimer.length; l++) {
    btnSupprimer[l].addEventListener("click", (e) => {
        e.preventDefault();

        //Sélection de l'id du produit qui va être supprimer en cliquant sur le bouton
        let id_suppression = cameraEnregistrerDansLocalStorage[l].idCamera;
        console.log("id_suppression");
        console.log(id_suppression);

        //Utilisation de la méthode filter
        cameraEnregistrerDansLocalStorage = cameraEnregistrerDansLocalStorage.filter(el => el.idCamera !== id_suppression);
        console.log(cameraEnregistrerDansLocalStorage);

        //J'envoie la varaible dans le LS
        localStorage.setItem("cameraPanier", JSON.stringify(cameraEnregistrerDansLocalStorage));

        //Création alerte pour dire que le produit a été supprimer et recharger la page avec window.location
        alert("La caméra a été retiré du panier");
        window.location.href = "formulaire.html";

    })
}

//----- Le montant total du panier -----
let prixTotalCalcul = [];

//Récupération des prix dans panier
for (let m = 0; m < cameraEnregistrerDansLocalStorage.length; m++) {
    //Je récupère les prix produits du panier
    let prixProduitDansPanier = cameraEnregistrerDansLocalStorage[m].prixCamera;
    console.log(prixProduitDansPanier);

    //Insertion des prix paniers récupérer dans le tableau prixTotalCalcul
    prixTotalCalcul.push(prixProduitDansPanier);
    // console.log(prixTotalCalcul);
}

//Addition des prix stockés du panier dans le prixTotalCalcul

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixTotalCalcul.reduce(reducer);
// console.log(prixTotal);

//Injection du HTML pour prix total
const affichagePrixTotal =
    `
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td><strong>Total</strong></td>
        <td class="text-right" id="affichagePrixTotal"><strong>${prixTotal} €</strong></td>
    </tr>
`

affichageProduitPanier.insertAdjacentHTML("beforeend", affichagePrixTotal);

// ********** FORMULAIRE *************

// Création de la fonction pour valider et sécuriser le questionnaire lors du paiement
/* Sélection du questionnaire via ID */
let paiementForm = document.querySelector('#paiementForm');

// Déclaration des variables 

// déclaration des variables email

const email = document.getElementById('email');
// console.log(email);


// ********* VALIDATION DES CHAMPS *********
// ***** CHAMP NOM *****


//Récupération des champs du formulaire 

const champNom = document.getElementById("lastName");
const champPrenom = document.getElementById("firstName");
const champEmail = document.getElementById("email");
const champAdresse = document.getElementById("adresse");
const champVille = document.getElementById("city");

/* Ecoute de la modification du champ nom  */


function validateInput(regex, input, idMessage, validMessage, invalidMessage){

    
    let inputToValidate = regex.test(input.value);

    let messageInput = document.getElementById(idMessage);

    if(inputToValidate == true){
        messageInput.innerHTML = validMessage;
        messageInput.classList.remove('text-danger');
        messageInput.classList.add('text-success');
        return true
    }else{
        messageInput.innerHTML = invalidMessage;
        messageInput.classList.remove('text-success');
        messageInput.classList.add('text-danger');
        return false;
    }
}




paiementForm.addEventListener('submit', function() {

    const validationNom = validateInput(new RegExp("^([a-zA-Z]{2,}'?-?([a-zA-Z]{1,})?)", "g"), champNom, 'messageNom', "Votre nom est valide", "Votre nom n'est pas valide");
    const validationPrenom = validateInput(new RegExp("^[A-Z][A-Za-z\é\è\ê\-]+$", "g"), champPrenom, 'messagePrenom', "Votre prénom est valide","Votre prénom n'est pas valide");
    const validationEmail = validateInput(new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'), champEmail, "emailMessage", "L'adresse email est valide", "L'adresse e-mail est non valide");
    const validationAdresse = validateInput(new RegExp('^(.){4,128}$', 'g'), champAdresse, "adresseMessage", "Votre adresse est valide", "Veuillez vérifier votre adresse");
    const validationVille = validateInput(new RegExp("^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$"), champVille, "villeMessage", "Votre ville est valide", "Veuillez vérifier la saisie de votre ville");

    if(validationNom && validationPrenom && validationEmail && validationAdresse && validationVille  == true){
        alert("Paiement accepté.");
        paiementForm.submit();
        
    }else{
        alert("Veuilliez vérifier les champs que vous avez rentré.");
    }
    
    let contact = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#adresse").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value,
    }

    let products = [];
    console.log(products);

    for (let p = 0; p < cameraEnregistrerDansLocalStorage.length; p++) {
        //Je récupère les prix produits du panier
        let idPanierCamera = cameraEnregistrerDansLocalStorage[p].idCamera;
        console.log(idPanierCamera);
        products.push(idPanierCamera);
    }

    //Ancrer le formulaireValues dans le LS en convertissant les objets et ses données en châines de caractères
    localStorage.setItem('contact', JSON.stringify(contact));

    const envoieServeur = {
        contact,
        products
    }

    console.log("envoieServeur");
    console.log(envoieServeur);

    sendPurchaseRequest(envoieServeur);
        
})

const sendPurchaseRequest = async function (dataToSend) {
    console.log(dataToSend);
    try {
        let response = await fetch('http://localhost:3000/api/cameras/order', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        });

        if (response.ok) {
            let responseData = await response.json();
            window.location = 'remerciement.html?id_=' + responseData.orderId + '&price=' + prixTotal;
            localStorage.setItem('idCommande', responseData.orderId);

        } else {
            console.log("Aïe, une erreur c'est produite et la requête n'a pas abouti:");
            console.log(response.status);
        }

    } catch (error) {
        console.log(error);
    }
}


// Récupération des valeurs pour les inscrire dans le LS

