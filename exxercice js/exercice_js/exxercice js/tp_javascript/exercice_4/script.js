var num = Math.floor(Math.random() * 100) + 1;
var NbEssais = 0;
function Devine() {
var choisi = document.form1.devine1.value;
NbEssais++;
status = "Nombre d'essais : " + NbEssais;
document.getElementById('nbessaie').innerHTML =10-NbEssais;
if (choisi < num) 
document.getElementById('indice').innerHTML = "<font color='red'>Non,le nombre est plus grand.</font>";
if (choisi > num)
document.getElementById('indice').innerHTML = "<font color='red'>Non,le nombre est plus petit.</font>";
if (choisi == num) {
    window.alert("Correct ! Vous avez trouvé en " + NbEssais + "essais.");
    location.reload();
	document.getElementById('nbessaie').innerHTML =10;

    }
if (NbEssais == 10) {
    window.alert("Désolé, c'est fini. Le nombre correct était : " + num);
    location.reload();
	document.getElementById('nbessaie').innerHTML =10;

    }
}
