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
const email2 = document.getElementById('emailConfirmation');
// console.log(email2);


// ********* EVENEMENTS FORMULAIRES *********



paiementForm.addEventListener('submit', async (e) => {
    e.preventDefault;

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

        await sendPurchaseRequest(envoieServeur);
        
})

// ----- Mettre le contenu du LS dans les champs du formulaire -----
//Récupérer la key LS et mettre dans une variable

const dataLS = localStorage.getItem('contact');

//Conversion des chaînes de caractère en objet JS
const dataLSObjet = JSON.parse(dataLS);

//Mets les valeurs du LS dans les champs formulaire
document.querySelector("#firstName").setAttribute('value', dataLSObjet.firstName);
document.querySelector("#lastName").setAttribute('value', dataLSObjet.firstName);
document.querySelector("#adresse").setAttribute('value', dataLSObjet.address);
document.querySelector("#city").setAttribute('value', dataLSObjet.city);
document.querySelector("#email").setAttribute('value', dataLSObjet.email);


/* Ecoute de la modification du champ nom  */
paiementForm.nom.addEventListener('change', function () {
    validerNom(this);

});

/* Ecoute de la modification du champ prenom  */
paiementForm.prenom.addEventListener('change', function () {
    validerPrenom(this);
});

/* Ecoute de la modification du champ email  */
paiementForm.email.addEventListener('change', function () {
    validerEmail(this);
});

paiementForm.email2.addEventListener('change', function () {
    validerEmail2(this);
});

paiementForm.adresse.addEventListener('change', function () {
    validerAdresse(this);
});

paiementForm.departement.addEventListener('change', function () {
    validerDepartement(this);
});


paiementForm.cp.addEventListener('change', function () {
    validerCp(this);
});

paiementForm.prenomcb.addEventListener('change', function () {
    validerPrenomCb(this);
});

paiementForm.nomcb.addEventListener('change', function () {
    validerNomCb(this);
});

paiementForm.numcb.addEventListener('change', function () {
    validerCodeCb(this);
});

paiementForm.codesecucb.addEventListener('change', function () {
    validerCVC(this);
});

// paiementForm.addEventListener('change', function(){
//     validerNom(this);
//     validerPrenom(this);
//     validerEmail(this);
//     validerEmail2(this);
//     validerAdresse(this);
//     validerAdresse(this);
//     validerDepartement(this);
//     validerCp(this);
//     validerPrenomCb(this);
//     validerNomCb(this);
//     validerCodeCb(this);
//     validerCVC(this);
// });





// ********* VALIDATION DES CHAMPS *********
// ***** CHAMP NOM *****

const validerNom = function (champNom) {
    /* Création regExp pour valider le champ du nom */
    /* regEx trouvé sur internet utilisé pour les passeports internationaux 
    voir lien : https://qastack.fr/programming/2385701/regular-expression-for-first-and-last-name */

    let nomRegExp = new RegExp("^[a-zA-Z '.-]*$", 'g');
    /* Test du nom du client validé ou non avec expression régulière */

    let testNom = nomRegExp.test(champNom.value);
    let messageNom = document.getElementById('messageNom');

    if (testNom == true) {
        messageNom.innerHTML = "Votre nom est valide";
        messageNom.classList.remove('text-danger');
        messageNom.classList.add('text-success');
        return true;
    } else {
        messageNom.innerHTML = "Votre nom n'est pas valide";
        messageNom.classList.remove('text-success');
        messageNom.classList.add('text-danger');
        return false;
    }

};


// ***** CHAMP PRENOM *****

const validerPrenom = function (champPrenom) {
    /* Création regExp pour valider le champ du prenom */
    /* Je décide de garder la même regEx qu'utiliser pour le nom afin de vérifier */

    let prenomRegeExp = new RegExp("^[A-Z][A-Za-z\é\è\ê\-]+$", "g");

    let testPrenom = prenomRegeExp.test(champPrenom.value);
    let messagePrenom = document.getElementById('messagePrenom');

    if (testPrenom == true) {
        messagePrenom.innerHTML = "Votre prénom est valide";
        messagePrenom.classList.remove('text-danger');
        messagePrenom.classList.add('text-success');
        return true;
    } else {
        messagePrenom.innerHTML = "Votre prénom n'est pas valide";
        messagePrenom.classList.remove('text-success');
        messagePrenom.classList.add('text-danger');
        return false;
    }
}

