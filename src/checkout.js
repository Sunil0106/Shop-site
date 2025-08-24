import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "../src/utils/money.js";

let cartSummaryHTML = "";
cart.forEach((cartItem, index) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  let matchingProductUnit = "";
  matchingProduct.unit.forEach((option) => {
    return (matchingProductUnit += `<option value="${option}">${option}</option>`);
  });

  cartSummaryHTML += `<div class="cart-product js-cart-product-${
    matchingProduct.id
  }">
      <div class="product-image-name-content">
        <div class="image-content">
          <img src="${matchingProduct.image}" alt="${matchingProduct.name}" />
        </div>
      </div>
      <div class="product-unit-price-content">
        <h4>Unit Price</h4>
        <p class="product-unit-price">MVR${formatCurrency(
          matchingProduct.priceCents
        )} </p>
      </div>
      <div class="product-quantity-unit-content">
        <input
          type="number"
          value="${cartItem.quantity}"
          placeholder="100"
          class="product-cart-quantity"
          min="01"
        />
        <select name="product-unit" class="product-cart-unit">
      ${matchingProductUnit}
       
        </select>
      </div>
      <div class="total-unit-price-content">
        <h4>Total Price</h4>
        <p class="total-unit-price">MVR ${formatCurrency(
          calTotalUnitPrice(cartItem.quantity, matchingProduct.priceCents)
        )}</p>
      </div>
      <button  class="remove-cart-item js-remove-cart-item"
      data-product-id ="${matchingProduct.id}"
      
      
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
`;
});
console.log(cartSummaryHTML);

document.querySelector(".js-cart-items-content").innerHTML = cartSummaryHTML;

document.querySelectorAll(".js-remove-cart-item").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;

    removeFromCart(productId);

    const container = document.querySelector(`.js-cart-product-${productId}`);
    container.remove();
  });
});

//calculateTotal
function calTotalUnitPrice(value1, value2) {
  return value1 * value2;
}
