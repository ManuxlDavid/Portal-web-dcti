document.addEventListener("DOMContentLoaded", () => {
  // Carrusel eje4
  const sliderEje4 = document.querySelector(".eje-contenedor4");
  const slidesEje4 = document.querySelectorAll(".eje4");
  const dotsContainerEje4 = document.querySelector(".dots-container-eje4");
  let currentIndexEje4 = 0;
  
  // Crear los puntos
  slidesEje4.forEach((slide, index) => {
    const dot4 = document.createElement(`div`);
    dot4.classList.add(`dot-eje4`);
    dotsContainerEje4.appendChild(dot4);

    // Agregar evento de clic a cada punto
    dot4.addEventListener(`click`, () => {
      currentIndexEje4 = index;
      updateSlider();
    });
  });

  function updateSlider() {
    const offsetEje4 = -currentIndexEje4 * (100 / slidesEje4.length); // Calcula el desplazamiento
    sliderEje4.style.transform = `translateX(${offsetEje4}%)`; // Aplica el desplazamiento

    // Actualiza los puntos activos
    const dots4 = document.querySelectorAll(`.dot-eje4`);
    dots4.forEach((d, i) => {
      d.classList.toggle(`active`, i === currentIndexEje4);
    });
  }

  // Iniciar el carrusel (opcional)
  setInterval(() => {
    currentIndexEje4 = (currentIndexEje4 + 1) % slidesEje4.length; // Cambia de índice
    updateSlider();
  }, 30000); // Cambia cada 30 segundos
});
  
