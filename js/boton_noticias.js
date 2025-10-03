document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(`.noticia-contenedor`);
  const slides = document.querySelectorAll(`.noticia`);
  const dotsContainer = document.querySelector(`.dots-container`);
  let currentIndex = 0;

  // Crear los puntos
  slides.forEach((slide, index) => {
    const dot = document.createElement(`div`);
    dot.classList.add(`dot`);
    dotsContainer.appendChild(dot);

    // Agregar evento de clic a cada punto
    dot.addEventListener(`click`, () => {
      currentIndex = index;
      updateSlider();
    });
  });

  function updateSlider() {
    const offset = -currentIndex * (100 / slides.length); // Calcula el desplazamiento
    slider.style.transform = `translateX(${offset}%)`; // Aplica el desplazamiento

    // Actualiza los puntos activos
    const dots = document.querySelectorAll(`.dot`);
    dots.forEach((d, i) => {
      d.classList.toggle(`active`, i === currentIndex);
    });
  }

  // Iniciar el carrusel (opcional)
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length; // Cambia de índice
    updateSlider();
  }, 30000); // Cambia cada 30 segundos
});
