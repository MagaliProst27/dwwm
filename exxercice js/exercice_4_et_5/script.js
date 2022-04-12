let i = 0 ;
let nb=0;
let nbLigne = 0;
let resultat="";

function affichage() {
    resultat+=nb;
    console.log(resultat);
}
nbLigne=prompt("Veulliez rentez le nombre de lignes souhaité");
nb=prompt("Veulliez rentez le nombre entier souhaité");
affichage()
for (i = 2; i <= nbLigne ;i++) {
     affichage();
    }