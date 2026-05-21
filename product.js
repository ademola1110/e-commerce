// Language Dropdown
const langBtn = document.getElementById("langBtn");

const langMenu = document.getElementById("langMenu");

langBtn.addEventListener("click", () => {
  langMenu.classList.toggle("hidden");
});

window.addEventListener("click", (e) => {
  if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
    langMenu.classList.add("hidden");
  }
});

// Mobile Menu
mobileBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");

  menuIcon.classList.toggle("fa-bars");

  menuIcon.classList.toggle("fa-xmark");
});

let productContainer = document.querySelector("#products");

let products = [];

let quantities = {};

async function fetchProducts() {
  try {
    productContainer.innerHTML = `
            <p class="text-orange-500 text-lg font-semibold animate-pulse col-span-full text-center">
              Loading products...
            </p>
          `;

    const url =
      "https://dummyjson.com/products?limit=50&sortBy=title&order=asc";

    const response = await fetch(url);

    const data = await response.json();

    products = data.products;

    displayProducts(products);
  } catch (error) {
    productContainer.innerHTML =
      "<p class='text-red-500'>Error fetching products</p>";
  }
}

function displayProducts(items) {
  productContainer.innerHTML = items
    .map((value) => {
      quantities[value.id] = 1;

      return `
              <div class="relative text-center shadow-md p-4 bg-white rounded-lg hover:shadow-xl transition duration-300 hover:-translate-y-2">

                <div class="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  SALE
                </div>

                <img
                  class="w-full h-[180px] rounded-lg mb-3 object-cover"
                  src="${value.images[0]}"
                />

                <p class="font-semibold text-gray-800 mb-2">
                  ${value.title}
                </p>

                <div class="text-yellow-400 mb-2">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star-half-stroke"></i>
                </div>

                <p class="text-orange-500 font-bold text-lg">
                  $${value.price.toLocaleString()}
                </p>

                <div class="flex items-center justify-center gap-4 mt-3">

                  <button
                    onclick="decreaseQty(${value.id})"
                    class="bg-gray-300 px-3 py-1 rounded"
                  >
                    -
                  </button>

                  <span id="qty-${value.id}" class="font-bold">
                    1
                  </span>

                  <button
                    onclick="increaseQty(${value.id})"
                    class="bg-gray-300 px-3 py-1 rounded"
                  >
                    +
                  </button>

                </div>

                <button
                  onclick="addToCart(${value.id})"
                  class="bg-orange-500 text-white px-4 py-2 rounded mt-4 hover:bg-orange-600"
                >
                  Add to Cart
                </button>

              </div>
            `;
    })
    .join("");
}

fetchProducts();

function increaseQty(id) {
  if (!quantities[id]) {
    quantities[id] = 1;
  }

  quantities[id]++;

  document.getElementById(`qty-${id}`).innerText = quantities[id];
}

function decreaseQty(id) {
  if (!quantities[id]) {
    quantities[id] = 1;
  }

  if (quantities[id] > 1) {
    quantities[id]--;

    document.getElementById(`qty-${id}`).innerText = quantities[id];
  }
}

function updateCartBadge() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  let badge = document.getElementById("cart-count");

  if (!badge) return;

  if (totalQty > 0) {
    badge.classList.remove("hidden");

    badge.innerText = totalQty;
  } else {
    badge.classList.add("hidden");
  }
}

updateCartBadge();

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let product = products.find((p) => p.id === id);

  let qty = quantities[id] || 1;

  let existingProduct = cart.find((item) => item.id === id);

  if (existingProduct) {
    existingProduct.quantity += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.images[0],
      quantity: qty,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartBadge();

  alert("Added to cart ✅");
}

// SEARCH WHILE TYPING
const searchForm = document.getElementById("searchForm");

const searchInput = document.getElementById("search");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
});

searchInput.addEventListener("input", function () {
  let searchValue = searchInput.value.toLowerCase().trim();

  let filterCheck = products.filter(function (value) {
    return value.title.toLowerCase().includes(searchValue);
  });

  if (searchValue === "") {
    displayProducts(products);

    return;
  }

  if (filterCheck.length === 0) {
    productContainer.innerHTML = `
              <p class="text-center text-red-500 text-2xl font-bold col-span-full">
                Product Not Found ❌
              </p>
            `;

    return;
  }

  displayProducts(filterCheck);
});

// Scroll Top
const scrollTopBtn = document.getElementById("scroll-top");

scrollTopBtn.addEventListener("click", function (e) {
  e.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
