document.addEventListener("DOMContentLoaded", () => {
  // Scroll suave para anclas internas
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href"))?.scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Filtrado de proyectos
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");

  if (filterButtons.length > 0 && projectItems.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const filterValue = button.getAttribute("data-filter");

        projectItems.forEach((item) => {
          item.style.display =
            filterValue === "all" ||
            item.getAttribute("data-category") === filterValue
              ? "block"
              : "none";
        });
      });
    });
  }

  // Botón "Ir arriba"
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Funciones al hacer scroll
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // Barra de progreso
    const scrollBar = document.getElementById("scrollProgressBar");
    if (scrollBar) scrollBar.style.width = `${scrollPercent}%`;

    // Mostrar botón "Ir arriba"
    if (scrollTopBtn) {
      scrollTopBtn.style.display = scrollTop > 300 ? "block" : "none";
    }

    // Animaciones al hacer scroll
    const fadeElements = document.querySelectorAll(".fade-in-up, .fade-zoom");
    fadeElements.forEach((el) => {
      const position = el.getBoundingClientRect().top;
      const screenHeight = window.innerHeight;

      if (position < screenHeight * 0.9) {
        el.classList.add("animated-visible");
      }
    });

    // Animaciones con clase .animate-on-scroll
    const animated = document.querySelectorAll(".animate-on-scroll");
    animated.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.classList.add("animated");
      }
    });
  };

  // Activar scroll listener
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Ejecutar al cargar
});

// Simulación de envío de formulario con alerta
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Evitar envío real

    Swal.fire({
      icon: "success",
      title: "Mensaje enviado",
      text: "Gracias por contactarte. Te responderé a la brevedad.",
      confirmButtonColor: "#00b181",
    });

    // Limpiar los campos luego de enviar
    contactForm.reset();
  });
}

