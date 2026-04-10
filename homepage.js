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
    const url = "https://api.escuelajs.co/api/v1/products?offset=0&limit=20";

    const response = await fetch(url);
    const data = await response.json();

    products = data;

    productContainer.innerHTML = products
      .map(function (value) {
        return `
          <div class="text-center shadow-md p-4 bg-white rounded-lg hover:shadow-xl transition duration-300">
            <img 
              class="w-full h-[180px] object-cover rounded-lg mb-3 border" 
              src="${value.images[0]}" 
            />
            <p class="font-semibold text-gray-800 mb-2">
              ${value.title}
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
