import { products } from "./products.js";
import { formatCurrency } from "../src/utils/money.js";
export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [
    {
      productId: "8888399612064",
      quantity: 1,
    },
    {
      productId: "8690216360108",
      name: "Fatih Dust-Free Erasers",
      description: "Phthalate free, Latex-free",
      image: "Images/fatih-erasers.webp",
      priceCents: 400,
      category: "stationery",
      unit: ["pcs"],
    },
  ];
}

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
export function addToCart(productId) {
  let matchingProduct;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingProduct = cartItem;
    }
  });
  if (matchingProduct) {
    matchingProduct.quantity += 1;
  } else {
    cart.push({ productId, quantity: 1 });
  }
  saveToStorage();
}

export function removeCartItem(productId) {
  let newArrayCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newArrayCart.push(cartItem);
    }
  });
  cart = newArrayCart;
  saveToStorage();
}

/*with filter
export function removeCartItem(productId){
cart = cart.filter(cartItem)=>{
  cartitem.productId!==productId
  saveToStorage}
  return cart;
  }

*/

export function editCartQuantity(productId, value) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = Number(value);
    }
  });
  saveToStorage();
  return cart;
}

export function calCartTotalPrice() {
  let sumOfTotalPrice = 0;
  cart.forEach((cartItem) => {
    sumOfTotalPrice += Number(cartItem.totalPrice);
  });
  return sumOfTotalPrice;
}

export function updateCart() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    if (cartItem.unit === "dozon") {
      cartQuantity += cartItem.quantity * 12;
    } else if (cartItem.unit === "pkt") {
      cartQuantity += cartItem.quantity * 10;
    } else if (cartItem.unit === "case") {
      cartQuantity += cartItem.quantity * 48;
    } else {
      cartQuantity += cartItem.quantity;
    }
  });
  return cartQuantity;
}

export const userDetails =
  JSON.parse(localStorage.getItem("userDetailsCart")) || [];

export const orderSummaryDetails = [];

export let placedOrder =
  JSON.parse(localStorage.getItem("order-history")) || [];

export function searchProduct(productUserVal) {
  //filter makes an new array with matching values
  const container = document.querySelector(".content-grid-container");
  container.innerHTML = "";
  const foundItems = products.filter(
    (product) =>
      product.name.toLowerCase().includes(productUserVal.toLowerCase()) ||
      product.productId === productUserVal ||
      product.category.toLowerCase().includes(productUserVal.toLowerCase())
  );

  let userItem = "";
  if (foundItems.length === 0) {
    container.classList.add("item-not-found-container");
    userItem += `<div class="item-not-found">
   “Oops! We couldn’t find that product. Try another name or category.”
   </div>`;
  } else {
    container.classList.remove("item-not-found-container");
    foundItems.forEach((product) => {
      userItem += `      <div class="content-grid">
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
  }

  container.innerHTML = userItem;
}
///delete

export function deleteUserAll() {
  if (userDetails.length === 1) {
    const confirm = window.confirm("Are sure to delete user data?");
    if (confirm) {
      localStorage.removeItem("userDetailsCart");
      window.location.reload();
    }
  } else {
    window.alert("User not exist!");
  }
}
export function loggedUserData(newUserAdd) {
  let userDataList = "";
  if (userDetails.length === 0) {
    newUserAdd.classList.remove("hide-log-data");
    return;
  } else {
    userDataList += `
<li>Username: ${userDetails[0].username}</li>
        <li>Email: ${userDetails[0].userEmail}</li>
        <li>Phone No.: ${userDetails[0].phone}</li>
        <li>Location: ${userDetails[0].deliveryLocation}</li>
`;

    document.querySelector(".js-loged-user-data").innerHTML = userDataList;

    newUserAdd.classList.add("hide-log-data");
  }
}
