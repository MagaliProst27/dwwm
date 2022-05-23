const srcImg = "images/"; // emplacement des images de l'appli
const albumDefaultMini = srcImg + "noComicsMini.jpeg";
const albumDefault = srcImg + "noComics.jpeg";
const srcAlbumMini = "albumsMini/"; // emplacement des images des albums en petit
const srcAlbum = "albums/"; // emplacement des images des albums en grand

/**
 * Récupération de l'album par son id et appel de
 * la fonction d'affichage
 *
 * @param {number} num
 */
function getAlbum(num) {
  var album = albums.get(num.value);

  if (album === undefined) {
    txtSerie.value = "";
    txtNumero.value = "";
    txtTitre.value = "";
    txtAuteur.value = "";
    txtPrix.value = 0;

    afficheAlbums($("#albumMini"), $("#album"), albumDefaultMini, albumDefault);
  } else {
    var serie = series.get(album.idSerie);
    var auteur = auteurs.get(album.idAuteur);

    txtSerie.value = serie.nom;
    txtNumero.value = album.numero;
    txtTitre.value = album.titre;
    txtAuteur.value = auteur.nom;
    txtPrix.value = album.prix;

    let nomFic = serie.nom + "-" + album.numero + "-" + album.titre;

    // Utilisation d'une expression régulière pour supprimer
    // les caractères non autorisés dans les noms de fichiers : '!?.":$
    nomFic = nomFic.replace(/'|!|\?|\.|"|:|\$/g, "");

    afficheAlbums(
      $("#albumMini"),
      $("#album"),
      srcAlbumMini + nomFic + ".jpg",
      srcAlbum + nomFic + ".jpg"
    );
  }
}

/**
 * Affichage des images, les effets sont chainés et traités
 * en file d'attente par jQuery d'où les "stop()) et "clearQueue()"
 * pour éviter l'accumulation d'effets si défilement rapide des albums.
 *
 * @param {object jQuery} $albumMini
 * @param {object jQuery} $album
 * @param {string} nomFic
 * @param {string} nomFicBig
 */
function afficheAlbums($albumMini, $album, nomFicMini, nomFic) {
  $album
    .stop(true, true)
    .clearQueue()
    .fadeOut(100, function () {
      $album.attr("src", nomFic);
      $albumMini
        .stop(true, true)
        .clearQueue()
        .fadeOut(150, function () {
          $albumMini.attr("src", nomFicMini);
          $albumMini.slideDown(200, function () {
            $album.slideDown(200);
          });
        });
    });
}
/**
 * Affichage de l'image par défaut si le chargement de l'image de l'album
 * ne s'est pas bien passé
 *
 * @param {object HTML} element
 */
function prbImg(element) {
  // console.log(element);
  if (element.id === "albumMini") element.src = albumDefaultMini;
  else element.src = albumDefault;
}
function mapToObject(map) {
  return Object.assign(
    Object.create(null),
    ...[...map].map((v) => ({ [v[0]]: v[1] }))
  );
}

// On transforme la map en objets*/
mapToObject(auteurs);
// Dans un premier temps on va aller recupérer l'id de l'auteur selon la saisie utilisateur (qui sera un input)
// on recupere la saisie de l'input

//on fait une recherche sur la map des albums:
//EX: Je ne veux que les albums avec l'auteur Arleston, Mourier (idAuteur=11)
/*
var idAuteurToSave = 0;
for (var [idAuteur, auteur] of auteurs.entries()) {
  if (auteur.nom == userInput) {
    //remplacer le nom de l'auteur ici par le choix de l'utilisateur
    //on est sur le bon: on sauvegarde l'id, puis on sort de la boucle
    console.log("on est làààààààààà  " + idAuteur);
    idAuteurToSave = parseInt(idAuteur);
    break;
  }
}
// on a notre idAuteur, on fait notre petit filtre
if (idAuteurToSave > 0) {
  for (var [idAlbum, album] of albums.entries()) {
    if (album.idAuteur == idAuteurToSave) {
      serie = series.get(album.idSerie);
      auteur = auteurs.get(album.idAuteur);
      console.log(
        album.titre +
          " N°" +
          album.numero +
          " Série:" +
          serie.nom +
          " Auteur:" +
          auteur.nom
      );
    }
  }
}*/

jQuery(document).ready(function ($) {
  // Lecture d'un album
  console.log("Lecture d'un album");
  var album = albums.get("6");

  var serie = series.get(album.idSerie);
  var auteur = auteurs.get(album.idAuteur);
  console.log(album.titre + " " + serie.nom + " " + auteur.nom);

  console.log("Liste des albums par série");
  for (var [idSerie, serie] of series.entries()) {
    // Recherche des albums de la série
    for (var [idAlbum, album] of albums.entries()) {
      if (album.idSerie == idSerie) {
        /*console.log(
          serie.nom +
            ", Album N°" +
            album.numero +
            " " +
            album.titre +
            ", Auteur:" +
            auteurs.get(album.idAuteur).nom
        );*/
      }
    }
  }

  console.log("Liste des albums par auteur");
  for (var [idAuteur, auteur] of auteurs.entries()) {
    // Recherche des albums de l'auteur
    for (var [idAlbum, album] of albums.entries()) {
      if (album.idAuteur == idAuteur) {
        /* console.log(
          auteur.nom +
            ", Album N° " +
            album.numero +
            " " +
            album.titre +
            ", Série: " +
            series.get(album.idSerie).nom
        );*/
      }
    }
  }

  // Affichage des BD
  var txtSerie = document.getElementById("serie");
  var txtNumero = document.getElementById("numero");
  var txtTitre = document.getElementById("titre");
  var txtAuteur = document.getElementById("auteur");
  var txtPrix = document.getElementById("prix");
  var imgAlbum = document.getElementById("album");
  var imgAlbumMini = document.getElementById("albumMini");

  imgAlbum.addEventListener("error", function () {
    prbImg(this);
  });

  imgAlbumMini.addEventListener("error", function () {
    prbImg(this);
  });

  var id = document.getElementById("id");
  id.addEventListener("change", function () {
    getAlbum(this);
  });

  createDiv();
});
//on créé la div ou mettre les cards
function createDiv() {
  var card = document.getElementsByClassName("container_card")[0];
  //on definit la valeur des datas que l'on souhaite voir apparaitre et creer les card
  for (var [idAlbum, album] of albums.entries()) {
    serie = series.get(album.idSerie);
    auteur = auteurs.get(album.idAuteur);
    let listAlbum = document.createElement("card");
    listAlbum.setAttribute("class", "card");

    listAlbum.setAttribute("id", "album" + idAlbum.toString());
    let nomFic = serie.nom + "-" + album.numero + "-" + album.titre;

    // Utilisation d'une expression régulière pour supprimer
    // les caractères non autorisés dans les noms de fichiers : '!?.":$
    nomFic = nomFic.replace(/'|!|\?|\.|"|:|\$/g, "");
    //mise en page des cards des BD
    listAlbum.innerHTML =
      "<h2>" +
      "N°: " +
      album.numero +
      " " +
      album.titre +
      "</h2>" +
      '<img src="' +
      srcAlbumMini +
      nomFic +
      '.jpg"></img>' +
      "<p> Série: " +
      serie.nom +
      " " +
      "<br>" +
      "Auteur(s): " +
      auteur.nom +
      " </p>" +
      "<h4><strong>" +
      album.prix +
      "€" +
      "</strong></h4>" +
      '<select id="qt" name="q">' +
      '<option value="1">1</option>' +
      '<option value="2">2</option>' +
      '<option value="3">3</option>' +
      '<option value="4">4</option>' +
      '<option value="5">5</option>' +
      '<option value="6">6</option>' +
      '<option value="7">7</option>' +
      '<option value="8">8</option>' +
      '<option value="9">9</option>' +
      "</select>" +
      "<button>Ajouter au panier</button>";

    card.appendChild(listAlbum);
  }
}
