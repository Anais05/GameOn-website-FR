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
const birthdate = document.getElementById("birthdate");
const numberOfTournament = document.getElementById("quantity");
const cities = document.reserve.location;
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
  listenForKeyup();
  listenForChange();
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

// Prevent the form from being submitted
form[0].addEventListener("submit", (e) => {
  e.preventDefault();
})



let InputToValidateKeyup = [
  {input : firstName, check : isNameValid},
  {input : lastName, check : isNameValid},
  {input : email, check : isMailValid},
];

function listenForKeyup() {
  InputToValidateKeyup.forEach(obj => 
  {
    obj.input.addEventListener("keyup", (e) => {   
      let element = obj.input;
      let value = element.value;
      if (!obj.check(value)) {
        showError(element);
      } else {
        hideError(element);
      }
    })
  })
}

let InputToValidateChange = [
  {input : birthdate, check : isDateValid},
  {input : numberOfTournament, check : isQuantityValid},
  {input : condition, check : isCheckboxCheck}
];

function listenForChange() {
  InputToValidateChange.forEach(obj => 
  {
    obj.input.addEventListener("change", (e) => {   
      let element = obj.input;
      let value = element.value;
      switch (obj.input)
      {
        case birthdate:
        case numberOfTournament:
          if (!obj.check(value)) {
            showError(element);
          } else {
            hideError(element);
          };
          break;
        case condition: 
          if (!obj.check(element)) {
            showError(element);
          } else {
            hideError(element);
          };
          break;
        default: 
        showError(element);
      }
    })
  })
}





// Defining a function to validate form 
function validate () {

  const locationErr = document.getElementById('errorCity');
  if (!isCitySelect()) {
    locationErr.setAttribute('data-error-visible', true);
  } else {
    locationErr.setAttribute('data-error-visible', false);
  }

};


// Validate name
function isNameValid(name) {
  if (name.length < 2 || name === "" ) {
    return false;
  }
  return true;
}

// Validate email
function isMailValid(mail) {
  let regex = /^\S+@\S+\.\S+$/;
  if (!regex.test(mail) || mail == "") {
    return false;
  }
  return true;
}

// validate date
function isDateValid(date) {
  let regex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
  if (!regex.test(date) ||  date == "") {
    return false;
  }
  return true;
}

// validate quantity of tournament
function isQuantityValid(qty) {
  if (isNaN(qty) || qty == "" ) {
    return false;
  } 
  return true;
}

// verify if a city is select 
function isCitySelect() {
  for (let i = 0; i < cities.length; i++) {
    if (cities[i].checked) {
        return cities[i];
    }
  }
}

// verify if condition checkbox is check
function isCheckboxCheck(checkbox) {
  if (!checkbox.checked) {
    return false;
  }
  return true;
}

// display error message
function showError(element) {
  element = event.target;
  let parent = element.closest('div');
  parent.setAttribute('data-error-visible', true);
}

// hide error message
function hideError(element) {
  element = event.target;
  let parent = element.closest('div');
  parent.setAttribute('data-error-visible', false);
}