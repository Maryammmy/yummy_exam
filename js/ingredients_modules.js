// export class Ingredients {
//     constructor() {
//         console.log('ooo');
//         document.addEventListener('DOMContentLoaded', () => {
//         });
        
//         document.getElementById('ingredient').addEventListener('click', (event) =>{
//             this.apiIngredients()
//         });

//     }

//     async apiIngredients() {
//         const apiIngredient = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
//         const responseIngredient = await apiIngredient.json();
//         console.log(responseIngredient);
//         this.displayApi(responseIngredient);
//     }

//     displayApi(data) {
//         let htmlContent = '';
//         for (let i = 0; i < data.meals.length; i++) {
//             const strDescription = data.meals[i].strDescription || ''; // Use empty string if strDescription is null
//             const descriptionWords = strDescription.split(' ').slice(0, 10).join(' ');
            
//             htmlContent += `
//                 <div class="col-md-3">
//                     <div class="item">
//                         <div class="text-white text-center cursor-pointer">
//                             <i class="fa-solid fa-drumstick-bite fa-4x"></i>
//                             <h2>${data.meals[i].strIngredient}</h2>   
//                             <p>${descriptionWords}</p>
//                         </div>
//                     </div>
//                 </div>
//             `;
//         }
//         document.getElementById('demo').innerHTML = htmlContent;

//         const items = document.querySelectorAll('.item');
//         items.forEach((item) => {
//         item.addEventListener('click', (event) => {
//             const clickedCategory = item.querySelector('h2').innerText;
//             this.filteringre(clickedCategory);
//             console.log(clickedCategory)
//         });
//     });
//     }
//     async filteringre(ingred){
//         const filterApi= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingred}`)
//         const responseFilter=  await filterApi.json()
//         console.log(responseFilter)
//         this.displayingred(responseFilter)
    
//     }
//     displayingred(data) {
//         let htmlcontent = '';
//         for (let i = 0; i <data.meals.length; i++) {
//             htmlcontent += `
//             <div class="col-md-3">
//                 <div class="item position-relative rounded-3">
//                     <div><img src="${data.meals[i].strMealThumb}" alt="" class="w-100"></div>
//                     <div class="layer d-flex justify-content-start align-items-center position-absolute">
//                         <h2 class="ps-2">${data.meals[i].strMeal}</h2>
//                     </div>
//                 </div>
//             </div>
//             `;
//         }
//         document.getElementById('demo').innerHTML = htmlcontent;
//     }
// }
// ingredients_modules.js
import { Detail } from "./detalis_modules.js";
// export class Ingredients {
//     constructor() {
//         console.log('ooo');
//         // Wait for the DOM to fully load before attaching the event listener
//         document.addEventListener('DOMContentLoaded', () => {
//             document.getElementById('ingredient').addEventListener('click', () => {
//                 this.apiIngredients();
//             });
//         });
//     }

//     async apiIngredients() {
//         const apiIngredient = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
//         const responseIngredient = await apiIngredient.json();
//         console.log(responseIngredient);
//         this.displayApi(responseIngredient);
//     }

//     displayApi(data) {
//         let htmlContent = '';
//         let searchSection = document.getElementById('search');

//     // Hide the search section
//     searchSection.classList.remove('d-block');
//     searchSection.classList.add('d-none');

//         for (let i = 0; i < data.meals.length; i++) {
//             const strDescription = data.meals[i].strDescription || '';
//             const descriptionWords = strDescription.split(' ').slice(0, 10).join(' ');

//             htmlContent += `
//                 <div class="col-md-3">
//                     <div class="item">
//                         <div class="text-white text-center cursor-pointer">
//                             <i class="fa-solid fa-drumstick-bite fa-4x"></i>
//                             <h2>${data.meals[i].strIngredient}</h2>
//                             <p>${descriptionWords}</p>
//                         </div>
//                     </div>
//                 </div>
//             `;
//         }
//         document.getElementById('demo').innerHTML = htmlContent;

//         const items = document.querySelectorAll('.item');
//         items.forEach((item) => {
//             item.addEventListener('click', () => {
//                 const clickedCategory = item.querySelector('h2').innerText;
//                 this.filteringre(clickedCategory);
//                 console.log(clickedCategory);
//             });
//         });
//     }

//     async filteringre(ingred) {
//         const filterApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingred}`);
//         const responseFilter = await filterApi.json();
//         console.log(responseFilter);
//         this.displayingred(responseFilter);
//     }

//     displayingred(data) {
//         let htmlcontent = '';
//         for (let i = 0; i < data.meals.length; i++) {
//             htmlcontent += `
//                 <div class="col-md-3">
//                     <div class="item position-relative rounded-3" id="${data.meals[i].idMeal}">
//                         <div><img src="${data.meals[i].strMealThumb}" alt="" class="w-100"></div>
//                         <div class="layer d-flex justify-content-start align-items-center position-absolute">
//                             <h2 class="ps-2">${data.meals[i].strMeal}</h2>
//                         </div>
//                     </div>
//                 </div>
//             `;
//         }
//         document.getElementById('demo').innerHTML = htmlcontent;
//         const detail =new Detail()
//     }
// }
export class Ingredients {
    constructor() {
        this.showLoadingScreen();  // Display loading screen when Ingredients is instantiated

        // Wait for the DOM to fully load before attaching the event listener
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('ingredient').addEventListener('click', () => {
                this.apiIngredients();
            });
        });
    }

    async apiIngredients() {
        this.showLoadingScreen();
        const apiIngredient = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        const responseIngredient = await apiIngredient.json();
        this.hideLoadingScreen();  // Hide loading screen before displaying ingredients
        this.displayApi(responseIngredient);
    }

    displayApi(data) {
        let htmlContent = '';
        let searchSection = document.getElementById('search');

        // Hide the search section
        searchSection.classList.remove('d-block');
        searchSection.classList.add('d-none');
        let contactSection = document.getElementById('contactSection');

        // Hide the contact section
        contactSection.classList.remove('d-block');
        contactSection.classList.add('d-none');

        for (let i = 0; i < data.meals.length; i++) {
            const strDescription = data.meals[i].strDescription || '';
            const descriptionWords = strDescription.split(' ').slice(0, 10).join(' ');

            htmlContent += `
                <div class="col-md-3">
                    <div class="item">
                        <div class="text-white text-center cursor-pointer">
                            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                            <h2>${data.meals[i].strIngredient}</h2>
                            <p>${descriptionWords}</p>
                        </div>
                    </div>
                </div>
            `;
        }
        document.getElementById('demo').innerHTML = htmlContent;

        const items = document.querySelectorAll('.item');
        items.forEach((item) => {
            item.addEventListener('click', () => {
                const clickedCategory = item.querySelector('h2').innerText;
                this.filteringre(clickedCategory);
                console.log(clickedCategory);
            });
        });
    }

    async filteringre(ingred) {
        this.showLoadingScreen();  // Display loading screen before fetching filtered results
        const filterApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingred}`);
        const responseFilter = await filterApi.json();
        this.hideLoadingScreen();  // Hide loading screen before displaying filtered results
        this.displayingred(responseFilter);
    }

    displayingred(data) {
        let htmlcontent = '';
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
        document.getElementById('demo').innerHTML = htmlcontent;
        const detail = new Detail();
    }

    showLoadingScreen() {
        $(".loading-screen").css("display", "flex").fadeIn(1000);
    }

    hideLoadingScreen() {
        $(".loading-screen").fadeOut(1000);
        $("body").css("overflow", "auto");
    }
}


