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
    var name = document.createElement("h2");
    name.innerHTML = dataJson.drinks[i].strDrink;
    element.appendChild(name);

    for (let x = 1; x < 16; x++) {
      let ingredient = document.createElement("ons-list-item");
      ingredient.innerHTML =
        dataJson.drinks[i][`strMeasure${x}`] +
        ": " +
        dataJson.drinks[i][`strIngredient${x}`];
      if (
        dataJson.drinks[i][`strIngredient${x}`] == null ||
        dataJson.drinks[i][`strMeasure${x}`] == null
      ) {
        break;
      }
      element.appendChild(ingredient);
    }
    var category = document.createElement("p");
    category.innerHTML = dataJson.drinks[i].strCategory;
    element.appendChild(category);

    var type = document.createElement("p");
    type.innerHTML = "Type : " + dataJson.drinks[i].strAlcoholic;
    element.appendChild(type);

    var instructions = document.createElement("ons-card");
    instructions.innerHTML = dataJson.drinks[i].strInstructions;
    element.appendChild(instructions);
  }
});
