const cartContainer = document.getElementById("cartContainer");

// Display cart items
function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML =
      "<p class='text-center text-[20px] col-span-full'>Cart is empty</p>";

    document.getElementById("grandTotal").innerText = 0;
    return;
  }

  let grandTotal = 0;

  cartContainer.innerHTML = cart
    .map((item) => {
      let itemTotal = item.price * item.quantity;

      grandTotal += itemTotal;

      return `
        <div class="bg-white p-5 rounded shadow text-center">
          <img src="${item.image}" class="w-full h-[150px] object-cover mb-3 rounded">
          <h2 class="font-bold mb-2">${item.title}</h2>
          <p class="text-orange-500 font-bold mb-2">$${item.price}</p>
          <p class="font-bold mb-2">Quantity: ${item.quantity}</p>
          <p class="mt-2 font-bold">Total: <span class="text-orange-500"> $${itemTotal} </span></p>
          <button onclick="removeFromCart(${item.id})"
            class="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500">
            Remove
          </button>
        </div>
      `;
    })
    .join("");

  //  DISPLAY FINAL TOTAL
  document.getElementById("grandTotal").innerText = grandTotal;
}

// Remove item from cart
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id != id); // Remove the selected item
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart(); // Refresh UI
}

// Initial display
displayCart();

const scrollTopBtn = document.getElementById("scroll-top");

scrollTopBtn.addEventListener("click", function (e) {
  e.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});