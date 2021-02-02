// DOM Elements
const modalbg = document.querySelector(".bground");
const form = document.getElementById("form");
const submitBtn = document.getElementById("submit");
let escapeHandler;
let clickOutside;

listenForModalOpening();

function closeModal() {
  document.removeEventListener("keydown", escapeHandler);
  document.removeEventListener("click", clickOutside);
  modalbg.style.display = "none";
}

function disableSubmitButton() {
  submitBtn.disabled = true ;
  submitBtn.style.cursor = 'not-allowed';
  submitBtn.style.opacity = '0.3';
}

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function enableSubmitButton() {
  submitBtn.disabled = false ;
  submitBtn.style.cursor = 'pointer';
  submitBtn.style.opacity = '1';
}

function listenForModalOpening() {
  document.querySelectorAll(".modal-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      modalbg.style.display = "block";
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
  clickOutside = function (e)  {
    if (e.target == modalbg) {
      closeModal();
    }
  };
  document.addEventListener("click",clickOutside) ;
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
  form.addEventListener("change", () => {
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
  form.addEventListener("submit", (e) => {
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
  if (!isCitySelect()) {
    locationErr.setAttribute('data-error-visible', true);
    return false;
  } else {
    locationErr.setAttribute('data-error-visible', false);
  }
  if (isNameValid(firstName.value) 
  && isNameValid(lastName.value) 
  && isMailValid(email.value) 
  && isDateValid(birthdate.value) 
  && isQuantityValid(numberOfTournament.value) 
  && isCitySelect() 
  && isCheckboxCheck(condition)) {
    return true;
  }
};

// All functions to validate each form entries

function isCheckboxCheck(checkbox) {
  if (!checkbox.checked) {
    return false;
  }
  return true;
}

function isCitySelect() {
  const cities = document.reserve.location;
  for (let i = 0; i < cities.length; i++) {
    if (cities[i].checked) {
        return cities[i];
    }
  }
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
