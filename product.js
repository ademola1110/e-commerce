// Language Dropdown
const langBtn = document.getElementById("langBtn");
const langMenu = document.getElementById("langMenu");

langBtn.addEventListener("click", () => {
  langMenu.classList.toggle("hidden");
});

// Close dropdown if clicked outside
window.addEventListener("click", (e) => {
  if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
    langMenu.classList.add("hidden");
  }
});

// Mobile menu toggle
const mobileBtn = document.getElementById("mobileBtn");
const mobileMenu = document.getElementById("mobileMenu");

mobileBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

let productContainer = document.querySelector("#products");
let products = [];

async function fetchProducts() {
  try {
    // Show loading first
    productContainer.innerHTML = `<p class="text-orange-500 text-lg font-semibold animate-pulse">Loading products...</p>`;

    const url =
      "https://dummyjson.com/products?limit=50&sortBy=title&order=asc";

    const response = await fetch(url);
    const data = await response.json();

    products = data.products;

    productContainer.innerHTML = products
      .map((value) => {
        quantities[value.id] = 1;

        return `
            <div class="text-center shadow-md p-4 bg-white rounded-lg hover:shadow-xl">

              <img
                class="w-full h-[180px] rounded-lg mb-3"
                src="${value.images[0]}"
              />

              <p class="font-semibold text-gray-800 mb-2">
                ${value.title}
              </p>

              <p class="text-orange-500 font-bold text-lg">
                $${value.price.toLocaleString()}
              </p>

              <div class="flex items-center justify-center gap-4 mt-3">
                <button onclick="decreaseQty(${value.id})" class="bg-gray-300 px-3 py-1 rounded">-</button>
                <span id="qty-${value.id}" class="font-bold">1</span>
                <button onclick="increaseQty(${value.id})" class="bg-gray-300 px-3 py-1 rounded">+</button>
              </div>

              <button onclick="addToCart(${value.id})"
                class="bg-orange-500 text-white px-4 py-2 rounded mt-2">
                Add to Cart
              </button>

            </div>
          `;
      })
      .join("");
  } catch (error) {
    productContainer.innerHTML = "Error fetching product";
    productContainer.style.color = "red";
  }
}

fetchProducts();

let quantities = {};
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

  if (!badge) return; // ✅ VERY IMPORTANT (prevents error)

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

  // ✅ animation here
  let badge = document.getElementById("cart-count");
  if (badge) {
    badge.classList.add("scale-125");
    setTimeout(() => {
      badge.classList.remove("scale-125");
    }, 200);
  }

  alert("Added to cart ✅");
}

let searchForm = document.querySelector("#searchForm");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let searchInput = document.querySelector("#search").value;

  let filterCheck = products.filter(function (value, index, array) {
    return value.title.toLowerCase().includes(searchInput.toLowerCase());
  });

  console.log(filterCheck);

  if (filterCheck.length === 0) {
    productContainer.innerHTML =
      "<p class='text-center text-red-500 text-xl'>No product found</p>";
    return;
  }

  productContainer.innerHTML = filterCheck
    .map(function (value) {
      quantities[value.id] = 1;

      return `
            <div class="text-center shadow-md p-4 bg-white rounded-lg hover:shadow-xl transition duration-300">
              <img
                    class="w-full h-[180px] rounded-lg mb-3"
                    src="${value.images[0]}"
                  />
                  <p class="font-semibold text-gray-800 mb-2">
                    ${value.title}
                  </p>
                  <p class="text-orange-500 font-bold text-lg">
                    $${value.price.toLocaleString()}
                  </p>


              <div class="flex items-center justify-center gap-4 mt-7">
                <button onclick="decreaseQty(${value.id})" class="bg-gray-300 px-3 py-1 rounded text-lg font-bold">-</button>
                <span id="qty-${value.id}" class="font-bold text-lg">1</span>
                <button onclick="increaseQty(${value.id})" class="bg-gray-300 px-3 py-1 rounded text-lg font-bold">+</button>
              </div>

              <button onclick="addToCart(${value.id})"
                class="bg-orange-500 text-white px-4 py-2 rounded mt-2">
                Add to Cart
              </button>
            </div>
          `;
    })
    .join("");
});

const scrollTopBtn = document.getElementById("scroll-top");

scrollTopBtn.addEventListener("click", function (e) {
  e.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