// ***** CHAMP EMAIL *****


const validerEmail = function (email) {
    /* Création de la regEx pour la validation e-mail */
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

    /* Tester si l'adresse mail utilisateur est validé avec l'expression régulière */

    let testEmail = emailRegExp.test(email.value);
    let emailMessage = email.nextElementSibling;
    // console.log(emailMessage);


    if (testEmail == true) {
        emailMessage.innerHTML = "L'adresse email est valide";
        emailMessage.classList.remove('text-danger');
        emailMessage.classList.add('text-success');
        return true;
    } else {
        emailMessage.innerHTML = "L'adresse e-mail est non valide";
        emailMessage.classList.remove('text-success');
        emailMessage.classList.add('text-danger');
        return false;
    }

};


// ***** CONFIRMATION EMAIL *****

const validerEmail2 = function () {

    const passwordValue = email.value;
    // console.log(passwordValue);
    const password2Value = emailConfirmation.value;
    // console.log(password2Value);
    let email2Message = emailConfirmation.nextElementSibling;
    // console.log(email2Message);

    if (passwordValue !== password2Value) {
        email2Message.innerHTML = "L'adresse email saisi n'est pas identique à celle que vous avez renseigné ci-dessus !";
        email2Message.classList.remove('text-success');
        email2Message.classList.add('text-danger');
        return false;
    } else {
        email2Message.innerHTML = "L'adresse email est confirmé !"
        email2Message.classList.remove('text-danger');
        email2Message.classList.add('text-success');
        return true;
    }
};

// ***** CHAMP ADRESSE *****
// A Retravailler

const validerAdresse = function (champAdresse) {
    /* Création de la regEx pour la validation de l'adresse*/
    // tester sur le texte fait bien entre 4 et 128 caractères
    //Case pour numéro, chiffre ou rien, du tout
    //Case pour adresse avec que des lettres

    let adresseRegExp = new RegExp('^(.){4,128}$', 'g');

    /* Tester si l'adresse utilisateur est validé avec l'expression régulière */

    let testAdresse = adresseRegExp.test(champAdresse.value);
    let adresseMessage = champAdresse.nextElementSibling;


    if (testAdresse !== true) {
        adresseMessage.innerHTML = "Veuillez vérifier votre adresse";
        adresseMessage.classList.add('text-danger');
        return false;
    } else {
        adresseMessage.classList.add('d-none');
        return true;
    }

};

// ***** CHAMP CP *****

const validerCp = function (champCp) {
    /* Création de la regEx pour la validation du CP*/
    // Rajouter jusqu'à 6 caractères possibles
    let cpRegExp = new RegExp('^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$', 'g');

    /* Tester si le Code postal utilisateur est validé avec l'expression régulière */

    let testCp = cpRegExp.test(champCp.value);
    let cpMessage = champCp.nextElementSibling;


    if (testCp !== true) {
        cpMessage.innerHTML = "Code postale incorrecte";
        cpMessage.classList.add('text-danger');
        return false;
    } else {
        cpMessage.classList.add('d-none');
        return true;
    }

};

// ***** CHAMP DEPARTEMENT *****

const validerDepartement = function (champDepartement) {
    /* Création de la regEx pour la validation du CP, tiens en compte les départements comme Bastia avec lettre */
    let departementRegExp = new RegExp('/^0[1-9]|[1-8][0-9]|9[0-8]|2A|2B$/', 'g');

    /* Tester si le département utilisateur est validé avec l'expression régulière */

    let testDepartement = departementRegExp.test(champDepartement.value);
    let departementMessage = champDepartement.nextElementSibling;


    if (testDepartement == true) {
        departementMessage.classList.add('d-none');
        return true;
    } else {
        departementMessage.innerHTML = "Département incorrecte";
        departementMessage.classList.add('text-danger');
        return false;
    }

};

// ***** PARTIE COORDONNEES BANCAIRES *****

