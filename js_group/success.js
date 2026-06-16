// Get payment reference from URL

const params = new URLSearchParams(window.location.search);

const reference = params.get("ref");

if (reference) {
  document.getElementById("paymentInfo").innerHTML += `
        <div class="mt-4 border-t pt-4">
          <p class="text-sm text-gray-700">
            Transaction Reference
          </p>

          <p class="font-bold text-green-700 break-all">
            ${reference}
          </p>
        </div>
      `;
}

// Prevent user from going back to payment page

history.pushState(null, null, location.href);

window.onpopstate = function () {
  history.go(1);
};
