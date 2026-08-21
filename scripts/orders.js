import { orders, saveOrdersToStorage } from "../data/orders.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { formatCurrency } from "./utils/money.js";
import { getProduct } from "../data/products.js";
import { addingToCart, cart } from "../data/cart.js";

renderOrdersPage();
updateCartQuantity();
function renderOrdersPage() {
  let ordersHTML = "";

  orders.forEach((order) => {
    let productHTML = "";
    order.products.forEach((product) => {
      let currentProduct = getProduct(product.productId);

      productHTML += `
        <div class="product-image-container">
            <img src="${currentProduct.image}" />
        </div>

        <div class="product-details">
            <div class="product-name">
            ${currentProduct.name}
            </div>
            <div class="product-delivery-date">Arriving on: 
          ${dayjs(product.estimatedDeliveryTime).format("MMMM D, YYYY")}</div>
            <div class="product-quantity">Quantity: ${product.quantity}</div>

            <button class="buy-again-button button-primary js-buyagain" data-product-id="${product.productId}" data-order-id="${order.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png" />
            <span class="buy-again-message">Buy it again</span>
            </button>
        </div>

        <div class="product-actions">
            <a href="tracking.html?orderId=${order.id}&productId=${currentProduct.id}">
            <button class="track-package-button button-secondary">
                Track package
            </button>
            </a>
        </div>`;
    });

    ordersHTML += `<div class="order-container">
        <div class="order-header">
        <div class="order-header-left-section">
            <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${dayjs(order.orderTime).format("MMMM D, YYYY")}</div>
            </div>
            <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
        </div>

        <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
        </div>
        </div>

        <div class="order-details-grid">
        ${productHTML}       
        </div>
        </div>`;
  });

  document.querySelector(".orders-grid").innerHTML = ordersHTML;

  document.querySelectorAll(".js-buyagain").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      const orderId = button.dataset.orderId;

      const order = orders.find((order) => order.id === orderId);
      const product = order.products.find(
        (product) => product.productId === productId,
      );

      const currentProduct = getProduct(productId);

      product.quantity += 1;
      order.totalCostCents += currentProduct.priceCents;

      addingToCart(productId, 1);
      saveOrdersToStorage();
      updateCartQuantity();
      renderOrdersPage();
    });
  });
}

function updateCartQuantity() {
  //SETTING TOTAL ITEM COUNT
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector(".cart-quantity").innerHTML = cartQuantity;
}
