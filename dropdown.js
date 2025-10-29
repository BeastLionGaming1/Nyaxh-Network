const dropdown = document.getElementById("networkDropdown");
    const btn = dropdown.querySelector(".dropdown-btn");
    const content = dropdown.querySelector(".dropdown-content");
    const selected = document.getElementById("selected");

    btn.addEventListener("click", () => {
      dropdown.classList.toggle("active");
    });

    const options = content.querySelectorAll("div");
    options.forEach(option => {
      option.addEventListener("click", () => {
        options.forEach(opt => opt.classList.remove("active"));
        option.classList.add("active");

        selected.textContent = option.textContent.trim();
        selected.style.color = "#222"; // keep dark text
        dropdown.classList.remove("active");
      });
    });

    window.addEventListener("click", e => {
      if (!dropdown.contains(e.target)) dropdown.classList.remove("active");
    });
