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

form[0].addEventListener("submit", (e) => {
  e.preventDefault();
})

function validate () {
  var regex = /^\S+@\S+\.\S+$/;
  if (firstName.value === "" || firstName.value.length < 2) {
    document.getElementById('error-first').innerHTML = "Veuillez entrer votre prénom";
  }
  if (lastName.value === "" || lastName.value.length < 2) {
    document.getElementById('error-last').innerHTML = "Veuillez entrer votre nom";
  } 
  if (! regex.test(email.value)) {
    document.getElementById('error-email').innerHTML = "Veuillez entrer une adresse e-mail correcte";
  }
  if (birthDate.value === "") {
    document.getElementById('error-birthdate').innerHTML = "Veuillez choisir une date";
  }
  if (numberOfTournament.value === "" || isNaN(numberOfTournament.value)) {
    document.getElementById('error-quantity').innerHTML = "Veuillez choisir un nombre";
  }
  if (city.value === "") {
    document.getElementById('error-location').innerHTML = "Veuillez choisir une ville";
  }
  if (! condition.checked) {
    document.getElementById('error-condition').innerHTML = "Veuillez vérifier que vous acceptez les termes et conditions";
  } 
};

