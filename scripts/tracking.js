import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { getProduct } from "../data/products.js";
import { cart } from "../data/cart.js";
import { orders } from "../data/orders.js";

const url = new URL(window.location.href);

const orderId = url.searchParams.get("orderId");
const order = orders.find((order) => order.id === orderId);

const productId = url.searchParams.get("productId");
const product = order.products.find(
  (product) => product.productId === productId,
);

renderTrackingPage();
updateCartQuantity();

function renderTrackingPage() {
  const trackedProduct = getProduct(productId);

  const currentTime = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(product.estimatedDeliveryTime);

  const percentProgress =
    ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100;

  let currentStatus;

  if (percentProgress < 50) {
    currentStatus = "Preparing";
  } else if (percentProgress < 100) {
    currentStatus = "Shipped";
  } else {
    currentStatus = "Delivered";
  }

  let trackingHTML = `<a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">Arriving on ${dayjs(product.estimatedDeliveryTime).format("MMMM D, YYYY")}</div>

        <div class="product-info">
          ${trackedProduct.name}
        </div>

        <div class="product-info">Quantity: ${product.quantity}</div>

        <img
          class="product-image"
          src="${trackedProduct.image}"
        />

        <div class="progress-labels-container">
            <div class="progress-label ${
              currentStatus === "Preparing" ? "current-status" : ""
            }">
                  Preparing   
        </div>

      <div class="progress-label ${
        currentStatus === "Shipped" ? "current-status" : ""
      }">
                  Shipped
      </div>

      <div class="progress-label ${
        currentStatus === "Delivered" ? "current-status" : ""
      }">
                 Delivered
      </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${Math.min(percentProgress, 100)}%;"></div>
        </div>
      </div>`;

  document.querySelector(".order-tracking").innerHTML = trackingHTML;
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
