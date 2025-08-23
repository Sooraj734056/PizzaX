// Select popup elements
const popup = document.getElementById('pizza-popup');
const popupImg = popup.querySelector('.popup-img img');
const popupTitle = popup.querySelector('.popup-title');
const popupDesc = popup.querySelector('.popup-desc');
const popupPriceValue = document.getElementById('popup-price-value');
const closeBtn = popup.querySelector('.close-btn');
const addToCartPopup = document.getElementById('add-to-cart-popup');

// Function to calculate price
function updatePopupPrice(basePrice) {
  const size = document.getElementById('pizza-size').value;
  const extraCheese = document.getElementById('extra-cheese').checked;

  let price = basePrice;
  if (size === "Medium") price += 50;
  if (size === "Large") price += 100;
  if (extraCheese) price += 50;

  popupPriceValue.textContent = price;
}

// Function to open popup
function openPizzaPopup(pizzaCard) {
  const imgSrc = pizzaCard.querySelector('img').src;
  const title = pizzaCard.querySelector('h3').textContent;
  const desc = pizzaCard.querySelector('p').textContent;
  const basePriceText = pizzaCard.querySelector('.price').textContent;
  const basePrice = parseInt(basePriceText.replace('₹',''));

  popupImg.src = imgSrc;
  popupTitle.textContent = title;
  popupDesc.textContent = desc;

  // Reset options
  document.getElementById('pizza-size').value = "Small";
  document.getElementById('extra-cheese').checked = false;

  updatePopupPrice(basePrice);

  // Update price when size or extra cheese changes
  document.getElementById('pizza-size').onchange = () => updatePopupPrice(basePrice);
  document.getElementById('extra-cheese').onchange = () => updatePopupPrice(basePrice);

  // Show popup
  popup.style.display = 'flex';
}

// Close popup
closeBtn.addEventListener('click', () => popup.style.display = 'none');
popup.addEventListener('click', e => {
  if (e.target === popup) popup.style.display = 'none';
});

// Attach click event to all pizza card buttons
document.querySelectorAll('.pizza-card .btn.add-cart').forEach(button => {
  button.addEventListener('click', e => {
    e.stopPropagation(); // prevent bubbling
    const pizzaCard = e.target.closest('.pizza-card');
    openPizzaPopup(pizzaCard);
  });
});

// Add to cart from popup
addToCartPopup.addEventListener('click', () => {
  const size = document.getElementById('pizza-size').value;
  const extraCheese = document.getElementById('extra-cheese').checked;
  const price = popupPriceValue.textContent;

  alert(`Added ${popupTitle.textContent} (${size}${extraCheese ? ', Extra Cheese' : ''}) - ₹${price} to cart!`);
  popup.style.display = 'none';
});
