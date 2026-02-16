/* =========================
   CART SYSTEM
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const count = document.getElementById("cart-count");
  if (count) {
    count.textContent = cart.length;
  }
}

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(name + " added to cart!");
}

function displayCart() {
  const cartItems = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");

  if (!cartItems) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    cartItems.innerHTML += `
      <p>
        ${item.name} - $${item.price}
        <button onclick="removeItem(${index})">Remove</button>
      </p>
    `;
  });

  totalElement.textContent = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  displayCart();
  updateCartCount();
}

/* =========================
   DARK MODE
========================= */

document.addEventListener("DOMContentLoaded", function () {

  updateCartCount();
  displayCart();

  const toggle = document.getElementById("dark-toggle");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");

      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  }

  /* SEARCH */
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("keyup", function () {
      const filter = searchInput.value.toLowerCase();
      const products = document.querySelectorAll(".product");

      products.forEach(product => {
        const title = product.querySelector("h3").textContent.toLowerCase();
        product.style.display = title.includes(filter) ? "block" : "none";
      });
    });
  }

  /* SORT */
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      const productsContainer = document.querySelector(".products");
      const products = Array.from(document.querySelectorAll(".product"));

      products.sort((a, b) => {
        const priceA = parseFloat(a.querySelector(".price").textContent.replace("$", ""));
        const priceB = parseFloat(b.querySelector(".price").textContent.replace("$", ""));

        return this.value === "low" ? priceA - priceB : priceB - priceA;
      });

      products.forEach(product => productsContainer.appendChild(product));
    });
  }

  /* CHECKOUT */
  const form = document.getElementById("checkout-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (cart.length === 0) {
        alert("Cart is empty!");
        return;
      }

      alert("Order placed successfully!");
      cart = [];
      localStorage.removeItem("cart");
      updateCartCount();
    });
  }

});