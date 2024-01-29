import { Detail } from "./detalis_modules.js";


export class Area {
    constructor() {
        this.showLoadingScreen();  // Display loading screen when Area is instantiated

        document.getElementById('area').addEventListener('click', () => {
            this.apiArea();
        });
    }

    async apiArea() {
        this.showLoadingScreen();
        const apiAreas = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        const responseArea = await apiAreas.json();
        this.hideLoadingScreen();  // Hide loading screen before displaying areas
        this.displayapi(responseArea);
    }

    displayapi(data) {
        let htmlcontent = '';
        let searchSection = document.getElementById('search');

        // Hide the search section
        searchSection.classList.remove('d-block');
        searchSection.classList.add('d-none');
        let contactSection = document.getElementById('contactSection');

        // Hide the contact section
        contactSection.classList.remove('d-block');
        contactSection.classList.add('d-none');

        for (let i = 0; i < data.meals.length; i++) {
            htmlcontent += `
                <div class="col-md-3">
                    <div class="item">
                        <div class="text-white text-center cursor-pointer">
                            <i class="fa-solid fa-house-laptop fa-4x"></i>
                            <h2>${data.meals[i].strArea}</h2>
                        </div>
                    </div>
                </div>
            `;
        }

        document.getElementById('demo').innerHTML = htmlcontent;
        const items = document.querySelectorAll('.item');
        items.forEach((item) => {
            item.addEventListener('click', () => {
                const clickedCategory = item.querySelector('h2').innerText;
                this.filterArea(clickedCategory);
                console.log(clickedCategory);
            });
        });
    }

    async filterArea(area) {
        this.showLoadingScreen();  // Display loading screen before fetching filtered results
        const filterApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        const responseFilter = await filterApi.json();
        this.hideLoadingScreen();  // Hide loading screen before displaying filtered results
        this.displayArea(responseFilter);
    }

    displayArea(data) {
        let htmlcontent = '';
        for (let i = 0; i < 20; i++) {
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
