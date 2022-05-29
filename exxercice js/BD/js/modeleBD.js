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
    
    '<p class="info-cache"> Série: ' +
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
class PanierItem {
  constructor(picture, title, unitPrice) {
    this.picture = picture;
    this.title = title;
    this.unitPrice = unitPrice;
    this.quantity = 1;
    this.listeners = [];
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  fireChanges() {
    this.listeners.forEach((listener) => {
      listener.onChange(this);
    });
  }

  handleEvent(e) {
    e.stopPropagation();
    switch (e.type) {
      case "input":
        this.onQuantityChange(e);
        break;
      default:
        console.log(e.target);
    }
  }

  onQuantityChange(event) {
    if (event.target.value && this.quantity !== event.target.value) {
      this.quantity = parseFloat(event.target.value);
      this.fireChanges();
    }
  }

  calcPrice() {
    return this.unitPrice * this.quantity;
  }

  render() {
    // Miniature element
    const itemPictureHtml = document.createElement('img');
    itemPictureHtml.setAttribute('class', 'imgpanier');
    itemPictureHtml.src = this.picture;
    // prix element
    const unitPriceHtml = document.createElement('p');
    unitPriceHtml.innerText = `${this.unitPrice} €`;
    // Quantité element
    const quantityHtml = document.createElement('input');
    quantityHtml.setAttribute('type', 'number');
    quantityHtml.setAttribute('value', this.quantity);
    quantityHtml.setAttribute('min', '1');
    quantityHtml.setAttribute('max', '10');
    quantityHtml.addEventListener('input', this);

    // Conteneur
    const htmlView = document.createElement('div');
    htmlView.appendChild(itemPictureHtml);
    htmlView.appendChild(unitPriceHtml);
    htmlView.appendChild(quantityHtml);
    
    return htmlView;
  }
}

class Panier {
  constructor() {
    this.items = new Map();
    this.totalPrice = 0.0;
  }
//ajout au panier 
  addItem(id, item) {
    item.addListener(this);
    this.items.set(id, item);
    this.calcTotalPrice();
  }
//suppression du panier
  removeItem(id) {
    this.items.delete(id);
    this.onChange();
  }
//calcul total
  calcTotalPrice() {
    this.totalPrice = Array.from(this.items.values()).reduce((acc, currentItem) => {
      const price = currentItem.calcPrice();
      return acc + price;
    }, 0);
  }

  onChange(item) {
    this.calcTotalPrice();
    this.render();
  }

  render() {
    var panier = document.getElementsByClassName("offcanvas-body small")[0];
    panier.innerHTML = '';
    if (this.items.size > 0) {
      // Affichage du prix total
      const total = document.createElement('p');
      total.setAttribute("class", "text-primary text-right");
      total.innerText = `Coût total : ${this.totalPrice}`;
      panier.appendChild(total);
      // Affichage des éléments du panier
      this.items.forEach((value, key) => {
        var ligne = document.createElement("div");
        ligne.setAttribute("class", "tableau");
        ligne.setAttribute("id", `item-${key}`);
        ligne.appendChild(value.render());
        var deleteHtml = document.createElement('button');
        deleteHtml.textContent = 'Supprimer';
        deleteHtml.onclick = () => {this.removeItem(key)};
        ligne.appendChild(deleteHtml);
        panier.appendChild(ligne);
      });
    } else {
      const defaultHtml = document.createElement("p");
      defaultHtml.setAttribute("class", "text-primary text-center");
      defaultHtml.innerText = 'Panier vide';
      panier.appendChild(defaultHtml);
    }
  }
}

const basket = new Panier();
basket.render();

function ajouterPanier(idAlbumToAdd) {
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

  const picturePath = srcAlbumMini + '/' + nomFic + '.jpg';

  const itemToAdd = new PanierItem(picturePath, albumToAdd.titre, albumToAdd.prix);
  basket.addItem(idAlbumToAdd, itemToAdd);
    // On maj la page html
  basket.render();
}
