/* =========================
   MOBILE MENU
========================= */

const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", (e) => {
  e.preventDefault();

  mobileMenu.classList.toggle("mobile-menu-active");
  hamburger.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (
    !hamburger.contains(e.target) &&
    !mobileMenu.contains(e.target)
  ) {
    mobileMenu.classList.remove("mobile-menu-active");
    hamburger.classList.remove("active");
  }
});


/* =========================
   CART ELEMENTS
========================= */

const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const closeBtn = document.querySelector(".close-btn");

const cardlist = document.querySelector(".card-list");
const cartlist = document.querySelector(".cart-list");

const cartTotal = document.querySelector(".cart-total");
const cartValue = document.querySelector(".cart-vaelu"); // HTML-এর বানান অনুযায়ী রাখা হয়েছে


/* =========================
   CART OPEN / CLOSE
========================= */

cartIcon.addEventListener("click", () => {
  cartTab.classList.add("cart-tab-active");
});

closeBtn.addEventListener("click", () => {
  cartTab.classList.remove("cart-tab-active");
});


/* =========================
   DATA
========================= */

let productList = [];
let cartProduct = [];

/* =========================
   UPDATE TOTALS
========================= */

const updateTotals = () => {
  let totalPrice = 0;
  let totalQuantity = 0;

  document.querySelectorAll(".item").forEach((item) => {
    const quantity = parseInt(
      item.querySelector(".quantity-value").textContent
    );

    const price = parseFloat(
      item
        .querySelector(".item-total")
        .textContent.replace("$", "")
    );

    totalPrice += price;
    totalQuantity += quantity;
  });

  cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
  cartValue.textContent = totalQuantity;
};


/* =========================
   SHOW PRODUCTS
========================= */

const showCards = () => {
  productList.forEach((product) => {
    const orderCard = document.createElement("div");

    orderCard.classList.add("order-card");

    orderCard.innerHTML = `
      <div class="crad-image">
        <img src="${product.image}" alt="${product.name}">
      </div>

      <h4>${product.name}</h4>

      <h4 class="price">
        ${product.price}
      </h4>

      <a href="#" class="btn card-btn">
        Add to Cart
      </a>
    `;

    cardlist.appendChild(orderCard);

    const cardBtn = orderCard.querySelector(".card-btn");

    cardBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(product);
    });
  });
};


/* =========================
   ADD TO CART (WITH TOASTIFY)
========================= */

const addToCart = (product) => {
  const existingProduct = cartProduct.find(
    (item) => item.id === product.id
  );

  // আইটেম ইতিমধ্যে কার্টে থাকলে Toastify নোটিফিকেশন
  if (existingProduct) {
    Toastify({
      text: "⚠️ Item already in your Cart!",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: {
        background: "#f2bd12",
        color: "#212121",
        borderRadius: "10px",
        fontFamily: "'Roboto Condensed', sans-serif"
      }
    }).showToast();
    return;
  }

  cartProduct.push(product);

  // সফলভাবে কার্টে যোগ হলে Toastify নোটিফিকেশন
  Toastify({
    text: "🛒 Item added to cart successfully!",
    duration: 2500,
    gravity: "top",
    position: "right",
    style: {
      background: "#212121",
      color: "#fff",
      borderRadius: "10px",
      fontFamily: "'Roboto Condensed', sans-serif"
    }
  }).showToast();

  let quantity = 1;
  const price = parseFloat(
    product.price.replace("$", "")
  );

  const cartItem = document.createElement("div");

  cartItem.classList.add("item");

  cartItem.innerHTML = `
    <div class="item-image">
      <img src="${product.image}" alt="${product.name}">
    </div>

    <div class="detail">
      <h4>${product.name}</h4>
      <h4 class="item-total">
        ${product.price}
      </h4>
    </div>

    <div class="flex">
      <a href="#" class="quantity-btn minus">
        <i class="fa-solid fa-minus"></i>
      </a>

      <h4 class="quantity-value">
        ${quantity}
      </h4>

      <a href="#" class="quantity-btn plus">
        <i class="fa-solid fa-plus"></i>
      </a>
    </div>
  `;

  cartlist.appendChild(cartItem);

  updateTotals();

  const plusBtn = cartItem.querySelector(".plus");
  const minusBtn = cartItem.querySelector(".minus");
  const quantityValue = cartItem.querySelector(".quantity-value");
  const itemTotal = cartItem.querySelector(".item-total");

  /* ===== INCREASE QUANTITY ===== */

  plusBtn.addEventListener("click", (e) => {
    e.preventDefault();

    quantity++;

    quantityValue.textContent = quantity;
    itemTotal.textContent = `$${(
      price * quantity
    ).toFixed(2)}`;

    updateTotals();
  });


  /* ===== DECREASE QUANTITY ===== */

  minusBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (quantity > 1) {
      quantity--;

      quantityValue.textContent = quantity;

      itemTotal.textContent = `$${(
        price * quantity
      ).toFixed(2)}`;

      updateTotals();
    } else {
      cartItem.classList.add("slide-out");

      setTimeout(() => {
        cartItem.remove();

        cartProduct = cartProduct.filter(
          (item) => item.id !== product.id
        );

        updateTotals();
      }, 300);
    }
  });
};


/* =========================
   FETCH PRODUCTS
========================= */

const initApp = () => {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      productList = data;
      showCards();
    });
};

initApp();


/* =========================
   SWIPER
========================= */

const swiper = new Swiper(".mySwiper", {
  loop: true,

  navigation: {
    nextEl: "#next",
    prevEl: "#prev",
  },
});
