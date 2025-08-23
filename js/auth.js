// auth.js - Demo login/register alerts
document.addEventListener("DOMContentLoaded", () => {

  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  if(loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Login successful! (Demo)");
      loginForm.reset();
    });
  }

  if(registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Registration successful! (Demo)");
      registerForm.reset();
    });
  }

});
