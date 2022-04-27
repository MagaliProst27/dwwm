var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
function ChargeInfosJson() {
  fetch("script/books.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      createList(data); /* Appelons notre fonction */
    });
}

function CreateDivs(data) {
  const preview = document.getElementsByClassName("preview")[0];
  for (var x = 0; x < data.length; x++) {
    let listLivre = document.createElement("div");
    listLivre.setAttribute("class", "card");
    listLivre.setAttribute("id", "livre");
    var image;
    if (data[x].thumbnailUrl == null || data[x].thumbnailUrl == undefined) {
      image = "https://p1.storage.canalblog.com/14/48/1145642/91330992_o.png";
    } else {
      image = data[x].thumbnailUrl;
    }
    let shortDescriptions;
    if (
      data[x].shortDescription == null ||
      data[x].shortDescription == undefined
    ) {
      shortDescription = "";
    } else {
      shortDescription = data[x].shortDescription;
    }
    listLivre.innerHTML =
      '<img src="' +
      image +
      '"/>' +
      "<h1>" +
      data[x].title +
      "</h1>" +
      "<h2>" +
      data[x].isbn +
      "</h2>" +
      "<h3>" +
      new Date(data[x].publishedDate.dt_txt).toLocaleDateString(
        "fr-FR",
        options
      ) +
      "</h3>" +
      "<p>" +
      shortDescription +
      "</p>" +
      "<p>" +
      data[x].authors +
      "</p>" +
      "<p>" +
      data[x].categories +
      "</p>";
    preview.appendChild(listLivre);
  }
}
var booksList = new Array();
var authorsList = new Array();
var categoriesList = new Array();

var categoryBookList = new Array();

//fonction qui créé les listes déroulantes
var createList = function (data) {
  for (var x = 0; x < data.length; x++) {
    var book = data[x];
    booksList.push(book);

    for (var y = 0; y < book.authors.length; y++) {
      let author = book.authors[y];

      if (authorsList.indexOf(author) == -1) {
        authorsList.push(author);
      }
    }

    for (var y = 0; y < book.categories.length; y++) {
      let category = book.categories[y];

      if (categoriesList.indexOf(category) == -1) {
        categoriesList.push(category);
      }
    }
  }
  booksList.sort();
  authorsList.sort();
  categoriesList.sort();

  for (var x = 0; x < authorsList.length; x++) {
    var option = document.createElement("option");
    option.value = authorsList[x];
    option.innerText = authorsList[x];
    document.getElementById("listAuthors").appendChild(option);
  }
  for (var x = 0; x < categoriesList.length; x++) {
    var option = document.createElement("option");
    option.value = categoriesList[x];
    option.innerText = categoriesList[x];
    document.getElementById("listCategories").appendChild(option);
  }
  CreateDivs(booksList); /* Appelons notre fonction */
 
};
var afficherAuteur = function (data) {
   
  
};
