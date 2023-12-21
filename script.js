var random_meal = document.getElementById('random-meal');
var meal_cat = document.getElementById('meal-categories');
var search_bar = document.getElementById('search-bar');
var detailsHTML
var random_meal_picture = document.getElementById('random-meal')

fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data => {
        if (data.meals) {
            const randomMeal = data.meals[0];
            const ingredients = getIngredientsList(randomMeal);
            const instructions = randomMeal.strInstructions;
            const mealHTML = `
                <img class='meal-image' src="${randomMeal.strMealThumb}" alt="${randomMeal.strMeal}">
                <h2 class='meal-name'>${randomMeal.strMeal}</h2>
            `;
            random_meal.innerHTML = mealHTML;
            detailsHTML = `
                    <h3 class='heading'>Ingredients:</h3>
                    <ul class='text'>${ingredients}</ul>
                    <h3 class='heading'>Instructions:</h3>
                    <p class='text'>${instructions}</p>
                `;

        }
    });
    function getIngredientsList(meal) {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
    
            if (ingredient && measure) {
                ingredients.push(`<li>${measure} ${ingredient}</li>`);
            } else if (ingredient) {
                ingredients.push(`<li>${ingredient}</li>`);
            }
        }
        return ingredients.join('');
    }

function fetchMealsByCategory(category) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(response => response.json())
        .then(data => {
            if (data.meals) {
                const mealsHTML = data.meals.map(meal => `
                <div class="overlap-5">
                <div class="rectangle"></div>
                <div class="group-2">
                    <div class="overlap-group-wrapper">
                        <div class="overlap-group-2">
                            <img class="unsplash" src="./assets/unsplash_EPi3TRQc5Z0 copy.svg" />
                            <img class="unsplash-szzuuwk" src="./assets/unsplash_m663zRzRe40 copy.svg" />
                            <img class="unsplash-epitrqcz" src="./assets/unsplash_7Sz71zuuW4k.svg" />
                        </div>
                    </div>
                    <div class="group-3">
                        <img class="star" src="./assets/Star 7.svg" />
                        <div class="text-wrapper-5">(4.5)</div>
                    </div>
                </div>
                <div class="text-wrapper-6">${meal.strMeal}</div>
                <div class="div-wrapper">
                    <div onclick="searchYouTubeVideos('${meal.strMeal}')" class="overlap-6" > <img class="star youtube" src="./assets/Group 5.png" /><div class="text-wrapper-7">Recipe</div></div>
                </div>
                <div class="group-4">
                    <div class="overlap-7">
                        <div class="group-5">
                            <div class="overlap-8">
                                <img class="unsplash-uchzduitwy" src="${meal.strMealThumb}" />
                            </div>
                        </div>
                        <img class="ellipse-2" src="./assets/Ellipse 57.svg" />
                    </div>
                </div>
            </div>
                `).join('');
                meal_cat.innerHTML = mealsHTML;
            }
        })
}
function searchYouTubeVideos(dishName) {
    const apiKey = 'AIzaSyC4mxqRRBN5Uz-UqNEPk6a2wZD9yHEXh20';
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(dishName)}&type=video&key=${apiKey}`;
    console.log('API Request URL:', apiUrl);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const videoId = data.items[0].id.videoId;
            const youtubeLink = `https://www.youtube.com/watch?v=${videoId}`;
            window.open(youtubeLink,'_blank')
        })
}
search_bar.addEventListener('input', event => {
    fetchMealsByCategory(event.target.value);
});
search_bar.addEventListener('search', event => {
    const searchTerm = event.target.value.trim();

    if (searchTerm === '') {
        meal_cat.innerHTML = `<div class='items'>
        <img class='meal-image' src="./assets/img/pexels-engin-akyurt-2994900.jpg">
        <h3 class='meal-name name' >Chicken</h3>
    </div>
    <div class='items'>
        <img class='meal-image' src="./assets/img/pexels-alex-bayev-12077980.jpg">
        <h3 class='meal-name name' >Side Dish</h3>
    </div>
    <div class='items'>
        <img class='meal-image' src="./assets/img/pexels-engin-akyurt-3219483.jpg">
        <h3 class='meal-name name' >Break Fast</h3>
    </div>
    <div class='items'>
        <img class='meal-image' src="./assets/img/pexels-jonathan-borba-3009323.jpg">
        <h3 class='meal-name name' >Pasta</h3>
    </div>
    <div class='items'>
        <img class='meal-image' src="./assets/img/pexels-karol-d-582486.jpg">
        <h3 class='meal-name name' >Vegan</h3>
    </div>
    <div class='items'>
        <img class='meal-image' src="./assets/img/pexels-lisa-fotios-918327.jpg" >
        <h3 class='meal-name name' >Dessert</h3>
    </div>
    <div class='items'>
        <img class='meal-image' src="./assets/img/pexels-malidate-van-769289.jpg">
        <h3 class='meal-name name' >Goat</h3>
    </div>
    <div class='items'>
        <img class='meal-image' src="./assets/img/pexels-marcelo-verfe-16743486.jpg">
        <h3 class='meal-name name' >Seafood</h3>
    </div>
    <div class='items'>
        <img class='meal-image' src="./assets/img/pexels-min-an-1482803.jpg" >
        <h3 class='meal-name name' >Lamb</h3>
    </div>
    <div class='items'>
        <img class='meal-image' src="./assets/img/pexels-pascal-claivaz-410648.jpg">
        <h3 class='meal-name name' >Beef</h3>
    </div>
    <div class='items'>
        <img class='meal-image' src="./assets/img/pexels-vanessa-loring-5965658.jpg">
        <h3 class='meal-name name' >Vegetarian</h3>
    </div>
    <div class='items'>
        <img class='meal-image' src="./assets/img/pexels-pixabay-416528.jpg">
        <h3 class='meal-name name' >Starter</h3>
    </div>
    <div class='items'>
        <img class='meal-image' src="./assets/img/pexels-pixabay-262945.jpg" >
        <h3 class='meal-name name' >Pork</h3>
    </div>`;
    }
});

random_meal_picture.addEventListener('click', function(){
    document.getElementById("popup").innerHTML = detailsHTML
    document.getElementById("popup1").style.visibility = 'visible'
})

document.getElementById('close-button').addEventListener('click',function(){
    document.getElementById("popup1").style.visibility = 'hidden'

})
