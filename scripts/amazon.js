import { cart as myCart } from "../data/cart.js";

let productsHTML = "";

//LOOPING THROUGH THE ARRAY

products.forEach((product) => {
  productsHTML += `  <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${product.rating.count}</div>
          </div>

          <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart prod-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">Add to Cart</button>
        </div>`;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;

let timerId;

//ADD-TO-CART BUTTON FUNCTION

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;

    let itemQuantity = Number(
      document.querySelector(`.js-quantity-selector-${productId}`).value,
    );

    document
      .querySelector(`.prod-${productId}`)
      .classList.add("post-added-to-cart");

    clearTimeout(timerId);

    timerId = setTimeout(() => {
      document
        .querySelector(`.prod-${productId}`)
        .classList.remove("post-added-to-cart");
    }, 2000);

    let matchingItem;

    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
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
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector(".cart-quantity").innerHTML = cartQuantity;
  });
});
