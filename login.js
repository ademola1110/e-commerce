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


function mixture(input) {
  input.value = input.value.replace(/[^a-zA-Z0-9\s,.-]/g, "");
}

document.getElementById("myform").addEventListener("submit", function (e) {
  e.preventDefault();

  const inputUsername = document.getElementById("loginUsername").value;
  const inputPassword = document.getElementById("loginPassword").value;

  // Get Stored Data
  const storedUsername = localStorage.getItem("username");
  const storedPassword = localStorage.getItem("password");

  if (inputUsername === storedUsername && inputPassword === storedPassword) {
    localStorage.setItem("loggedIn", "true");
    alert("Login successful!");
    window.location.href = "product.html";
  } else {
    document.getElementById("result").innerHTML =
      "Invalid username or password.";
    document.getElementById("result").style.color = "red";
  }
});
