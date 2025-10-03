const btnLeft = document.querySelector(".btn-left"),
  btnRight = document.querySelector(".btn-right"),
  slider = document.querySelector("#principal"),
  sliderSection = document.querySelectorAll(".imgc");

btnLeft.addEventListener("click", moveToLeft);
btnRight.addEventListener("click", moveToRight);

setInterval(() => {
  moveToRight();
}, 30000); // 30 segundos

let operacion = 0,
  counter = 0,
  widthImg = 100 / sliderSection.length;

function moveToRight() {
  if (counter >= sliderSection.length - 1) {
    counter = 0;
    operacion = 0;
    slider.style.transition = "none"; // Sin transición al reiniciar
  } else {
    counter++;
    operacion += widthImg;
    slider.style.transition = "all ease .6s";
  }
  slider.style.transform = `translate(-${operacion}%)`;
}

function moveToLeft() {
  if (counter <= 0) {
    counter = sliderSection.length - 1;
    operacion = widthImg * (sliderSection.length - 1);
    slider.style.transition = "all ease .6s";
  } else {
    counter--;
    operacion -= widthImg;
    slider.style.transition = "all ease .6s";
  }
  slider.style.transform = `translate(-${operacion}%)`;
}
