
$(function () {
    $(".loader").fadeOut(1000, function () {
        $(".loading-screen").fadeOut(500, function () {
            $("body").css('overflow', 'auto')
        })
    })
})



sideNavToggle()
$(".open-close-icon").click(sideNavToggle)

function sideNavToggle() {
    {
        if ($(".side-nav-menu").css("left") == "0px") {
            $(".side-nav-menu").animate({ "left": -$(".nav-tab").outerWidth(true) }, 1000)
            $(".open-close-icon").removeClass("fa-xmark").addClass("fa-align-justify")


        } else {
            $(".side-nav-menu").animate({ "left": 0 }, 1000)
            $(".open-close-icon").removeClass("fa-align-justify").addClass("fa-xmark")

        }
    }
}

let mealsArr = [];

$.get("https://www.themealdb.com/api/json/v1/1/search.php?s=", function (mealsData) {
    sortingData(mealsData);
    mealsArr = mealsData.meals;
});

function sortingData(mealsData) {

    var meals = mealsData.meals;

    for (var i = 0; i < 20; i++) {
        var meal = meals[i];

        $("#rowData").append(`
            <div class="col-md-3"  onclick="mealDetails(${i})">
            <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                             <h3>${meal.strMeal}</h3>
                         </div>
                     </div>
                 </div>
                  `)
    }
}


function ingredientsChecking(meal) {
    $('#test').html = '';
    console.log(meal['strIngredient1']);
    for (let index = 1; index <= 20; index++) {
        let x = 'strIngredient' + index;
        let y = 'strMeasure' + index;

        if (meal[x] != "") {
            $('#test1').append(`
            <li class="alert alert-info d-inline-flex m-2 p-1 list-unstyled">${meal[y]} ${meal[x]}</li>
            `);
        }
    }
}

function mealDetails(i) {
    var hamada = mealsArr[i]
    $("#mealDetails").html(` <div class="col-3">
    <div><img class="w-100" src="${hamada.strMealThumb}" alt="">
        <h2>${hamada.strMeal}</h2>
    </div>
</div>
<div class="col-9">
    <div>
        <h3 class="w-50">Instructions.</h3>
        <p>${hamada.strInstructions}</p>
        <h3>Area : ${hamada.strArea}</h3>
        <h3>Category : ${hamada.strCategory}</h3>
        <h3>Recipes :</h3>
        <ul id='test1'>  
        </ul>
        <h3>Lorem, ipsum dolor.</h3>
        <a class="btn btn-outline-light mb-4" target= "_blank" href="${hamada.strSource}">Source</a>
        <a class="btn btn-outline-light mb-4" target= "_blank" href="${hamada.strYoutube}">Youtube</a>
    </div>
</div>` )
    console.log(mealsArr[i]);
    ingredientsChecking(hamada)
    showDetails()
}

function showDetails() {
    $("#rowData").addClass('d-none')
    $("#closehamada").removeClass('d-none')
}

function backToHome() {
    $("#closehamada").addClass('d-none')
    $("#rowData").removeClass('d-none')
}

let categoryArr = [];

$.get("https://www.themealdb.com/api/json/v1/1/categories.php?s=", function (categoryData) {
    return categoryArr = categoryData.categories;
});



function limitResponse(response, maxWords) {
    var words = response.split(' ');
    var limitedWords = words.slice(0, maxWords);
    var limitedResponse = limitedWords.join(' ');
    return limitedResponse;
}

function displayCategories(categoryArr) {
    $("#searchContainer").addClass("d-none")

    sideNavToggle()
    $("#rowData").html("");

    for (let index = 0; index < 20; index++) {

        var limitedResponse = limitResponse(categoryArr[index].strCategoryDescription, 20);

        $("#rowData").append(`
            <div class="col-md-3">
                <div onclick="mealDetails(${index})" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${categoryArr[index].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${categoryArr[index].strCategory}</h3>
                        <p>${limitedResponse}</p>
                    </div>
                </div>
            </div>
        `);
    }
    
}


function displayIng(categoryArr) {
    sideNavToggle()
    $("#searchContainer").addClass("d-none")

    $("#rowData").html("")
    for (index = 0; index < 20; index++) {

        var limitedResponse = limitResponse(categoryArr[index].strCategoryDescription, 18);

        $("#rowData").append(`
        <div class="col-md-3">
                <div onclick="onclick="mealDetails(${index})"" class="meal text-center position-relative overflow-hidden rounded-2 cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3 class="text-center">${categoryArr[index].strCategory}</h3>
                <p class="text-center">${limitedResponse}</p>
                </div>
        </div>
    </div>
        `)
    }
}

function displaySearch() {
    $("#rowData").html("")
    $("#searchContainer").removeClass("d-none")
    sideNavToggle()
}


var charachter = document.getElementById('searchBarByCharachter')

function getInputData() {
    console.log(charachter.value);

}