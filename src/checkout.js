import { cart, removeCartItem, saveToStorage } from "../data/cart.js";
import { products } from "../data/products.js";
import { calTotalUnitPrice, formatCurrency } from "./utils/money.js";

let checkoutHtml = "";

cart.forEach((cartItem) => {
  let matchingProduct = products.find(
    (product) => product.productId === cartItem.productId
  );

  if (!matchingProduct) {
    console.warn("Product not found ", cartItem.productId);

    return;
  }
  let productUnit = "";

  if (Array.isArray(matchingProduct.unit)) {
    matchingProduct.unit.forEach((unitVal) => {
      productUnit += `
    <option value="${unitVal}">${unitVal}</option>

    `;
    });
  }

  checkoutHtml += ` <div class="cart-product js-cart-product-${
    matchingProduct.productId
  }">
  <div class="product-image-name-content">
    <div class="image-content">
      <img src="${matchingProduct.image}" alt="${matchingProduct.name}" />
    </div>
  </div>
  <div class="product-unit-price-content">
    <h4>Unit Price</h4>
    <p class="product-unit-price">MVR ${formatCurrency(
      matchingProduct.priceCents
    )}</p>
  </div>
  <div class="product-quantity-unit-content">
    <input
      type="number"
      value="${cartItem.quantity}"
   
      class="product-cart-quantity"
      min="1"
    />
    <select name="product-unit" class="product-cart-unit">
      ${productUnit}

    </select>
  </div>
  <div class="total-unit-price-content">
    <h4>Total Price</h4>
    <p class="total-unit-price">MVR ${calTotalUnitPrice(
      cartItem.quantity,
      matchingProduct.priceCents
    )}</p>
  </div>
  <button data-id="${
    matchingProduct.productId
  }" class="remove-cart-item js-remove-cart-item">
    <i class="fa-solid fa-xmark"></i>
  </button>
</div>`;
});

document.querySelector(".insert-data").innerHTML = checkoutHtml;

function updateCartCheckoutPage() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  document.querySelector(".js-cart-list-quantity").innerHTML = cartQuantity;
}

window.addEventListener("load", updateCartCheckoutPage);

document.querySelectorAll(".js-remove-cart-item").forEach((removeBtn) => {
  removeBtn.addEventListener("click", () => {
    const productId = removeBtn.dataset.id;
    removeCartItem(productId);
    const container = document.querySelector(`.js-cart-product-${productId}`);

    container.remove();
    saveToStorage();
  });
});

console.log(cart);
