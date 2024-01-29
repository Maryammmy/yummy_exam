import { Detail } from "./detalis_modules.js";

export class Category {
    constructor() {
        this.showLoadingScreen();  // Display loading screen when Category is instantiated

        console.log('hello');
        document.getElementById('CategoryNav').addEventListener('click', () => {
            this.apiCategory();
        });
    }

    async apiCategory() {
        this.showLoadingScreen()
        const apiCategories = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const responseCategories = await apiCategories.json();
        this.hideLoadingScreen();  // Hide loading screen before displaying categories
        this.displaycategory(responseCategories);
    }

    displaycategory(category) {
        let htmlcontent = '';
        let searchSection = document.getElementById('search');

        // Hide the search section
        searchSection.classList.remove('d-block');
        searchSection.classList.add('d-none');
        let contactSection = document.getElementById('contactSection');

        // Hide the contact section
        contactSection.classList.remove('d-block');
        contactSection.classList.add('d-none');
        for (let i = 0; i < category.categories.length; i++) {
            htmlcontent += `
                <div class="col-md-3">
                    <div class="item position-relative rounded-3">
                        <div><img src="${category.categories[i].strCategoryThumb}" alt="" class="w-100"></div>
                        <div class="layer position-absolute text-center">
                            <h2>${category.categories[i].strCategory}</h2>
                            <p>${category.categories[i].strCategoryDescription.split(' ').slice(0, 20).join(' ')}</p>
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
                this.filterCategory(clickedCategory);
                console.log(clickedCategory);
            });
        });
    }

    async filterCategory(cate) {
        this.showLoadingScreen();  // Display loading screen before fetching filtered results
        const filterApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cate}`);
        const responseFilter = await filterApi.json();
        this.hideLoadingScreen();  // Hide loading screen before displaying filtered results
        this.displayName(responseFilter);
    }

    displayName(name) {
        let htmlcontent = '';
        for (let i = 0; i < 20; i++) {
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















