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
  '<div class="button" >'+
    '<button id="btn' +
    idalbum.toString() +
    '"style="color:blue;" class="add-to-cart btn.btn-primary" onclick="ajouterPanier(' +
    idalbum.toString() +
    ')">&#128722;</button>'+'</div>';
  // Utilisation d'une expression régulière pour supprimer
  // les caractères non autorisés dans les noms de fichiers : '!?.":$
  nomFic = nomFic.replace(/'|!|\?|\.|"|:|\$/g, "");
  //mise en page des cards des BD

  listAlbum.innerHTML =
  '<img src="' +
    srcAlbumMini +
    nomFic +
    '.jpg"></img>' +
    '<div class="info">'+
    "<h2>" +
    "N°: " +
    album.numero +
    " " +
    album.titre +
    "</h2>" +
    
    "<p> Série: " +
    serie.nom +
    " " +
    "<br>" +
    "Auteur(s): " +
    auteur.nom +
    " </p>"+
    "<h4><strong>" +
    album.prix +
    "€" +
    "</strong></h4>" +'</div>';

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
  
  var panier = document.getElementsByClassName("offcanvas-body small")[0];

  // Dans ton modèle, tu as mis les clés en string, il faut donc utiliser un format string et non numérique
  // La structure de donnée Map te permet d'indexer des valeurs par rapport à leurs clés. Tu n'as pas besoin de faire une boucle for, juste d'utiliser la méthode map.get(key)
  var albumToAdd = albums.get(`${idAlbumToAdd}`);

  // Gestion d'erreur, que fait on si je ne trouve pas l'album ?
  if (!albumToAdd) {
    throw new Error(`Album with id ${adlbumId} not found`);
  }

  // Il faut le nom de la série pour construire le chemin de la miniature, on fait comme pour l'album avec l'identifiant qu'il porte dans sa donnée
  var serieToAdd = series.get(albumToAdd.idSerie);

  // Gestion d'erreur, que fait on si je ne trouve pas la série ?
  if (!serieToAdd) {
    throw new Error(`Serie with id ${albumToAdd.idSerie} not found`);
  }

  // On construit le chemin
  let nomFic = serieToAdd.nom + "-" + albumToAdd.numero + "-" + albumToAdd.titre;

  function calculLigne() {
    let qte1;
    let resultat1;
    let prix1=document.getElementById("prixUnitaire");
    prix1=parseFloat(albumToAdd.prix)
    let saisieQte=document.getElementById("quantite1");
    qte1=parseInt(saisieQte)
    resultat1=prix1*qte1;
    console.log(typeof(saisieQte));
  }
  calculLigne();
    
  // On maj la page html
  var ligne = document.createElement("div");
  ligne.setAttribute("class", "tableau");
  ligne.setAttribute("id", "ligne" + idAlbumToAdd);
  ligne.innerHTML =
    '<img src="' +
    srcAlbumMini + 
    '/' +
    nomFic +
    '.jpg" class="imgpanier"></img>' +
    '<p id="prixUnitaire">' +
    albumToAdd.prix +
    "€</p>" +
    "<p>" +
    albumToAdd.titre +
    "</p>" +
    '<input id="quantite1" type="number"  value="1" min="1" max="10">'+'<p>'+calculLigne() +'</p>';
  panier.appendChild(ligne);


}

  
