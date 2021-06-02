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
console.log(paiementForm);

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

paiementForm.cp.addEventListener('change', function(){
    validerCp(this);
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

//

// ***** CHAMP CP *****

const validerCp = function(champCp) {
    /* Création de la regEx pour la validation du CP*/
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