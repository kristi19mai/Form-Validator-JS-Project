const submit = document.getElementById("submit");
const form = document.querySelector(".form");
const message = document.querySelector(".message");
const inputs = Array.from(document.getElementsByTagName("input"));
const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");

let isValid = false;
let constraintsValidation = false;
let passwordConfirmed = false;
let formData = {};

// get Saved Form Data
function getSavedFormData() {
  if (localStorage.getItem("formdata"))
    formData = JSON.parse(localStorage.getItem("formdata"));
  console.log(formData);
  for (let key in formData) {
    form.elements[key].value = formData[key];
  }
}

// Check Form Validity
function checkFormValidity() {
  isValid = form.checkValidity();
  if (!isValid) {
    message.textContent = "Please fill out all the fields.";
    message.style.borderColor = "rgb(235,39,04)";
    message.style.color = "rgb(235,39,04)";
    return;
  }
}

// Confirm Password
function confirmPassword() {
  if (password1.value !== password2.value || password1.value === "") {
    passwordConfirmed = false;
    password2.style.borderColor = "rgba(236,165,165,0.4)";
    password2.style.backgroundColor = "rgba(236,165,165,0.4)";
    message.textContent = "Make sure passwords match.";
    message.style.borderColor = "rgb(235,39,04)";
    message.style.color = "rgb(235,39,04)";
  } else {
    passwordConfirmed = true;
    message.textContent = "Don't Hezitate!.";
    message.style.borderColor = "black";
    message.style.color = "black";
    password2.style.borderColor = "rgba(49,116,69,0.4)";
    password2.style.backgroundColor = "rgba(49,116,69,0.4)";
  }
}

// Constraint Validation API
function constraintValidationAPI(input) {
  const constraints = {
    email: ["^\\S+@\\S+$", "Please enter a correct email"],
    password: [
      "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$",
      "Please include at last 1 uppercase character, 1 lowercase character, and 1 number.",
    ],
  };

  const name = input.name;
  if (input.name === "password2") {
    confirmPassword();
  }
  if (constraints[name]) {
    var constraint = new RegExp(constraints[name][0]);
    if (constraint.test(input.value)) {
      constraintsValidation = true;
      input.setCustomValidity("");
    } else {
      constraintsValidation = false;
      input.setCustomValidity(constraints[name][1]);
    }
  }
}

// Save Form Data
function saveFormData(input) {
  if (input.name !== "password" && input.name !== "password2") {
    formData[input.name] = input.value;
    localStorage.setItem("formdata", JSON.stringify(formData));
  }
}

// Process Form Data
function processFormData(e) {
  e.preventDefault();
  checkFormValidity();
  if (isValid && constraintsValidation && passwordConfirmed) {
    message.textContent = "Successfully Registered!";
    message.style.borderColor = "rgba(49,116,69,0.4)";
    message.style.color = "rgb(49,116,69)";
  }
}

// Event Listener
submit.addEventListener("click", processFormData);
// Event Listeners oninput
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    constraintValidationAPI(input);
    saveFormData(input);
  });
});
window.onload = getSavedFormData();
