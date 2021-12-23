//FETCH RECIPE API, FETCH RECIPE API, FETCH RECIPE API 
let generateBtn = document.querySelector(".button");

generateBtn.addEventListener("click", () => {
    console.log("buttton pressed")
    fetchAPI()
});

function fetchAPI() {
    const appId = "ffaf5499";
    const appKey = "174caf828a5cf1d15fb51927b57b5af1";

    let input = document.getElementsByClassName("input")[0].value;
    let q = input;
    let diet = document.querySelector("#diet").value;
    let dietInput = diet;
    let meal = document.querySelector("#meal").value;
    let mealInput = meal;
    let cuisine = document.querySelector("#cuisine").value;
    let cuisineInput = cuisine;

    fetch(`https://api.edamam.com/search?q=${q}&mealType=${mealInput}&cuisineType=${cuisineInput}&diet=${dietInput}&app_id=${appId}&to=30&app_key=${appKey}&from=0&calories=591-722&health=alcohol-free`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            generateCards(data)
        });

    document.querySelector(".top").style.display = "block";
}







//GENERATE RECIPES, GENERATE RECIPES, GENERATE RECIPES
function generateCards(data) {
    let htmlString = "";

    for (let c of data.hits) {
        htmlString += `
         <div class="oneCard" style="display: flex; flex-direction: column;">
            <img class="cardImgs" src="${c.recipe.image}" alt="">
            <div class="cardContent">
            
                <h3>${c.recipe.label}</h3>
                
                <h5>${c.recipe.dietLabels}</h5>
                <h5>${c.recipe.mealType}</h5>
                <h5>${c.recipe.cuisineType}</h5>

                <button class="cardRecipe"><a target="_blank" href="${c.recipe.url}">recipe</a></button>
                <button class="cardFavo"> <img class="cardHaert" src="./Imgs/emoticonHeart.png" alt=""> </button>

            </div>  
        </div>`
    }
    document.querySelector(".card").innerHTML = htmlString;
}







//FETCH HEROKU API, FETCH HEROKU API, FETCH HEROKU API

//Save searchcriteria in Mongodb
async function postFunctionality(event) {
    let input = document.querySelector(".input").value;
    let diet = document.querySelector("#diet").value;
    let meal = document.querySelector("#meal").value;
    let cuisine = document.querySelector("#cuisine").value;
    console.log(input, diet, meal, cuisine)

    //Create a unique user id and save it in local browser storage
    localStorage.setItem("input", input);
    localStorage.setItem("diet", diet);
    localStorage.setItem("meal", meal);
    localStorage.setItem("cuisine", cuisine);

    let user_id = null;

    if (localStorage.getItem("user_id")) {
        user_id = localStorage.getItem("user_id")
    } else {
        user_id = toString(36) + Math.random();  //Create user id in local storage
        // user_id = Date.now().toString(36) + Math.random().toString(36).substr(2);
        localStorage.setItem("user_id", user_id);
    }


    fetch('http://localhost:4000/saveSearchCriteria', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "input": input,
                "diet": diet,
                "cuisine": cuisine,
                "meal": meal,
                "user_id": user_id
            })
        }).then((res) => {
            return res.json();
        })
        .then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        });
}

document.getElementById("save").addEventListener('click', event => {
    event.preventDefault();
    postFunctionality(event);
})






//Get last searchcriteria from local storage
window.addEventListener('load', () => {
    //Get last item that was stored in local storage 
    const input = localStorage.getItem("input");
    const diet = localStorage.getItem("diet");
    const meal = localStorage.getItem("meal");
    const cuisine = localStorage.getItem("cuisine");

    //and put it in the html value
    if (input && diet && meal && cuisine) {
        document.querySelector(".input").value = input;
        document.querySelector("#diet").value = diet;
        document.querySelector("#meal").value = meal;
        document.querySelector("#cuisine").value = cuisine;
    }
})


























