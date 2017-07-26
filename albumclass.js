class Albums {
  constructor(user, albums, $userSection) {
    this.userId = user.id;
    this.albums = {};
    this.$userSection = $userSection;
    this.formatAlbums = this.formatAlbums.bind(this);
    this.handleDragStart= this.handleDragStart.bind(this);
    this.formatAlbums(albums);
  }

  handleDragStart(e) {
    debugger
  }

  removeAlbum(id) {
    delete this.albums[id];
  }

  addAlbum(album) {

  }

  formatAlbums(albums) {
    albums.forEach(album => this.albums[album.id] = album);
  }

  createListItem(album) {
    const $listItem = $('<li></li>');
    $listItem.append(`${album.id}: ${album.title}`);
    $listItem.val(album.id);
    $listItem.attr('draggable', true);
    $listItem.attr('ondragstart', 'this.handleDragStart(event)');
    return $listItem;
  }

  createList() {
    const $albumList = $('<ul></ul>');

    for (var prop in this.albums) {
      $albumList.append(this.createListItem(this.albums[prop]));
    }

    return $albumList[0];
  }

  renderAlbums() {
    this.$userSection.append(this.createList());
    return this.$userSection;
  }
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
        const albums = new Albums(userData[0], albumData[0], $userSection);
        albums.renderAlbums();
        $root.append($userSection);
      });
  });
}

function render($root, users, location) {
  getData($root, users, location);
}
