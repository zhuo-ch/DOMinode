function handleDragStart(e) {
  e.dataTransfer.setData('text/plain', e.currentTarget.id);
  e.dropEffect = 'move';
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e) {
  e.preventDefault();

  const dragItem = e.dataTransfer.getData('text');
  const album = { id: dragItem.split('-')[0], userId: dragItem.split('-')[1]};

  updateAlbum(album)
    .then(data => updateUI(data, dragItem, e));
}

function createListItem(album) {
  const $albumId = $('<li>', { 'text': album.id, 'class': 'album-id' });
  const $albumTitle = $('<li>', { 'text': album.title, 'class': 'album-title'});
  const $listItem = $('<ul>', {
    'id': `${album.id}-${album.userId}`,
    'class': 'album-item',
    'draggable': true,
    'ondragstart': 'handleDragStart(event)'
  });

  $listItem.append($albumId[0]).append($albumTitle[0]);

  return $listItem[0];
}

function createList(albums) {
  const $albumList = $('<ul>', {
    'class': 'album-list',
    'ondrop': 'handleDrop(event)',
    'ondragover': 'handleDragOver(event)'
  });

  albums.forEach(album => {
    $albumList.append(createListItem(album));
  });

  return $albumList[0];
}

function createAlbumSection(albums, $userSection) {
  const $list = createList(albums);
  $userSection.append($list);
  return $userSection;
}

function createUserSection(userData) {
  const $section = $('<section>', { 'class': 'user-section'});
  const $userName = $('<h3>', { 'text': userData.name });
  $section.append($userName);
  return $section[0];
}

function updateUI(album, dragItem, e) {
  $(`#` + dragItem).remove();
  const $newListItem = createListItem(album);
  
  if (e.target.parentElement.id) {
    $('#' + e.target.parentElement.id).after($newListItem);
  } else {
    e.target.append($newListItem);
  }
}

function getUser(id, location) {
  return $.ajax({
    url: `${location}/users/${id}`,
    method: 'GET',
  });
}

function getAlbums(id, location) {
  return $.ajax({
    url: `${location}/albums?userId=${id}`,
    method: 'GET',
  });
}

function updateAlbum(album) {
  return $.ajax({
    url: `https://jsonplaceholder.typicode.com/albums/${album.id}`,
    method: 'PATCH',
    data: album,
  });
}

function render($root, users, location) {
  users.forEach(user => {
    $.when(getUser(user, location), getAlbums(user, location))
      .done((userData, albumData) => {
        const $userSection = createUserSection(userData[0]);
        createAlbumSection(albumData[0], $userSection);
        $root.append($userSection);
      });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const location = 'https://jsonplaceholder.typicode.com';
  const users = [1,2];
  render(root, users, location);
});
