document.addEventListener("DOMContentLoaded", () => {
  // Carrusel eje3
  const sliderEje3 = document.querySelector(".eje-contenedor3");
  const slidesEje3 = document.querySelectorAll(".eje3");
  const dotsContainerEje3 = document.querySelector(".dots-container-eje3");
  let currentIndexEje3 = 0;
  
  // Crear los puntos
  slidesEje3.forEach((slide, index) => {
    const dot3 = document.createElement(`div`);
    dot3.classList.add(`dot-eje3`);
    dotsContainerEje3.appendChild(dot3);

    // Agregar evento de clic a cada punto
    dot3.addEventListener(`click`, () => {
      currentIndexEje3 = index;
      updateSlider();
    });
  });

  function updateSlider() {
    const offsetEje3 = -currentIndexEje3 * (100 / slidesEje3.length); // Calcula el desplazamiento
    sliderEje3.style.transform = `translateX(${offsetEje3}%)`; // Aplica el desplazamiento

    // Actualiza los puntos activos
    const dots3 = document.querySelectorAll(`.dot-eje3`);
    dots3.forEach((d, i) => {
      d.classList.toggle(`active`, i === currentIndexEje3);
    });
  }

  // Iniciar el carrusel (opcional)
  setInterval(() => {
    currentIndexEje3 = (currentIndexEje3 + 1) % slidesEje3.length; // Cambia de índice
    updateSlider();
  }, 30000); // Cambia cada 30 segundos
});