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
