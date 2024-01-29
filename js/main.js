import { Navbar } from "./navbar_modules.js";
import { Category } from "./category_modules.js";
import { Area } from "./area_modules.js";
import { Ingredients } from "./ingredients_modules.js";
import { Detail } from "./detalis_modules.js";


const navbar= new Navbar()
const category= new Category()
const area= new Area()
const ingredient= new Ingredients()
const detail= new Detail()

$(document).ready(() => {
  // Display loading screen
  $(".loading-screen").css("display", "flex").fadeIn(500);

  // Make your API calls here
  // const navbar = new Navbar()
  navbar.searchByName('').then(() => {
      // Hide loading screen after API calls are complete
      $(".loading-screen").fadeOut(500);
      $("body").css("overflow", "auto");
  });
});

// main.js
 async function api() {
    let yummy_api = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    let response=await yummy_api.json()
    console.log(response)
    displayapi(response);
}
api();

//side-menu

function displayapi(data) {
  let htmlcontent = '';

  if (data.meals && data.meals.length > 0) {
      for (let i = 0; i < data.meals.length; i++) {
          htmlcontent += `
              <div class="col-md-3">
                  <div class="item position-relative rounded-3" id="${data.meals[i].idMeal}">
                      <div><img src="${data.meals[i].strMealThumb}" alt="" class="w-100"></div>
                      <div class="layer d-flex justify-content-start align-items-center position-absolute">
                          <h2 class="ps-2">${data.meals[i].strMeal}</h2>
                      </div>
                  </div>
              </div>
          `;
      }
  } else {
      htmlcontent = '<p>No meals found.</p>';
  }

  document.getElementById('demo').innerHTML = htmlcontent;
  const detail= new Detail()
  
}

//side-menu
let navContentWidth = $(".nav-content").innerWidth();
$(".nav-content").animate({ left: -navContentWidth }, 0);
$(".side-menu").animate({ left: -navContentWidth }, 0);
$(".menu-controller-icon span").click(function () {
  $(".menu-controller-icon span").toggleClass("fa-close");
  if ($(".nav-content").css("left") == "0px") {
    //close
    $(".nav-content").animate({ left: -navContentWidth }, 500);
    $(".side-menu").animate({ left: -navContentWidth }, 500);
    // animate nav links
    $("nav li").animate({ top: 300 }, 500);
  } else {
    //open
    $(".nav-content").animate({ left: 0 }, 500);
    $(".side-menu").animate({ left: 0 }, 500);
    // animate nav links
    for (let i = 0; i < 5; i++)
      $("nav li")
        .eq(i)
        .animate({ top: 0 }, (i + 9) * 100);
  }
});
// When user click on nav links remove the side-menu
$("nav li a").click(function () {
  $(".nav-content").animate({ left: -navContentWidth }, 500);
  $(".side-menu").animate({ left: -navContentWidth }, 500);
  $(".menu-controller-icon span").toggleClass("fa-close");
});


const contactBtn = document.querySelector('#contact');
const contact = document.querySelector('#contactSection');
const nameInput = document.querySelector('#nameInput');
const nameWorngInput = document.querySelector('#alertname');
const emailInput = document.querySelector('#emailInput');
const emailWorngInput = document.querySelector('#alertemail');
const phoneInput = document.querySelector('#phoneInput');  // Corrected ID
const phoneWorngInput = document.querySelector('#alertphone');  // Corrected ID
const ageInput = document.querySelector('#ageInput');
const ageWorngInput = document.querySelector('#alertage');
const passwordInput = document.querySelector('#passInput');  // Corrected ID
const passwordWorngInput = document.querySelector('#alertpass');
const rePasswordInput = document.querySelector('#repassInput');  // Corrected ID
const rePasswordWorngInput = document.querySelector('#alertrepass');
const submitBtn = document.querySelector('#submitButton');

contactBtn.addEventListener('click', function () {

    contact.classList.remove('d-none');
    contact.classList.add('d-block');
    document.getElementById('home').style.display = 'none';
});

function checkInputsValidation(inputTag, isValid, wrongMessage) {
    if (isValid) {
        inputTag.classList.add('is-valid');
        inputTag.classList.remove('is-invalid');
        wrongMessage.classList.add('d-none');
    } else {
        inputTag.classList.remove('is-valid');
        inputTag.classList.add('is-invalid');
        wrongMessage.classList.remove('d-none');
    }

    if (
        nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        rePasswordValidation()
    ) {
        submitBtn.removeAttribute('disabled');
    } else {
        submitBtn.setAttribute('disabled', 'disabled');
    }
}

nameInput.addEventListener('keyup', function () {
    let isValid = nameValidation();
    checkInputsValidation(nameInput, isValid, nameWorngInput);
});

emailInput.addEventListener('keyup', function () {
    let isValid = emailValidation();
    checkInputsValidation(emailInput, isValid, emailWorngInput);
});

phoneInput.addEventListener('keyup', function () {
    let isValid = phoneValidation();
    checkInputsValidation(phoneInput, isValid, phoneWorngInput);
});

ageInput.addEventListener('keyup', function () {
    let isValid = ageValidation();
    checkInputsValidation(ageInput, isValid, ageWorngInput);
});

passwordInput.addEventListener('keyup', function () {
    let isValid = passwordValidation();
    checkInputsValidation(passwordInput, isValid, passwordWorngInput);
});

passwordInput.addEventListener('change', function () {
    let isValid = rePasswordValidation();
    checkInputsValidation(rePasswordInput, isValid, rePasswordWorngInput);
});

rePasswordInput.addEventListener('keyup', function () {
    let isValid = rePasswordValidation();
    checkInputsValidation(rePasswordInput, isValid, rePasswordWorngInput);
});

function nameValidation() {
    let nameRegx = /^[a-z ,.'-]{3,}$/;
    return nameRegx.test(nameInput.value);
}

function emailValidation() {
    let emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z.-]+\.[A-Za-z]{2,7}$/;
    return emailRegex.test(emailInput.value);
}

function phoneValidation() {
    let phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4,5}$/;
    return phoneRegex.test(phoneInput.value);
}

function ageValidation() {
    let ageRegex = /^[1-9]?[0-9]{1}$|^100$/;
    return ageRegex.test(ageInput.value);
}

function passwordValidation() {
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    ;
    return passwordRegex.test(passwordInput.value);
}

function rePasswordValidation() {
    return rePasswordInput.value == passwordInput.value;
}