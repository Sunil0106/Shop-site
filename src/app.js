import { products } from "../data/products.js";

console.log(products);
let html = "";
products.forEach((product, index) => {
  html += ` <div class="content-grid">
          <div class="image-content">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="product-details">
            <h4 class="product-name">${product.name}</h4>
            <p class="product-desc">${product.description}
            <div class="product-price-quantity-box">
            <p class="product-price">MVR${product.priceCents}</p>
            <select>
          
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            </select>
            <button class="add-to-cart-btn">Add</button>
            </div>
           
          </div>
        </div>`;
});

document.querySelector(".content-grid-container").innerHTML = html;
