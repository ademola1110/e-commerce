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

    const url = "https://makeup-api.herokuapp.com/api/v1/products.json";

    const response = await fetch(url);
    const data = await response.json();

    products = data.slice(0, 20);

    productContainer.innerHTML = products
      .slice(0, 20) // optional (limits products)
      .map(function (value) {
        return `
          <div class="text-center shadow-md p-4 bg-white rounded-lg hover:shadow-xl">
            <img 
              class="w-full h-[180px] rounded-lg mb-3" 
              src="${value.image_link}" 
            />
            <p class="font-semibold text-gray-800 mb-2">
              ${value.name}
            </p>
            <p class="text-orange-500 font-bold text-lg">
              $${value.price}
            </p>
          </div>
        `;
      })
      .join("");
  } catch (error) {
    console.log(error);
    productContainer.innerHTML = "Error fetching product";
    productContainer.style.color = "red";
  }
}

fetchProducts();

const scrollTopBtn = document.getElementById("scroll-top");

scrollTopBtn.addEventListener("click", function (e) {
  e.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
