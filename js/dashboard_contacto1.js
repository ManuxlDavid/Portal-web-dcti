let imageCount1 = 1;

function previewImage1(input) {
  const mainPreview = document.querySelector('.main-image-preview1');
  const previewContainer = document.querySelector('.preview-container1');
  const uploadButton = document.getElementById('upload-button1');

  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      // Crear nueva miniatura
      const newPreview = document.createElement('div');
      newPreview.className = 'image-preview1';
      newPreview.style.backgroundImage = `url(${e.target.result})`;
      newPreview.dataset.filename = `img_${imageCount1}`;
      
      // Actualizar vista principal
      mainPreview.style.backgroundImage = `url(${e.target.result})`;
      
      // Agregar miniatura al contenedor
      previewContainer.appendChild(newPreview);
      imageCount1++;

      // Ocultar botón si hay imágenes
      if (imageCount1 > 1) {
        uploadButton.style.display = 'none';
      }
    }
    reader.readAsDataURL(input.files[0]);
  }
}

// Event listener para el botón borrar del primer formulario
document.querySelector('.delete-button1').addEventListener('click', () => {
  const previewContainer = document.querySelector('.preview-container1');
  const uploadButton = document.getElementById('upload-button1');

  // Limpiar todas las miniaturas
  previewContainer.innerHTML = '';
  document.querySelector('.main-image-preview1').style.backgroundImage = 'none';
  imageCount1 = 1;
  uploadButton.style.display = 'flex';
});

// Event listener para el submit del primer formulario
document.querySelector('.cont-d1 form').addEventListener('submit', (event) => {
  event.preventDefault();
  const previewContainers = document.querySelectorAll('.image-preview1');
  const formData = new FormData();

  previewContainers.forEach(container => {
    if (container.dataset.filename) {
      // Aquí deberías enviar el archivo real, no la URL de datos
      formData.append(container.dataset.filename, container.style.backgroundImage.slice(5, -2));
    }
  });

  console.log('Formulario 1 enviado:', formData);
});