const btnLeftm = document.querySelector(".btn-left-m"),
      btnRightm = document.querySelector(".btn-right-m"),
      sliderm = document.querySelector("#miniaturaf"),
      sliderSectionm = document.querySelectorAll(".img-footer");

btnLeftm.addEventListener("click", moveToLeftm);
btnRightm.addEventListener("click", moveToRightm);

setInterval(() => {
  moveToRightm();
}, 30000); // 30 segundos

let operaciones = 0,
    counters = 0,
    totalImages = sliderSectionm.length;

function moveToRightm() {
  if (counters < totalImages - 4) {
    counters++;
  } else {
    counters = 0; // Reinicia al llegar al final
  }
  operaciones = counters * (100 / totalImages); // Mueve un porcentaje basado en el total de imágenes
  sliderm.style.transform = `translate(-${operaciones}%)`;
}

function moveToLeftm() {
  if (counters > 0) {
    counters--;
  } else {
    counters = totalImages - 4; // Vuelve al último conjunto de imágenes
  }
  operaciones = counters * (100 / totalImages); // Mueve un porcentaje basado en el total de imágenes
  sliderm.style.transform = `translate(-${operaciones}%)`;
}
