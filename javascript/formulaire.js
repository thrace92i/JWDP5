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

// ********* VALIDATION DES CHAMPS *********
// ***** CHAMP NOM *****

const validerNom = function(champNom){
    /* Création regExp pour valider du nom */
    let nomRegExp = new RegExp("^[a-zA-Z '.-]*$", 'g');

    /* Test du nom du client validé ou non avec expression régulière */

    let testNom = nomRegExp.test(champNom.value);
    let small = champNom.nextElementSibling;

    if(testNom == true){
        small.innerHTML = "Votre nom est valide";
        small.classList.remove('text-danger');
        small.classList.add('text-success')
        return true;
    }else{
        small.innerHTML = "Votre nom n'est pas valide";
        small.classList.remove('text-success');
        small.classList.add('text-danger');
        return false;
    }

}; 

