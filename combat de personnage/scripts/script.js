// ------------------------VARIABLES
let min;
let max;
let randomAtq;
let randomDef;
let randomAncienAtq = -1;
min = 20;
max = 100;
let newMatch = 1;
//-------------------------COLOR
function colorLog(message, color) {
  switch (color) {
    case "dead":
      color = "red";
      break;
    case "win":
      color = "green";
      break;
    case "battle":
      color = "orange";
      break;
    case "perso":
      color = "blue";
      break;
    default:
      color = "black";
      break;
  }
  console.log("%c" + message, "color: " + color);
}
// --------------------------------------------CLASS PERSO---------------------------------------------------------
class Heros {
  constructor(nom) {
    this.nombreAleatoire = function () {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
    // -----------------------------------------EXISTE
    var _existe;
    this.Getexiste = function () {
      return _existe;
    };
    this.Setexiste = function (newexiste) {
      _existe = newexiste;
    };
    // ---------------------------------------NOM
    var _nom = "";
    this.Getnom = function () {
      return _nom;
    };
    this.Setnom = function (newnom) {
      _nom = newnom;
    };
    if (nom != "") {
      this.Setnom(nom);
      _existe = true;
    }
    // ------------------------------VIE
    var _vie = this.nombreAleatoire();
    this.Getvie = function () {
      return _vie;
    };
    this.Setvie = function (newvie) {
      _vie = newvie;
      if (this.Getvie() <= 0) {
        colorLog("Le personnage " + this.Getnom() + " est dead.", "dead");
        this.Setexiste(false);
        _vie = 0;
      }
    };
    // ----------------------------------ATTAQUE
    var _attaque = this.nombreAleatoire();
    this.Getattaque = function () {
      return _attaque;
    };
    this.Setattaque = function (newattaque) {
      _attaque = newattaque;
    };
    // ---------------------------------------DEFENSE
    var _defense = this.nombreAleatoire();
    this.Getdefense = function () {
      return _defense;
    };
    this.Setdefense = function (newdefense) {
      _defense = newdefense;
    };
    // ----------------------------------------------TYPE
    var _type = "";
    this.Gettype = function () {
      return _type;
    };
    this.Settype = function (newtype) {
      _type = newtype;
    };
    // ----------------------------------------------AFFICHER INFO
    this.afficherInfo = function () {
      colorLog(
        `Nom : ${this.Getnom()} type: ${this.Gettype()}, Vie : ${this.Getvie()}, Attaque : ${this.Getattaque()}, Défense : ${this.Getdefense()}`,
        "perso"
      );
    };
    // ---------------------------------------------- SURPRISE MOTHERFUCKER
    this.attaquer = function (defenseur) {
      console.log(
        `nouvelle attaque de: ${this.Getnom()} sur ${defenseur.Getnom()}`
      );
      if (this.Getattaque() > defenseur.Getdefense()) {
        defenseur.Setvie(defenseur.Getvie() - 10);
        colorLog(
          "niveau de vie de " + defenseur.Getnom() + ":" + defenseur.Getvie(),
          "battle"
        );
      }
      if (this.Getattaque() == defenseur.Getdefense()) {
        defenseur.Setvie(defenseur.Getvie() - 5);
        colorLog(
          "niveau de vie de " + defenseur.Getnom() + ":" + defenseur.Getvie(),
          "battle"
        );
      }
      if (this.Getattaque() < defenseur.Getdefense()) {
        this.Setvie(this.Getvie() - 5);
        colorLog(
          "Niveau de vie de " + this.Getnom() + " :" + this.Getvie(),
          "battle"
        );
      }
      if (this.Getvie() == 0 && defenseur.Getvie() != 0) {
        colorLog("Le joueur " + defenseur.Getnom() + " a gagné", "win");
      }
      if (this.Getvie() != 0 && defenseur.Getvie() == 0) {
        colorLog("Le joueur " + this.Getnom() + " a gagné", "win");
      }
    };
  }
}
// ----------------------------------------------------------CLASS NORMAND------------------------------------------------------
class Normands extends Heros {
  constructor(nom) {
    // appelle le constructor de la classe parent
    super(nom);
    // ------------------ATK + 5---------------
    if (this.Getattaque() <= 95) {
      this.Setattaque(this.Getattaque() + 5);
    }
    // ------------------DEF + 5---------------
    if (this.Getdefense() <= 95) {
      this.Setdefense(this.Getdefense() + 5);
    }
    // ------------------VIE - 5---------------
    if (this.Getvie() >= 25) {
      this.Setvie(this.Getvie() - 5);
    }
    this.Settype("Normands");
    console.log(this.Gettype());
  }
}
//----------------------------------------------------------CLASS BRETON POURRI-----------------------------------------------------
class Bretons extends Heros {
  constructor(nom) {
    super(nom);
    if (this.Getattaque() >= 25) {
      this.Setattaque(this.Getattaque() - 5);
    }
    if (this.Getdefense() >= 25) {
      this.Setdefense(this.Getdefense() - 5);
    }
    if (this.Getvie() >= 25) {
      this.Setvie(this.Getvie() + 5);
    }
    this.Settype("Breton");
    console.log(this.Gettype());
  }
}

// ----------------------------------------------------------CLASS MATCH----------------------------------------------------
class Match {
  constructor() {
    var perso;
    var nbRound = 0;
    var winner = false;
    var winnerPlayer = 0;
    // -----------------------------------------------------------NEXT TYPE
    var _nextType = "Normands";
    this.Getnexttype = function () {
      return _nextType;
    };
    //-------------------------------TABLEAU-----------------------------------------
    let nbrJoueur = 2;
    var joueurs = new Array();
    var nbrejoueurcree = 0;
    var nomSaisie = "";
    console.log("test1");
    // --------------------------------AJOUTE UN PERSO DANS LE TABLEAU-----------------
    if (nbrJoueur % 2 != 0) {
      alert("Le nombre de joueur doit être pair");
    }
    if (nbrJoueur % 2 == 0) {
      console.log("test");
      while (nbrejoueurcree < nbrJoueur && nomSaisie == "") {
        console.log("Boucle");
        nomSaisie = prompt("Saisissez un nom:");
        var bPresent = false;
        var i;
        if (joueurs.length >  0) {
          console.log("FOR");
          for (i = 0; i < joueurs.length; i++) {
            if (joueurs[i].Getnom() == nomSaisie) {
              bPresent = true;
              alert("Ce nom existe déjà");
              nomSaisie = "";
            }

            // Ici ça marche pas--------------------------------------------------
            if (bPresent == false && joueurs.length % 2 == 0) {
              perso = new Normands(nomSaisie);
              perso.afficherInfo();
              joueurs.push(perso);
              nbrejoueurcree += 1;
              nomSaisie = "";
            }
            if (bPresent == false && joueurs.length % 2 == 0.5) {
              perso = new Bretons(nomSaisie);
              perso.afficherInfo();
              joueurs.push(perso);
              nbrejoueurcree += 1;
              nomSaisie = "";
            }
          }
          // ---------------------------------------------------------------------
        }
        // nomSaisie = "";
      }
    }
    // ------FONCTION RANDOM----------
    function joueurAleatoire(length) {
      return Math.floor(Math.random() * length);
    }
    // ---------------FONCTION WIN-----------------------
    function win() {
      if (joueurs.length == 1) {
        winner = true;
      }
      if ((winner = true)) {
        colorLog(`Le gagnant est le joueur ${joueurs[0].Getnom()}`, "win");
        joueurs[0].afficherInfo();
      }
    }
    // ----------------------ATK----------------------------------
    //tant qu'il reste plus d'un joueur
    while (joueurs.length > 1) {
      //definit l'attaquant de façon aléatoire
      randomAtq = joueurAleatoire(joueurs.length);
      //definit le defenseur
      randomDef = joueurAleatoire(joueurs.length);
      //verifie si l'attaquant est different de l'ancien attaquant
      if (randomAtq != randomAncienAtq) {
        //verifie si l'attaquant est different du defenseur
        if (randomAtq != randomDef) {
          //attaque
          joueurs[randomAtq].attaquer(joueurs[randomDef]);
          nbRound += 1;
          console.log(`Round : ${nbRound}`);
          try {
            //si l'attaquant est mort on le supprime du tableau
            if (joueurs[randomAtq].Getexiste() == false) {
              joueurs.splice(randomAtq, 1);
            }
            //si le defenseur est mort on le supprime du tableau
            if (joueurs[randomDef].Getexiste() == false) {
              joueurs.splice(randomDef, 1);
            }
            //on intercepte l'erreur si la donnée du tableau n'existe plus
          } catch (error) {}
          //l'attaquant devient l'ancien attaquant
          randomAncienAtq = randomAtq;
        }
      }
      console.log(joueurs.length);
      console.log(nbRound);
    }
    win();
  }
}
var normands = new Normands();
var match = new Match();
