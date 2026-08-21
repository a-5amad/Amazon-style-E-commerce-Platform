import { renderOrderSummary } from "./Checkout/orderSummary.js";
import { renderPaymentSummary } from "./Checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./Checkout/checkoutHeader.js";
import { loadProduct } from "../data/products.js";
import { loadCart } from "../data/cart.js";

//import "../data/cart-class.js";

renderCheckoutHeader();

Promise.all([
  loadProduct(),

  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
