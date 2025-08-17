import { products } from "../data/products.js";

console.log(products);
let html = "";
products.forEach((product, index) => {
  html += `<p>${product.name}</p>`;
});

document.querySelector("body").innerHTML = html;
