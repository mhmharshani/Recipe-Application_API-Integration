console.log("Js Loaded!");




// async function api_call(){
//     await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata")
//     .then(res => res.json())
//     .then(data => {

//         console.log(data.meals[0].strMeal)
//         title.innerText = data.meals[0].strMeal;
//         thumb_img.src = data.meals[0].strMealThumb;
//         origin_tag.innerText = data.meals[0].strArea;
        
//     })
// }

// api_call();

let card_set = document.getElementById("card_set");

async function api_call_main(){
    await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
    .then(res => res.json())
    .then(data => {

        data.meals.forEach(item => {
            title = item.strMeal;
            origin_tag = item.strArea;
            thumb_img = item.strMealThumb;

            card_set.innerHTML +=`<div class="col">
                    <div class="card shadow-sm" id="item_card">                        
                        <img src=${thumb_img} alt="" id="thumb_img">
                        <div class="card-body">
                            <p class="card-text" id="recipe_title">${title}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group"> <button type="button"
                                        class="btn btn-sm btn-outline-secondary  button_details" id="button_recipe">View Recipe >></button> 
                                        
                                </div> <small class="text-body-secondary" id="origin_tag">${origin_tag}</small>
                            </div>
                        </div>
                    </div>
                </div>`;
            
        });
               
    })
}

// let title = document.getElementById("recipe_title");
            // let thumb_img = document.getElementById("thumb_img");
            // let origin_tag = document.getElementById("origin_tag");
            // console.log(item.strMeal)
            // title.innerText = item.strMeal;
            // thumb_img.src = item.strMealThumb;
            // origin_tag.innerText = item.strArea;

api_call_main();

// Use of Local Storage

let recipe_link_nav = document.getElementById("recipe_link_nav_bar");
let url_stored = "";
localStorage.setItem("recipe_url", url_stored);

recipe_link_nav.addEventListener("click",e => {

    if(localStorage.getItem("recipe_url")!==null){
        localStorage.removeItem("recipe_url");
        url_stored = "https://www.themealdb.com/api/json/v1/1/random.php";
        localStorage.setItem("recipe_url", url_stored);
    }
    
})

let btn_search = document.getElementById("button_search");
let txt_search = document.getElementById("txt_search");

