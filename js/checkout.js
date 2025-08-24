document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkout-form");
  const paymentSelect = document.getElementById("payment-method");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = form.querySelector('input[placeholder="Full Name"]').value;
    const address = form.querySelector('input[placeholder="Address"]').value;
    const contact = form.querySelector('input[placeholder="Contact Number"]').value;
    const payment = paymentSelect.value;

    if (!payment) {
      alert("Please select a payment method!");
      return;
    }

    // Demo Payment Process
    if(payment === "Card" || payment === "UPI") {
      let confirmPayment = confirm(`Proceed with ${payment} Payment?`);
      if(!confirmPayment) return;
    }

    // Show Dummy Invoice
    const invoice = `
      🎉 Order Confirmed! 🎉
      Name: ${name}
      Address: ${address}
      Contact: ${contact}
      Payment Method: ${payment}
      Total Amount: ₹XXX (Demo)
      
      Thank you for ordering from PizzaX! 🍕
    `;

    alert(invoice);
    form.reset();
    paymentSelect.value = "";
  });
});
