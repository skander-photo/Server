// Categories/new
function addAlbumInput(event) {
  event.preventDefault();
  const albums = document.querySelector('.albums');
  const input = document.createElement('input');
  input.placeholder = 'Album title';
  input.name = 'albums';
  albums.appendChild(input);
  input.focus();
}
