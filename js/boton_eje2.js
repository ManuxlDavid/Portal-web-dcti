document.addEventListener("DOMContentLoaded", () => {
  // Carrusel eje2
  const sliderEje2 = document.querySelector(".eje-contenedor2");
  const slidesEje2 = document.querySelectorAll(".eje2");
  const dotsContainerEje2 = document.querySelector(".dots-container-eje2");
  let currentIndexEje2 = 0;
  
  // Crear los puntos
  slidesEje2.forEach((slide, index) => {
    const dot2 = document.createElement(`div`);
    dot2.classList.add(`dot-eje2`);
    dotsContainerEje2.appendChild(dot2);

    // Agregar evento de clic a cada punto
    dot2.addEventListener(`click`, () => {
      currentIndexEje2 = index;
      updateSlider();
    });
  });

  function updateSlider() {
    const offsetEje2 = -currentIndexEje2 * (100 / slidesEje2.length); // Calcula el desplazamiento
    sliderEje2.style.transform = `translateX(${offsetEje2}%)`; // Aplica el desplazamiento

    // Actualiza los puntos activos
    const dots2 = document.querySelectorAll(`.dot-eje2`);
    dots2.forEach((d, i) => {
      d.classList.toggle(`active`, i === currentIndexEje2);
    });
  }

  // Iniciar el carrusel (opcional)
  setInterval(() => {
    currentIndexEje2 = (currentIndexEje2 + 1) % slidesEje2.length; // Cambia de índice
    updateSlider();
  }, 30000); // Cambia cada 30 segundos
});
  
