window.addEventListener("load", function() {
    function sendData () {
        var XHR = new XMLHttpRequest();

        //Liez l'objet FormData et l'élément form
        var FD = new FormData(form);

        //Définir ce qui se passe si la soumission s'est opérée avec succès
        XHR.addEventListener("load", function(event){
            alert(event.target.responseText);
        });

        // Définier ce qui se passe en cas d'erreur 
        XHR.addEventListener("error", function(event) {
            alert('Oups, quelque chose s\'est mal passé.');
        });

        //Configuration de la requête
        XHR.open("POST", "https://example.com/cors.php");

        // Les données envoyées sont ce que l'utilisateur a mis dans le formulaire
        XHR.send(FD);
    }

    // Accédez à l'élément form
    var form = document.getElementById("myForm");

    //Prise en charge de l'évènement submit.
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        sendData();
    });

});