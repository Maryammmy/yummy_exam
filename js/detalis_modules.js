

// export class Detail {
//     constructor() {
       
//         const items = document.querySelectorAll('.item');
        
//         items.forEach((item) => {
//             item.addEventListener('click', async (event) => {
              
//                 const idMeal = event.currentTarget.id; // Get the id from the clicked item
//                 console.log(idMeal)
//                 await this.detailApi(idMeal);
//             });
//         });
//     }

//     async detailApi(idmeal) {
//         const apiDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idmeal}`);
//         const responseDetails = await apiDetails.json();
//         console.log(responseDetails);
//         this.displayapi(responseDetails);
//     }

//     displayapi(data) {
//         let htmlcontent = '';
//         let searchSection = document.getElementById('search');

//         // Hide the search section
//         searchSection.classList.remove('d-block');
//         searchSection.classList.add('d-none');
//         for (let i = 0; i < data.meals.length; i++) {
//             let ingredientsList = '';
    
//             // Loop through all strIngredient properties dynamically
//             for (let j = 1; j <= 20; j++) {
//                 const ingredient = data.meals[i][`strIngredient${j}`];
//                 const measure = data.meals[i][`strMeasure${j}`];
    
//                 if (ingredient) {
//                     // Concatenate strIngredient and strMeasure in one li
//                     ingredientsList += `<li class="p-2 rounded-2  ing">${measure ? `${measure} ` : ''}${ingredient}</li>`;
//                 }
//             }
    
//             const tags = data.meals[i].strTags ? `<li class="p-2 rounded-2 bg-danger-subtle my-2 color">${data.meals[i].strTags}</li>` : '';
    
//             htmlcontent += `
//                 <div class="col-md-4">
//                     <div class="item rounded-3" id="${data.meals[i].idMeal}">
//                         <div><img src="${data.meals[i].strMealThumb}" alt="" class="w-100"></div>
//                     </div>
//                     <div> <h1 class="text-white">${data.meals[i].strMeal}</h1></div>
//                 </div>
//                 <div class="col-md-8">
//                     <div class="contain text-white">
//                         <h3>Instructions</h3>
//                         <p>${data.meals[i].strInstructions}</p>
//                         <h3>Area : <span>${data.meals[i].strArea}</span></h3>
//                         <h3>Category : <span>${data.meals[i].strCategory}</span></h3>
//                         <div>
//                             <h3>Recipes :</h3>
//                             <ul class="d-flex flex-wrap gap-2">
//                                 ${ingredientsList}
//                             </ul>
//                         </div>
//                         <div>
//                             <h3>Tags :</h3>
//                             <ul class="d-flex flex-wrap gap-2">
//                                 ${tags}
                               
//                             </ul>
//                         </div>
//                         <ul class="d-flex flex-wrap gap-2">
//                             <li class="btn btn-success p-2"><a href="${data.meals[i].strSource}" target="_blank">Source</a></li>
//                             <li class="btn btn-danger p-2"><a href="${data.meals[i].strYoutube}" target="_blank">Youtube</a></li>
//                         </ul>
//                     </div>
//                 </div>
//             `;
//         }
//         document.getElementById('demo').innerHTML = htmlcontent;
      
//     }
    
    
// }
export class Detail {
    constructor() {
        // this.showLoadingScreen();  // Display loading screen when Detail is instantiated

        const items = document.querySelectorAll('.item');

        items.forEach((item) => {
            item.addEventListener('click', async (event) => {
                const idMeal = event.currentTarget.id; // Get the id from the clicked item
                console.log(idMeal);
                await this.detailApi(idMeal);
            });
        });
    }

    async detailApi(idmeal) {
          this.showLoadingScreen();
        const apiDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idmeal}`);
        const responseDetails = await apiDetails.json();
        this.hideLoadingScreen();  // Hide loading screen before displaying details
        console.log(responseDetails);
        this.displayapi(responseDetails);
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
            let ingredientsList = '';

            // Loop through all strIngredient properties dynamically
            for (let j = 1; j <= 20; j++) {
                const ingredient = data.meals[i][`strIngredient${j}`];
                const measure = data.meals[i][`strMeasure${j}`];

                if (ingredient) {
                    // Concatenate strIngredient and strMeasure in one li
                    ingredientsList += `<li class="p-2 rounded-2  ing">${measure ? `${measure} ` : ''}${ingredient}</li>`;
                }
            }

            const tags = data.meals[i].strTags ? `<li class="p-2 rounded-2 bg-danger-subtle my-2 color">${data.meals[i].strTags}</li>` : '';

            htmlcontent += `
                <div class="col-md-4">
                    <div class="item rounded-3" id="${data.meals[i].idMeal}">
                        <div><img src="${data.meals[i].strMealThumb}" alt="" class="w-100"></div>
                    </div>
                    <div> <h1 class="text-white">${data.meals[i].strMeal}</h1></div>
                </div>
                <div class="col-md-8">
                    <div class="contain text-white">
                        <h3>Instructions</h3>
                        <p>${data.meals[i].strInstructions}</p>
                        <h3>Area : <span>${data.meals[i].strArea}</span></h3>
                        <h3>Category : <span>${data.meals[i].strCategory}</span></h3>
                        <div>
                            <h3>Recipes :</h3>
                            <ul class="d-flex flex-wrap gap-2">
                                ${ingredientsList}
                            </ul>
                        </div>
                        <div>
                            <h3>Tags :</h3>
                            <ul class="d-flex flex-wrap gap-2">
                                ${tags}
                            </ul>
                        </div>
                        <ul class="d-flex flex-wrap gap-2">
                            <li class="btn btn-success p-2"><a href="${data.meals[i].strSource}" target="_blank">Source</a></li>
                            <li class="btn btn-danger p-2"><a href="${data.meals[i].strYoutube}" target="_blank">Youtube</a></li>
                        </ul>
                    </div>
                </div>
            `;
        }
        document.getElementById('demo').innerHTML = htmlcontent;
    }

    showLoadingScreen() {
        $(".loading-screen").css("display", "flex").fadeIn(1000);
    }

    hideLoadingScreen() {
        $(".loading-screen").fadeOut(1000);
        $("body").css("overflow", "auto");
    }
}

