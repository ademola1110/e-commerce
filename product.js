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
    const url = "https://makeup-api.herokuapp.com/api/v1/products.json";

    const response = await fetch(url);
    const data = await response.json();

    products = data.slice(0, 50);

    productContainer.innerHTML = products
      .slice(0, 50)
      .map((value) => {
        quantities[value.id] = 1;

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

        <button onclick="addToCart(${value.id})"
          class="bg-green-600 text-white px-4 py-2 rounded mt-2 hover:bg-green-700">
          Add to Cart
        </button>

        <div class="flex items-center justify-center gap-4 mt-3">
          <button onclick="decreaseQty(${value.id})" class="bg-gray-300 px-3 py-1 rounded">-</button>
          <span id="qty-${value.id}" class="font-bold">1</span>
          <button onclick="increaseQty(${value.id})" class="bg-gray-300 px-3 py-1 rounded">+</button>
        </div>

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

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let product = products.find((p) => p.id === id);

  let qty = quantities[id] || 1;

  // Check if product already exists
  let existingProduct = cart.find((item) => item.id === id);

  if (existingProduct) {
    existingProduct.quantity += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_link,
      quantity: qty,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart ✅");
}

let searchForm = document.querySelector("#searchForm");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let searchInput = document.querySelector("#search").value;

  let filterCheck = products.filter(function (value, index, array) {
    return value.name.toLowerCase().includes(searchInput.toLowerCase());
  });

  console.log(filterCheck);

  if (filterCheck.length === 0) {
    productContainer.innerHTML =
      "<p class='text-center text-red-500 text-xl'>No product found</p>";
    return;
  }

  productContainer.innerHTML = filterCheck
    .slice(0, 50)
    .map(function (value) {
      quantities[value.id] = 1;

      return `
      <div class="text-center shadow-md p-4 bg-white rounded-lg hover:shadow-xl transition duration-300">   
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
        <button onclick="addToCart(${value.id})"
          class="bg-green-600 text-white px-4 py-2 rounded mt-2 hover:bg-green-700">
          Add to Cart
        </button>

        <div class="flex items-center justify-center gap-4 mt-7">
          <button onclick="decreaseQty(${value.id})" class="bg-gray-300 px-3 py-1 rounded text-lg font-bold">-</button>
          <span id="qty-${value.id}" class="font-bold text-lg">1</span>
          <button onclick="increaseQty(${value.id})" class="bg-gray-300 px-3 py-1 rounded text-lg font-bold">+</button>
        </div>  
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
