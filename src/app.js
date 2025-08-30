import {
  updateCart,
  addToCart,
  saveToStorage,
  searchProduct,
  userDetails,
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
  loggedUserData();
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

//show login page
const newUserAdd = document.querySelector(".js-login-new-user");
newUserAdd.addEventListener("click", (e) => {
  localStorage.setItem("newUser", e);
  window.location.href = "cart.html";
});

function loggedUserData() {
  let userDataList = "";
  if (userDetails.length === 0) {
    newUserAdd.classList.remove("hide-login");
    return;
  } else {
    userDataList += `
<li>Username: ${userDetails[0].username}</li>
        <li>Email: ${userDetails[0].userEmail}</li>
        <li>Phone No.: ${userDetails[0].phone}</li>
        <li>Location: ${userDetails[0].deliveryLocation}</li>
`;

    document.querySelector(".js-loged-user-data").innerHTML = userDataList;

    newUserAdd.classList.add("hide-login");
  }
}
