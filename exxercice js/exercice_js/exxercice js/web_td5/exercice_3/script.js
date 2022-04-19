 function validateForm() {
      if(document.getElementById('myField').value == '') {
     document.getElementById('myFieldError').innerHTML = 'Le champ ne peut être vide';
         return false;
       } else {
         document.getElementById('myFieldError').innerHTML = '';
         alert('Le formulaire peut être envoyé');
         return true;
       }
     }