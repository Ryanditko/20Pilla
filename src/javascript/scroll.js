document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section");
    const navLinks = document.querySelectorAll("nav a");
  
    // Oculta todas as seções
    sections.forEach((section) => {
      section.classList.remove("show");
      section.style.display = "none";
    });
  
    // Exibe a seção inicial
    const homeSection = document.getElementById("Home");
    homeSection.style.display = "block";
    setTimeout(() => {
      homeSection.classList.add("show");
    }, 10);

    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
  
        const currentSection = document.querySelector(".section.show");
        if (currentSection && currentSection !== targetSection) {
          currentSection.classList.remove("show");
  
          // Espera o fade-out antes de esconder
          setTimeout(() => {
            currentSection.style.display = "none";
            // Mostra a nova seção
            targetSection.style.display = "block";
            setTimeout(() => {
              targetSection.classList.add("show");
            }, 10);
          }, 500);
        } else if (!currentSection) {
          targetSection.style.display = "block";
          setTimeout(() => {
            targetSection.classList.add("show");
          }, 10);
        }
      });
    });
  });
  