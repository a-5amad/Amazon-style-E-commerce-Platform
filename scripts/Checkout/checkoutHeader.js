import { updateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader() {
  const cartQuantity = updateCartQuantity();
  const checkoutHeaderHTML = `Checkout (<a class="return-to-home-link" href="amazon.html">${cartQuantity} items</a>)`;

  document.querySelector(".js-checkout-middle-section").innerHTML =
    checkoutHeaderHTML;
}
