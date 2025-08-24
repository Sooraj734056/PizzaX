// main.js - Global JS for all pages
document.addEventListener("DOMContentLoaded", () => {

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"], a[href$=".html"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      if(this.getAttribute("href").startsWith("#")){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });
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
  const animatedSections = document.querySelectorAll(".section-title, .menu-card, .blog-card, .cart-item, .pizza-card");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("animate");
      }
    });
  }, { threshold: 0.2 });
  animatedSections.forEach(section => observer.observe(section));

  // ---------------------------
  // Side Menu Toggle
  // ---------------------------
  const menuToggle = document.querySelector("#menu-toggle");
  const sideMenu = document.querySelector(".side-menu");
  const closeBtn = document.querySelector(".side-menu .close-btn");

  if(menuToggle && sideMenu && closeBtn){
    menuToggle.addEventListener("click", () => sideMenu.classList.add("active"));
    closeBtn.addEventListener("click", () => sideMenu.classList.remove("active"));
    document.querySelectorAll(".side-menu ul li a").forEach(link => {
      link.addEventListener("click", () => sideMenu.classList.remove("active"));
    });
  }

  // ---------------------------
  // Search Modal
  // ---------------------------
  const searchBtn = document.getElementById("search-btn");
  const searchModal = document.getElementById("search-modal");
  const closeSearch = document.getElementById("close-search");
  const searchInput = document.getElementById("search-input");

  const pizzaMap = {
    "margherita": "margherita",
    "pepperoni": "pepperoni",
    "veggie": "veggie",
    "bbq": "bbq",
    "bbq chicken": "bbq",
    "paneer": "paneer",
    "cheese burst": "cheeseburst",
    "mexican": "mexican",
    "mexican green wave": "mexican",
    "farmhouse": "farmhouse",
    "chicken sausage": "chickensausage",
    "supreme": "supreme",
    "supreme combo": "supreme"
  };

  if(searchBtn && searchModal && closeSearch && searchInput){
    searchBtn.addEventListener("click", () => searchModal.classList.add("active"));
    closeSearch.addEventListener("click", () => searchModal.classList.remove("active"));

    // Enter press
    searchInput.addEventListener("keypress", (e) => {
      if(e.key === "Enter"){
        performSearch(searchInput.value);
      }
    });
  }

  function performSearch(query){
    const normalized = query.trim().toLowerCase();
    const pizzaId = pizzaMap[normalized];
    if(!pizzaId) {
      alert("Pizza not found!");
      return;
    }

    // Check if we are on menu.html
    if(document.getElementById(pizzaId)){
      document.getElementById(pizzaId).scrollIntoView({behavior: "smooth"});
    } else {
      // Redirect to menu.html with hash
      window.location.href = "menu.html#" + pizzaId;
    }

    if(searchModal) searchModal.classList.remove("active");
    searchInput.value = "";
  }

});
