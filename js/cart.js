const cartItemsContainer = document.querySelector(".cart-items");
const totalPriceEl = document.getElementById("total-price");

// Load cart items from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
  cartItemsContainer.innerHTML = ""; // clear container
  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.imgSrc}" alt="${item.title}">
      <div class="cart-info">
        <h3>${item.title} (${item.size}${item.extraCheese ? ', Extra Cheese' : ''})</h3>
        <span class="price">₹${item.price}</span>
        <input type="number" value="${item.qty}" min="1" class="quantity">
      </div>
      <button class="remove-btn">Remove</button>
    `;

    // Quantity change
    cartItem.querySelector('.quantity').addEventListener('change', e => {
      let newQty = parseInt(e.target.value);
      if(newQty < 1) newQty = 1;
      item.qty = newQty;
      updateTotal();
      localStorage.setItem('cart', JSON.stringify(cart));
    });

    // Remove item
    cartItem.querySelector('.remove-btn').addEventListener('click', () => {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    });

    cartItemsContainer.appendChild(cartItem);
  });

  updateTotal();
}

function updateTotal() {
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
  });
  totalPriceEl.innerText = total;
}

// Initial render
renderCart();
