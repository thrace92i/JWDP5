// Création de la fonction pour valider et sécuriser le questionnaire lors du paiement
/* Sélection du questionnaire via ID */
let paiementForm = document.querySelector('#paiementForm');
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


// ********* VALIDATION DES CHAMPS *********
// ***** CHAMP NOM *****

const validerNom = function(champNom){
    /* Création regExp pour valider le champ du nom */
    /* regEx trouvé sur internet utilisé pour les passeports internationaux 
    voir lien : https://qastack.fr/programming/2385701/regular-expression-for-first-and-last-name */
    
    let nomRegExp = new RegExp("^[a-zA-Z '.-]*$", 'g');
    /* Test du nom du client validé ou non avec expression régulière */

    let testNom = nomRegExp.test(champNom.value);
    let smallNom = document.getElementById('smallNom');

    if(testNom == true){
        smallNom.innerHTML = "Votre nom est valide";
        smallNom.classList.remove('text-danger');
        smallNom.classList.add('text-success');
        return true;
    }else{
        smallNom.innerHTML = "Votre nom n'est pas valide";
        smallNom.classList.remove('text-success');
        smallNom.classList.add('text-danger');
        return false;
    }

}; 


// ***** CHAMP PRENOM *****

const validerPrenom = function (champPrenom) {
     /* Création regExp pour valider le champ du prenom */
     /* Je décide de garder la même regEx qu'utiliser pour le nom afin de vérifier */

     let prenomRegeExp = new RegExp ("^[A-Z][A-Za-z\é\è\ê\-]+$", "g");

     let testPrenom = prenomRegeExp.test(champPrenom.value);
     let smallPrenom = document.getElementById('smallPrenom');

     if(testPrenom == true){
        smallPrenom.innerHTML = "Votre prénom est valide";
        smallPrenom.classList.remove('text-danger');
        smallPrenom.classList.add('text-success');
        return true;
     }else{
        smallPrenom.innerHTML = "Votre prénom n'est pas valide";
        smallPrenom.classList.remove('text-success');
        smallPrenom.classList.add('text-danger');
        return false;
     }
}