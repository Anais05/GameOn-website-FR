// DOM Elements
let escapeHandler;
let clickOutHandler;

listenForModalOpening();

function closeModal() {
  document.removeEventListener("keydown", escapeHandler);
  document.removeEventListener("click", clickOutHandler);
  document.querySelector(".bground").style.display = "none";
}

function disableSubmitButton() {
  document.getElementById("submit").disabled = true ;
  document.getElementById("submit").style.cursor = 'not-allowed';
  document.getElementById("submit").style.opacity = '0.3';
}

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
    document.getElementById("hero").style.marginTop = "280px";
  } else {
    x.className = "topnav";
    document.getElementById("hero").style.marginTop = "0";
  }
}

function enableSubmitButton() {
  document.getElementById("submit").disabled = false ;
  document.getElementById("submit").style.cursor = 'pointer';
  document.getElementById("submit").style.opacity = '1';
}

function listenForModalOpening() {
  document.querySelectorAll(".modal-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector(".bground").style.display = "block";
      listenForModalClosing();
      listenForEscapeKey();
      listenForClickOut();
      listenForKeyup();
      listenForChange();
      disableSubmitButton();
      listenForFormUpdate();
      listenForSubmit();
    })
  });
}

function listenForModalClosing() {
  document.querySelectorAll(".close")[0].addEventListener("click", closeModal, false);
}

function listenForChange() {
  let InputToValidateChange = [
    {id : "birthdate", check : isDateValid},
    {id : "quantity", check : isQuantityValid},
    {id : "checkbox1", check : isCheckboxCheck}
  ];
  InputToValidateChange.forEach(obj => 
  {
    document.getElementById(obj.id).addEventListener("change", (e) => {   
      let element = document.getElementById(obj.id);
      let value = element.value;
      switch (obj.id)
      {
        case "birthdate":
        case "quantity":
          if (!obj.check(value)) {
            showError(element);
          } else {
            hideError(element);
          };
          break;
        case "checkbox1": 
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

function listenForClickOut() {
  clickOutHandler = function (e)  {
    if (e.target == document.querySelector(".bground")) {
      closeModal();
    }
  };
  document.addEventListener("click",clickOutHandler) ;
}

function listenForEscapeKey() {
  escapeHandler = function (e) {
    if (e.keyCode === 27) {
      closeModal();
    }
  };
  document.addEventListener("keydown", escapeHandler);
}

function listenForFormUpdate() {
  document.getElementById("form").addEventListener("change", () => {
    disableSubmitButton();
    if (validate()) {
      enableSubmitButton();
    }
  })
}

function listenForKeyup() {
  let InputToValidateKeyup = [
    {id : "first", check : isNameValid},
    {id : "last", check : isNameValid},
    {id : "email", check : isMailValid},
  ];
  InputToValidateKeyup.forEach(obj => 
  {
    document.getElementById(obj.id).addEventListener("keyup", (e) => {   
      let element = document.getElementById(obj.id);
      let value = element.value;
      if (!obj.check(value)) {
        showError(element);
      } else {
        hideError(element);
      }
    })
  })
}

function listenForSubmit() {
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.style.display = 'none';
    document.getElementById("success").style.display = 'block';
  })
}

// Defining a function to validate form 
function validate () {
  const firstName = document.getElementById("first");
  const lastName = document.getElementById("last");
  const email = document.getElementById("email");
  const birthdate = document.getElementById("birthdate");
  const numberOfTournament = document.getElementById("quantity");
  const condition = document.getElementById("checkbox1");
  const locationErr = document.getElementById('errorCity');
 
  if (!isNameValid(firstName.value)){
    return false
  } 

  if (!isNameValid(lastName.value)) {
    return false
  } 

  if (!isMailValid(email.value)){
    return false
  } 

  if (!isDateValid(birthdate.value)){
    return false
  } 

  if (!isQuantityValid(numberOfTournament.value)){
    return false
  }

  locationErr.setAttribute('data-error-visible', false);
  if (!isCityValid()) {
    locationErr.setAttribute('data-error-visible', true);
    return false;
  }

  if (!isCheckboxCheck(condition)) {
    return false;
  }
  
  return true;
}

// All functions to validate each form entries

function isCheckboxCheck(checkbox) {
  if (!checkbox.checked) {
    return false;
  }
  return true;
}

function isCityValid() {
  const cities = document.reserve.location;
  for (let i = 0; i < cities.length; i++) {
    let city = cities[i];
    if (city.checked) {
        return true;
    }
  }
  return false;
}

function isDateValid(date) {
  let regex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
  if (!regex.test(date) ||  date == "") {
    return false;
  }
  return true;
}

function isMailValid(mail) {
  let regex = /^\S+@\S+\.\S+$/;
  if (!regex.test(mail) || mail == "") {
    return false;
  }
  return true;
}

function isNameValid(name) {
  if (name.length < 2 || name === "" ) {
    return false;
  }
  return true;
}

function isQuantityValid(qty) {
  if (isNaN(qty) || qty == "" ) {
    return false;
  } 
  return true;
}

function hideError(element) {
  let parent = element.closest('div');
  parent.setAttribute('data-error-visible', false);
}

function showError(element) {
  let parent = element.closest('div');
  parent.setAttribute('data-error-visible', true);
}
