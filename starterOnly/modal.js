/**
 * Legacy function whose purpose is to switch the css propoerties to make it responsive
 */
function editNav() {
  var x = document.getElementById("myTopnav")
  if (x.className === "topnav") {
    x.className += " responsive"
  } else {
    x.className = "topnav"
  }
}

// defining anchors in the DOM to make it dynamic using JS here.
// naming is transparent for readability and better understanding.
// Selectors are various, either general or more accurate like farther in the code. 
const modalbg = document.querySelector(".bground")
const modalBtn = document.querySelectorAll(".modal-btn")
const formData = document.querySelectorAll(".formData")
const closeBtn = document.querySelector(".close")

// here I set up listeners using a loop as the selector gave me a list of elements
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal))

// other listener, other purpose: close on 'x' click
closeBtn.addEventListener("click", closeModal)

/**
 * quick function to make the modal pop, modifying css props directly
 */
function launchModal() {
  modalbg.style.display = "block"
}

/**
 * same as before, we're hiding things to make it look like it's closed
 */
function closeModal() {
  modalbg.style.display = "none"
}

/**
 * First Validation function of a serie.
 * It uses selectors to target both the field containing the form value and the corresponding hidden error field.
 * The function is either triggered on blur or direct form validation.
 * It tests the value given in the form with conditions and sets the error accordingly if needed.
 * @returns a boolean value stating if the fiels complies with the validation conditions, which be useful later.
 */
function validateFirstName() {
  const nameInput = document.getElementById("firstName")
  // nextElementSibling targets the error span which follows in the dom. works because the architecture has been thought to work together.
  const nameError = nameInput.nextElementSibling
  // sets the valid state to false until proven otherwise, thus prevent the submission by default.
  let isValid = false

  if (nameInput.value.trim() === "") {
    // for each failed test, a description of needed modification is given in order to pass
    nameError.textContent = "Un prénom est obligatoire."
    // sets the styling for errors when faulty
    nameInput.classList.add("error-input")
  } else if (nameInput.value.trim().length < 2) {
    nameError.textContent = "Le prénom doit comporter au moins 2 caractères."
    nameInput.classList.add("error-input")
  } else {
    // resets the error if resolved, no more text, no more red
    nameError.textContent = ""
    nameInput.classList.remove("error-input")
    // if no error, tests proved valid, the flag is set to ok
    isValid = true
  }
  // returns the flag
  return isValid
}

/**
 * Pretty much the same as other verification functions, except it is focused on the last name field.
 * Works VERY similarly as the previous for first name 
 * @returns a boolean stating if name is ok
 */
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

/**
 * Another verification function.
 * Uses a regex to check if the 'mail' uses the usual structure of an actual email.
 * @returns a boolean stating if the given mail is considered ok or not.
 */
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

/**
 * Verification function converting strings to date, then comparing to test if the applicant's age meets the age criteria from his birth date till day.
 * Uses vanilla js dates methods to cast, manipulate and compare.
 * Tests follow a logical serie with typical error messages to guide the user if needed.
 * @returns a boolean to validate the age or not.
 */
function validateAge() {
  const ageInput = document.getElementById("dateOfBirth")
  const ageError = ageInput.nextElementSibling
  // makes a date object from today for calculations
  const currentDate = new Date()
  // cast the string of the form as a date object which can be used way more efficiently and accurately.
  const inputDate = new Date(ageInput.value)
  // makes a date object for age requirements check
  const elevenYearsAgo = new Date(
    currentDate.getFullYear() - 11,
    currentDate.getMonth(),
    currentDate.getDate()
  )
  let isValid = false

  // checks the string could be converted, data is actually valid and past
  if (isNaN(inputDate.getTime()) || ageInput.value <= 0) {
    ageError.textContent = "Veuillez entrer une date valide."
    ageInput.classList.add("error-input")
  // tests age requirements
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

/**
 * Quick validation function of correct integer value for attended events
 * @returns a boolean for validation status
 */
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

/**
 * Validation function looping between dom elements composing the possible answers and checking at least one is selected.
 * @returns a boolean for validation status
 */
function validateTournament() {
  // this selector gives an array of elements sharing the same name, corresponding to the possible values of this checkboxes field.
  const tournamentInput = document.getElementsByName("location")
  const tournamentError = document.getElementById("locationError")

  let isChecked = false;

  // looping through checkboxes sharing the same name, ie all different options
  for (let i = 0; i < tournamentInput.length; i++) {
    if (tournamentInput[i].checked) {
      // if only one is checked, the test succeeds
      isChecked = true;
      // no need to keep going after a first positive, hence the break
      break;
    }
  }

  if (!isChecked) {
    tournamentError.textContent = "Veuillez sélectionner au moins un tournoi auquel participer."
  } else {
    tournamentError.textContent = ""
    isValid = true
  }
  return isChecked
}

/**
 * Classic validation.
 * Same as previous with only one value to verify
 * @returns a boolean for validation status
 */
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

// here we set the trigger of each field validation as soon as it is left by the user (blur event), which makes it way more dynamic and responding
document.getElementById("firstName").addEventListener("blur", validateFirstName)
document.getElementById("lastName").addEventListener("blur", validateLastName)
document.getElementById("email").addEventListener("blur", validateEmail)
document.getElementById("dateOfBirth").addEventListener("blur", validateAge)
document.getElementById("quantity").addEventListener("blur", validateQtty)

// here I set a list of the validation functions names to call them all subsequently despite possible fails to give a thorough vision of each and every error, whatever the user's manipulation
const validations = [
  validateFirstName,
  validateLastName,
  validateEmail,
  validateAge,
  validateQtty,
  validateTournament,
  validateTerms,
]

// subsequent calls of all checkings, storing the validity of the whole form
function validateForm() {
  let allValid = true;
  validations.forEach(fn=>{
    const result = fn();
    // fails at the first faulty check but keeps going, so it displays correctly all the form errors
    allValid = allValid && result
  })
  return allValid
}

// Finally, I bypass the form's submit behavior by preventing its behavior, replacing it with all my checks
document.getElementById("reservationForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // if all the test are green, the form is hidden and the success panel is displayed
  if (validateForm()) {
    console.log('le validate est passé, on met les classes a jour')
    document.getElementById("reservationForm").classList.add("active");
    document.getElementById("confirmationScreen").classList.add("active");
    // a real submit function might get in later, hopefully ^^'
  }
});

// addition of a listener to actually 'close' the popup by clicking 'confirm'
document.getElementById("confirmButton").addEventListener("click", function() {
  document.querySelector(".bground").style.display = "none";
});

// THAT'S ALL FOLKS !!
