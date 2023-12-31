import { formatPrice } from './helpers.js';

function updateTotalPrice() {

  const totalPriceElement = document.querySelector('.priceTotal');

  // const totalQuantityElement = parseInt(existingLine.dataset.quantity, 10);

  // þar sem mögulegu verðin eru sem við bætum við
  const cartRows = document.querySelectorAll('.cart tbody tr');
  let totalSum = 0;

  for (const line of cartRows) {
    const p = line.dataset.price
    const q = line.dataset.quantity;
    

    totalSum += p * q;
  };

  // updateað verð sem samtals talan
  totalPriceElement.textContent = `${totalSum} kr.-`;
}

function reverseTable() {
  document.querySelector('.tableToggle').style.display = "none";
  document.querySelector('.empty-message').style.display = "block";
    document.querySelector('.completeButton').style.display = "none";
}

function deleteLineFromCart(event) {
  event.preventDefault();
  // console.log('Eyða!', event.submitter)
  const lineToDelete = event.submitter.closest('tr')
  // console.log(lineToDelete)
  lineToDelete.parentElement.removeChild(lineToDelete)
  updateTotalPrice();
  if (document.querySelector('.foo') === null) {
    reverseTable();
  }
}

/**
 * Búa til línu í cart töflu.
 * @param  {import('../main.js').Product} product
 * @param {number} quantity 
 * @returns HTMLElement
 */
export function createCartLine(product, quantity) {
  // TODO útfæra þannig að búin sé til lína í körfu á forminu:
 
  const cartLineElement = document.createElement('tr');
  cartLineElement.dataset.quantity = quantity.toString();
  cartLineElement.dataset.price = product.price.toString();
  cartLineElement.dataset.productId = product.id.toString();

  const titleElement = document.createElement('td');
  titleElement.textContent = product.title;
  cartLineElement.appendChild(titleElement);

  const quantityElement = document.createElement('td');
  quantityElement.textContent = quantity.toString();
  quantityElement.classList.add('foo');
  // Kórrétt væri hér að bæta líka við <span class="price">
  cartLineElement.appendChild(quantityElement);

  const priceElement = document.createElement('td');
  priceElement.classList = "price";
  priceElement.textContent = formatPrice(product.price);
  // Kórrétt væri hér að bæta líka við <span class="price">
  cartLineElement.appendChild(priceElement);
  
  const totalElement = document.createElement('td');
  totalElement.textContent = formatPrice(product.price * quantity);
  totalElement.classList.add('itemTotalPrice');
  cartLineElement.appendChild(totalElement);
  
  const formTdElement = document.createElement('td');

  const formElement = document.createElement('form');
  formElement.addEventListener('submit', deleteLineFromCart);
  
  const buttonElement = document.createElement('button');
  buttonElement.textContent = 'Eyða';

  formElement.appendChild(buttonElement);
  formTdElement.appendChild(formElement);
  cartLineElement.appendChild(formTdElement)


  return cartLineElement;
}

/**
 * Sýna efni körfu eða ekki.
 * @param {boolean} show Sýna körfu eða ekki
 */
export function showCartContent(show = true) {
  // Finnum element sem inniheldur körfuna
  const cartElement = document.querySelector('.cart');

  if (!cartElement) {
    console.warn('fann ekki .cart');
    return;
  }

  const emptyMessage = cartElement.querySelector('.empty-message');
  const cartContent = cartElement.querySelector('.cart-content');

  if (!emptyMessage || !cartContent) {
    console.warn('fann ekki element');
    return;
  }
}
