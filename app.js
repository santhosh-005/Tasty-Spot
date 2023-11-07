const randomMeal=document.getElementById("random-meal");
const popUp=document.getElementById("pop-up");

const searchInput=document.getElementById("search-input");
const searchIcon=document.getElementById("search-icon")
const searchResultMeal=document.getElementById('search-result-meal')


function getRandomMeal(){
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res)=>res.json())
    .then((res)=>{appendRandomMeal(res.meals[0])})
    .catch((error)=>{console.log(error)})
}


getRandomMeal();

function appendRandomMeal(data){

  let image=document.createElement("img");
  let h3=document.createElement("h3");

  image.src=data.strMealThumb;
  image.style.cursor='pointer';
  image.className='meal-images'
  h3.innerText=data.strMeal;

  randomMeal.append(image,h3)
  randomMeal.className='meal-div';
   
  
  let div=document.createElement("div");

  
  let h4=document.createElement("h4");
  h4.innerHTML= `INGREDIENTS <i class="fa fa-close" style="width:15%;font-size:48px;color:red; text-align:right;cursor:pointer;" onclick="document.getElementById('pop-up').style.display='none'"></i>`;
  h4.style.color='green';
  div.append(h4);

  for(let i=1;i<=20;i++){
      let p =document.createElement("p");
      let ingredientKey = `strIngredient${i}`;
      p.innerText = data[ingredientKey];
      div.appendChild(p)
  }

    image.onclick=function(){
      popUp.style.display='inherit';
      popUp.append(div)
      div.className='ingredients-box';     
  }
}



searchIcon.onclick=()=>{
  preferFood=searchInput.value;
  console.log(preferFood);

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${preferFood}`)
  .then((res)=>res.json())
  .then((res)=>{displaySearch(res.meals)})
}

function displaySearch(data){
  console.log(data)
  data.forEach((element) => {
    let div=document.createElement('div');

    let image=document.createElement("img");
    image.src=element.strMealThumb;
    image.className='meal-images'

    let p=document.createElement("p");
    p.innerText=element.strMeal;

    div.append(image,p)
    div.className='meal-div';

    searchResultMeal.append(div)
  });
}