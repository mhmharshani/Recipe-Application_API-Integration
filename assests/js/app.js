console.log("Js Loaded!");

let title = document.getElementById("recipe_title");
let thumb_img = document.getElementById("thumb_img");


async function api_call(){
    await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata")
    .then(res => res.json())
    .then(data => {

        console.log(data.meals[0].strMeal)
        title.innerText = data.meals[0].strMeal;
        thumb_img.src = data.meals[0].strMealThumb;
    })
}

api_call();