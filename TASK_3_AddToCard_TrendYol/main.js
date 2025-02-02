import { productsArr } from "./js/products.js";
import { addProducts } from "./js/addProducts.js";

let productsSection = document.querySelector(".main_products");
productsArr.map(
  (e) =>
    (productsSection.innerHTML += `
    <div class="main_products_item" data-product-id="${e.id}">
            <img
              class="main_products_item_img"
              src="${e.image}"
              alt="photo"
            />
            <div class="main_products_item_bottom">
              <p class="main_products_item_bottom_name">${e.title}</p>
              <h2 class="main_products_item_bottom_price">
                Cəmi ${e.price}$
                <a class="main_products_item_bottom_price_shopBtn" href="#"
                  ><span class="material-symbols-outlined">
                    shopping_cart
                  </span></a
                >
              </h2>
            </div>
            <button class="main_products_item_heartIcon" ><i class="fa-regular fa-heart"></i></button>
          </div>
    `)
);

let productItem = document.querySelectorAll(".main_products_item");
let shopNumber = 0;
productItem.forEach((e) => {
  let shopAccount = document.querySelector(".header_nav_menu_shops_number");
  // let dataId=Number(e.getAttribute("data-product-id"));
  // let isExist=addProducts.find(event=>event.id===dataId);
  let shopBtn = e.children[1].children[1].children[0];
  shopBtn.addEventListener("click", (even) => {
    even.preventDefault();
    shopNumber += 1;
    shopAccount.innerHTML = `${shopNumber}`;
    
  });

  let favoriteBtn = e.children[2];
  favoriteBtn.addEventListener("click", (even) => {
    even.preventDefault();
    favoriteBtn.children[0].classList.toggle("fa-solid");
    if(favoriteBtn.children[0].className.includes("fa-solid")){
      addProducts.push(e);
      console.log(addProducts)
    }else{
      addProducts.pop();
      console.log(addProducts)
    }
  });
});
