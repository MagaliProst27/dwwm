const srcImg = "images/"; // emplacement des images de l'appli
const albumDefaultMini = srcImg + "noComicsMini.jpeg";
const albumDefault = srcImg + "noComics.jpeg";
const srcAlbumMini = "albumsMini/"; // emplacement des images des albums en petit
const srcAlbum = "albums/"; // emplacement des images des albums en grand
var txtSerie = document.getElementById("serie");
var txtNumero = document.getElementById("numero");
var txtTitre = document.getElementById("titre");
var txtAuteur = document.getElementById("auteur");
var txtPrix = document.getElementById("prix");
var imgAlbum = document.getElementById("album");
var imgAlbumMini = document.getElementById("albumMini");
var card = document.getElementsByClassName("container_card")[0];

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

jQuery(document).ready(function ($) {
  // Lecture d'un album
  console.log("Lecture d'un album");
  var album = albums.get("6");

  var serie = series.get(album.idSerie);
  var auteur = auteurs.get(album.idAuteur);
  console.log(album.titre + " " + serie.nom + " " + auteur.nom);

  // Affichage des BD

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

  for (var [idAlbum, album] of albums.entries()) {
    createOneDiv(idAlbum, album);
  }
});

function createOneDiv(idalbum, album) {
  serie = series.get(album.idSerie);
  auteur = auteurs.get(album.idAuteur);

  let listAlbum = document.createElement("card");
  listAlbum.setAttribute("class", "card");

  listAlbum.setAttribute("id", "album" + idalbum.toString());
  let nomFic = serie.nom + "-" + album.numero + "-" + album.titre;
  let button = document.createElement("div");

  button.innerHTML =
    '<button id="btn' +
    idalbum.toString() +
    '" class="add-to-cart" onclick="ajouterPanier(' +
    idalbum.toString() +
    ')">Ajouter au panier</button>';
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
    "</strong></h4>";

  listAlbum.appendChild(button);
  card.appendChild(listAlbum);
}

function recuperationInput() {
  //recuperation de la saisie sur l'input
  var saisie = document.getElementById("searchInput").value;
  var idAuteurToSave = 0;
  var idSerieToSave = 0;
  console.log(saisie);

  //comparaison de la saisie avec les series
  for (var [idSerie, serie] of series.entries()) {
    if (serie.nom == saisie) {
      idSerieToSave = parseInt(idSerie);
      console.log(idSerieToSave);
      var container = document.getElementsByClassName("container_card")[0];
      container.innerHTML = "";
      break;
    }
  }
  // on crée les cards pour les series saisies
  if (idSerieToSave > 0) {
    console.log("on est là");
    for (var [idAlbum, album] of albums.entries()) {
      if (album.idSerie == idSerieToSave) {
        createOneDiv(idAlbum, album);
      }
    }
  }
  // Recherche des albums de l'auteur
  console.log("Liste des albums par auteur");
  for (var [idAuteur, auteur] of auteurs.entries()) {
    if (auteur.nom == saisie) {
      idAuteurToSave = parseInt(idAuteur);
      var container = document.getElementsByClassName("container_card")[0];
      container.innerHTML = "";
      break;
    }
  }
  //on créé les cards pour les auteurs saisis
  if (idAuteurToSave > 0) {
    for (var [idAlbum, album] of albums.entries()) {
      if (album.idAuteur == idAuteurToSave) {
        createOneDiv(idAlbum, album);
      }
    }
  }
}
function ajouterPanier(idAlbumToAdd) {
  console.log(idAlbumToAdd);
  var panier = document.getElementsByClassName("offcanvas-body small")[0];

  var albumToAdd;
  for (var [idAlbum, album] of albums.entries()) {
    for (var [idSerie, serie] of series.entries()) {
      if (idAlbum == parseInt(idAlbumToAdd)) {
        albumToAdd = album;

        break;
      }
    }
  }
  let nomFic = serie.nom + "-" + album.numero + "-" + album.titre;

  var ligne = document.createElement("div");
  ligne.setAttribute("class", "tableau");
  ligne.setAttribute("id", "ligne" + idAlbumToAdd);
  ligne.innerHTML =
    '<img src="' +
    srcAlbumMini +
    nomFic +
    '.jpg" class="imgpanier"></img>' +
    "<p>" +
    albumToAdd.prix +
    "€</p>" +
    "<p>" +
    albumToAdd.titre +
    "</p>" +
    '<input type="number"  value="0" min="0" max="10">';
  panier.appendChild(ligne);
}
