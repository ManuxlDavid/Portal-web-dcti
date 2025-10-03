document.addEventListener("DOMContentLoaded", () => {
  // Carrusel eje5
  const sliderEje5 = document.querySelector(".eje-contenedor5");
  const slidesEje5 = document.querySelectorAll(".eje5");
  const dotsContainerEje5 = document.querySelector(".dots-container-eje5");
  let currentIndexEje5 = 0;
  
  // Crear los puntos
  slidesEje5.forEach((slide, index) => {
    const dot5 = document.createElement(`div`);
    dot5.classList.add(`dot-eje5`);
    dotsContainerEje5.appendChild(dot5);

    // Agregar evento de clic a cada punto
    dot5.addEventListener(`click`, () => {
      currentIndexEje5 = index;
      updateSlider();
    });
  });

  function updateSlider() {
    const offsetEje5 = -currentIndexEje5 * (100 / slidesEje5.length); // Calcula el desplazamiento
    sliderEje5.style.transform = `translateX(${offsetEje5}%)`; // Aplica el desplazamiento

    // Actualiza los puntos activos
    const dots5 = document.querySelectorAll(`.dot-eje5`);
    dots5.forEach((d, i) => {
      d.classList.toggle(`active`, i === currentIndexEje5);
    });
  }

  // Iniciar el carrusel (opcional)
  setInterval(() => {
    currentIndexEje5 = (currentIndexEje5 + 1) % slidesEje5.length; // Cambia de índice
    updateSlider();
  }, 30000); // Cambia cada 30 segundos
});