const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", (e) => {
  e.preventDefault();

  mobileMenu.classList.toggle("mobile-menu-active");
  hamburger.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove("mobile-menu-active");
    hamburger.classList.remove("active");
  }
});

// Swiper
var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: "#next",
    prevEl: "#prev",
  },
});

// Start Main JS
const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const closeBtn = document.querySelector(".close-btn");
const cardlist = document.querySelector(".card-list");
const cartlist = document.querySelector(".cart-list");

cartIcon.addEventListener("click", () =>
  cartTab.classList.add("cart-tab-active"),
);
closeBtn.addEventListener("click", () =>
  cartTab.classList.remove("cart-tab-active"),
);

let productList = [];
let cartProduct = [];

const showCards = () => {
  productList.forEach((product) => {
    const orderCard = document.createElement("div");
    orderCard.classList.add("order-card");

    orderCard.innerHTML = `
    <div class="crad-image">
      <img src="${product.image}">
    </div>
    <h4>${product.name}</h4>
    <h4 class="price">${product.price}</h4>
    <a href="#" class="btn card-btn">Add to Cart</a>
    `;

    cardlist.appendChild(orderCard);

    const cardBtn = orderCard.querySelector(".card-btn");

    cardBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(product);
    });
  });
};

const addToCart = (product) => {
  const existingProduct = cartProduct.find((item) => item.id === product.id);
  if (existingProduct) {
    alert(`Item already in your Cart!`);
    return;
  }

  cartProduct.push(product);

  let quantity = 1;
  let price = parseFloat(product.price.replace('$', ''))

  const cartItem = document.createElement("div");
  cartItem.classList.add("item");

  cartItem.innerHTML = `
  <div class="item-image">
    <img src="${product.image}">
  </div>
  <div class="detail">
    <h4>${product.name}</h4>
    <h4 class="item-total">${product.price}</h4>
  </div>
  <div class="flex">
    <a href="#" class="quantity-btn minus">
      <i class="fa-solid fa-minus"></i>
    </a>
    <h4 class="quantity-value">${quantity}</h4>
    <a href="#" class="quantity-btn plus">
      <i class="fa-solid fa-plus"></i>
    </a>
  </div>
  `;

  cartlist.appendChild(cartItem);

  const plusBtn = cartItem.querySelector('.plus');
  const minusBtn = cartItem.querySelector('.minus');
  const quantityValue = cartItem.querySelector('.quantity-value');
  const itemTotal = cartItem.querySelector('.item-total');

  plusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    quantity++;
    quantityValue.textContent = quantity;
    itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
  })

  minusBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (quantity > 1) {
      quantity--;
      quantityValue.textContent = quantity;
      itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
    }
    else {
      cartItem.classList.add('slide-out')
      setTimeout(() => {
        cartItem.remove();
        cartProduct = cartProduct.filter(item => item.id !== product.id);
      }, 300)
    }
  })
};

const initApp = () => {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      productList = data;
      showCards();
    });
};

initApp();