// ***** CHAMP PRENOM CB *****

const validerPrenomCb = function (champPrenomCb) {
    /* Création regExp pour valider le champ du prenom */
    /* Je décide de garder la même regEx qu'utiliser pour le nom afin de vérifier */

    let prenomCbRegeExp = new RegExp("^[A-Z][A-Za-z\é\è\ê\-]+$", "g");

    let testPrenomCb = prenomCbRegeExp.test(champPrenomCb.value);
    let messagePrenomCb = champPrenomCb.nextElementSibling;

    if (testPrenomCb == true) {
        messagePrenomCb.innerHTML = "Le prénom sur votre CB est valide";
        messagePrenomCb.classList.remove('text-danger');
        messagePrenomCb.classList.add('text-success');
        return true;
    } else {
        messagePrenomCb.innerHTML = "Le prénom sur votre CB n'est pas valide";
        messagePrenomCb.classList.remove('text-success');
        messagePrenomCb.classList.add('text-danger');
        return false;
    }
}

// ***** CHAMP NOM CB *****

const validerNomCb = function (champNomCb) {

    /* Création regExp pour valider le champ du prenom */
    /* Je décide de garder la même regEx qu'utiliser pour le nom afin de vérifier */

    let nomCbRegeExp = new RegExp("^[a-zA-Z '.-]*$", "g");

    let testNomCb = nomCbRegeExp.test(champNomCb.value);
    let messageNomCb = champNomCb.nextElementSibling;

    if (testNomCb == true) {
        messageNomCb.innerHTML = "Le nom sur votre CB est valide";
        messageNomCb.classList.remove('text-danger');
        messageNomCb.classList.add('text-success');
        return true;
    } else {
        messageNomCb.innerHTML = "Le nom sur votre CB n'est pas valide";
        messageNomCb.classList.remove('text-success');
        messageNomCb.classList.add('text-danger');
        return false;
    }
}

const validerCodeCb = function (champCodeCb) {

    let codeCbRegeExp = new RegExp("^5[1-5][0-9]{14}$", "g");

    let testCodeCb = codeCbRegeExp.test(champCodeCb.value);
    let messageCodeCb = champCodeCb.nextElementSibling;

    if (testCodeCb == true) {
        messageCodeCb.innerHTML = "Votre code MasterCard est valide";
        messageCodeCb.classList.remove('text-danger');
        messageCodeCb.classList.add('text-success');
        return true;
    } else {
        messageCodeCb.innerHTML = "Votre code MasterCard n'est pas valide";
        messageCodeCb.classList.add('text-danger');
        messageCodeCb.classList.remove('text-success');
        return false;
    }
}

const validerCVC = function (champCvc) {
    let codeCvcRegeExp = new RegExp("^[0-9]{3,4}$", "g");

    let testCvc = codeCvcRegeExp.test(champCvc.value);
    let messageCvc = champCvc.nextElementSibling;

    if (testCvc == true) {
        messageCvc.innerHTML = "CVC valide";
        messageCvc.classList.remove('text-danger');
        messageCvc.classList.add('text-success');
        return true;
    } else {
        messageCvc.innerHTML = "CVC non valide ! Veuillez vérifier.";
        messageCvc.classList.add('text-danger');
        messageCvc.classList.remove('text-success');
        return false;
    }
}

/* Ecouter la soumission du formulaire */
paiementForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validerNom(paiementForm.nom) && validerPrenom(paiementForm.prenom) && validerEmail(paiementForm.email) && validerEmail2(paiementForm.email2) && validerAdresse(paiementForm.adresse) && validerDepartement(paiementForm.departement) && validerCp(paiementForm.cp) && validerPrenomCb(paiementForm.prenomcb) && validerNomCb(paiementForm.nomcb) && validerCodeCb(paiementForm.numcb) && validerCVC(paiementForm.codesecucb) == true) {
        paiementForm.submit();
        alert('Votre paiement à été accepté')
        window.location.href = "remerciement.html"

    } else {
        alert('Veuilliez vérifier les champs que vous avez rentré.')

    }
});


// Récupération des valeurs pour les inscrire dans le LS

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