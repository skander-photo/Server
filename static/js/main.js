// === Helpers ===
function makeFetchRequest(method, action, body, successCallback) {
  const baseUrl = 'http://localhost:5000/';
  fetch(baseUrl+action, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body
  }).then(successCallback);
}

// === Categories/new ===

function addAlbumInput(event) {
  event.preventDefault();
  const divAlbum = document.createElement('div');
  divAlbum.className = 'album';
  // Input
  const input = document.createElement('input');
  input.placeholder = 'Album title';
  input.name = 'albums';
  divAlbum.appendChild(input);
  // Remove button
  const removeButton = document.createElement('button');
  removeButton.innerText = "Remove";
  removeButton.onclick = removeCurrentAlbumDiv;
  divAlbum.appendChild(removeButton);
  // Append album to albums
  const albums = document.querySelector('.albums');
  albums.appendChild(divAlbum);

  input.focus();
}

function removeCurrentAlbumDiv(event) {
  event.preventDefault();
  event.target.parentElement.remove();
}

// === Pictures ===
function deletePicture(e) {
  const picId = e.target.value;
  if (confirm("Confirm delete?")) {
    makeFetchRequest(
      'POST',
      'pictures/delete',
      JSON.stringify({ picId }),
      (e) => location.reload()
    );
  }
}

function setAsAlbumCover(e) {
  const picId = e.target.value;
  const albumId = document.getElementById('albumId').value;
  console.log(picId, albumId);
  makeFetchRequest(
    'POST',
    'albums/cover',
    JSON.stringify({ albumId, picId }),
    console.log('Changed album cover')
  );
}
