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
