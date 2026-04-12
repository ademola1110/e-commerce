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

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  let fname = document.querySelector("#fname").value;
  let lname = document.querySelector("#lname").value;
  const Username = document.querySelector("#username").value;
  let Email = document.querySelector("#Email").value;
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirmPassword").value;
  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  // validation
  if (
    !fname ||
    !lname ||
    !Username ||
    !Email ||
    !password ||
    !confirmPassword
  ) {
    document.getElementById("result").innerHTML = "Please fill in all fields.";
    document.getElementById("result").style.color = "red";
  } else if (!emailPattern.test(Email)) {
    document.getElementById("result").innerHTML = "Enter a valid email.";
    document.getElementById("result").style.color = "red";
  } else if (
    password.length < 8 ||
    (password.length > 8 && password === confirmPassword)
  ) {
    document.getElementById("result").innerHTML =
      "Password must be 8 characters long.";
    document.getElementById("result").style.color = "red";
  } else if (password !== confirmPassword) {
    document.getElementById("result").innerHTML = "Passwords do not match.";
    document.getElementById("result").style.color = "red";
  } else {
    // Save Your Data
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("registered", "true");

    alert("Registration successful!");
    window.location.href = "login.html";
    // document.getElementById("result").innerHTML = "Registration successful!";
    // document.getElementById("result").style.color = "green";
  }
});
