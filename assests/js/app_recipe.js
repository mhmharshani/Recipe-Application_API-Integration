console.log("Js Loaded!");

let recipe_url = "https://www.themealdb.com/api/json/v1/1/random.php";

let recipe_link_nav = document.getElementById("recipe_link_nav_bar");

recipe_link_nav.addEventListener("click",e => {
        
    if(localStorage.getItem("recipe_url")!==null){
        localStorage.removeItem("recipe_url");
        let url_stored = "https://www.themealdb.com/api/json/v1/1/random.php";
        localStorage.setItem("recipe_url", url_stored);
    }
    
});

let thumbnail= document.getElementById("thumb_img");
let title = document.getElementById("title");
let ingredient_list= document.getElementById("ingredient_list");
let instructions = document.getElementById("instruction_steps");

async function api_call(){
    console.log("in api call"+recipe_url)
    await fetch(localStorage.getItem("recipe_url"))
    .then(res => res.json())
    .then(data => {

        console.log("In api call"+data.meals[0].strMeal);
        // console.log(localStorage.getItem("clicked_recipe_card_title"));   
        set_recipe(data);     
        
    })
}

api_call();

function get_ingredient_list(data){
    let i=1;
    let name = "strIngredient"+i;
    let ingredient_array = [];
    let ingredient = data.meals[0][name];
    
    // while(ingredient!=null || ingredient!=""|| ingredient!=undefined){
    for(let i=2;i<20;i++){
        ingredient_array.push(ingredient);

        name = "strIngredient"+i;
        ingredient = data.meals[0][name];
    }
    console.log(ingredient_array);

    return ingredient_array;
}

function get_measurement_list(data){
    let i=1;
    let name = "strMeasure"+i;
    let measurement_array = [];
    let measurement = data.meals[0][name];
    
    // while(ingredient!=null || ingredient!=""|| ingredient!=undefined){
    for(let i=2;i<20;i++){
        measurement_array.push(measurement);

        name = "strMeasure"+i;
        measurement = data.meals[0][name];
    }
    console.log(measurement_array);

    return measurement_array;
}

function set_recipe(data){

    let ingredient_array = get_ingredient_list(data);
    let measurement_array = get_measurement_list(data);

    title.innerText = data.meals[0].strMeal;
    thumbnail.src = data.meals[0].strMealThumb;
    instructions.innerText = data.meals[0].strInstructions;

    let ingredient_measurement ="";

    for(let i=0;i<ingredient_array.length;i++){
        if(ingredient_array[i]!=""&&ingredient_array[i]!=null){
            ingredient_measurement+=ingredient_array[i] +" - "+ measurement_array[i]+"\n";
        }
        
    }

    ingredient_list.innerText = ingredient_measurement;
}


let btn_search = document.getElementById("button_search");
let txt_search = document.getElementById("txt_search");

btn_search.addEventListener("click", e => {
    let recipe_name = txt_search.value;
    console.log(recipe_name);
    
    if(recipe_name!==null){
        console.log("In recipe page-btn_search event listener");
        
        if(localStorage.getItem("recipe_url")!==null){
            localStorage.removeItem("recipe_url");
            url_stored = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe_name}`;
            localStorage.setItem("recipe_url", url_stored);
            console.log("in card set local storage"+recipe_url);
            
        }
        // window.location.href = "recipes.html";

        api_call();
    }
});





