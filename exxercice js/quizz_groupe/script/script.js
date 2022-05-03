function ChargeInfosJson() {
  fetch("script/format_quiz.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      CreateDivs(data);
    });
}

function CreateDivs(data) {
  const preview = document.getElementsByClassName("preview")[0];
  preview.innerHTML = "";

  var listData = data;
  for (var y = 0; y < listData.length; y++) {
    const ennonce = document.createElement("div");
    ennonce.innerHTML = listData[y].questions;
    ennonce.setAttribute("class", "ennonce");

    const explication = document.createElement("div");
    explication.innerHTML = listData[y].explanation;
    explication.setAttribute("class", "explication");

    preview.appendChild(ennonce);
    preview.appendChild(explication);

    const questions = document.createElement("div");

    questions.setAttribute("class", "contenu");
    questions.setAttribute("id", "questions");

    var listQuestions = listData[y].choices;
    for (var x = 0; x < listQuestions.length; x++) {
      var choix = document.createElement("div");
      choix.setAttribute("class", "card");
      choix.innerHTML +=
        '<button class="choix">' + listQuestions[x] + "</button>";

      questions.appendChild(choix);
    }
    preview.appendChild(questions);
    break;
  }
}
ChargeInfosJson();
