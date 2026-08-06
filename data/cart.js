export const cart = [];
//ADD-TO-CART BUTTON FUNCTION

export function addingToCart(productId, itemQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += itemQuantity;
  } else {
    cart.push({
      productId: productId,
      quantity: itemQuantity,
    });
  }
}
