// প্রয়োজনীয় উপাদানগুলো সিলেক্ট করা
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

// হ্যামবার্গার আইকনে ক্লিক ইভেন্ট
hamburger.addEventListener("click", (e) => {
  e.preventDefault(); // লিংকের স্বাভাবিক আচরণ বন্ধ করা

  // মোবাইল মেনু এবং হ্যামবার্গার আইকনের ক্লাস টগল করা
  mobileMenu.classList.toggle("mobile-menu-active");
  hamburger.classList.toggle("active");
});

// মেনু বা হ্যামবার্গার বাটন ছাড়া অন্য কোথাও ক্লিক করলে মেনু বন্ধ করা
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove("mobile-menu-active");
    hamburger.classList.remove("active");
  }
});

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

cartIcon.addEventListener("click", () =>
  cartTab.classList.add("cart-tab-active"),
);
closeBtn.addEventListener("click", () =>
  cartTab.classList.remove("cart-tab-active"),
);

let productList = [];

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
    <a href="#" class="btn">Add to Cart</a>
    `;

    cardlist.appendChild(orderCard);
  });
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
