import { products } from "../data/products.js";
import { formatCurrency, calTotalUnitPrice } from "./utils/money.js";
import { changeTheme } from "./utils/changemode.js";

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

// window.addEventListener("DOMContentLoaded", () => {
//   changeTheme();
//   renderCartHtml();
// });
// // Mode toggle

// //cart
// export function renderCartHtml() {
//   let cart = [
//     {
//       id: 8888399612064,
//       name: "Hibis Box Tissue",
//       description: "soft white facial tissue",
//       image: "Images/hibis-tissue.png",
//       priceCents: 1200,
//       category: "households",
//       quantity: 1,
//     },
//     {
//       id: 8690216360108,
//       name: "Fatih Dust-Free Erasers",
//       description: "Phthalate free, Latex-free",
//       image: "Images/fatih-erasers.webp",
//       priceCents: 400,
//       category: "stationery",
//       quantity: 1,
//     },
//     {
//       id: 8901180673133,
//       name: "Faber-Castell",
//       description: "Sphere Mathematical Drawing instrument Box",
//       image: "Images/castell-geometry.jpg",
//       priceCents: 4500,
//       category: "stationery",
//       quantity: 1,
//     },
//   ];

//   document.querySelectorAll(".js-add-to-cart-btn").forEach((button) => {
//     button.addEventListener("click", (e) => {
//       let matchingProductId = Number(e.target.dataset.id);
//       let matchingProduct;
//       products.forEach((product) => {
//         if (product.id === matchingProductId) {
//           matchingProduct = product;
//         }
//       });
//       let matchingCartItem;
//       cart.forEach((cartItem) => {
//         if (matchingProductId === cartItem.id) {
//           matchingCartItem = cartItem;
//         }
//       });
//       if (matchingCartItem) {
//         matchingCartItem.quantity += 1;
//       } else {
//         cart.push({ ...matchingProduct, quantity: 1 });
//       }
//     });
//   });
//   let renderCart;
//   cart.forEach((cartItem) => {
//     renderCart += `
// <div class="cart-product">
//               <div class="product-image-name-content">
//                 <div class="image-content">
//                   <img src="${cartItem.image}" alt="${cartItem.name}" />
//                 </div>
//               </div>
//               <div class="product-unit-price-content">
//                 <h4>Unit Price</h4>
//                 <p class="product-unit-price">MVR ${formatCurrency(
//                   cartItem.priceCents
//                 )}</p>
//               </div>
//               <div class="product-quantity-unit-content">
//                 <input
//                   type="number"
//                   value="01"
//                   placeholder="100"
//                   class="product-cart-quantity"
//                   min="01"
//                 />
//                 <select name="product-unit" class="product-cart-unit">
//                   <option value="kg">kg</option>
//                   <option value="grams">gms</option>
//                 </select>
//               </div>
//               <div class="total-unit-price-content">
//                 <h4>Total Price</h4>
//                 <p class="total-unit-price">MVR${calTotalUnitPrice(
//                   10,
//                   cartItem.priceCents
//                 )}</p>
//               </div>
//               <button  data-id="cartItem-${
//                 cartItem.id
//               }"class="remove-cart-item">
//                 <i class="fa-solid fa-xmark"></i>
//               </button>
//             </div>

//       `;
//   });

// }
