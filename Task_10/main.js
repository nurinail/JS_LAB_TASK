let allPrBtn = document.querySelector(".allPrBtn");
let jewelleryBtn = document.querySelector(".jewelleryBtn");
let electronicsBtn = document.querySelector(".electronicsBtn");
let menBtn = document.querySelector(".menBtn");
let womenBtn = document.querySelector(".womenBtn");
let searchInput = document.querySelector(".header_nav_form_searchInput");
let main_products_wrapper = document.querySelector(".main_products_wrapper");
let minInput = document.querySelector(".main_filter_formPrices_wrapper_MinInput");
let maxInput = document.querySelector(".main_filter_formPrices_wrapper_MaxInput");
let zaBtn=document.querySelector(".zaBtn");
let azBtn=document.querySelector(".azBtn");
let sort19Btn=document.querySelector(".sort19Btn");
let sort91Btn=document.querySelector(".sort91Btn");
let allData = [];
getData("");
allPrBtn.addEventListener("click", () => {getData("");});
electronicsBtn.addEventListener("click", () => {getData("category/electronics");});
jewelleryBtn.addEventListener("click", () => {getData("category/jewelery");});
menBtn.addEventListener("click", () => {getData("category/men's clothing");});
womenBtn.addEventListener("click", () => {getData("category/women's clothing");});

[minInput, maxInput].forEach((input) => {
  input.addEventListener("input", () => {
    let min = Number(minInput.value) || 0; 
    let max = Number(maxInput.value) || Infinity; 

    let filterData = allData.filter(
      (product) => product.price >= min && product.price <= max
    );
    getScreenData(filterData);
  });
});
searchInput.addEventListener("input",()=>{
let value=searchInput.value.toLowerCase();
let filterData=allData.filter((item)=>{
    if(item.title.toLowerCase().startsWith(value)){
        return true
    }
    if(item.title.toLowerCase().includes(value)){
        return true
    }
    else{
        return false
    }
}
);
getScreenData(filterData);
})

zaBtn.addEventListener("click",()=>{
    let ascending="?sort";
    getData(ascending)
})
azBtn.addEventListener("click",()=>{
     let descend="?sort=desc"
     getData(descend)
});
sort19Btn.addEventListener("click",()=>{
    let filterData=allData.sort((x,y)=>x.price-y.price);
    getScreenData(filterData)
})
sort91Btn.addEventListener("click",()=>{
    let filterData=allData.sort((x,y)=>y.price-x.price);
    getScreenData(filterData)
})


async function getData(category) {
  let res = await fetch(`https://fakestoreapi.com/products/${category}`);
  let data = await res.json();
  getScreenData(data);
  allData = data;
}
function getScreenData(data) {
  let item = (main_products_wrapper.innerHTML = data
    .map(
      (data) =>
        `
        <div class="main_products_wrapper_item">
            <img class="main_products_wrapper_item_img" src="${data.image}" alt="">
            <div class="main_products_wrapper_item_center">
                 <p class="main_products_wrapper_item_center_name">${data.title}</p>
            </div>
            <span class="main_products_wrapper_item_prices">$${data.price}</span>
        </div>
    `
    )
    .join(""));
}
