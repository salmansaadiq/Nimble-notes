if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('Service Worker registered', reg))
      .catch(err => console.error('Service Worker registration failed', err));
  });
}

function getSavedNotes() {
  const notes = localStorage.getItem('nimble-notes');
  return notes ? JSON.parse(notes) : [];
}

function saveNotesToStorage(notes) {
  localStorage.setItem('nimble-notes', JSON.stringify(notes));
}

function renderNotes() {
  const notes = getSavedNotes();
  const container = document.getElementById('notes');
  container.innerHTML = '';

  notes.reverse().forEach(note => {
    const noteElement = document.createElement('div');
    noteElement.className = 'note';

    if (note.text) {
      const p = document.createElement('p');
      p.textContent = note.text;
      noteElement.appendChild(p);
    }

    if (note.image) {
      const img = document.createElement('img');
      img.src = note.image;
      noteElement.appendChild(img);
    }

    container.appendChild(noteElement);
  });
}

function addNote() {
  const text = document.getElementById('note-text').value.trim();
  const imageInput = document.getElementById('image-input');
  const notes = getSavedNotes();

  if (!text && !imageInput.files.length) return;

  const newNote = { text: text, image: null };

  if (imageInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function (e) {
      newNote.image = e.target.result;
      notes.push(newNote);
      saveNotesToStorage(notes);
      renderNotes();
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    notes.push(newNote);
    saveNotesToStorage(notes);
    renderNotes();
  }

  document.getElementById('note-text').value = '';
  imageInput.value = '';
}

window.onload = renderNotes;
