import { updateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader() {
  const cartQuantity = updateCartQuantity();
  const checkoutHeaderHTML = `Checkout (<a class="return-to-home-link" href="amazon.html">${cartQuantity} items</a>)`;

  const middleSection = document.querySelector(
    ".js-checkout-header-middle-section",
  );
  if (middleSection) {
    middleSection.innerHTML = checkoutHeaderHTML;
  }

  const middleSection2 = document.querySelector(".js-checkout-middle-section");
  if (middleSection2) {
    middleSection2.innerHTML = checkoutHeaderHTML;
  }
}
