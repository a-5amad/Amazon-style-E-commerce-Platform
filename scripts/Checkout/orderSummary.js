import {
  cart,
  removeFromCart,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency as FC, formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummaryHTML += `

<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
    Delivery date: ${dateString}</div>

    <div class="cart-item-details-grid">
        <img
        class="product-image"
        src="${matchingProduct.image}"
        />

        <div class="cart-item-details">
        <div class="product-name">${matchingProduct.name}</div>
        <div class="product-price">$${FC(matchingProduct.priceCents)}</div>
        <div class="product-quantity">
            <span> Quantity: <span class="quantity-label">${cartItem.quantity}</span> </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id = "${matchingProduct.id}">
            Update
            </span>

            <input class="quantity-input" 
            data-product-id = "${matchingProduct.id}" />

            <span class="save-quantity-link link-primary" data-product-id = "${matchingProduct.id}">
              Save
            </span>

            <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
            Delete
            </span>
        </div>
        </div>

        <div class="delivery-options">
        <div class="delivery-options-title">
            Choose a delivery option:
        </div>
         ${deliveryOptionsHTML(matchingProduct, cartItem)}
      </div>
    </div>
  </div>
`;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let deliveryHTML = "";

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");

      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)} - `;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      deliveryHTML += `<div class="delivery-option js-delivery-option
    " data-product-id="${matchingProduct.id}"
    data-delivery-option-id ="${deliveryOption.id}">
        <input
        type="radio"

        ${isChecked ? "checked" : ""}

        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}"
        />
        <div>
        <div class="delivery-option-date">
        ${dateString}
        </div>
        <div class="delivery-option-price">
      ${priceString} Shipping
        </div>
      </div>
  </div>`;
    });
    return deliveryHTML;
  }

  document.querySelector(".order-summary").innerHTML = cartSummaryHTML;

  function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelector(".js-checkout-middle-section").innerHTML =
      `Checkout (<a class="return-to-home-link" href="amazon.html">${cartQuantity} items</a>)`;
  }

  updateCartQuantity();

  //------> Delete Button:
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      //Deleting the HTML from the page
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`,
      );
      container.remove();
      updateCartQuantity();
      renderPaymentSummary();
    });
  });

  //DISPLAYS SAVE AND UPDATE-INPUT

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`,
      );

      container.classList.add("is-editing-quantity");
    });
  });

  //FUNCTIONALITY OF SAVE BUTTON
  document.querySelectorAll(".save-quantity-link").forEach((span) => {
    span.addEventListener("click", () => {
      const productId = span.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`,
      );

      container.classList.remove("is-editing-quantity");

      const quantityInput = Number(
        document.querySelector(
          `.quantity-input[data-product-id="${productId}"]`,
        ).value,
      );

      if (quantityInput >= 0 && quantityInput < 1000) {
        const updatedQuantity = quantityInput;

        updateQuantity(productId, updatedQuantity);

        document.querySelector(".quantity-label").innerHTML = updatedQuantity;
        updateCartQuantity();
      } else {
        alert("Quantity should be in [0, 1000}");
      }

      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
