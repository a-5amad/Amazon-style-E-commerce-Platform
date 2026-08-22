import { orders } from "../data/orders.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { formatCurrency } from "./utils/money.js";
import { getProduct } from "../data/products.js";
import { addingToCart, cart } from "../data/cart.js";

renderOrdersPage();
updateCartQuantity();
function renderOrdersPage() {
  let ordersHTML = "";

  if (orders.length === 0) {
    document.querySelector(".orders-grid").innerHTML = `
    <h2>No order placed yet</h2>
    <a
      class="button-primary  view-products-link"
      href="amazon.html"
      data-testid="view-products-link"
      style="text-decoration:none; color: black; height: 5vh; display: flex;align-items : center; justify-content: center"
    >
      View products
    </a>`;

    return;
  }

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

            <button class="buy-again-button button-primary js-buyagain" data-product-id="${product.productId}">
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

      addingToCart(productId, 1);
      updateCartQuantity();
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
document.querySelector(".js-search-button").addEventListener("click", () => {
  const searchValue = document.querySelector(".js-search-bar").value;
  console.log(searchValue);
  window.location.href = `amazon.html?search=${searchValue}`;
});
