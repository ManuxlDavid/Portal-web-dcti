let imageCount2 = 1;

function previewImage2(input) {
  const mainPreview = document.querySelector('.main-image-preview2');
  const previewContainer = document.querySelector('.preview-container2');
  const uploadButton = document.getElementById('upload-button2');

  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      // Crear nueva miniatura
      const newPreview = document.createElement('div');
      newPreview.className = 'image-preview2';
      newPreview.style.backgroundImage = `url(${e.target.result})`;
      newPreview.dataset.filename = `img_${imageCount2}`;
      
      // Actualizar vista principal
      mainPreview.style.backgroundImage = `url(${e.target.result})`;
      
      // Agregar miniatura al contenedor
      previewContainer.appendChild(newPreview);
      imageCount2++;

      // Ocultar botón si hay imágenes
      if (imageCount2 > 1) {
        uploadButton.style.display = 'none';
      }
    }
    reader.readAsDataURL(input.files[0]);
  }
}

// Event listener para el botón borrar del segundo formulario
document.querySelector('.delete-button2').addEventListener('click', () => {
  const previewContainer = document.querySelector('.preview-container2');
  const uploadButton = document.getElementById('upload-button2');

  // Limpiar todas las miniaturas
  previewContainer.innerHTML = '';
  document.querySelector('.main-image-preview2').style.backgroundImage = 'none';
  imageCount2 = 1;
  uploadButton.style.display = 'flex';
});

// Event listener para el submit del segundo formulario
document.querySelector('.cont-d2 form').addEventListener('submit', (event) => {
  event.preventDefault();
  const previewContainers = document.querySelectorAll('.image-preview2');
  const formData = new FormData();

  previewContainers.forEach(container => {
    if (container.dataset.filename) {
      formData.append(container.dataset.filename, container.style.backgroundImage.slice(5, -2));
    }
  });

  console.log('Formulario 2 enviado:', formData);
});