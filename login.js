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

function onlyText(input) {
  input.value = input.value.replace(/[^a-zA-Z]/g, "");
}

function mixture(input) {
  input.value = input.value.replace(/[^a-zA-Z0-9\s,.-]/g, "");
}

document.getElementById("myform").addEventListener("submit", function (e) {
  e.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (username == "" || password == "") {
    document.getElementById("result").innerHTML = "You must fill in all fields";
    document.getElementById("result").style.color = "red";
  } else if (password.length < 8 || password.length > 8) {
    document.getElementById("result").innerHTML =
      "Password must be 8 characters long.";
    document.getElementById("result").style.color = "red";
  } else {
    document.getElementById("result").innerHTML = "Registration successful!";
    document.getElementById("result").style.color = "green";
  }
});
