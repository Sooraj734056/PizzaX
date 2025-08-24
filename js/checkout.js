document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkout-form");
  const prevBtns = document.querySelectorAll(".btn-prev");
  const nextBtns = document.querySelectorAll(".btn-next");
  const formSteps = document.querySelectorAll(".form-step");
  const stepperItems = document.querySelectorAll(".stepper-item");
  const paymentSelect = document.getElementById("payment-method");

  const modal = document.getElementById("invoice-modal");
  const modalCloseBtn = document.querySelector(".modal-close-btn");
  const invoiceDetailsContainer = document.getElementById("invoice-details");

  let currentStep = 0;

  // ================= STEP VALIDATION =================
  const validateCurrentStep = () => {
    let isValid = true;
    const currentFormStep = formSteps[currentStep];
    const requiredInputs = currentFormStep.querySelectorAll("[required]");

    requiredInputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('input-error');
      } else {
        input.classList.remove('input-error');
      }
    });
    return isValid;
  };

  // ================= UPDATE STEPPER =================
  const updateSteps = () => {
    formSteps.forEach((step, index) =>
      step.classList.toggle('active-step', index === currentStep)
    );
    stepperItems.forEach((item, index) => {
      item.classList.remove('active');
      if (index <= currentStep) item.classList.add('active');
    });
  };

  nextBtns.forEach(button => {
    button.addEventListener("click", () => {
      if (validateCurrentStep()) {
        if (currentStep < formSteps.length - 1) {
          currentStep++;
          updateSteps();
        }
      }
    });
  });

  prevBtns.forEach(button => {
    button.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        updateSteps();
      }
    });
  });

  // ================= PAYMENT METHOD TOGGLE =================
  paymentSelect.addEventListener('change', function () {
    const cardDetails = document.getElementById('card-details');
    const upiDetails = document.getElementById('upi-details');
    cardDetails.style.display = this.value === 'Card' ? 'block' : 'none';
    upiDetails.style.display = this.value === 'UPI' ? 'block' : 'none';
  });

  // ================= LOAD ORDER SUMMARY =================
  const loadOrderSummary = () => {
    const summaryContainer = document.querySelector(".order-summary-container ul");
    summaryContainer.innerHTML = ""; // clear old

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      summaryContainer.innerHTML = "<li>Your cart is empty</li>";
      return { cart: [], total: 0 };
    }

    let total = 30; // Delivery charge
    cart.forEach(item => {
      total += item.price * item.qty;
      summaryContainer.innerHTML += `
        <li>
          <span>
            <img src="${item.img}" width="40" style="vertical-align:middle;margin-right:8px;"> 
            ${item.qty} x ${item.name}
          </span>
          <span>₹${item.price * item.qty}</span>
        </li>`;
    });

    summaryContainer.innerHTML += `<li><span>Delivery Charges</span><span>₹30</span></li>`;
    summaryContainer.innerHTML += `<li class="total"><span>Total Amount</span><span>₹${total}</span></li>`;
    return { cart, total };
  };

  // ================= ORDER ID GENERATOR =================
  const generateOrderId = () => "PX" + Math.floor(100000 + Math.random() * 900000);

  // ================= PLACE ORDER / SUBMIT =================
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const { cart, total } = loadOrderSummary();
    if (cart.length === 0) {
      alert("⚠ Your cart is empty!");
      return;
    }

    const name = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const paymentMethod = paymentSelect.value;

    const orderId = generateOrderId();
    const orderDate = new Date().toLocaleString();

    // Build Invoice
    let invoiceHTML = `
      <p><strong>Order ID:</strong> <span>${orderId}</span></p>
      <p><strong>Date:</strong> <span>${orderDate}</span></p>
      <p><strong>Name:</strong> <span>${name}</span></p>
      <p><strong>Email:</strong> <span>${email}</span></p>
      <p><strong>Address:</strong> <span>${address}</span></p>
      <p><strong>Payment Method:</strong> <span>${paymentMethod}</span></p>
      <hr>
    `;

    cart.forEach(item => {
      invoiceHTML += `
        <p>
          <img src="${item.img}" width="40" style="vertical-align:middle;margin-right:8px;">
          ${item.qty} x ${item.name} — ₹${item.price * item.qty}
        </p>`;
    });

    invoiceHTML += `
      <p><strong>Delivery Charges:</strong> ₹30</p>
      <p><strong>Total Amount:</strong> ₹${total}</p>
      <button id="download-pdf" class="btn" style="margin-top:15px;">⬇ Download PDF</button>
    `;

    invoiceDetailsContainer.innerHTML = invoiceHTML;
    modal.style.display = 'flex';

    // PDF Download
    document.getElementById("download-pdf").addEventListener("click", () => {
      const opt = {
        margin: 0.5,
        filename: `${orderId}_invoice.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
      };
      html2pdf().from(invoiceDetailsContainer).set(opt).save();
    });
  });

  // ================= CLOSE MODAL =================
  const closeModal = () => {
    modal.style.display = 'none';
    form.reset();
    currentStep = 0;
    updateSteps();
    paymentSelect.dispatchEvent(new Event('change'));
    localStorage.removeItem("cart"); // order ke baad cart clear
  };

  modalCloseBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  // ================= INIT =================
  updateSteps();
  loadOrderSummary();
});
