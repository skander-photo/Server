// Categories/new
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
