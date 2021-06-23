// Création de la fonction pour valider et sécuriser le questionnaire lors du paiement
/* Sélection du questionnaire via ID */
let paiementForm = document.querySelector('#paiementForm');

// Déclaration des variables 

// déclaration des variables email

const email = document.getElementById('email');
// console.log(email);
const email2 = document.getElementById('emailConfirmation');
// console.log(email2);


/* Test récupération fonctionnaire : OK */
// console.log(paiementForm);

// ********* EVENEMENTS FORMULAIRES *********

/* Ecoute de la modification du champ nom  */
paiementForm.nom.addEventListener('change', function () {
   validerNom(this); 
   
});

/* Ecoute de la modification du champ prenom  */
paiementForm.prenom.addEventListener('change', function(){
    validerPrenom(this);
});

/* Ecoute de la modification du champ email  */
paiementForm.email.addEventListener('change', function(){
    validerEmail(this);
});

paiementForm.email2.addEventListener('change', function(){
    validerEmail2(this);
});

paiementForm.adresse.addEventListener('change', function(){
    validerAdresse(this);
});

paiementForm.departement.addEventListener('change', function(){
    validerDepartement(this);
});


paiementForm.cp.addEventListener('change', function(){
    validerCp(this);
});

paiementForm.prenomcb.addEventListener('change',  function(){
    validerPrenomCb(this);
});

paiementForm.nomcb.addEventListener('change',  function(){
    validerNomCb(this);
});

paiementForm.numcb.addEventListener('change',  function(){
    validerCodeCb(this);
});

paiementForm.codesecucb.addEventListener('change', function(){
    validerCVC(this);
});

/* Ecouter la soumission du formulaire */
paiementForm.addEventListener('submit', function(e){
    e.preventDefault();
    if(validerNom(paiementForm.nom) && validerPrenom(paiementForm.prenom) && validerEmail(paiementForm.email) && validerEmail2(paiementForm.email2) && validerAdresse(paiementForm.adresse) && validerDepartement(paiementForm.departement) && validerCp(paiementForm.cp) && validerPrenomCb(paiementForm.prenomcb) && validerNomCb(paiementForm.nomcb) && validerCodeCb(paiementForm.numcb) && validerCVC(paiementForm.codesecucb) == true){
        paiementForm.submit();
        alert('Votre paiement à été accepté')
    }else{
        alert('Veuilliez vérifier les champs que vous avez rentré.')
    }
});
// ********* VALIDATION DES CHAMPS *********
// ***** CHAMP NOM *****

