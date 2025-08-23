import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "../src/utils/money.js";

let cartSummaryHTML = "";
cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  cartSummaryHTML += `<div class="cart-product">
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
          <option value="kg">kg</option>
          <option value="grams">gms</option>
        </select>
      </div>
      <div class="total-unit-price-content">
        <h4>Total Price</h4>
        <p class="total-unit-price">MVR 100</p>
      </div>
      <button class="remove-cart-item">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
`;
});
console.log(cartSummaryHTML);

document.querySelector(".js-cart-items-content").innerHTML = cartSummaryHTML;
