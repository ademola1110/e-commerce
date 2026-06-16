const cartContainer = document.getElementById("cartContainer");
const confirmModal = document.getElementById("confirmModal");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let productIdToDelete = null;

// Convert price string to number
function getPrice(price) {
  if (typeof price === "number") return price;

  return Number(
    String(price).replace("$", "").replace("₦", "").replace(/,/g, "").trim(),
  );
}

// Update cart badge
function updateCartBadge() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let totalQty = cart.reduce((sum, item) => sum + Number(item.quantity), 0);

  let badge = document.getElementById("cart-count");

  if (!badge) return;

  if (totalQty > 0) {
    badge.classList.remove("hidden");
    badge.innerText = totalQty;
  } else {
    badge.classList.add("hidden");
  }
}

// Display cart
function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <p class="text-center text-xl col-span-full">
        Cart is Empty
      </p>
    `;

    document.getElementById("grandTotal").innerText = "0";

    return;
  }

  let grandTotal = 0;

  cartContainer.innerHTML = cart
    .map((item) => {
      const price = getPrice(item.price);

      const itemTotal = price * Number(item.quantity);

      grandTotal += itemTotal;

      return `
      <div class="bg-white p-5 rounded-lg shadow">
        <img
          src="${item.image}"
          class="w-full h-44 object-cover rounded mb-3"
        >

        <h3 class="font-bold text-lg mb-2">
          ${item.name}
        </h3>

        <p class="text-orange-500 font-bold">
          $${price}
        </p>

        <p class="mt-2">
          Quantity:
          <strong>${item.quantity}</strong>
        </p>

        <p class="font-bold mt-2">
          Total:
          <span class="text-orange-500">
            $${itemTotal.toLocaleString()}
          </span>
        </p>

        <button
          onclick="removeFromCart(${item.id})"
          class="mt-4 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
        >
          Remove
        </button>
      </div>
    `;
    })
    .join("");

  document.getElementById("grandTotal").innerText = grandTotal.toLocaleString();
}

// Remove item
function removeFromCart(id) {
  productIdToDelete = id;

  confirmModal.classList.remove("hidden");
  confirmModal.classList.add("flex");
}

// Confirm remove
yesBtn.addEventListener("click", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.filter((item) => item.id != productIdToDelete);

  localStorage.setItem("cart", JSON.stringify(cart));

  displayCart();
  updateCartBadge();

  confirmModal.classList.add("hidden");
  confirmModal.classList.remove("flex");
});

// Cancel remove
noBtn.addEventListener("click", () => {
  confirmModal.classList.add("hidden");
  confirmModal.classList.remove("flex");
});

// Paystack Checkout
document.getElementById("checkoutBtn").addEventListener("click", () => {
  let name = document.getElementById("customerName").value.trim();

  let email = document.getElementById("customerEmail").value.trim();

  let phone = document.getElementById("customerPhone").value.trim();

  if (!name || !email || !phone) {
    alert("Please fill all fields.");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  let grandTotal = cart.reduce((sum, item) => {
    return sum + getPrice(item.price) * Number(item.quantity);
  }, 0);

  // Paystack expects integer in kobo
  const amount = Math.round(Number(grandTotal) * 100);

  if (!Number.isInteger(amount) || amount <= 0) {
    alert("Invalid payment amount. Check product prices.");
    return;
  }

  console.log("Grand Total:", grandTotal);
  console.log("Amount:", amount);

  let handler = PaystackPop.setup({
    key: "pk_test_07c79608844a6f286c8475c66a15c829eabe379c",

    email: email,

    amount: amount,

    currency: "NGN",

    ref: "PAY-" + Date.now(),

    metadata: {
      custom_fields: [
        {
          display_name: "Customer Name",
          variable_name: "customer_name",
          value: name,
        },
        {
          display_name: "Phone Number",
          variable_name: "phone_number",
          value: phone,
        },
      ],
    },

    callback: function (response) {
      // alert(
      //   "Payment Successful!\nReference: " +
      //     response.reference
      // );

      localStorage.removeItem("cart");

      displayCart();

      updateCartBadge();

      window.location.href = "success.html?ref=" + response.reference;
    },

    onClose: function () {
      console.log("Payment cancelled");
    },
  });

  handler.openIframe();
});

// Initial load
updateCartBadge();
displayCart();

// Scroll to top
const scrollTopBtn = document.getElementById("scroll-top");

scrollTopBtn.addEventListener("click", function (e) {
  e.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