const validerNom = function(champNom){
    /* Création regExp pour valider le champ du nom */
    /* regEx trouvé sur internet utilisé pour les passeports internationaux 
    voir lien : https://qastack.fr/programming/2385701/regular-expression-for-first-and-last-name */
    
    let nomRegExp = new RegExp("^[a-zA-Z '.-]*$", 'g');
    /* Test du nom du client validé ou non avec expression régulière */

    let testNom = nomRegExp.test(champNom.value);
    let messageNom = document.getElementById('messageNom');

    if(testNom == true){
        messageNom.innerHTML = "Votre nom est valide";
        messageNom.classList.remove('text-danger');
        messageNom.classList.add('text-success');
        return true;
    }else{
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

     let prenomRegeExp = new RegExp ("^[A-Z][A-Za-z\é\è\ê\-]+$", "g");

     let testPrenom = prenomRegeExp.test(champPrenom.value);
     let messagePrenom = document.getElementById('messagePrenom');

     if(testPrenom == true){
        messagePrenom.innerHTML = "Votre prénom est valide";
        messagePrenom.classList.remove('text-danger');
        messagePrenom.classList.add('text-success');
        return true;
     }else{
        messagePrenom.innerHTML = "Votre prénom n'est pas valide";
        messagePrenom.classList.remove('text-success');
        messagePrenom.classList.add('text-danger');
        return false;
     }
}

// ***** CHAMP EMAIL *****


const validerEmail = function(email) {
    /* Création de la regEx pour la validation e-mail */
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

    /* Tester si l'adresse mail utilisateur est validé avec l'expression régulière */

    let testEmail = emailRegExp.test(email.value);
    let emailMessage = email.nextElementSibling;
    console.log(emailMessage);
    

    if(testEmail == true){
        emailMessage.innerHTML = "L'adresse email est valide";
        emailMessage.classList.remove('text-danger');
        emailMessage.classList.add('text-success');
        return true;
    }else{
        emailMessage.innerHTML = "L'adresse e-mail est non valide";
        emailMessage.classList.remove('text-success');
        emailMessage.classList.add('text-danger');
        return false;
    }
    
};


// ***** CONFIRMATION EMAIL *****

const validerEmail2 = function() {

    const passwordValue = email.value;
    // console.log(passwordValue);
    const password2Value = emailConfirmation.value;
    // console.log(password2Value);
    let email2Message = emailConfirmation.nextElementSibling;
    console.log(email2Message);

    if(passwordValue !== password2Value){
        email2Message.innerHTML = "L'adresse email saisi n'est pas identique à celle que vous avez renseigné ci-dessus !";
        email2Message.classList.remove('text-success');
        email2Message.classList.add('text-danger');
        return false;
    }else{
        email2Message.innerHTML = "L'adresse email est confirmé !"
        email2Message.classList.remove('text-danger');
        email2Message.classList.add('text-success');
        return true;
    }
};

// ***** CHAMP ADRESSE *****
// A Retravailler

const validerAdresse = function(champAdresse) {
    /* Création de la regEx pour la validation de l'adresse*/
    // tester sur le texte fait bien entre 4 et 128 caractères
    //Case pour numéro, chiffre ou rien, du tout
    //Case pour adresse avec que des lettres

    let adresseRegExp = new RegExp('^(.){4,128}$', 'g');

    /* Tester si l'adresse utilisateur est validé avec l'expression régulière */

    let testAdresse = adresseRegExp.test(champAdresse.value);
    let adresseMessage = champAdresse.nextElementSibling;
    

    if(testAdresse !== true){
        adresseMessage.innerHTML = "Veuillez vérifier votre adresse";
        adresseMessage.classList.add('text-danger');
        return false;
    }else{
        adresseMessage.classList.add('d-none');
        return true;
    }
    
};

// ***** CHAMP CP *****

const validerCp = function(champCp) {
    /* Création de la regEx pour la validation du CP*/
    // Rajouter jusqu'à 6 caractères possibles
    let cpRegExp = new RegExp('^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$', 'g');

    /* Tester si le Code postal utilisateur est validé avec l'expression régulière */

    let testCp = cpRegExp.test(champCp.value);
    let cpMessage = champCp.nextElementSibling;
    

    if(testCp !== true){
        cpMessage.innerHTML = "Code postale incorrecte";
        cpMessage.classList.add('text-danger');
        return false;
    }else{
        cpMessage.classList.add('d-none');
        return true;
    }
    
};

// ***** CHAMP DEPARTEMENT *****

const validerDepartement = function(champDepartement) {
    /* Création de la regEx pour la validation du CP, tiens en compte les départements comme Bastia avec lettre */
    let departementRegExp = new RegExp('/^0[1-9]|[1-8][0-9]|9[0-8]|2A|2B$/', 'g');

    /* Tester si le département utilisateur est validé avec l'expression régulière */

    let testDepartement = departementRegExp.test(champDepartement.value);
    let departementMessage = champDepartement.nextElementSibling;
    

    if(testDepartement == true){
        departementMessage.classList.add('d-none');
        return true;
    }else{
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

    let prenomCbRegeExp = new RegExp ("^[A-Z][A-Za-z\é\è\ê\-]+$", "g");

    let testPrenomCb = prenomCbRegeExp.test(champPrenomCb.value);
    let messagePrenomCb = champPrenomCb.nextElementSibling;

    if(testPrenomCb == true){
       messagePrenomCb.innerHTML = "Le prénom sur votre CB est valide";
       messagePrenomCb.classList.remove('text-danger');
       messagePrenomCb.classList.add('text-success');
       return true;
    }else{
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

    let nomCbRegeExp = new RegExp ("^[a-zA-Z '.-]*$", "g");

    let testNomCb = nomCbRegeExp.test(champNomCb.value);
    let messageNomCb = champNomCb.nextElementSibling;

    if(testNomCb == true){
        messageNomCb.innerHTML = "Le nom sur votre CB est valide";
        messageNomCb.classList.remove('text-danger');
        messageNomCb.classList.add('text-success');
        return true;
    }else{
        messageNomCb.innerHTML = "Le nom sur votre CB n'est pas valide";
        messageNomCb.classList.remove('text-success');
        messageNomCb.classList.add('text-danger');
        return false;
    }
}

const validerCodeCb = function(champCodeCb) {
    
    let codeCbRegeExp = new RegExp("^5[1-5][0-9]{14}$", "g");

    let testCodeCb = codeCbRegeExp.test(champCodeCb.value);
    let messageCodeCb = champCodeCb.nextElementSibling;

    if(testCodeCb == true){
        messageCodeCb.innerHTML = "Votre code MasterCard est valide";
        messageCodeCb.classList.remove('text-danger');
        messageCodeCb.classList.add('text-success');
        return true;
    }else{
        messageCodeCb.innerHTML = "Votre code MasterCard n'est pas valide";
        messageCodeCb.classList.add('text-danger');
        messageCodeCb.classList.remove('text-success');
        return false;
    }
}

const validerCVC = function(champCvc) {
    let codeCvcRegeExp = new RegExp ("^[0-9]{3,4}$", "g");

    let testCvc = codeCvcRegeExp.test(champCvc.value);
    let messageCvc = champCvc.nextElementSibling;

    if (testCvc == true){
        messageCvc.innerHTML = "CVC valide";
        messageCvc.classList.remove('text-danger');
        messageCvc.classList.add('text-success');
        return true;
    }else{
        messageCvc.innerHTML = "CVC non valide ! Veuillez vérifier.";
        messageCvc.classList.add('text-danger');
        messageCvc.classList.remove('text-success');
        return false;
    }
}
