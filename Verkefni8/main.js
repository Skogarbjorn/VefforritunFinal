import { createCartLine, showCartContent } from './lib/html.js';

const products = [
  {
    id: 1,
    title: 'HTML húfa',
    description:
      'Húfa sem heldur hausnum heitum og hvíslar hugsanlega að þér hvaða element væri best að nota.',
    price: 5_000,
  },
  {
    id: 2,
    title: 'CSS sokkar',
    description: 'Sokkar sem skalast vel með hvaða fótum sem er.',
    price: 3_000,
  },
  {
    id: 3,
    title: 'JavaScript jakki',
    description: 'Mjög töff jakki fyrir öll sem skrifa JavaScript reglulega.',
    price: 20_000,
  },
];

function submitHandler(event) {
  // Komum í veg fyrir að form submiti
  event.preventDefault();
  
  // Finnum næsta element sem er `<tr>`
  const parent = event.target.closest('tr');

  // Það er með attribute sem tiltekur auðkenni vöru, t.d. `data-product-id="1"`
  const productId = Number.parseInt(parent.dataset.productId);

  // Finnum vöru með þessu productId
  const product = products.find((i) => i.id === productId);

  if (!product) {
    return;
  }

  // TODO hér þarf að finna fjölda sem á að bæta við körfu með því að athuga
  const quantityInputElement = parent.querySelector('input');



  // á input
  const quantity = Number.parseInt(quantityInputElement.value);

  


  // Bætum vöru í körfu (hér væri gott að bæta við athugun á því að varan sé til)
  addProductToCart(product, quantity);
  let element = document.getElementsByClassName("foo");
  element.innerText = 1 * quantity;

  // updateað verð sem samtals talan
  element.textContent = `${element} kr.-`;

  updateAmount();
  updateTotalPrice();

  document.querySelector('.tableToggle').style.display = "block";
  document.querySelector('.empty-message').style.display = "none";
}

function addProductToCart(product, quantity) {

  const cartTableBodyElement = document.querySelector('.cart table tbody');

  const existingLine = cartTableBodyElement.querySelector(`tr[data-product-id="${product.id}"]`);
  
  if (!cartTableBodyElement) {
    console.warn('.cart table fannst ekki');
    return;
  }
  
  if (existingLine) {

    const currentQuantity = parseInt(existingLine.dataset.quantity, 10);

    existingLine.dataset.quantity = currentQuantity + quantity;


    const quantityElement = existingLine.querySelector('.quantity');

    if (quantityElement) {

      quantityElement.textContent = existingLine.dataset.quantity;

    }
    updateTotalPrice();

  } 
  
  else {

    const cartLine = createCartLine(product, quantity);

    cartTableBodyElement.appendChild(cartLine);

  }


  showCartContent(true);

  updateTotalPrice();

}



function updateAmount() {

}

// Finna öll form með class="add"
const addToCartForms = document.querySelectorAll('.add')

// Ítra í gegnum þau sem fylki (`querySelectorAll` skilar NodeList)
for (const form of Array.from(addToCartForms)) {
  // Bæta submit event listener við hvert
  form.addEventListener('submit', submitHandler);
}

document.addEventListener("DOMContentLoaded", function() {

  
  let state = 'form';
  const toggleButton = document.getElementById("toggleButton");
  const formFields = document.querySelectorAll('.form-field');
  const receiptSection = document.querySelector('.receipt');


  toggleButton.addEventListener("click", function(event) {

    event.preventDefault();

    if (state === 'form') {

      formFields.forEach(function(field) {
        field.style.display = "block";
      });
      state = 'receipt';
    } else if (state === 'receipt') {

      receiptSection.style.display = "block";
      toggleButton.style.display = "none";
      formFields.forEach(function(field) {
        field.style.display = "none";
      });
    }
  });
});

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
updateTotalPrice();


