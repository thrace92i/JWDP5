// window.addEventListener("load", function() {
//     function sendData () {
//         var XHR = new XMLHttpRequest();

//         //Liez l'objet FormData et l'élément form
//         var FD = new FormData(form);

//         //Définir ce qui se passe si la soumission s'est opérée avec succès
//         XHR.addEventListener("load", function(event){
//             alert(event.target.responseText);
//         });

//         // Définier ce qui se passe en cas d'erreur 
//         XHR.addEventListener("error", function(event) {
//             alert('Oups, quelque chose s\'est mal passé.');
//         });

//         //Configuration de la requête
//         XHR.open("POST", "https://example.com/cors.php");

//         // Les données envoyées sont ce que l'utilisateur a mis dans le formulaire
//         XHR.send(FD);
//     }

//     // Accédez à l'élément form
//     var form = document.getElementById("myForm");

//     //Prise en charge de l'évènement submit.
//     form.addEventListener("submit", function(event) {
//         event.preventDefault();

//         sendData();
//     });

// });

// document.getElementById("myForm").addEventListener("submit", function(e){

//     var erreur;

//     var inputs = this.getElementsByTagName("input");

//     for (var i = 0; i < inputs.length; i++) {
//         if (!inputs[i].value){
//             erreur = "Veuillez renseigner les champs ci-dessus !"
//         }
//     }

//     if (erreur) {
//         e.preventDefault();
//         document.getElementById("erreur").innerHTML = erreur;
//         return false;
//     } else {
//         alert('Paiment confirmé')
//     }
// });

// Traitement de la confirmation de deux adresses mails similaires

document.getElementById("email2").addEventListener("input", function(){
    var paragrapheErreur = document.getElementById("erreur");
    if (this.value != document.getElementById("email").value) {
        paragrapheErreur.innerHTML = "Les deux adresses mails ne correspondent pas";
    } else {
        paragrapheErreur.innerHTML = "";
    }
    
});

document.forms["myForm"].addEventListener("submit", function(e){

    var erreur;

    var inputs = this;

    // Traitement au cas par cas des inputs

    // if (inputs["email"].value != "p.f@gmail.com"){
    //     erreur = "Adresse email incorrecte";
    // }

    // Traitement générique

    for (var i = 0; i < inputs.length; i++) {
        if (!inputs[i].value){
            erreur = "Veuillez renseigner les champs ci-dessus !"
            break;
        }
    }

    if (erreur) {
        e.preventDefault();
        document.getElementById("erreur").innerHTML = erreur;
        return false;
    } else {
        alert('Paiment confirmé')
    }
});

