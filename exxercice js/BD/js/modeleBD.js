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
  recuperationInput();
});
//on créé la div ou mettre les cards
function createDiv() {
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
function recuperationInput() {
  var saisie = document.getElementById("searchInput").value;

  var idSerieToSave = 0;
  console.log("Liste des albums par série");

  for (var [idSerie, serie] of series.entries()) {
    if (serie.nom == saisie) {
      idSerieToSave = parseInt(idSerie);
      console.log(idSerieToSave);
      var container = document.getElementsByClassName("container_card")[0];
      container.innerHTML = "";
      break;
    }
  }
  if (idSerieToSave > 0) {
    for (var [idAlbum, album] of albums.entries()) {
      if (album.idSerie == idSerieToSave) {
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
  }
}
