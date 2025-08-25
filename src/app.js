import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "../src/utils/money.js";
//imports

let html = "";
products.forEach((product, index) => {
  html += `      <div class="content-grid"">
          <div class="image-content">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="product-details">
            <h4 class="product-name">${product.name}</h4>
            <p class="product-desc">${product.description}
            <div class="product-price-quantity-box">
            <p class="product-price">MVR ${formatCurrency(
              product.priceCents
            )}</p>
          
            <button
            data-id="${product.id}"
            class="add-to-cart-btn js-add-to-cart-btn"}>Add to cart</button>
            </div>
           
          </div>
        </div>`;
});

document.querySelector(".content-grid-container").innerHTML = html;

document.querySelectorAll(".js-add-to-cart-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.id;
    addToCart(productId);
  });
});
function addToCart(productId) {
  cart.push({ productId, quantity: 1 });
  console.log(cart);
}
