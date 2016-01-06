function pageLoaded(data) {
  displayHeader();
  list(data);
}

function list(data) {
  data.broncos.forEach(function(bronco) {
    bronco.heightString = String(Math.floor(bronco.height / 12)) + '\'' + String(bronco.height % 12) + '\'\'';
  });
  displayTemplate('main', 'broncos', { broncos: data.broncos });
}

function listData() {
  $.ajax({
    url: appvars.server + 'broncos',
    method: 'get'
  }).done(list);
}

function displayHeader() {
  displayTemplate('header', 'header', {});
}

function addPlayer() {
  displayTemplate('main', 'playerform', { postMethod: 'addPlayerPost', postText: 'Add Player' });
}

function addPlayerPost(event) {
  if (event) event.preventDefault();
  var formData = createFormData('form');
  $.ajax({
    url: appvars.server + 'broncos',
    method: 'post',
    data: formData,
    xhrFields: {
      withCredentials: true
    }
  }).done(function(data) {
    console.log(data);
    listData();
  }).fail(function(data) {
    console.error(data);
  });
}

function editPlayer(id) {
  $.ajax({
    url: appvars.server + 'broncos/' + id,
    method: 'get'
  }).done(function(data) {
    var object = data.broncos[0];
    object.postMethod = 'editPut';
    object.postText = 'Update Player';
    object.params = id;
    displayTemplate('main', 'playerform', object);
  }).fail(function(data) {
    console.error(data);
  });
}

function editPut(event, id) {
  if (event) event.preventDefault();
  var formData = createFormData('form');
  $.ajax({
    url: appvars.server + 'broncos/' + id,
    method: 'put',
    data: formData,
    xhrFields: {
      withCredentials: true
    }
  }).done(function(data) {
    console.log(data);
    listData();
  }).fail(function(data) {
    console.error(data);
  });
}

function deletePlayer(id) {
  $.ajax({
    url: appvars.server + 'broncos/' + id,
    method:'delete',
    xhrFields: {
      withCredentials: true
    }
  }).done(function(data) {
    console.log(data);
    listData();
    displayHeader();
  }).fail(function(data) {
    console.error(data);
  });
}

function cancel(event) {
  if (event) event.preventDefault();
  listData();
}
