let list;

async function loadAsJson(url) {
  return await fetch(url)
    .then(async (response) => {
      list = await response.json();

      return list;
    })
    .catch((error) => {
      console.log(`Error: ${error.message}`);
    });
}

let urlRandom =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";

loadAsJson(urlRandom).then((dataJson) => {
  var coktail = document.getElementById("preview");

  console.log("données API", dataJson);

  var element = document.getElementById("zone-cocktail");
  for (i = 0; i < dataJson.drinks.length; i++) {
    var element2 = document.createElement("img");
    element2.src = dataJson.drinks[i].strDrinkThumb;
    element.appendChild(element2);
  }
});
/*function buttonClickGet() {
  var nameSearch = document.getElementsByClassName("form-control me-2").value;
  nameSearch =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
    dataJson.drinks[i].strDrink +
    '"';
}*/
