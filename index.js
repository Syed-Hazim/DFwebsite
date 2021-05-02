const dropZone = document.querySelector('.drop-zone');
var fileInput = document.querySelector('#file-input');
const browseBtn = document.querySelector('.browseBtn');
const video = document.querySelector(".video-container");


dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  if (!dropZone.classList.contains('dragged'))
    dropZone.classList.add('dragged');
});

document.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragged');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragged');
  const files = e.dataTransfer.files;
  // console.table(files);
  if (files.length) {
    fileInput.files = files;
    playSelectedFile();
  }
});

browseBtn.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  playSelectedFile();
})

const playSelectedFile = function () {
  if (fileInput.files.length > 1) {
    fileInput.value = "";
    return;
  }

  const file = fileInput.files[0];
  const type = file.type;
  const videoNode = document.querySelector('video')
  const canPlay = videoNode.canPlayType(type)
  if (canPlay === '') canPlay = 'no'
  const message = 'Can play type "' + type + '": ' + canPlay
  const isError = canPlay === 'no'

  if (isError) {
    alert(message);
    return
  }

  video.style.display = 'block';
  dropZone.style.display = 'none';
  const fileURL = URL.createObjectURL(file)
  videoNode.src = fileURL
}