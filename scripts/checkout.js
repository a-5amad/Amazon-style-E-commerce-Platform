import { renderOrderSummary } from "./Checkout/orderSummary.js";
import { renderPaymentSummary } from "./Checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./Checkout/checkoutHeader.js";
import { loadProduct } from "../data/products.js";
//import "../data/backend-practice.js";
import { loadCart } from "../data/cart.js";

//import "../data/cart-class.js";

renderCheckoutHeader();

new Promise((resolve) => {
  loadProduct(() => {
    resolve("sam");
  });
})
  .then((name) => {
    console.log(name);

    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  })
  .then(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
