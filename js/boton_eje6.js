document.addEventListener("DOMContentLoaded", () => {
  // Carrusel eje6
  const sliderEje6 = document.querySelector(".eje-contenedor6");
  const slidesEje6 = document.querySelectorAll(".eje6");
  const dotsContainerEje6 = document.querySelector(".dots-container-eje6");
  let currentIndexEje6 = 0;
  
  // Crear los puntos
  slidesEje6.forEach((slide, index) => {
    const dot6 = document.createElement(`div`);
    dot6.classList.add(`dot-eje6`);
    dotsContainerEje6.appendChild(dot6);

    // Agregar evento de clic a cada punto
    dot6.addEventListener(`click`, () => {
      currentIndexEje6 = index;
      updateSlider();
    });
  });

  function updateSlider() {
    const offsetEje6 = -currentIndexEje6 * (100 / slidesEje6.length); // Calcula el desplazamiento
    sliderEje6.style.transform = `translateX(${offsetEje6}%)`; // Aplica el desplazamiento

    // Actualiza los puntos activos
    const dots6 = document.querySelectorAll(`.dot-eje6`);
    dots6.forEach((d, i) => {
      d.classList.toggle(`active`, i === currentIndexEje6);
    });
  }

  // Iniciar el carrusel (opcional)
  setInterval(() => {
    currentIndexEje6 = (currentIndexEje6 + 1) % slidesEje6.length; // Cambia de índice
    updateSlider();
  }, 30000); // Cambia cada 30 segundos
});
  
