// Language Dropdown
const langBtn = document.getElementById("langBtn");
const langMenu = document.getElementById("langMenu");

langBtn.addEventListener("click", () => {
  langMenu.classList.toggle("hidden");
});

// Close dropdown
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
let searchInput = document.querySelector("#searchInput");

let products = [];

async function fetchProducts() {
  try {
    productContainer.innerHTML = `
            <p class="text-orange-500 text-lg font-semibold animate-pulse">
              Loading products...
            </p>
          `;

    const url =
      "https://dummyjson.com/products?limit=20";

    const response = await fetch(url);
    const data = await response.json();

    products = data.products;

    displayProducts(products);
  } catch (error) {
    productContainer.innerHTML = "Error fetching product";
    productContainer.style.color = "red";
  }
}

function displayProducts(items) {
  productContainer.innerHTML = items
    .map(function (value) {
      return `
              <div class="text-center shadow-md p-4 bg-white rounded-lg hover:shadow-xl transition duration-300 hover:-translate-y-2">
                
                <img 
                  class="w-full h-[180px] rounded-lg mb-3 object-cover" 
                  src="${value.images[0]}" 
                />

                <p class="font-semibold text-gray-800 mb-2">
                  ${value.title}
                </p>

                <p class="text-orange-500 font-bold text-lg">
                  $${value.price.toLocaleString()}
                </p>

                <button
                class="add-to-cart mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                >Add to Cart</button>
              </div>
            `;
    })
    .join("");
}

fetchProducts();

// if user click add to cart in the homepage, it
//  will redirect user to registration page.
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-to-cart")) {
    window.location.href = "registration.html";
  }
});

// Search Products
searchInput.addEventListener("keyup", function () {
  let value = searchInput.value.toLowerCase();

  let filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(value);
  });

  displayProducts(filteredProducts);
});

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

// Scroll Top
const scrollTopBtn = document.getElementById("scroll-top");

scrollTopBtn.addEventListener("click", function (e) {
  e.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
