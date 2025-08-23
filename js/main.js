// main.js - Global JS for all pages

document.addEventListener("DOMContentLoaded", () => {

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"], a[href$=".html"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      if(this.getAttribute("href").startsWith("#")){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Sticky Navbar
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if(window.scrollY > 50){
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  });

  // Scroll Animations
  const animatedSections = document.querySelectorAll(".section-title, .menu-card, .blog-card, .cart-item");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("animate");
      }
    });
  }, { threshold: 0.2 });

  animatedSections.forEach(section => observer.observe(section));

});
