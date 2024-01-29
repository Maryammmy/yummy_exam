import { Detail } from "./detalis_modules.js";
// navbar_modules.js
// export class Navbar {
//     constructor() {
//         document.getElementById('searchNav').addEventListener('click', function () {
//             document.getElementById('search').classList.remove('d-none');
//             document.getElementById('search').classList.add('d-block');
//             document.getElementById('home').style.display = 'none';
//         });
//         document.getElementById('searchName').addEventListener('keyup', (event) => {
//             this.searchByName(event.target.value);
//         });
//         document.getElementById('searchLetter').addEventListener('keyup', (event) => {
//             this.searchByName(event.target.value);
//         });
//     }

//     async searchByName(name) {
//         const apiName = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
//         let responseName = await apiName.json();
//         console.log(responseName);
//         this.displayName(responseName);
//     }
//     async searchByletter(letter) {
//         const apiletter = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
//         let responseletter = await apiletter.json();
//         console.log(responseletter);
//         this.displayName(responseletter);
//     }
    
//     displayName(name) {
//         let htmlcontent = '';
//         document.getElementById('home').style.display = 'block';
//         for (let i = 0; i < name.meals.length; i++) {
//             htmlcontent += `
//             <div class="col-md-3">
//                 <div class="item position-relative rounded-3" id="${name.meals[i].idMeal}">
//                     <div><img src="${name.meals[i].strMealThumb}" alt="" class="w-100"></div>
//                     <div class="layer d-flex justify-content-start align-items-center position-absolute">
//                         <h2 class="ps-2">${name.meals[i].strMeal}</h2>
//                     </div>
//                 </div>
//             </div>
//             `;
//         }
//         document.getElementById('demo').innerHTML = htmlcontent;
       
//         const detail = new Detail();
//     }
//  }
export class Navbar {
    constructor() {
        this.showLoadingScreen();  // Display loading screen when Navbar is instantiated

        document.getElementById('searchNav').addEventListener('click', function () {
            document.getElementById('search').classList.remove('d-none');
            document.getElementById('search').classList.add('d-block');
            document.getElementById('home').style.display = 'none';
        });

        document.getElementById('searchName').addEventListener('keyup', (event) => {
            this.searchByName(event.target.value);
        });

        document.getElementById('searchLetter').addEventListener('keyup', (event) => {
            this.searchByName(event.target.value);
        });
    }

    async searchByName(name) {
        this.showLoadingScreen();  // Display loading screen before fetching search results
        const apiName = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        const responseName = await apiName.json();
        this.hideLoadingScreen();  // Hide loading screen before displaying search results
        this.displayName(responseName);
    }

    async searchByletter(letter) {
        this.showLoadingScreen();  // Display loading screen before fetching search results
        const apiletter = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        const responseletter = await apiletter.json();
        this.hideLoadingScreen();  // Hide loading screen before displaying search results
        this.displayName(responseletter);
    }

    displayName(name) {
        let htmlcontent = '';
        document.getElementById('home').style.display = 'block';
        let contactSection = document.getElementById('contactSection');

        // Hide the contact section
        contactSection.classList.remove('d-block');
        contactSection.classList.add('d-none');

        for (let i = 0; i < name.meals.length; i++) {
            htmlcontent += `
                <div class="col-md-3">
                    <div class="item position-relative rounded-3" id="${name.meals[i].idMeal}">
                        <div><img src="${name.meals[i].strMealThumb}" alt="" class="w-100"></div>
                        <div class="layer d-flex justify-content-start align-items-center position-absolute">
                            <h2 class="ps-2">${name.meals[i].strMeal}</h2>
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




