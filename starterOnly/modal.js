function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const form = document.querySelectorAll("#form");
const successText = document.getElementById('success');
const submitBtn = document.querySelectorAll(".btn-submi");
const modalCloseBtn = document.querySelectorAll(".close");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthDate = document.getElementById("birthdate");
const numberOfTournament = document.getElementById("quantity");
const city = document.reserve.location;
const condition = document.getElementById("checkbox1");
let escapeHandler;
let clickOutside;




// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  listenForEscapeKey();
  listenForClickOut();
}

// close modal event
modalCloseBtn[0].addEventListener("click", closeModal, false);

function listenForEscapeKey() {
  escapeHandler = function (e) {
    if (e.keyCode === 27) {
      closeModal();
    }
  };
  document.addEventListener("keydown", escapeHandler);
}

function listenForClickOut() {
  clickOutside = function (e)  {
    if (e.target == modalbg) {
      closeModal();
    }
  };
  document.addEventListener("click",clickOutside) ;
}

// close modal form
function closeModal() {
  document.removeEventListener("keydown", escapeHandler);
  document.removeEventListener("click", clickOutside);
  modalbg.style.display = "none";
}

// Prevent the form from being submitted if there are any errors
form[0].addEventListener("submit", (e) => {
  if (validate() == true) {
    this.form.style.display = 'none';
    successText.style.display = 'block';
  }
  else {
    e.preventDefault();
  }
})

// Defining a function to validate form 
function validate () {
  let errors = document.getElementsByClassName('error-text');
  let firstErr = lastErr = emailErr = dateErr = qtyErr = locationErr = conditionErr = false;

  for (let i = 0; i < errors.length; i++) {
    let error = errors[i];
    error.style.display = 'none';
  }
  if (!isNameValid(firstName.value)) {
    showError('error-first', "Veuillez entrer votre prenom");
    firstErr = true;
  }
  if (!isNameValid(lastName.value)) {
    showError('error-last', "Veuillez entrer votre nom");
    lastErr = true;
  }
  if (isMailValid() == false) {
    showError('error-email', "Veuillez entrer une adresse e-mail correcte");
    emailErr = true;
  }
  if (isInputFill(birthDate) == false) {
    showError('error-birthdate',"Veuillez choisir une date");
    dateErr = true;
  }
  if (isInputFill(numberOfTournament) == false) {
    showError('error-quantity',"Veuillez choisir un nombre");
    qtyErr = true;
  }
  if (isInputFill(city) == false) {
    showError('error-location',"Veuillez choisir une ville");
    locationErr = true;
  }
  if (isCheckboxCheck(condition) == false) {
    showError('error-condition', "Veuillez vérifier que vous acceptez les termes et conditions");
    conditionErr = true;
  }
  if ( (firstErr || lastErr || emailErr || dateErr || qtyErr || locationErr || conditionErr) == true) {
    return false;
  } else {
    return true;
  }
};

// Validate name
function isNameValid(name) {
  return (name.length > 1);
}

// Validate email
function isMailValid() {
  let regex = /^\S+@\S+\.\S+$/;
  if (!regex.test(email.value)) {
    return false
  }
  else {
    return true;
  }
}

// verify empty input
function isInputFill(input) {
  if (input.value === "") {
    return false;
  }
  else {
    return true;
 } 
}

// verify if condition checkbox check
function isCheckboxCheck(checkbox) {
  if (!checkbox.checked) {
    return false;
  }
  else {
    return true;
 } 
}
// Defining a function to display error message
function showError(id, message) {
  document.getElementById(id).style.display = 'block';
  document.getElementById(id).innerHTML = message;
}