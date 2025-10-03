let imageCount = 1;

function previewImage(input) {
  const mainPreview = document.querySelector('.main-image-preview');
  const previewContainers = document.querySelectorAll('.image-preview');
  const uploadButton = document.getElementById('upload-button');

  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      mainPreview.style.backgroundImage = `url(${e.target.result})`;
      previewContainers[imageCount - 1].style.backgroundImage = `url(${e.target.result})`;
      previewContainers[imageCount - 1].dataset.filename = `img_${imageCount}`;
      imageCount++;

      if (imageCount > 4) {
        uploadButton.style.display = 'none';
      }
    }
    reader.readAsDataURL(input.files[0]);
  }
}

document.querySelector('.delete-button').addEventListener('click', () => {
  const previewContainers = document.querySelectorAll('.image-preview');
  const uploadButton = document.getElementById('upload-button');

  previewContainers.forEach(container => {
    container.style.backgroundImage = 'none';
    container.dataset.filename = '';
  });
  document.querySelector('.main-image-preview').style.backgroundImage = 'none';
  imageCount = 1;
  uploadButton.style.display = 'flex';
});

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const titleInput = document.querySelector('.title-input');
  const previewContainers = document.querySelectorAll('.image-preview');
  const formData = new FormData();
  formData.append('title', titleInput.value);

  previewContainers.forEach(container => {
    if (container.dataset.filename) {
      formData.append(container.dataset.filename, container.style.backgroundImage.slice(5, -2));
    }
  });

  // Aquí puedes enviar el formData al servidor
  console.log(formData);
});
