export function changeTheme() {
  let isDarkMode = JSON.parse(localStorage.getItem("mode")) || false;
  const toggleBtn = document.querySelector(".js-circle-toggle");

  function darkModeToggle() {
    if (!isDarkMode) {
      isDarkMode = true;
      console.log("dark mode on");
      toggleBtn.classList.add("move-toggle-btn");
      document.documentElement.style.setProperty("--cart-clr", "#353535");
      document.documentElement.style.setProperty("--main-bg", " #353535");
      localStorage.setItem("mode", JSON.stringify(isDarkMode));
    } else {
      isDarkMode = false;
      console.log("dark mode off");

      toggleBtn.classList.remove("move-toggle-btn");
      document.documentElement.style.setProperty("--cart-clr", "#14c0cc");
      document.documentElement.style.setProperty("--main-bg", "#1f91b4");
    }
    localStorage.setItem("mode", JSON.stringify(isDarkMode));
  }
  document
    .querySelector(".js-dark-toggle-btn")
    .addEventListener("click", () => {
      darkModeToggle();
    });
}
