let data;
  let currentQueryIndex = 0;

  function selectChoice(index) {
    console.log(index);
  }

  function goToIndex() {
    if (currentQueryIndex < 0 || currentQueryIndex > data.length) {
      console.log(Error: invalid index value ${index});
      return;
    }

    currentQueryIndex = currentQueryIndex++;
    console.log(Go to ${currentQueryIndex});

    const query = data[currentQueryIndex];
    const tmpl = buildQueryTemplate(query);

    const containerElt = document.getElementById("quizz-container");
    containerElt.innerHTML = "";
    containerElt.appendChild(tmpl);
  }

  function buildQueryTemplate(defQuery) {
    const formElt = document.createElement("div");

    const titleElt = document.createElement("h3");
    titleElt.innerHTML = defQuery.questions;
    titleElt.setAttribute("class", "ennonce");

    const detailsElt = document.createElement("p");
    detailsElt.innerHTML = defQuery.explanation;
    detailsElt.setAttribute("class", "ennonce");

    const choicesElt = document.createElement("ul");
    choicesElt.setAttribute("class", "contenu");

    defQuery.choices.forEach(function (choice, index) {
      const choiceLiElt = document.createElement("li");
      choiceLiElt.id = li${index};
      choiceLiElt.setAttribute("class", "choix");
      choiceLiElt.innerHTML = choice;
      choiceLiElt.onclick = selectChoice(index);

      choicesElt.appendChild(choiceLiElt);
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
      }).catch((error) => {
        console.log(Error: ${error.message});
      });
  }

  loadAsJson("script/format_quiz.json").then((dataJson) => {
    data = dataJson;
    const nextBtnElt = document.getElementById("goNext");
    console.log(nextBtnElt);
    nextBtnElt.onclick = goToIndex();
    goToIndex(currentQueryIndex);
  });