import {
  updateCart,
  addToCart,
  saveToStorage,
  searchProduct,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "../src/utils/money.js";

//imports

let html = "";
products.forEach((product, index) => {
  html += `      <div class="content-grid">
          <div class="image-content">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="product-details">
            <h4 class="product-name">${product.name}</h4>
            <p class="product-desc">${product.description}</p>
            <div class="product-price-quantity-box">
            <p class="product-price">MVR ${formatCurrency(
              product.priceCents
            )}</p>
          
            <button
            data-id="${product.productId}"
            class="add-to-cart-btn js-add-to-cart-btn">Add to cart</button>
            </div>
           
          </div>
        </div>`;
});

document.querySelector(".content-grid-container").innerHTML = html;

function updateCartQuanityOnPage() {
  document.querySelector(".js-cart-quantity").innerHTML = updateCart();
}
document.querySelectorAll(".js-add-to-cart-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.id;

    //info
    document.querySelector(".js-added-info").classList.add("hide-info");
    setTimeout(() => {
      showAddInfo();
    }, 500);
    addToCart(productId);
    saveToStorage();
    updateCartQuanityOnPage();
  });
});

window.addEventListener("load", () => {
  updateCartQuanityOnPage();
});

function showAddInfo() {
  document.querySelector(".js-added-info").classList.remove("hide-info");
}

document.querySelector(".js-search-product").addEventListener("keyup", (e) => {
  let userSearchWord = e.target.value;

  searchProduct(userSearchWord);
});

const searchFromCart = localStorage.getItem("userSearch");
if (searchFromCart) {
  document.querySelector(".js-search-product").value = searchFromCart;
  searchProduct(searchFromCart);
  localStorage.removeItem("userSearch");
}
