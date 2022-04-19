let min;
let max;
min = 20;
max = 100;
class Heros {
    constructor(_nom) {

        this.nombreAleatoire = function () {

            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        // while (_nom == "") {
        //     alert("Pas de nom");
        //     _nom = prompt("Saisis moi un nom");

        // }

        this.nom = _nom;
        this.vie = this.nombreAleatoire();
        this.attaque = this.nombreAleatoire();
        this.defense = this.nombreAleatoire();
        this.existe = false;
        if (this.nom != "") {
            this.existe = true;
        }

        this.afficherInfo = function () {
            console.log(`Nom : ${this.nom}, Vie : ${this.vie}, Attaque : ${this.attaque}, Défense : ${this.defense}`);

        }
        this.attaquer = function (defenseur) {

            console.log(`nouvelle attaque de: ${this.nom} sur ${defenseur.nom}`)
            if (this.attaque > defenseur.defense) {
                defenseur.vie = defenseur.vie - 10;
                console.log(`niveau de vie de ${defenseur.nom}: ${defenseur.vie}`)
            }
            if (this.attaque == defenseur.defense) {
                defenseur.vie = defenseur.vie - 5;
                console.log(`niveau de vie de ${defenseur.nom}: ${defenseur.vie}`)
            }
            if (this.attaque < defenseur.defense) {
                this.vie = this.vie - 5
                console.log(`niveau de vie de ${this.nom}: ${this.vie}`)
            }
            if (this.vie <= 0) {
                console.error(`le personnage ${this.nom} est dead.`)
                this.existe = false
            }
            if (defenseur.vie <= 0) {
                console.error(`le personnage ${defenseur.nom} est dead.`)
                defenseur.existe = false
            }

        }

    }
}

const nbrJoueur = 5;
var joueurs= new Array();
var nbrejoueurcree=0;
var nomSaisie='';
var perso;
while(nbrejoueurcree<nbrJoueur && nomSaisie==''){

    nomSaisie=prompt("Saisissez un nom:");
    if (nomSaisie!= ''){
        perso= new Heros(nomSaisie);
        perso.afficherInfo();
        joueurs.push(perso);
        nomSaisie = '';
        nbrejoueurcree+=1;
    }

}
console.log(joueurs);


// var perso1 = new Heros("jean");

// var perso2 = new Heros("bernard");

// console.log(perso1);
// console.log(perso2);
// perso1.afficherInfo();
// perso2.afficherInfo();
// perso1.attaquer(perso2);
// perso2.attaquer(perso1);
// perso1.afficherInfo();
// perso2.afficherInfo();


// while (perso1.existe != false || perso2.existe != false) {
