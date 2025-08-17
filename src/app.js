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
              <p class="product-price">$${product.priceCents}</p>
            </p>
          </div>
        </div>`;
});

document.querySelector(".content-grid-container").innerHTML = html;
