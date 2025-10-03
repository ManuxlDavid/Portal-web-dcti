document.addEventListener("DOMContentLoaded", () => {
  // Carrusel eje1
  const sliderEje1 = document.querySelector(".eje-contenedor1");
  const slidesEje1 = document.querySelectorAll(".eje1");
  const dotsContainerEje1 = document.querySelector(".dots-container-eje1");
  let currentIndexEje1 = 0;
  
  // Crear los puntos
  slidesEje1.forEach((slide, index) => {
    const dot1 = document.createElement(`div`);
    dot1.classList.add(`dot-eje1`);
    dotsContainerEje1.appendChild(dot1);

    // Agregar evento de clic a cada punto
    dot1.addEventListener(`click`, () => {
      currentIndexEje1 = index;
      updateSlider();
    });
  });

  function updateSlider() {
    const offsetEje1 = -currentIndexEje1 * (100 / slidesEje1.length); // Calcula el desplazamiento
    sliderEje1.style.transform = `translateX(${offsetEje1}%)`; // Aplica el desplazamiento

    // Actualiza los puntos activos
    const dots1 = document.querySelectorAll(`.dot-eje1`);
    dots1.forEach((d, i) => {
      d.classList.toggle(`active`, i === currentIndexEje1);
    });
  }

  // Iniciar el carrusel (opcional)
  setInterval(() => {
    currentIndexEje1 = (currentIndexEje1 + 1) % slidesEje1.length; // Cambia de índice
    updateSlider();
  }, 30000); // Cambia cada 30 segundos
});
