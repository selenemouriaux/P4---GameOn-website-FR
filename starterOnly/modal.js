function editNav() {
  var x = document.getElementById("myTopnav")
  if (x.className === "topnav") {
    x.className += " responsive"
  } else {
    x.className = "topnav"
  }
}

const modalbg = document.querySelector(".bground")
const modalBtn = document.querySelectorAll(".modal-btn")
const formData = document.querySelectorAll(".formData")
const closeBtn = document.querySelector(".close")

modalBtn.forEach((btn) => btn.addEventListener("click", launchModal))

closeBtn.addEventListener("click", closeModal)

function launchModal() {
  modalbg.style.display = "block"
}

function closeModal() {
  modalbg.style.display = "none"
}

function validateFirstName() {
  const nameInput = document.getElementById("firstName")
  const nameError = nameInput.nextElementSibling
  let isValid = false

  if (nameInput.value.trim() === "") {
    nameError.textContent = "Un prénom est obligatoire."
    nameInput.classList.add("error-input")
  } else if (nameInput.value.trim().length < 2) {
    nameError.textContent = "Le prénom doit comporter au moins 2 caractères."
    nameInput.classList.add("error-input")
  } else {
    nameError.textContent = ""
    nameInput.classList.remove("error-input")
    isValid = true
  }
  return isValid
}

function validateLastName() {
  const nameInput = document.getElementById("lastName")
  const nameError = nameInput.nextElementSibling
  let isValid = false

  if (nameInput.value.trim() === "") {
    nameError.textContent = "Un nom de famille est obligatoire."
    nameInput.classList.add("error-input")
  } else if (nameInput.value.trim().length < 2) {
    nameError.textContent =
      "Le nom de famille doit comporter au moins 2 caractères."
    nameInput.classList.add("error-input")
  } else {
    nameError.textContent = ""
    nameInput.classList.remove("error-input")
    isValid = true
  }
  return isValid
}

function validateEmail() {
  const emailInput = document.getElementById("email")
  const emailError = emailInput.nextElementSibling
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  let isValid = false

  if (!emailPattern.test(emailInput.value)) {
    emailError.textContent = "Veuillez entrer une adresse e-mail valide."
    emailInput.classList.add("error-input")
  } else {
    emailError.textContent = ""
    emailInput.classList.remove("error-input")
    isValid = true
  }
  return isValid
}

function validateAge() {
  const ageInput = document.getElementById("dateOfBirth")
  const ageError = ageInput.nextElementSibling
  const currentDate = new Date()
  const inputDate = new Date(ageInput.value)
  const elevenYearsAgo = new Date(
    currentDate.getFullYear() - 11,
    currentDate.getMonth(),
    currentDate.getDate()
  )
  let isValid = false

  if (isNaN(inputDate.getTime()) || ageInput.value <= 0) {
    ageError.textContent = "Veuillez entrer une date valide."
    ageInput.classList.add("error-input")
  } else if (inputDate > elevenYearsAgo) {
    ageError.textContent =
      "L'âge minimum pour participer aux évènements est de 11 ans."
    ageInput.classList.add("error-input")
  } else {
    ageError.textContent = ""
    ageInput.classList.remove("error-input")
    isValid = true
  }
  return isValid
}

function validateQtty() {
  const qttyInput = document.getElementById("quantity")
  const qttyError = qttyInput.nextElementSibling
  let isValid = false

  if (
    isNaN(qttyInput.value) ||
    parseInt(qttyInput.value) !== Number(qttyInput.value)
  ) {
    qttyError.textContent = "La quantité doit être un nombre entier."
    qttyInput.classList.add("error-input")
  } else if (Number(qttyInput.value) < 0 || Number(qttyInput.value > 99)) {
    qttyError.textContent = "La quantité doit être comprise entre 0 et 99"
    qttyInput.classList.add("error-input")
  } else {
    qttyError.textContent = ""
    qttyInput.classList.remove("error-input")
    isValid = true
  }
  return isValid
}


function validateTournament() {
  const tournamentInput = document.getElementsByName("location")
  const tournamentError = document.getElementById("locationError")

  let isChecked = false;

  for (let i = 0; i < tournamentInput.length; i++) {
    if (tournamentInput[i].checked) {
      isChecked = true;
      break;
    }
  }

  if (!isChecked) {
    tournamentError.textContent = "Veuillez sélectionner un tournoi auquel participer."
  } else {
    tournamentError.textContent = ""
    isValid = true
  }
  return isChecked
}

function validateTerms() {
  const termsInput = document.getElementById("checkedTerms");
  const termsError = document.getElementById("checkedTermsError");

  if (!termsInput.checked) {
    termsError.textContent = "Veuillez accepter les termes et conditions pour candidater."
    termsInput.classList.add("error-input")
    return false;
  } else {
    termsError.textContent = ""
    termsInput.classList.remove("error-input")
    return true;
  }
}

document.getElementById("firstName").addEventListener("blur", validateFirstName)
document.getElementById("lastName").addEventListener("blur", validateLastName)
document.getElementById("email").addEventListener("blur", validateEmail)
document.getElementById("dateOfBirth").addEventListener("blur", validateAge)
document.getElementById("quantity").addEventListener("blur", validateQtty)

const validations = [
  validateFirstName,
  validateLastName,
  validateEmail,
  validateAge,
  validateQtty,
  validateTournament,
  validateTerms,
]

function validateForm() {
  let allValid = true;
  validations.forEach(fn=>{
    const result = fn();
    allValid = allValid && result
  })
  return allValid
}

document.getElementById("reservationForm").addEventListener("submit", function(event) {
  event.preventDefault();

  if (validateForm()) {
    console.log('le validate est passé, on met les classes a jour')
    document.getElementById("reservationForm").classList.add("active");
    document.getElementById("confirmationScreen").classList.add("active");
  }
});

document.getElementById("confirmButton").addEventListener("click", function() {
  document.querySelector(".bground").style.display = "none";
});