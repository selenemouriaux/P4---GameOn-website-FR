function editNav() {
  var x = document.getElementById("myTopnav")
  if (x.className === "topnav") {
    x.className += " responsive"
  } else {
    x.className = "topnav"
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground")
const modalBtn = document.querySelectorAll(".modal-btn")
const formData = document.querySelectorAll(".formData")
const closeBtn = document.querySelector(".close")

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal))

// close modal event
closeBtn.addEventListener("click", closeModal)

// launch modal form
function launchModal() {
  modalbg.style.display = "block"
}

// close modal form
function closeModal() {
  modalbg.style.display = "none"
}

// form fields validation
function validateFirstName() {
  const nameInput = document.getElementById("firstName")
  const nameError = nameInput.nextElementSibling

  if (nameInput.value.trim() === "") {
    nameError.textContent = "Un prénom est obligatoire."
    nameInput.classList.add("error-input")
  } else if (nameInput.value.trim().length < 2) {
    nameError.textContent = "Le prénom doit comporter au moins 2 caractères."
    nameInput.classList.add("error-input")
  } else {
    nameError.textContent = ""
    nameInput.classList.remove("error-input")
  }
}

function validateLastName() {
  const nameInput = document.getElementById("lastName")
  const nameError = nameInput.nextElementSibling

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
  }
}

function validateEmail() {
  const emailInput = document.getElementById("email")
  const emailError = emailInput.nextElementSibling
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(emailInput.value)) {
    emailError.textContent = "Veuillez entrer une adresse e-mail valide."
    emailInput.classList.add("error-input")
  } else {
    emailError.textContent = ""
    emailInput.classList.remove("error-input")
  }
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
  }
}

function validateQtty() {
  const qttyInput = document.getElementById("quantity")
  const qttyError = qttyInput.nextElementSibling

  if (
    isNaN(qttyInput.value) ||
    parseInt(qttyInput.value) !== Number(qttyInput.value)
  ) {
    qttyError.textContent = "La quantité doit être un nombre entier."
    qttyInput.classList.add("error-input")
  } else if (Number(qttyInput.value) < 0 || Number(qttyInput.value > 99)) {
    qttyError.textContent = "La quantité doit être comprise entre 0 et 99"
    qttyInput.classList.remove("error-input")
  } else {
    qttyError.textContent = ""
    qttyInput.classList.remove("error-input")
  }
}

// Ajout des événements de validation
document.getElementById("firstName").addEventListener("blur", validateFirstName)
document.getElementById("lastName").addEventListener("blur", validateLastName)
document.getElementById("email").addEventListener("blur", validateEmail)
document.getElementById("dateOfBirth").addEventListener("blur", validateAge)
document.getElementById("quantity").addEventListener("blur", validateQtty)
