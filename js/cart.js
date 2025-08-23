// cart.js - Basic cart functionality demo
const cartItems = document.querySelectorAll(".cart-item");
const totalPriceEl = document.getElementById("total-price");

function updateTotal() {
  let total = 0;
  cartItems.forEach(item => {
    const price = parseInt(item.querySelector(".price").innerText.replace("₹",""));
    const qty = parseInt(item.querySelector(".quantity").value);
    total += price * qty;
  });
  totalPriceEl.innerText = total;
}

cartItems.forEach(item => {
  const qtyInput = item.querySelector(".quantity");
  const removeBtn = item.querySelector(".remove-btn");

  qtyInput.addEventListener("change", () => updateTotal());
  removeBtn.addEventListener("click", () => {
    item.remove();
    updateTotal();
  });
});

updateTotal();