btn_search.addEventListener("click", e => {
    let recipe_name = txt_search.value;
    console.log(recipe_name);
    
    if(recipe_name!==null){
        if(localStorage.getItem("recipe_url")!==null){
            localStorage.removeItem("recipe_url");
            url_stored = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe_name}`;
            localStorage.setItem("recipe_url", url_stored);
            console.log("in card set local storage"+localStorage.getItem("recipe_url"));
            
        }
        window.location.href = "recipes.html";
    }
});


async function api_call_category(){
    await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // localStorage.setItem("category_list",JSON.stringify(data));
        set_category(data);   
    })
}

api_call_category();

let btn_cg_all = document.getElementById("cg-1");
let btn_cg_2 = document.getElementById("cg-2");
let btn_cg_3 = document.getElementById("cg-3");
let btn_cg_4 = document.getElementById("cg-4");
let btn_cg_5 = document.getElementById("cg-5");

let title_dd = document.getElementById("title_dd");
let cg_opt_1 = document.getElementById("opt_1");
let cg_opt_2 = document.getElementById("opt_2");
let cg_opt_3 = document.getElementById("opt_3");
let cg_opt_4 = document.getElementById("opt_4");
let cg_opt_5 = document.getElementById("opt_5");
let cg_opt_6 = document.getElementById("opt_6");
let cg_opt_7 = document.getElementById("opt_7");
let cg_opt_8 = document.getElementById("opt_8");
let cg_opt_9 = document.getElementById("opt_9");
let cg_opt_10 = document.getElementById("opt_10");
let cg_opt_11 = document.getElementById("opt_11");
let cg_opt_12 = document.getElementById("opt_12");
let cg_opt_13 = document.getElementById("opt_13");
let cg_opt_14 = document.getElementById("opt_14");



function set_category(data){
    btn_cg_2.innerText = data.categories[0].strCategory;
    btn_cg_3.innerText = data.categories[1].strCategory;
    btn_cg_4.innerText = data.categories[2].strCategory;
    btn_cg_5.innerText = data.categories[3].strCategory;

    cg_opt_1.innerText = data.categories[0].strCategory;
    cg_opt_2.innerText = data.categories[1].strCategory;
    cg_opt_3.innerText = data.categories[2].strCategory;
    cg_opt_4.innerText = data.categories[3].strCategory;
    cg_opt_5.innerText = data.categories[4].strCategory;
    cg_opt_6.innerText = data.categories[5].strCategory;
    cg_opt_7.innerText = data.categories[6].strCategory;
    cg_opt_8.innerText = data.categories[7].strCategory;
    cg_opt_9.innerText = data.categories[8].strCategory;
    cg_opt_10.innerText = data.categories[9].strCategory;
    cg_opt_11.innerText = data.categories[10].strCategory;
    cg_opt_12.innerText = data.categories[11].strCategory;
    cg_opt_13.innerText = data.categories[12].strCategory;
    cg_opt_14.innerText = data.categories[13].strCategory;

}



async function api_call_category_id(category){
    let id_array = [];
    await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then(res => res.json())
    .then(data => {
        console.log(data.meals);

        data.meals.forEach(item =>{
            id_array.push(item.idMeal);
        });
           
    })
    console.log("id_array : "+id_array);
    
    return id_array;
}

// async function processData(category){
//     console.log("Fetching data ......");

//     const id_array = await api_call_category_id("Beef");

//     console.log("Got the array : "+id_array);

//     return id_array;
// }

async function api_call_id(id_array){
    console.log("in api call id : "+id_array);
    card_set.innerHTML=``;    
    id_array.forEach(id => {
        
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => {

            console.log("in api call id : object : "+data); 
            
            title = data.meals[0].strMeal;
            origin_tag = data.meals[0].strArea;
            thumb_img = data.meals[0].strMealThumb;

            console.log("title : "+title);

            card_set.innerHTML +=`<div class="col">
                    <div class="card shadow-sm" id="item_card">                        
                        <img src=${thumb_img} alt="" id="thumb_img">
                        <div class="card-body">
                            <p class="card-text" id="recipe_title">${title}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group"> <button type="button"
                                        class="btn btn-sm btn-outline-secondary  button_details" id="button_recipe">View Recipe >></button> 
                                        
                                </div> <small class="text-body-secondary" id="origin_tag">${origin_tag}</small>
                            </div>
                        </div>
                    </div>
                </div>`;   
                
        })

    })
    
}

let category_type = document.getElementById("category_type");

async function load_cards_dropdown(element){
    console.log("in load_card_dd");
    let category = element.innerText;
    console.log(category);
    const id_array = await api_call_category_id(category);
    console.log("in click event : "+ id_array);
    
    await api_call_id(id_array);

    category_type.innerText = category;
}

btn_cg_2.addEventListener("click", async e => {
    load_cards_dropdown(btn_cg_2);
});

btn_cg_3.addEventListener("click", async e => {
    load_cards_dropdown(btn_cg_3);
});

btn_cg_4.addEventListener("click", async e => {
    load_cards_dropdown(btn_cg_4);
});

btn_cg_5.addEventListener("click", async e => {
    load_cards_dropdown(btn_cg_5);
});



let category_dropdown = document.getElementById("category_selector");

category_dropdown.addEventListener("change", e => {

    const selected_value = e.target.value;

    switch(selected_value){

        case "1" : 
            load_cards_dropdown(cg_opt_1);
            break;
        case "2" : 
            load_cards_dropdown(cg_opt_2);
            break;
        case "3" : 
            load_cards_dropdown(cg_opt_3);
            break;
        case "4" : 
            load_cards_dropdown(cg_opt_4);
            break;
        case "5" : 
            load_cards_dropdown(cg_opt_5);
            break;
        case "6" : 
            load_cards_dropdown(cg_opt_6);
            break;
        case "7" : 
            load_cards_dropdown(cg_opt_7);
            break;
        case "8" : 
            load_cards_dropdown(cg_opt_8);
            break;
        case "9" : 
            load_cards_dropdown(cg_opt_9);
            break;
        case "10" : 
            load_cards_dropdown(cg_opt_10);
            break;
        case "11" : 
            load_cards_dropdown(cg_opt_11);
            break;
        case "12" : 
            load_cards_dropdown(cg_opt_12);
            break;
        case "13" : 
            load_cards_dropdown(cg_opt_13);
            break;
        case "14" : 
            load_cards_dropdown(cg_opt_14);
            break;

        default : break;
        
    }

});

card_set.addEventListener("click", function(event){

    const clicked_card = event.target.closest(".card");
    const clicked_btn = event.target.closest("#button_recipe");

    console.log(clicked_card);

    if(clicked_btn!=null){
        const title = clicked_card.querySelector(".card-body p").innerText;
        console.log(title);

        if(localStorage.getItem("recipe_url")!==null){
            localStorage.removeItem("recipe_url");
            url_stored = `https://www.themealdb.com/api/json/v1/1/search.php?s=${title}`;
            localStorage.setItem("recipe_url", url_stored);
            console.log("in card set local storage"+localStorage.getItem("recipe_url"));
            
        }

        window.location.href = "recipes.html";

    }  
})

