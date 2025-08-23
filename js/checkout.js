// checkout.js - Demo Checkout form submission
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkout-form");

  form.addEventListener("submit", function(e) {
    e.preventDefault(); // form submit ko rokta hai
    const name = form.querySelector('input[placeholder="Full Name"]').value;
    const address = form.querySelector('input[placeholder="Address"]').value;
    const contact = form.querySelector('input[placeholder="Contact Number"]').value;
    const payment = form.querySelector('input[placeholder="Payment Info (Dummy)"]').value;

    if(name && address && contact && payment) {
      alert(`Thank you ${name}! Your order has been placed successfully 🍕`);
      form.reset();
    } else {
      alert("Please fill all the fields!");
    }
  });
});
