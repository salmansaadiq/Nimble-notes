
const form = document.getElementById("note-form");
const noteInput = document.getElementById("note-input");
const imageUpload = document.getElementById("image-upload");
const notesContainer = document.getElementById("notes");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const noteText = noteInput.value;
  const file = imageUpload.files[0];
  const reader = new FileReader();

  const noteElement = document.createElement("div");
  noteElement.className = "note";
  noteElement.innerHTML = `<p>${noteText}</p>`;

  if (file) {
    reader.onload = function(event) {
      const img = document.createElement("img");
      img.src = event.target.result;
      noteElement.appendChild(img);
      notesContainer.appendChild(noteElement);
    };
    reader.readAsDataURL(file);
  } else {
    notesContainer.appendChild(noteElement);
  }

  noteInput.value = "";
  imageUpload.value = "";
});
