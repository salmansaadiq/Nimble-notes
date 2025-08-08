if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('Service Worker registered', reg))
      .catch(err => console.error('Service Worker registration failed', err));
  });
}

function addNote() {
  const text = document.getElementById('note-text').value.trim();
  const imageInput = document.getElementById('image-input');
  const notesContainer = document.getElementById('notes');

  if (!text && !imageInput.files.length) return;

  const note = document.createElement('div');
  note.className = 'note';

  if (text) {
    const para = document.createElement('p');
    para.textContent = text;
    note.appendChild(para);
  }

  if (imageInput.files.length > 0) {
    const img = document.createElement('img');
    const reader = new FileReader();

    reader.onload = function (e) {
      img.src = e.target.result;
      note.appendChild(img);
    };

    reader.readAsDataURL(imageInput.files[0]);
  }

  notesContainer.prepend(note);

  document.getElementById('note-text').value = '';
  imageInput.value = '';
}
