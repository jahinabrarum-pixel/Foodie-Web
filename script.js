// প্রয়োজনীয় উপাদানগুলো সিলেক্ট করা
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

// হ্যামবার্গার আইকনে ক্লিক ইভেন্ট
hamburger.addEventListener('click', (e) => {
    e.preventDefault(); // লিংকের স্বাভাবিক আচরণ বন্ধ করা
    
    // মোবাইল মেনু এবং হ্যামবার্গার আইকনের ক্লাস টগল করা
    mobileMenu.classList.toggle('mobile-menu-active');
    hamburger.classList.toggle('active');
});

// মেনু বা হ্যামবার্গার বাটন ছাড়া অন্য কোথাও ক্লিক করলে মেনু বন্ধ করা
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('mobile-menu-active');
        hamburger.classList.remove('active');
    }
});