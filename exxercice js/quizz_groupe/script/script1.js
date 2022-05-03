let data;
let currentQueryIndex = 0;

function selectChoice(index) {
  console.log(index);
}

function goToIndex(index) {
  if (index < 0 || index >= data.length) {
    console.log(`Error: invalid index value ${index}`);
    return;
  }

  console.log(`Go to ${index}`);

  const query = data[index];
  const tmpl = buildQueryTemplate(query);

  const containerElt = document.getElementById("quizz-container");
  containerElt.innerHTML = "";
  containerElt.appendChild(tmpl);
}

function buildQueryTemplate(defQuery) {
  const formElt = document.createElement("div");

  const titleElt = document.createElement("h3");
  titleElt.innerHTML = defQuery.question;
  titleElt.setAttribute("class", "ennonce");

  const detailsElt = document.createElement("p");
  detailsElt.innerHTML = defQuery.explanation;
  detailsElt.setAttribute("class", "ennonce");

  const choicesElt = document.createElement("ul");
  choicesElt.setAttribute("class", "contenu");

  defQuery.choices.forEach(function (choice, index) {
    const choiceLiElt = document.createElement("li");
    choiceLiElt.setAttribute("class", "choix");
    choiceLiElt.setAttribute("type", "radio");
    choiceLiElt.innerHTML = choice;
    choiceLiElt.addEventListener("click", function () {
      selectChoice(index);
    });
    choicesElt.appendChild(choiceLiElt);
    if (choiceLiElt === defQuery.answer) {
    }
  });

  formElt.appendChild(titleElt);
  formElt.appendChild(detailsElt);
  formElt.appendChild(choicesElt);

  return formElt;
}

function loadAsJson(url) {
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(`Error: ${error.message}`);
    });
}

loadAsJson("script/format_quiz.json").then((dataJson) => {
  data = dataJson;
  const nextBtnElt = document.getElementById("goNext");
  console.log(nextBtnElt);
  nextBtnElt.addEventListener("click", function () {
    currentQueryIndex = currentQueryIndex + 1;
    goToIndex(currentQueryIndex);
  });
  goToIndex(currentQueryIndex);
});
