import {
  cart,
  removeCartItem,
  saveToStorage,
  editCartQuantity,
  calCartTotalPrice,
  updateCart,
  userDetails,
} from "../data/cart.js";
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
  if (matchingProduct) {
    if (!cartItem.unit) {
      cartItem.unit = matchingProduct.unit[0];
    }
    cartItem.totalPrice = calTotalUnitPrice(
      cartItem.quantity,
      cartItem.unit,
      matchingProduct.priceCents
    );
  }
  if (Array.isArray(matchingProduct.unit)) {
    matchingProduct.unit.forEach((unitVal) => {
      const selected = cartItem.unit === unitVal ? "selected" : "";
      productUnit += `
    <option value="${unitVal}" ${selected}>${unitVal}</option>

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
   data-id="${matchingProduct.productId}"
      class="product-cart-quantity js-product-cart-quantity js-product-unit-${
        matchingProduct.productId
      }"
      min="1"
    />
    <select name="product-unit" class="product-cart-unit js-product-unit"
     data-id="${matchingProduct.productId}">
      ${productUnit}

    </select>
  </div>
  <div class="total-unit-price-content">
    <h4>Total Price</h4>
    <p class="total-unit-price js-total-unit-price-${
      matchingProduct.productId
    }">MVR ${calTotalUnitPrice(
    cartItem.quantity,
    cartItem.unit || matchingProduct.unit[0],
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
  document.querySelector(".js-cart-quantity").innerHTML = updateCart();
  document.querySelector(".js-cart-list-quantity").innerHTML = updateCart();
}

window.addEventListener("load", () => {
  updateCartCheckoutPage();
  document.querySelector(
    ".js-total-price-sum"
  ).innerHTML = `Total Amount: MVR ${calCartTotalPrice()}`;

  ordersDate();
});

document.querySelectorAll(".js-remove-cart-item").forEach((removeBtn) => {
  removeBtn.addEventListener("click", () => {
    const productId = removeBtn.dataset.id;
    removeCartItem(productId);
    const container = document.querySelector(`.js-cart-product-${productId}`);

    container.remove();

    saveToStorage();
    updateCartCheckoutPage();
    document.querySelector(".remove-info").classList.add("hide-info");
    setTimeout(() => {
      document.querySelector(".remove-info").classList.remove("hide-info");
    }, 500);
  });
});

//update quantity
document
  .querySelectorAll(".js-product-cart-quantity")
  .forEach((productQuantity) => {
    productQuantity.addEventListener("change", () => {
      const productId = productQuantity.dataset.id;
      const value = Number(productQuantity.value);
      editCartQuantity(productId, value);
      updateTotalPrice(productId);
      updateCartCheckoutPage();
    });
  });

document.querySelectorAll(".js-product-unit").forEach((unit) => {
  unit.addEventListener("change", () => {
    const productId = unit.dataset.id;
    const unitVal = unit.value;
    const sameProduct = cart.find((cartItem) => {
      return cartItem.productId === productId;
    });
    if (sameProduct) {
      sameProduct.unit = unitVal;
    }
    updateTotalPrice(productId);

    saveToStorage();
    showTotalPrice();
  });
});

function updateTotalPrice(productId) {
  const cartItem = cart.find((cartItem) => {
    return cartItem.productId === productId;
  });
  const product = products.find((product) => {
    return product.productId === productId;
  });
  const unit = cartItem.unit || product.unit[0];

  const totalPrice = calTotalUnitPrice(
    cartItem.quantity,
    unit,
    product.priceCents
  );
  cartItem.totalPrice = totalPrice;
  saveToStorage();
  document.querySelector(
    `.js-total-unit-price-${productId}`
  ).innerHTML = `MVR${totalPrice}`;
  updateCartCheckoutPage();
  showTotalPrice();
}

//show total
function showTotalPrice() {
  document.querySelector(
    ".js-total-price-sum"
  ).innerHTML = `Total Amount: MVR ${calCartTotalPrice()}`;
}

function ordersDate() {
  const date = new Date();
  const fullYear = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let timeHour = date.getHours();
  let timeMinute = date.getMinutes();

  timeHour = timeHour < 10 ? "0" + timeHour : timeHour;
  timeMinute = timeMinute < 10 ? "0" + timeMinute : timeMinute;

  let dateMax = new Date();
  dateMax.setDate(dateMax.getDate() + 1);
  let maxYear = dateMax.getFullYear();
  let monMax = dateMax.getMonth() + 1;
  let maxday = dateMax.getDate();

  monMax = monMax < 10 ? "0" + monMax : monMax;

  maxday = maxday < 10 ? "0" + maxday : maxday;

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  const maxDateVal = `${maxYear}-${monMax}-${maxday}`;
  const timeValue = `${timeHour}:${timeMinute}`;
  document.querySelector(".js-cart-date-time").innerHTML = `
 <h4>Order placed date-time</h4>
                <input
                  type="date"
                  class="order-date"
                  min="${fullYear}-${month}-${day}"
                  max="${maxDateVal}" value='${fullYear}-${month}-${day}'
                />
                <input type="time" class="order-time" value="${timeHour}:${timeMinute}" min="${timeValue}" /> 
  `;
}

//funtion check userDetails
function userDetailsInput() {
  const userInputName = document.querySelector(".js-username-input");
  const userName = userInputName.value.trim();
  const userNumberInput = document.querySelector(".js-userphone-number");
  const userNumber = userNumberInput.value.trim();
  const showError = document.querySelector(".info");
  const deliveryLocationInput = document.querySelector(".js-delivery-location");
  const deliveryLocation = deliveryLocationInput.value.trim();
  showError.classList.remove("show-error-msg");
  userInputName.classList.remove("show-error-input");
  deliveryLocationInput.classList.remove("show-error-input");
  userNumberInput.classList.remove("show-error-input");

  if (!userName || !userNumber || !deliveryLocation) {
    showError.classList.add("show-error-msg");
    showError.innerHTML = "All details must be filled";
    if (!userName) userInputName.classList.add("show-error-input");
    if (!userNumber) userNumberInput.classList.add("show-error-input");
    if (!deliveryLocation)
      deliveryLocationInput.classList.add("show-error-input");
    return null;
  }
  const userData = {
    username: userName,
    phone: userNumber,
    "delivery-location": deliveryLocation,
  };

  userDetails.push(userData);

  localStorage.setItem("userDetailsCart", JSON.stringify(userDetails));
}

document.querySelector(".js-user-data-form").addEventListener("submit", (e) => {
  e.preventDefault();
  userDetailsInput();
});
console.log(userDetails);
