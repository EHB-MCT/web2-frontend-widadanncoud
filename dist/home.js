
let generateBtn = document.querySelector(".button");

generateBtn.addEventListener("click", () => { 
    console.log("buttton pressed")
    fetchAPI()
});

function fetchAPI(){
    const appId = "ffaf5499";
    const appKey = "174caf828a5cf1d15fb51927b57b5af1";

    let input = document.querySelector(".input").value;let q = input;
    let diet = document.querySelector("#diet").value;let dietInput = diet; 
    let meal = document.querySelector("#meal").value;let mealInput = meal;
    let country = document.querySelector("#country").value;let countryInput = country;  

    console.log(q);
    console.log(dietInput);
    console.log(mealInput);
    console.log(countryInput);

    fetch(`https://api.edamam.com/search?q=${q}&mealType=${mealInput}&cuisineType=${countryInput}&diet=${dietInput}&app_id=${appId}&to=30&app_key=${appKey}&from=0&calories=591-722&health=alcohol-free`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // return data;
            generateCards(data)
        });
    
    document.querySelector(".top").style.display = "block";
    
}


function generateCards(data){
    let htmlString = "";

    for(let c of data.hits){
         htmlString += `
         <div class="oneCard" style="display: flex; flex-direction: column;" >
            <img src="${c.recipe.image}" alt="">
            <div class="cardContent">
            
                <h3>${c.recipe.label}</h3>
                
                <h5>${c.recipe.dietLabels}</h5>
                <h5>${c.recipe.mealType}</h5>
                <h5>${c.recipe.cuisineType}</h5>

                <button class="cardRecipe"><a target="_blank" href="${c.recipe.url}">recipe</a></button>
                <button class="cardFavo">heart<img src="" alt=""></button>

            </div>  
             
        </div>  
        `
    }

    document.querySelector(".card").innerHTML = htmlString;
}





























