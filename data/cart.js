export const cart = [
  {
    productId: 8888399612064,
    quantity: 2,
  },
  {
    productId: 8690216360108,
    quantity: 1,
  },
];

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({ productId, quantity: 1 });
  }
}
