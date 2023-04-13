/*SCRIPT THE FORM PROCESS*/

// VALIDATE CAMP 
const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');

const expressions = {
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  lastname: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone: /^\d{7,14}$/ // 7 a 14 numeros.
}

const camps = {
  name: false,
  lastname: false,
  email: false,
  phone: false
}

const validateForm = (e) => {
  switch (e.target.name){
    case 'name':
        validateCamp(expressions.name, e.target, 'name');
    break;
    case 'lastname':
        validateCamp(expressions.lastname, e.target, 'lastname');
    break;
    case 'phone':
        validateCamp(expressions.phone, e.target, 'phone');
    break;
    case 'email':
        validateCamp(expressions.email, e.target, 'email');
    break;
  }
}

const validateCamp = (exp, input, camp) => {
  if(exp.test(input.value)){
    document.getElementById(`form-${camp}`).classList.remove('form-group-incorrect');
    document.getElementById(`form-${camp}`).classList.add('form-group-correct');
    document.querySelector(`#form-${camp} i`).classList.add('fa-check-circle');
    document.querySelector(`#form-${camp} i`).classList.remove('fa-times-circle');
    document.querySelector(`#form-${camp} .message-error`).classList.remove('message-error-active');
    camps[camp] = true;
  } else {
    document.getElementById(`form-${camp}`).classList.add('form-group-incorrect');
    document.getElementById(`form-${camp}`).classList.remove('form-group-correct');
    document.querySelector(`#form-${camp} i`).classList.add('fa-times-circle');
    document.querySelector(`#form-${camp} i`).classList.remove('fa-check-circle');
    document.querySelector(`#form-${camp} .message-error`).classList.add('message-error-active');
    camps[camp] = false;
  }
}

inputs.forEach((input) => {
  input.addEventListener('keyup', validateForm);
  input.addEventListener('blur', validateForm);

});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if(camps.name && camps.lastname && camps.phone && camps.email){
    form.reset();

    document.getElementById('msg-success').classList.add('msg-success-active');
    setTimeout(() => {
      document.getElementById('msg-success').classList.remove('msg-success-active');
    }, 5000);

    document.querySelectorAll('.form-group-correct').forEach((icono) => {
      icono.classList.remove('form-group-correct');
    });
  } else {
    document.getElementById('form-msg').classList.add('form-msg-active');
  }

});


// I DECLARE THE VARIABLES
const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");

// I SET THE VARIABLE TO 0 TO INCREMENT IT WITH EACH CLICK
let formStepsNum = 0;

// INCREMENT BUTTON
nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  });
});

// DECREMENT BUTTON
prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
  });
});


// STEPS
function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active");
  });

  formSteps[formStepsNum].classList.add("form-step-active");
}

// UPDATE PROGRESS BAR
function updateProgressbar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < formStepsNum + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });

  // ACTIVITY PROGRESS
  const progressActive = document.querySelectorAll(".progress-step-active");

  progress.style.width =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}