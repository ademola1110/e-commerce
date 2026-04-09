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
    const fetchData = {
      method: "GET",
      // headers:  {
      //     Authorization: "Bearer dhdjhd",
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json'
      // },
      // body: JSON.stringify({

      // })
    };

    const response = await fetch(url, fetchData);
    const data = await response.json();
    console.log(data);
    products = data;

    console.log(products);
    productContainer.innerHTML = products
      .map(function (value, index, array) {
        quantities[value.id] = 1;
        return `
      <div class="text-center shadow-lg p-5 bg-white rounded-lg">   
      <img class="w-[100%] border-2 border-solid border-gray-200" src="${value.images[0]}"
      <p class="font-bold text-blue-500 pb-[15px]">${value.title}</p>
      <p class="text-green-700 font-bold mb-3">$${value.price}</p>
      <button onclick="addToCart(${value.id})" class="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-600">Add to Cart</button>
      <div class="flex items-center justify-center gap-4 mt-7">
      <button onclick="decreaseQty(${value.id})" class="bg-gray-300 px-3 py-1 rounded text-lg font-bold">-</button>
      <span id="qty-${value.id}" class="font-bold text-lg">1</span>
      <button onclick="increaseQty(${value.id})" class="bg-gray-300 px-3 py-1 rounded text-lg font-bold">+</button>
      </div>  
      </div>
            `;
      })
      .join("");
  } catch (error) {
    console.log(error);
    // alert("Error fetching product")
    productContainer.innerHTML = "Error fetching product";
    productContainer.style.color = "red";
  } finally {
    console.log("Fetching done");
  }
}

fetchProducts();

let quantities = {};
quantities[value.id] = 1;
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
      title: product.title,
      price: product.price,
      image: product.images[0],
      quantity: qty,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart ✅");
}
