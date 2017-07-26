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
  const dropTargetItem = e.target.id;
  const dragTitle = $('#' + dragItem).text().split(': ')[1];

  if (dragItem[2] !== dropTargetItem[2]) {
    const album = { id: dragItem.split('-')[0], title: dragTitle, userId: dragItem.split('-')[1]};
    updateAlbum(album)
      .then(data => updateUI(data, dragItem, dropTargetItem));
  }
}

function updateUI(album, dragItem, dropTargetItem) {
  $(`#` + dragItem).remove();
  createListItem(album).insertAfter('#' + dropTargetItem);
}

function updateAlbum(album) {
  return $.ajax({
    url: `https://jsonplaceholder.typicode.com/albums/${album.id}`,
    method: 'PATCH',
    data: album,
  });
}

function createListItem(album) {
  const $listItem = $('<li>', {
    'id': `${album.id}-${album.userId}`,
    'draggable': true,
    'ondragstart': 'handleDragStart(event)'
  })
  .append(`${album.id}: ${album.title}`);

  return $listItem;
}

function createList(albums) {
  const $albumList = $('<ul>', {
    'ondrop': 'handleDrop(event)',
    'ondragover': 'handleDragOver(event)'
  });

  albums.forEach(album => {
    $albumList.append(createListItem(album));
  });

  return $albumList[0];
}

function renderAlbums(albums, $userSection) {
  const $list = createList(albums);
  $userSection.append($list);
  return $userSection;
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const location = 'https://jsonplaceholder.typicode.com';
  const users = [1,2];
  render(root, users, location);
});

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

function renderUser(userData) {
  const $section = $('<section>');
  $section.text(userData.name);
  return $section[0];
}

function getData($root, users, location) {
  users.forEach(user => {
    $.when(getUser(user, location), getAlbums(user, location))
      .done((userData, albumData) => {
        const $userSection = renderUser(userData[0]);
        renderAlbums(albumData[0], $userSection);
        $root.append($userSection);
      });
  });
}

function render($root, users, location) {
  getData($root, users, location);
}
