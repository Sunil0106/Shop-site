import {
  cart,
  removeCartItem,
  saveToStorage,
  editCartQuantity,
  calCartTotalPrice,
  updateCart,
  userDetails,
  orderSummaryDetails,
  placedOrder,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { calTotalUnitPrice, formatCurrency } from "./utils/money.js";
emailjs.init({
  publicKey: "37jcVH8TxRn_SP7NZ",
});
//update date-time
setInterval(ordersDate, 100);
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
    cartItem.productName = matchingProduct.name;
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
  showTotalPrice();
  ordersDate();
});

document.querySelectorAll(".js-remove-cart-item").forEach((removeBtn) => {
  removeBtn.addEventListener("click", () => {
    const productId = removeBtn.dataset.id;
    removeCartItem(productId);
    const container = document.querySelector(`.js-cart-product-${productId}`);

    container.remove();
    showTotalPrice();
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
  document.querySelector(".js-bill-amount").innerHTML = calCartTotalPrice();
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
                <input name="date" id="date"
                  type="date"
                  class="order-date js-order-date"
                  min="${fullYear}-${month}-${day}"
                  max="${maxDateVal}" value='${fullYear}-${month}-${day}'
                />
                <input type="time" class="order-time js-order-time" value="${timeHour}:${timeMinute}" min="${timeValue}" name="time" id="time"/> 
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

  if (!userName || !userNumber || userNumber.length < 5 || !deliveryLocation) {
    showError.classList.add("show-error-msg");
    showError.innerHTML =
      "All details must be filled and make sure the contact number length must be greater than 5";
    if (!userName) userInputName.classList.add("show-error-input");
    if (!userNumber || userNumber.length < 5)
      userNumberInput.classList.add("show-error-input");
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
  document.querySelector(".js-form-container").classList.add("hide-login");
}

document.querySelector(".js-user-data-form").addEventListener("submit", (e) => {
  e.preventDefault();
  userDetailsInput();
});

function orderSummary() {
  const date = document.querySelector(".js-order-date");
  const orderDate = date.value;
  const time = document.querySelector(".js-order-time");
  const orderTime = time?.value || "";

  //delivery method
  const deliveryMethodEl = document.querySelector(".js-delivery-method");

  let deliveryMethod = deliveryMethodEl?.value || "";
  deliveryMethodEl.addEventListener("change", (e) => {
    deliveryMethod = e.target.value;
  });

  //payment method
  const paymentMethodEl = document.querySelector(".js-payment-method");
  let paymentMethod = paymentMethodEl.value;
  paymentMethodEl.addEventListener("change", (e) => {
    paymentMethod = e.target.value;
  });

  //reset errors

  const errorInfo = document.querySelector(".order-summary-info");

  paymentMethodEl.classList.remove("show-error-input");
  deliveryMethodEl.classList.remove("show-error-input");
  errorInfo.classList.remove("show-error-msg");
  //total bill amount
  const billAmountEl = document.querySelector(".js-bill-amount");
  const totalBillAmount = Number(billAmountEl.innerText) || 0;

  //work

  if (paymentMethod === "" || deliveryMethod === "" || totalBillAmount === 0) {
    errorInfo.classList.add("show-error-msg");
    if (paymentMethod === "") paymentMethodEl.classList.add("show-error-input");
    if (deliveryMethod === "")
      deliveryMethodEl.classList.add("show-error-input");
  } else {
    const orderDetails = {
      "order-time": orderTime,
      "order-date": orderDate,
      "delivery-method": deliveryMethod,
      "payment-method": paymentMethod,
      "bill-amount": totalBillAmount,
    };
    orderSummaryDetails.push(orderDetails);
  }
}
document.querySelector(".js-checkout-btn").addEventListener("click", () => {
  if (userDetails.length < 1) {
    document.querySelector(".js-form-container").classList.remove("hide-login");
    return;
  }

  orderSummary(); // Update orderSummaryDetails

  const user = userDetails[userDetails.length - 1];
  const order = orderSummaryDetails[orderSummaryDetails.length - 1];

  if (!user || !order || cart.length === 0) {
    alert("Cart or user info is missing. Please check before checkout.");
    return;
  }

  // Keep your original HTML format exactly
  const ordersHtml = cart
    .map(
      (item) => `
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px;">
    <tr style="vertical-align: top;">
      <td style="padding: 8px;">
        <div>${item.productName}</div>
        <div style="font-size: 14px; color: #888;">QTY: ${item.quantity}${
        item.unit
      }</div>
      </td>
      <td style="padding: 8px; text-align: right;">
        <strong>MVR ${Number(item.totalPrice).toFixed(2)}</strong>
      </td>
    </tr>
  </table>
`
    )
    .join("");

  // Send email with EmailJS
  emailjs
    .send("lebanneyOrders", "template_md0geov", {
      username: user.username,
      phone: user.phone,
      delivery_location: user["delivery-location"],
      delivery_method: order["delivery-method"],
      payment_method: order["payment-method"],
      total_amount: order["bill-amount"], // keep format as string with 2 decimals
      order_id: order["order-time"] + "leban" + order["order-date"],
      orders: ordersHtml,
      email: user.email || "",
    })
    .then((response) => {
      console.log("Email sent successfully!", response);
      alert(`Hey ${user.username}, your order confirmation has been sent!`);

      // Save cart to history safely
      placedOrder.push([...cart]);
      localStorage.setItem("order-history", JSON.stringify(placedOrder));

      // Clear cart
      cart.length = 0;
      saveToStorage(cart);
      updateCartCheckoutPage();
      showTotalPrice();
      console.log(placedOrder);
    })
    .catch((error) => {
      console.error("Failed to send order email:", error);
      alert("Failed to send order email. Please try again.");
    });
});
